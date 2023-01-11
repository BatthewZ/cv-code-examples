package controllers;


import javafx.scene.Parent;
import javafx.scene.image.Image;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.paint.ImagePattern;
import javafx.scene.shape.Circle;
import javafx.scene.text.Text;
import model.DBManager;
import model.ProjectDB;

import overlays.ProjectMenuOverlay;
import overlays.UserOverlay;
import javafx.fxml.*;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.function.Consumer;
import java.util.function.Function;

import application.App;
import application.Quoter;


public class WorkspaceController implements PrimaryView {
	
	// This class is the primary window of the app, and helps to handle all first interactions
	// from this window.
	
	@FXML private StackPane basePane;
	@FXML private Text projName;
	@FXML private Text quote;
	@FXML private Text uName;
	@FXML private VBox projectSpace;
	@FXML private Circle profileImg;
	
	private static ArrayList<ProjectController> projControls = new ArrayList<ProjectController>();
	
	private int activeProjectID = 0;
	
	public StackPane getBasePane() {
		// Used for App.overlay() and App.removeOverlay();
		return this.basePane;
	}
	
	public void loadWorkspace() {
		// Set up the workspace
		if (App.getUser() != null) {
			
			setImageToCircle();
			
			uName.setText(App.getUser().getuName());
			
			projControls = getProjectsFromDB();
			
			// If the user doesn't have any projects, make one and set it to the default.
			if (projControls.size() == 0) {
				ProjectDB.insertProject("My Project", App.getUser().getuName());
				projControls = getProjectsFromDB();
				App.getUser().setDefaultProject(projControls.get(0).getID());
			}
			
			// If user defaultproject hasn't been set, set it to the first project in the list.
			if (App.getUser().getDefaultProject() == 0)
				App.getUser().setDefaultProject(projControls.get(0).getID());
			
			// Add default project to the workspace.
			addProjectToWorkspace(getProjectByID(App.getUser().getDefaultProject()));
			String projectName = getProjectByID(App.getUser().getDefaultProject()).getName();
			projName.setText(projectName);
			getProjectByID(App.getUser().getDefaultProject()).loadColumns();
			
			activeProjectID = App.getUser().getDefaultProject();
			
			// Add inspirational quote to the workspace
			getQuote();
			
		} else
			System.out.println("User has not been loaded into Workspace; cannot load projects.");
	}
	
	public void setListeners() {
		App.getUser().getProfileImageURLProperty().addListener((o, oldval, newval) -> {
			setImageToCircle();
		});;
	}
	
	public void setImageToCircle() {
		// Sets profile image to workspace
		this.profileImg.setFill(Color.web("#2C8C99"));
		String imgURL = App.getUser().getProfileImgUrl();
		try{
			if (isValidImgType(imgURL)) {
				Image im = new Image(imgURL, false);
				this.profileImg.setFill(new ImagePattern(im));
			}
		} catch (IllegalArgumentException iae) {
			System.out.println("Something went wrong loading the image: " + iae.getMessage());
			this.profileImg.setFill(Color.web("#2C8C99"));
		}
	}
	
	private boolean isValidImgType(String url) {
		// Helper method for setImageToCircle()
		
		// Example: If the entire filename is ".jpg", then it is invalid.
		if (url.length() <= 4)
			return false;
		
		// Get the last 3 characters and check it for valid file types.
		String fileType = url.substring(url.length()-3).toLowerCase();
		
		if (fileType.equals("png") || fileType.equals("jpg") || fileType.equals("bmp") || fileType.equals("gif"))
			return true;
			
		return false;		
	}
	
	public static ProjectController getProjectByID(int projID) {
		ProjectController project = null;
		for (ProjectController p : projControls)
			if (p.getID() == projID) {
				return p;
			}
		
		return project;
	}
	
	public static ProjectController getProjectByIndex(int index) {
		ProjectController project = null;
		
		if (index >= 0 && index < projControls.size())
			return projControls.get(index);
		
		return project;
	} 
	
	public int getIndexOfProject(int ID) {
		int index = 0;
		for (int i = 0; i < projControls.size(); i++)
			if (projControls.get(i).getID() == ID)
				return i;
		
		return index;
	}
	
	public static ArrayList<ProjectController> getProjectsFromDB(){		
		// Try to load projects from DB, otherwise return existing this.projControls arraylist.
		if (App.getUser() != null) {
			String sqlStatement = "select * from project where user = '"+App.getUser().getuName()+"';";
			
			Function<ResultSet, ArrayList<ProjectController>> getProjects = (ResultSet rs) -> {
				ArrayList<ProjectController> projects = new ArrayList<ProjectController>();
				try {
					while (rs.next()) {
						FXMLLoader loader = App.makeLoader("Project");
						Parent root = loader.load();
						
						ProjectController pc = loader.getController();
						pc.setID(rs.getInt(1));
						pc.setName(rs.getString(2));
						pc.setListeners();
						
						projects.add(pc);
					}
					rs.close();
				} catch (SQLException sqlx) {
					System.out.println(sqlx.getMessage());
				} catch (IOException iox) {
					System.out.println(iox.getMessage());
				}
				return projects;
			};
			
			return DBManager.queryDB(sqlStatement, getProjects);
		}
		
		return projControls;
	}
	
	public void setWorkspaceProjectName(String name) {
		projName.setText(name);
	}
	
	public void getQuote() {
		// Set random inspirational quote to the workspace.
		this.quote.setText("\"" + Quoter.getQuote() + "\"");
	}
	
	private void deleteActiveProject() {
		// Set user's default project to 0 if deleting their default project
		if (App.getUser().getDefaultProject() == activeProjectID)
			App.getUser().setDefaultProject(0);
		
		// Delete the project, update the DB and reload projects from DB.
		// If the project deleted is the last one, create a new project.
		if (projControls.size() > 0 && projControls.remove(getProjectByID(activeProjectID))) {
			ProjectDB.deleteProject(activeProjectID);
			loadWorkspace();
		} else
			createProject("My Project");
	}
	
	public static ArrayList<ProjectController> getProjControls(){
		return projControls;
	}
	
	public static void reloadProjControls() {
			projControls = getProjectsFromDB();
	}
	
	public void addProjectToWorkspace(ProjectController pc) {
		// Remove existing project from workspace
		if (projectSpace.getChildren().size() == 2) {
			projectSpace.getChildren().remove(1);
		}
		
		if (pc == null) {
			System.out.println("Could not load ProjectController, it was null.");
			return;
		}
		
		// Add project to workspace
		projectSpace.getChildren().add(pc.getProjectScroller());
		projName.setText(Coder.decode(pc.getName()));
		activeProjectID = pc.getID();
		pc.getNameProperty().addListener((o, oldval, newval) -> {
			projName.setText(pc.getName());
		});
		
		pc.loadColumns();
	}
	
	private void createProject(String projectName) {
		// create new DB
		ProjectDB.insertProject((String) projectName, App.getUser().getuName());
		// refresh projects arraylist
		projControls = getProjectsFromDB();
		// set new project to workspace
		int newProjID = ProjectDB.getNextID("project");
		addProjectToWorkspace(getProjectByID(newProjID));
	}
	
	public <T> void openProjectMenu() {

		// Set up a function that returns project menu consumers.
		// This is so that I can access WorkspaceController methods
		// from within the project menus and sub-menus as required. 
		
		Function<String, Consumer<T>> menuActions = (consumerName) -> {
			Consumer<T> cons = (string) -> {};
			switch(consumerName.toLowerCase()) {
				case "create": 
						cons = (projectName) -> {
							createProject((String) projectName);
						};
					break;
				case "load":
					cons = (projectAtIndex) -> {
						getQuote();
						addProjectToWorkspace(getProjectByIndex((Integer) projectAtIndex));
					};
					break;
				case "delete":
					cons = (nothing) -> {
						deleteActiveProject();
					};
					break;
			}	
			return cons;
		};
		
		// Load project menu and send function of consumers to it.
		try {
			FXMLLoader loader = App.makeLoader("ProjectMenuOverlay");
			Parent root = loader.load();
			ProjectMenuOverlay controller = loader.getController();
			controller.setDefaultMenu();

			controller.initialize(activeProjectID, menuActions);
			App.setOverlay(controller);

			System.out.println("Loaded");
		} catch (IOException e){
			e.printStackTrace();
		}
	}
	
	@FXML
	private void openUserMenu() {
		try {
			FXMLLoader loader = App.makeLoader("UserOverlay");
			Parent root = loader.load();
			UserOverlay controller = loader.getController();
			controller.initialize();
			App.setOverlay(controller);
		} catch (IOException e){
			e.printStackTrace();
		}
		
		// For some reason, calling setImageToCircle(); is required (despite existing listeners which call it).
		// An issue was identified where you could set profile image,
		// and both circles (overlay and workspace) would update.
		// Then upon opening the userMenu overlay a second time,
		// the workspace circle would default to the previously loaded
		// image. Even though on app restart, the workspace image would
		// be updated.
		setImageToCircle();
	}

}
	

