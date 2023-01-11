package overlays;

import java.util.function.Consumer;

import application.App;
import controllers.Coder;
import controllers.TaskController;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;

public class TaskOverlayEdit implements Overlay {
	
	@FXML private VBox overlayPane;
	@FXML private TextField nameField;
	@FXML private TextArea descriptionField;
	@FXML private Text cautionText;
	@FXML private Button closeButton;

	private TaskController tc;
	private Consumer<Integer> deleteTask;
	
	public void initialize(TaskController tc) {
		this.tc = tc;
		nameField.setText(Coder.decode(tc.getName()));
		descriptionField.setText(Coder.decode(tc.getDescription()));
	}
	
	@FXML
	private void setChanges() {
		cautionText.setText("");
		nameField.setStyle("-fx-border-color: #2C8C99;");
		if (nameField.getText().length() > 0) {
			tc.setName(nameField.getText());
			tc.setDescription(descriptionField.getText());
			App.removeOverlay();
		} else {
			this.cautionText.setStyle("-fx-fill: #BF1A2F");
			cautionText.setText("Task name must be more than 1 character long");
			nameField.setStyle("-fx-border-color: #BF1A2F;");
		}
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
