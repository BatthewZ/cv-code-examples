package application;
	
import java.io.IOException;
import java.net.URL;
import java.util.function.Function;

import controllers.PrimaryView;
import controllers.LoginController;
import controllers.SignUpController;
import controllers.WorkspaceController;
import javafx.application.Application;
import javafx.stage.Stage;
import model.User;
import model.UserDB;
import overlays.Overlay;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.layout.StackPane;

public class App extends Application {
	
	// Built by Ben Matthews, s3851558 for Further Programming in sp3 2021.
	
	// This class sets up primary scenes (Login/Signup/Workspace) scenes,
	// and acts as a central hub that provides user information and overlay
	// functionality for the controller and overlay (modal) classes.
	
	private static Stage ps;
	private static User user;
	
	// Overlay (modal) fields:
	private static StackPane workspacePane; 
	private static boolean overlayActive = false;
	
	public static void main(String[] args) {
		launch(args);
	}
		
	@Override
	public void start(Stage primaryStage) {
			user = null;
			
			try {
				ps = primaryStage;
				
				setLoginScene();
				
				// For testing purposes beyond login/signup:
//				loginSuccess("User");
				
				primaryStage.show();
				
			} catch(Exception e) {
				e.printStackTrace();
			}
	}

	private static Function<PrimaryView, Boolean> sceneFunc(String sceneName){
		
		// This method was set up to be used with createAndInitializeScene.
		// The two methods together allow me to set a new scene to the stage
		// and also set up initial fields in the selected controller classes.
		
		Function<PrimaryView, Boolean> sceneFunc = null;
		
		switch (sceneName.toLowerCase()) {
			case "loginscene": sceneFunc = (controller) -> {
					Boolean setScene = true;
					LoginController lc = (LoginController) controller;
					lc.getHasLoggedIn().addListener((o, oldval, newval) -> {
						if (newval)
							loginSuccess(lc.getUsername());
					});	
					
					return setScene;
				};
				break;
			case "workspacescene": sceneFunc = (controller) -> {
					WorkspaceController ws = (WorkspaceController) controller;
					ws.loadWorkspace();
					ws.setListeners();
					workspacePane = ws.getBasePane();
					return true;
				};
				break;
			case "signupscene": sceneFunc = (controller) -> {
				SignUpController sc = (SignUpController) controller;
				sc.getSignupSuccess().addListener((o, oldval, newval) -> {
					if (newval)
						loginSuccess(sc.getUsername());
				});
				return true;
			};
				break;
			default: sceneFunc = (controller) -> {return false;};
		}
		return sceneFunc;
	}
	
	private static void createAndInitializeScene(String sceneName) {
		// Loads and initializes a scene from an FXML file and sets it to the window.
		
		Function<PrimaryView, Boolean> sceneCons = sceneFunc(sceneName);
		try {
			FXMLLoader loader = makeLoader(sceneName);
			Parent root = loader.load();
			PrimaryView controller = loader.getController();
			Scene scene = new Scene(root);
			
			if (sceneCons.apply(controller));
				ps.setScene(scene);
				
		} catch (IOException e) {
			System.out.println("Error in Main.createAndInitializeScene(): " + e.getMessage());
		}
		
	}
	
	public static void logout() {
		// Reset all.
		user = null;
		workspacePane = null;
		setLoginScene();
	}
	
	private static void loginSuccess(String username) {
		user = UserDB.importUserFromDB(username);
		setScene("WorkspaceScene", "WorkSpace");
	}
	
	public static void setSignUpScene() {
		setScene("SignUpScene", "Sign Up");
	}
	
	public static void setLoginScene() {
		setScene("LoginScene", "Login");
	}
	
	private static void setScene(String sceneName, String title) {
		createAndInitializeScene(sceneName);
		ps.setTitle(title);
	}
	
	public static void setOverlay(Overlay overlay) {
		// Create modals to disable user access to GUI controls,
		// superimpose an interactive menu on top for the user.
		
		if (workspacePane == null) {
			System.out.println("Cannot create overlay as App.workspacePane is null");
			return;
		}
		
		overlayActive = true;
		
		// Create a translucent bg pane that spans the width of the window:
		StackPane backgroundPane = new StackPane();
		backgroundPane.setAlignment(Pos.CENTER);
		backgroundPane.setMaxHeight(Double.MAX_VALUE);
		backgroundPane.setMaxWidth(Double.MAX_VALUE);
		backgroundPane.setStyle("-fx-background-color: rgba(0,0,0,.2);");
		
		// Ensure close button closes the overlay
		overlay.getCloseButton().setOnAction(event -> {
			removeOverlay();
		});
		
		// Add overlay to background pane, and background pane to the workspace.
		backgroundPane.getChildren().add(overlay.getOverlayPane());
		workspacePane.getChildren().add(backgroundPane);
	}
	
	public static void removeOverlay() {
		// Remove the overlay
		if(overlayActive) {
			workspacePane.getChildren().remove(workspacePane.getChildren().size()-1);
			overlayActive = false;
		}
	}
	
	public static FXMLLoader makeLoader (String fxmlName) throws NullPointerException {
		// This is used as a central loader class ensuring that the FXML files can always be found.
		FXMLLoader loader = null;
		try {
			loader = new FXMLLoader(new URL ("file:/"+System.getProperty("user.dir")+"/FXMLS/"+fxmlName + ".fxml"));
		} catch (IOException ioe) { 
			ioe.printStackTrace();
		} 
		return loader;
	}
	
	public static User getUser() {
		return user;
	}
	
}
