package overlays;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.MalformedURLException;

import application.App;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.paint.ImagePattern;
import javafx.scene.shape.Circle;
import javafx.scene.text.Text;
import javafx.stage.FileChooser;
import javafx.stage.FileChooser.ExtensionFilter;
import javafx.stage.Stage;

public class UserOverlay implements Overlay{
	
	@FXML Text usernameText;
	@FXML VBox overlayPane;
	@FXML Circle imgCircle;
	@FXML Button closeButton;
	@FXML TextField fNameField;
	@FXML TextField lNameField;
	@FXML PasswordField passField;
	@FXML Text cautionText;
	
	public void initialize() {
		usernameText.setText(App.getUser().getuName());
		fNameField.setText(App.getUser().getfName());
		lNameField.setText(App.getUser().getlName());
		passField.setText(App.getUser().getPassword());
		
		setUserImageToCircle();
		
		// update view when profile image url is changed.
		App.getUser().getProfileImageURLProperty().addListener((o, oldval, newval) -> {
			setUserImageToCircle();
		});
	}
	
	public void setUserImageToCircle() {
		// Update view in ProfilePicture overlay circle.
		this.imgCircle.setFill(Color.web("#2C8C99"));
		String imgURL = App.getUser().getProfileImgUrl();
		try{
			if (isValidImgType(imgURL)) {
				Image im = new Image(imgURL, false);
				this.imgCircle.setFill(new ImagePattern(im));
			}
		} catch (IllegalArgumentException iae) {
			System.out.println("Something went wrong loading the image: " + iae.getMessage());
			this.imgCircle.setFill(Color.web("#2C8C99"));
		}
	}
	
	public void chooseImage() {
		// Select Profile Picture fileChooser.
		FileChooser fc = new FileChooser();
		fc.setTitle("Select Profile Image");
		fc.getExtensionFilters().add(new ExtensionFilter("Image files", "*.png", "*.bmp", "*.jpg", "*.gif"));
		Stage fcStage = new Stage();
		File selectedFile = fc.showOpenDialog(fcStage);
		if (selectedFile != null) {
			App.getUser().setProfileImgUrl(selectedFile.getAbsolutePath());
		} 
	}
	
	private boolean isValidImgType(String url) {
		// Example: If the entire filename is ".jpg", then it is invalid.
		if (url.length() <= 4)
			return false;
		
		// Get the last 3 characters and check it for valid file types.
		String fileType = url.substring(url.length()-3).toLowerCase();
		
		if (fileType.equals("png") || fileType.equals("jpg") || fileType.equals("bmp") || fileType.equals("gif"))
			return true;
			
		return false;		
	}
	
	@FXML
	private void setChanges() {
		
		// Attempt to update the DB and view based on changes between the User information and 
		// the UserOverlay textfields.
		
		resetSceneStyle();
		String cautionColour = "-fx-border-color: #BF1A2F;";
		
		boolean validationSuccess = true;
		
		String caution = "";
		
		if (fNameField.getText().length() < 1 || fNameField.getText().length() > 20) {
			caution = "Names must be between 1-20 characters.\n";
			fNameField.setStyle(cautionColour);
			validationSuccess = false;
		}
		
		if (lNameField.getText().length() < 1 || lNameField.getText().length() > 20) {
			caution = "Names must be between 1-20 characters.\n";
			lNameField.setStyle(cautionColour);
			validationSuccess = false;
		}
		
		if (passField.getText().length() < 1 || passField.getText().length() > 12) {
			caution += "Password must be between 1-12 characters.";
			passField.setStyle(cautionColour);
			validationSuccess = false;
		}
		
		if (validationSuccess) {
			
			// If there is a difference between User information and
			// the information in the text fields, then update user information.
			boolean changesSet = false;
			
			if (!fNameField.getText().equals(App.getUser().getfName())) {
				App.getUser().setfName(fNameField.getText());
				changesSet = true;
			}
			
			if (!lNameField.getText().equals(App.getUser().getlName())) {
				App.getUser().setlName(lNameField.getText());
				changesSet = true;
			}
			
			if (!passField.getText().equals(App.getUser().getPassword())) {
				App.getUser().setPassword(passField.getText());
				changesSet = true;
			}
			
			if (changesSet) {
				this.cautionText.setStyle("-fx-fill: white");
				this.cautionText.setText("Changes have been set. :)");
			}
			
		} else {
			this.cautionText.setStyle("-fx-fill: #BF1A2F");
			this.cautionText.setText(caution);
		}
		
	}
	
	private void resetSceneStyle() {
		cautionText.setText("");
		String defaultColour = "-fx-border-color: #2C8C99;";
		fNameField.setStyle(defaultColour);
		lNameField.setStyle(defaultColour);
		passField.setStyle(defaultColour);		
		cautionText.setStyle("-fx-fill: white;");
	}
	
	@FXML
	private void logout() {
		App.removeOverlay();
		App.logout();
	}
	
	@Override
	public VBox getOverlayPane() {
		return this.overlayPane;
	}

	@Override
	public Button getCloseButton() {
		return this.closeButton;
	}

}
