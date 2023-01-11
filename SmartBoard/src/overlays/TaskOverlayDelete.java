package overlays;

import java.util.function.Consumer;

import application.App;
import javafx.fxml.FXML;
import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.layout.VBox;

public class TaskOverlayDelete implements Overlay {

	@FXML private VBox overlayPane;
	@FXML private Button closeButton;
	
	private int id;
	private Consumer<Integer> delTask;
	
	public void initialize(int taskID, Consumer<Integer> deleteTask) {
		this.id = taskID;
		this.delTask = deleteTask;
	}
	
	@FXML
	private void deleteTask() {
		this.delTask.accept(this.id);
		App.removeOverlay();
	}
	
	@Override
	public Node getOverlayPane() {
		return this.overlayPane;
	}

	@Override
	public Button getCloseButton() {
		return this.closeButton;
	}

	
	
}
