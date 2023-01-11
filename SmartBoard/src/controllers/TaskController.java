package controllers;

import java.io.IOException;
import java.util.function.Consumer;

import application.App;
import javafx.beans.property.BooleanProperty;
import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.fxml.*;
import javafx.scene.Parent;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import model.TaskDB;
import overlays.TaskOverlayDelete;
import overlays.TaskOverlayEdit;

public class TaskController {
	
	// Handles tasks. Obviously. :p

	@FXML private Text nameText;
	@FXML private Text descriptionText;
	@FXML private VBox taskBody;
	@FXML private Text upArrow;
	@FXML private Text downArrow;
	
	private StringProperty name;
	private StringProperty description;
	private IntegerProperty columnID;
	
	private int ID;
	private IntegerProperty arrayIndex;
	private Consumer<Integer> deleteTask;
	private Consumer<Integer> moveDownInView;
	private Consumer<Integer> moveUpInView;
	private BooleanProperty isSelected;
	
	public TaskController() {
		name = new SimpleStringProperty();
		description = new SimpleStringProperty();
		arrayIndex = new SimpleIntegerProperty();
		columnID = new SimpleIntegerProperty();
		isSelected = new SimpleBooleanProperty();
	}
	
	public void initialize(String name
			   , String description
			   , int taskID
			   , int arrayIndex
			   , int colID
			   , Consumer<Integer> deleteTask
			   , Consumer<Integer> arrowDown
			   , Consumer<Integer> arrowUp) {
		// Set info
		this.ID = taskID;
		this.name.setValue(name);
		this.description.setValue(description);
		this.arrayIndex.setValue(arrayIndex);
		this.columnID.setValue(colID);
		this.deleteTask = deleteTask;
		this.moveDownInView = arrowDown;
		this.moveUpInView = arrowUp;
		
		// Set view
		setNameText(name);
		setDescriptionText(description);
		
		// Set listeners to update the DB any time class fields are changed.
		this.name.addListener((o, oldval, newval) -> {
		TaskDB.updateTask(TaskDB.col_TASKNAME, newval, this.ID);
		nameText.setText(Coder.decode(newval));
		});
		
		this.description.addListener((o, oldval, newval) -> {
		TaskDB.updateTask(TaskDB.col_DESCRIPTION, newval, this.ID);
		descriptionText.setText(Coder.decode(newval));
		});
		
		this.arrayIndex.addListener((o, oldval, newval) -> {
		TaskDB.updateTask(TaskDB.col_ARRAYINDEX, newval, this.ID);
		});
		
		this.columnID.addListener((o, oldval, newval) -> {
		TaskDB.updateTask(TaskDB.col_COLID, newval, this.ID);
		});
	}
	
	@FXML
	private void setTaskOverlayEdit() {
		// Edit Task menu
		try {
			FXMLLoader loader = App.makeLoader("TaskOverlayEdit");
			Parent root = loader.load();
			TaskOverlayEdit controller = loader.getController();
			
			controller.initialize(this);
			
			controller.getCloseButton().setOnAction(event -> {
				App.removeOverlay();
			});
			
			App.setOverlay(controller);

			System.out.println("Loaded");
		} catch (IOException e){
			e.printStackTrace();
		}
	}
	
	@FXML
	private void setTaskOverlayDelete() {
		// Delete Task caution
		try {
			FXMLLoader loader = App.makeLoader("TaskOverlayDelete");
			Parent root = loader.load();
			TaskOverlayDelete controller = loader.getController();
			
			controller.initialize(this.ID, this.deleteTask);
			
			controller.getCloseButton().setOnAction(event -> {
				App.removeOverlay();
			});
			
			App.setOverlay(controller);

			System.out.println("Loaded");
		} catch (IOException e){
			e.printStackTrace();
		}
		
	}

	
	@FXML
	private void moveUpInView() {
		moveUpInView.accept(arrayIndex.getValue());
	}
	
	@FXML
	private void moveDownInView() {
		moveDownInView.accept(arrayIndex.getValue());
	}
	
	public void disableDownArrow() {
		// If a task is at the bottom of a column view,
		// prevent the user from trying to move it down
		// by disabling the button and removing it from
		// sight.
		downArrow.setOpacity(0);
		downArrow.setDisable(true);
	}
	
	public void enableDownArrow() {
		// If the task is re-arranged, enable buttons as is suitable.
		downArrow.setOpacity(1);
		downArrow.setDisable(false);
	}
	
	public void disableUpArrow() {
		// If a task is at the top of a column view,
		// prevent the user from trying to move it up
		// by disabling the button and removing it from
		// sight.
		upArrow.setOpacity(0);
		upArrow.setDisable(true);
	}
	
	public void enableUpArrow() {
		// If the task is re-arranged, enable buttons as is suitable.
		upArrow.setOpacity(1);
		upArrow.setDisable(false);
	}
	
	public Text getUpArrow() {
		return this.upArrow;
	}
	
	public Text getDownArrow() {
		return this.downArrow;
	}
	
	public Integer getArrayIndex() {
		return arrayIndex.getValue();
	}
	
	public void setArrayIndex(int index) {
		arrayIndex.setValue(index);
	}
	
	public BooleanProperty getIsSelectedProperty() {
		// used for Drag and Drop (see ProjectController.dragAndDropListeners())
		return isSelected;
	}
	
	@FXML
	private void isNowSelected() {
		// used for Drag and Drop (see ProjectController.dragAndDropListeners())
		isSelected.setValue(true);
	}
	
	@FXML
	private void isNoLongerSelected() {
		// used for Drag and Drop (see ProjectController.dragAndDropListeners())
		isSelected.setValue(false);
	}
	
	public int getID() {
		return this.ID;
	}
	
	public String getName() {
		return this.name.getValue();
	}
	
	public String getDescription() {
		return this.description.getValue();
	}

	public void setName(String name) {
		this.name.setValue(Coder.encode(name));
	}
	
	public void setDescription(String description) {
		this.description.setValue(Coder.encode(description));
	}
	
	private void setNameText(String name) {
		this.nameText.setText(Coder.decode(name));
	}
	
	private void setDescriptionText(String description) {
		this.descriptionText.setText(Coder.decode(description));
	}
	
	public VBox getTaskBody() {
		return this.taskBody;
	}
	
	public void setColumnID(int id) {
		this.columnID.setValue(id);
	}
	
}
