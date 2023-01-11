package overlays;

import java.io.IOException;
import java.util.function.Consumer;
import java.util.function.Function;

import application.App;
import controllers.WorkspaceController;
import javafx.beans.property.BooleanProperty;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.control.Button;
import javafx.scene.layout.Pane;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;


public class ProjectMenuOverlay<T> implements Overlay {
	
	// This class manages the project menu and submenus.
	
	@FXML StackPane menuPane;
	@FXML Button closeButton;
	@FXML VBox overlay;

	private int activeProjectID;
	
	// default overlay dimensions
	private final double defaultHeight = 150;
	private final double defaultWidth = 350;
	
	private Function<String, Consumer<T>> menuCons;
	
	public void initialize(int activeProjectID, Function<String, Consumer<T>> allConsumers) {
		this.activeProjectID = activeProjectID;
		this.menuCons = allConsumers;
	}
	
	@Override
	public VBox getOverlayPane() {
		return overlay;
	}

	@Override
	public Button getCloseButton() {
		return this.closeButton;
	}
	
	public void setActiveProjectID(int activeProjectID) {
		this.activeProjectID = activeProjectID;
	}
		
	public Consumer<T> getSubMenuConsumer(String menuConsumer){
		return menuCons.apply(menuConsumer);
	}
	
	// Submenu methods. 
	
	public void setDefaultMenu() {
		try {
			FXMLLoader loader = App.makeLoader("ProjMenuDefault");
			Parent root = loader.load();
			ProjectMenuDefault controller = loader.getController();
			double menuWidth = controller.getMenuPaneVBox().getPrefWidth();
			double menuHeight = controller.getMenuPaneVBox().getPrefHeight();
			controller.getEditProj().setOnMouseClicked(event -> {
				setEditProjMenu();
			});
			
			controller.getNewProj().setOnMouseClicked(event -> {
				setNewProjMenu();
			});
			
			controller.getLoadProj().setOnMouseClicked(event -> {
				setLoadProjMenu();
			});
			
			controller.getDelProj().setOnMouseClicked(event -> {
				setDelProjMenu();
			});
						
			setMenuToMenuPane(controller.getMenuPaneVBox());
			resizeOverlay(menuWidth, menuHeight);
			
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("Unable to load default project menu");
		}
	}
	
	public  void setEditProjMenu() {
		try {
			FXMLLoader loader = App.makeLoader("ProjMenuEdit");
			Parent root = loader.load();
			ProjectMenuEdit controller = loader.getController();
			double menuWidth = controller.getMenuPaneVBox().getPrefWidth();
			double menuHeight = controller.getMenuPaneVBox().getPrefHeight();
			
			// Get active project information
			String projectName = WorkspaceController.getProjectByID(activeProjectID).getName();
			
			boolean defaultProject = false;
			if (activeProjectID == App.getUser().getDefaultProject())
				defaultProject = true;
			
			// Set it to controller
			controller.initialize(projectName, defaultProject, activeProjectID);
			
			controller.getBackButton().setOnAction(event -> {
				setDefaultMenu();
			});
						
			setMenuToMenuPane(controller.getMenuPaneVBox());
			resizeOverlay(menuWidth, menuHeight);
			
		}catch (IOException e) {
			e.printStackTrace();
			System.out.println("Unable to load edit project menu");
		}

	} 
	
	public void setNewProjMenu() {
		try {
			FXMLLoader loader = App.makeLoader("ProjMenuCreate");
			Parent root = loader.load();
			ProjectMenuCreate controller = loader.getController();
			double menuWidth = controller.getMenuPaneVBox().getPrefWidth();
			double menuHeight = controller.getMenuPaneVBox().getPrefHeight();
			
			controller.setConsumer(getSubMenuConsumer("create"));
			
			controller.getBackButton().setOnAction(event -> {
				setDefaultMenu();
			});
			
			setMenuToMenuPane(controller.getMenuPaneVBox());
			resizeOverlay(menuWidth, menuHeight);
			
		}catch (IOException e) {
			e.printStackTrace();
			System.out.println("Unable to load create new project menu");
		}
	}
	
	public void setLoadProjMenu() {
		try {
			FXMLLoader loader = App.makeLoader("ProjectMenuLoad");
			Parent root = loader.load();
			ProjectMenuLoad controller = loader.getController();
			double menuWidth = controller.getMenuPaneVBox().getPrefWidth();
			double menuHeight = controller.getMenuPaneVBox().getPrefHeight();
			
			controller.initialize(getSubMenuConsumer("load"));
			
			controller.getBackButton().setOnAction(event -> {
				setDefaultMenu();
			});
			
			setMenuToMenuPane(controller.getMenuPaneVBox());
			resizeOverlay(menuWidth, menuHeight);
			
		}catch (IOException e) {
			e.printStackTrace();
			System.out.println("Unable to load 'Load project' menu");
		}
	}
	
	public void setDelProjMenu() {
		try {
			FXMLLoader loader = App.makeLoader("ProjMenuDelete");
			Parent root = loader.load();
			ProjectMenuDelete controller = loader.getController();
			double menuWidth = controller.getMenuPaneVBox().getPrefWidth();
			double menuHeight = controller.getMenuPaneVBox().getPrefHeight();
			
			controller.initialize(getSubMenuConsumer("delete"));
			
			controller.getBackButton().setOnAction(event -> {
				setDefaultMenu();
			});
			
			setMenuToMenuPane(controller.getMenuPaneVBox());
			resizeOverlay(menuWidth, menuHeight);
			
		}catch (IOException e) {
			e.printStackTrace();
			System.out.println("Unable to load delete project menu");
		}
	}
	
	private void resizeOverlay(double width, double height) {
		// Resize the project menu pane to house children submenu panes.
		if (width > defaultWidth-10) 
			overlay.setPrefWidth(width+5);
		
		overlay.setPrefHeight(height+defaultHeight);
	}
	
	private void setMenuToMenuPane(Node menu) {
		removeAllMenusFromMenuPane();
		this.menuPane.getChildren().add(menu);
	}
	
	private void removeAllMenusFromMenuPane() {
		ObservableList<Node> kids = this.menuPane.getChildren();
		while (kids.size() > 0)
			kids.remove(0);
	}

}
