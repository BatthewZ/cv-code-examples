package controllers;

import javafx.beans.property.BooleanProperty;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.fxml.*;

import javafx.scene.control.*;
import javafx.scene.text.Text;
import model.DBManager;
import model.UserDB;
import application.App;

public class LoginController extends LoginAndSignupHelper implements PrimaryView {
	
	// This is the Login Scene controller.

	@FXML private TextField userLogin;
	@FXML private TextField userPass;
	@FXML private Text loginText;
	@FXML private Text passwordText;
	@FXML private Text cautionText;
	
	private final BooleanProperty hasLoggedIn = new SimpleBooleanProperty(false);
	
	private String username;
	
	public LoginController() {
		
	}
	
	@FXML
	protected void login() {
		resetSceneColours();
		
		// Verify and login
		if (UserDB.verifyLogin(userLogin.getText(), userPass.getText())) {
			username = userLogin.getText();
			hasLoggedIn.setValue(true);
		} else {
			// Login failed: Alert user:
			cautionText.setText("Username or Password was incorrect.");
			setColor(cautionText, red);
			setColor(userLogin, loginText, red);
			setColor(userPass, passwordText, red);
		}
	}

	public String getUsername() {
		return this.username;
	}
		
	public BooleanProperty getHasLoggedIn() {
		// Used as an observed flag for a successful login in App.sceneFunc();
		return this.hasLoggedIn;
	}
	
	@FXML
	protected void signUp() {
		App.setSignUpScene();
	}

	private void resetSceneColours() {
		String color = darkTeal; // This is a hex colour (#xxxxxx)
		setColor(userLogin, color);
		setColor(userPass, color);
		setColor(loginText, color);
		setColor(passwordText, color);
		setColor(cautionText, color);
		cautionText.setText("");
	}

	
	
}
