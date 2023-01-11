package controllers;

import javafx.beans.property.BooleanProperty;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.fxml.*;
import javafx.scene.control.TextField;
import javafx.scene.text.Text;
import model.DBManager;
import model.ProjectDB;
import model.UserDB;

import java.sql.ResultSet;
import java.util.function.Function;

import application.App;

public class SignUpController extends LoginAndSignupHelper implements PrimaryView {
	
	// The Signup scene, with input validation. 
	// Upon all user inputs passing checks, will create a new user in the DB and
	// signal to App to load that user and a new project into the workspace.

	@FXML Text fNameTxt;
	@FXML Text lNameTxt;
	@FXML Text uNameTxt;
	@FXML Text pass1Txt;
	@FXML Text pass2Txt;
	@FXML Text cautionText;
	
	@FXML TextField fNameField;
	@FXML TextField lNameField;
	@FXML TextField uNameField;
	@FXML TextField pass1Field;
	@FXML TextField pass2Field;
	
	// A listener is added to this in App.sceneFunc
	private BooleanProperty signupSuccess;
	
	public SignUpController() {
		this.signupSuccess = new SimpleBooleanProperty(false);
	}
	
	@FXML
	protected void btnSignUp() {
		resetSceneColours();
		
		System.out.println("Signup going");
		
		if (validateInputs()) {
			if (initializeNewUser(
  		     uNameField.getText()
			,fNameField.getText()
			,lNameField.getText()
			,pass1Field.getText()
			,0
			,"")) {
				this.signupSuccess.setValue(true);
			} else {
				System.out.println("There was an error creating a new user.");
			}
		}
		
	}
	
	
	private boolean validateInputs() {
		
		// All user input checks. If a check is failed,
		// set the field border and associated text to red,
		// and provide an alert message to the user.
		
		boolean validationSuccess = true;
		String caution = "";
		
		// Username is appropriate length
		
		if (uNameField.getText().length() < 1 || uNameField.getText().length() > 12) {
			caution += "Username must be between 1 and 12 characters long.\n";
			setColor(uNameField, uNameTxt, red);
			validationSuccess = false;
		}
		
		// Username is not already taken;
		
		if(UserDB.checkUserExists(uNameField.getText())) {
			caution += "Username already exists.\n";
			setColor(uNameField, uNameTxt, red);
			validationSuccess = false;
		}
		
		// Password fields are the appropriate length
		
		if (pass1Field.getText().length() < 1 || pass1Field.getText().length() > 12) {
			caution += "Password must be between 1 and 12 characters long.\n";
			setColor(pass1Field, pass1Txt, red);
			validationSuccess = false;
		}
		
		if (pass2Field.getText().length() < 1 || pass2Field.getText().length() > 12) {
			if (!caution.contains("Password must be between"))
				caution += "Password must be between 1 and 12 characters long.\n";
			setColor(pass2Field, pass2Txt, red);
			validationSuccess = false;
		}
		
		// Password fields match
		
		if (!pass1Field.getText().equals(pass2Field.getText())) {
			caution += "Passwords do not match.\n";
			setColor(pass1Field, pass1Txt, red);
			setColor(pass2Field, pass2Txt, red);
			validationSuccess = false;
		}
		
		// Name fields are the appropriate length
		
		if (fNameField.getText().length() < 1 || fNameField.getText().length() > 20) {
			caution += "First name must be between 1 and 20 characters long.\n";
			setColor(fNameField, fNameTxt, red);
			validationSuccess = false;
		}
		
		if (lNameField.getText().length() < 1 || lNameField.getText().length() > 20) {
			caution += "Last name must be between 1 and 20 characters long.\n";
			setColor(lNameField, lNameTxt, red);
			validationSuccess = false;
		}
		
		// Alert user of errors: 
		if (!validationSuccess) {
			this.cautionText.setText(caution);
			setColor(this.cautionText, red);
		}
		
		System.out.println("Successful signup!");
		
		return validationSuccess;
	}
	
	public String getUsername() {
		return uNameField.getText();
	}
	
	public BooleanProperty getSignupSuccess() {
		return this.signupSuccess;
	}
	
	private boolean initializeNewUser(String username, String fname, String lname, String pass, int defaultProject, String imgURL) {
		return UserDB.insertUser(username, fname, lname, pass, defaultProject, imgURL);
	}
	
	private TextField[] allTextFields() {
		TextField[] tfs = {fNameField, lNameField, uNameField, pass1Field, pass2Field};
		return tfs;
	}
	
	@FXML
	protected void btnClearAll() {
		for(TextField tf: allTextFields())
			tf.setText("");
	}
	
	@FXML
	protected void btnCancel() {
		// Go back to login scene.
		App.setLoginScene();
	}
	
	private void resetSceneColours() {
		String color = darkTeal; // This is a hex colour (#xxxxxx)
		setColor(fNameField, fNameTxt, color);
		setColor(lNameField, lNameTxt, color);
		setColor(uNameField, uNameTxt, color);
		setColor(pass1Field, pass1Txt, color);
		setColor(pass2Field, pass2Txt, color);
		cautionText.setText("");
	}

}
