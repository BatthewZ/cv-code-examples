package controllers;

import javafx.scene.Parent;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import model.ColumnDB;
import model.DBManager;
import model.TaskDB;
import overlays.ColumnOverlay;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.function.Consumer;
import java.util.function.Function;

import application.App;
import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.fxml.*;

public class ColumnController {
	
	// Column controller.  As columns also house tasks,
	// a lot of task-related things are handled at the column level.

	@FXML private Text columnName;
	@FXML private Text addTask;
	@FXML private VBox columnBody;

	private Consumer<Integer> delColumnConsumer;
	private StringProperty name;
	private int ID;	
	
	private static IntegerProperty selectedTaskID;
	private ArrayList<TaskController> tasks = new ArrayList<TaskController>();
		
	public ColumnController() {
		name = new SimpleStringProperty();
		selectedTaskID = new SimpleIntegerProperty();
	}
	
	public int getSelectedTaskID() {
		return selectedTaskID.getValue();
	}
	
	public TaskController getTaskByID(int id) {
		// This is used primarly for drag and drop (see ProjectController).
		TaskController tc = null;
		for (TaskController t : tasks)
			if (t.getID() == id)
				tc = t;
		
		return tc;
	} 
	
	public int getTasksSize() {
		return tasks.size();
	}
	
	private void swapTasksByArrayIndex(int task1Index, int task2Index) {
		// This is used by 
		Collections.swap(tasks, task1Index, task2Index);
		refreshTaskIndexes();
		loadTasks();
	}
	
	public void removeTaskByID(int id) {		
		for (int i = 0; i < tasks.size(); i ++) 
			if (tasks.get(i).getID() == id)
				tasks.remove(i);

		refreshTaskIndexes();
	}
	
	public void resetSelectedTaskID() {
		// Used for ending dragAndDrop();
		selectedTaskID.setValue(-1);
	}

	public void addTaskToList(TaskController tc) {
		// Used by DragAndDropHelper
		tasks.add(tc);
		refreshTaskIndexes();
	}
	
	private void refreshTaskIndexes() {
		// Essentially, update all task arrayIndexes in the Task database.
		for (int i = 0; i < tasks.size(); i++)
			tasks.get(i).setArrayIndex(i);
	}
	
	private ArrayList<TaskController> sortedTasks(ArrayList<TaskController> taskArr) {
		
		// Sorts the tasks by the arrayIndex number as it was stored in the database,
		// allowing the user's task-layout on screen to persist between logins.
		
		Comparator<TaskController> compareByStoredArrayIndex = (TaskController t1, TaskController t2) -> {
			return t1.getArrayIndex().compareTo(t2.getArrayIndex());
		};
		Collections.sort(taskArr, compareByStoredArrayIndex);
		return taskArr;
	}
	
	public void setID(int ID) {
		this.ID = ID; 
	}
	
	public int getID() {
		return this.ID;
	}
	
	public StringProperty getNameProperty() {
		return this.name;
	}
	
	public StringProperty getNameViewProperty() {
		return this.columnName.textProperty();
	}
	
	public String getName() {
		return this.name.getValue();
	}
	
	public void setName(String name) {
		this.name.setValue(Coder.decode(name));
	}
	
	public void initialize(Consumer<Integer> deleteColumn) {
		// add view listener - This happens before importing the initial column name from DB happens.
		this.name.addListener((o, oldval, newval) -> {
			this.columnName.setText(newval);
		});
		
		// The deleteConsumer comes from the WorkspaceController layer, and drops to the
		// Delete Column overlay menu.
		this.delColumnConsumer = deleteColumn;
	}
	
	public void loadTasks() {
		// Essentially refreshes the tasks shown on a column
		// by clearing the space, loading/sorting the tasks
		// and adding them to the space.
		removeAllTasksFromWorkspace();
		this.tasks = loadTasksFromDB();
		addTasksToWorkspace();
	}
	
	private void addTasksToWorkspace() {
		// Add all tasks from the list to the view.
		for (int i = 0; i < tasks.size(); i++) {
			columnBody.getChildren().add(tasks.get(i).getTaskBody());
			
			// If tasks are at the top or bottom of the view,
			// prevent user from trying to move the tasks up/down respectively.
			if (i == 0) { tasks.get(i).disableUpArrow(); }
			if (i == (tasks.size()-1)) { tasks.get(i).disableDownArrow(); }
		}
	}
	
	private void removeAllTasksFromWorkspace() {
		while (columnBody.getChildren().size() > 1)
			columnBody.getChildren().remove(1);
	}

	
	private Consumer<Integer> taskDownArrow(){
		// This is the handler for the task's down arrow.
		
		Consumer<Integer> moveUp = (taskIndex) -> {
			if (taskIndex < (this.tasks.size()-1)) {
				swapTasksByArrayIndex(taskIndex, (taskIndex+1));
			} else
				System.out.println("Could not moveDown");
		};
		
		return moveUp;
	}
	
	private Consumer<Integer> taskUpArrow(){
		// This is the handler for the task's up arrow.
		
		Consumer<Integer> moveDown = (taskIndex) -> {
			if (taskIndex > 0) {
				swapTasksByArrayIndex(taskIndex, (taskIndex-1));
			} else
				System.out.println("Could not moveUp");
		};
		
		return moveDown;
	}
	

	private Consumer<Integer> getDeleteTaskConsumer(){
		// This is the handler for the task's delete button
		Consumer<Integer> delTask = (taskID) -> {
			TaskDB.deleteTask(taskID);
			removeTaskByID(taskID);
			refreshTaskIndexes();
			loadTasks();
		};
		
		return delTask;
	}
	
	private ArrayList<TaskController> loadTasksFromDB() {
		
		// Load tasks from DB, and sort them by their stored arrayIndexes.
		
		String sqlStatement = "select * from task where colID = "+ID +";";
		
		Function<ResultSet, ArrayList<TaskController>> getColumns = (ResultSet rs) -> {
			ArrayList<TaskController> tasks = new ArrayList<TaskController>();
			try {
				while (rs.next()) {
					FXMLLoader loader = App.makeLoader("Task");
					Parent root = loader.load();
					TaskController tc = loader.getController();
					
					int taskID = rs.getInt(1);
					String name = rs.getString(2);
					String description = rs.getString(3);
					int arrayIndex = rs.getInt(4);
					int colID = rs.getInt(5);
					
					tc.initialize(name
								, description
								, taskID
								, arrayIndex
								, colID
								, getDeleteTaskConsumer()
								, taskDownArrow()
								, taskUpArrow());

					tc.getIsSelectedProperty().addListener((o, oldval, newval) -> {
						if (newval == true) {
							selectedTaskID.setValue(tc.getID());
						}
					});
					tasks.add(tc);
				}
			} catch (SQLException sqlx) {
				System.out.println(sqlx.getMessage());
			} catch (IOException iox) {
				System.out.println(iox.getMessage());
			}
			return sortedTasks(tasks);
		};
		return DBManager.queryDB(sqlStatement, getColumns);
	}
	
	@FXML
	private void createNewTask(){
		TaskDB.insertTask("Task", "Description", this.tasks.size(), this.ID);
		loadTasks();
	}
	
	public void addDBListener() {
		// Update DB whenever name is set. This happens after importing the initial coulmn name from DB happens.
		// This happens afterward so that the db is not locked.
		this.name.addListener((o, oldval, newval) -> {
			ColumnDB.updateColumnName(newval, ID);
		});
	}
	
	public void printID() {
		System.out.println(this.ID);
	}
		
	public VBox getColumnBody() {
		return this.columnBody;
	}
	
	public void removeAllTasksFromView() {
		columnBody.getChildren().removeAll();
	}
	
	@FXML
	private void editColumnOverlay() {
		openColumnOverlay("edit");
	}

	@FXML
	private void deleteColumnOverlay() {
		openColumnOverlay("delete");
	}
	
	private void openColumnOverlay(String editOrDelete) {
		// Opens the column menus. 
		try {
			FXMLLoader loader = App.makeLoader("ColumnOverlay");
			Parent root = loader.load();
			ColumnOverlay controller = loader.getController();
			
			if (editOrDelete.toLowerCase().equals("delete")) {
				controller.setDeleteColumnMenu(this.ID, delColumnConsumer);
			} else
				controller.setEditNameMenu(this);

			controller.getCloseButton().setOnAction(event -> {
				App.removeOverlay();
			});
			
			App.setOverlay(controller);

			System.out.println("Loaded");
		} catch (IOException e){
			e.printStackTrace();
		}
		
		
	} 
	
}
