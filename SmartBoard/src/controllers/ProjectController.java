package controllers;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.function.Consumer;
import java.util.function.Function;

import application.App;
import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.event.EventHandler;
import javafx.scene.input.*;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.control.ScrollPane;
import javafx.scene.effect.Glow;
import javafx.scene.layout.HBox;
import model.ColumnDB;
import model.DBManager;
import model.ProjectDB;

public class ProjectController{
	
	// Controller and handler for Projects.
	// Handles column loading and initialization.
	// Handles DragAndDrop from the project level down (project > column > task)

	private StringProperty name;
	private ArrayList<ColumnController> columns;
	private int ID;
	
	// ScrollPane added to Workspace in WorkspaceController.
	@FXML private ScrollPane projectScroller; 
	
	// projectSpace is where the columns go.
	@FXML private HBox projectSpace;
	
	private DragAndDropHelper dnd;
	
	public ProjectController() {
		this.name = new SimpleStringProperty();	
	}
	
	public void setListeners() {
		// Update db whenever name is changed.
		this.name.addListener((o, oldVal, newVal) -> {
			ProjectDB.updateProjectName(newVal, ID);
		});
		
	}
	
	public void loadColumns() {
		// Essentially, refresh columns.
		removeAllColumnsFromWorkspace();
		this.columns = getColumnsFromDB();
		addColumnsToWorkspace();
	}
	
	public ArrayList<ColumnController> getColumnsFromDB(){
		// Create an ArrayList of ColumnControllers from the database.
		
		String sqlStatement = "select * from column where projID = "+ID +";";
		
		Function<ResultSet, ArrayList<ColumnController>> getColumns = (ResultSet rs) -> {
			ArrayList<ColumnController> columns = new ArrayList<ColumnController>();
			try {
				while (rs.next()) {
					FXMLLoader loader = App.makeLoader("Column");
					Parent root = loader.load();
					ColumnController cc = loader.getController();
					
					cc.initialize(delColumnConsumer());
					cc.setID(rs.getInt(1));
					cc.setName(rs.getString(2));
					
					// addDBListener() must be called AFTER cc.setName, otherwise db file 'is locked'.
					cc.addDBListener();
					
					setDragAndDropListeners(cc);
					
					columns.add(cc);
				}
			} catch (SQLException sqlx) {
				System.out.println(sqlx.getMessage());
			} catch (IOException iox) {
				System.out.println(iox.getMessage());
			}
			return columns;
		};
		return DBManager.queryDB(sqlStatement, getColumns);
	}
	
	private void setDragAndDropListeners(ColumnController cc) {
		
		// With not much time to spare, I created this drag and drop, 
		// which doesn't actually set relevant content to the clipboard,
		// nor does it work with serialized/serializable classes.
		// It simply compares the column and task IDs from when the drag is detected
		// when the drag is dropped, and calculates what should change based on that.
		
		cc.getColumnBody().setOnDragDetected(new EventHandler<MouseEvent>() {
			@Override
			public void handle(MouseEvent event) {
				
				// Put *something* to the dragboard to initiate drag/drop.
				Dragboard db = cc.getColumnBody().startDragAndDrop(TransferMode.ANY);
				ClipboardContent content = new ClipboardContent();
				content.putString("");
				db.setContent(content);
				
				System.out.println("Drag started");
				dnd = new DragAndDropHelper();
				
				dnd.setSourceColumn(cc);
				TaskController selectedTask = cc.getTaskByID(cc.getSelectedTaskID());
				
				if (selectedTask != null) {
					dnd.setSourceTask(selectedTask);
					// Yellow: #FFB30F
					selectedTask.getTaskBody().setStyle("-fx-border-color: #FFB30F;");
				}
				event.consume();
			}
		});
		
		cc.getColumnBody().setOnDragOver(new EventHandler<DragEvent>() {
			@Override
			public void handle(DragEvent event) {
					event.acceptTransferModes(TransferMode.ANY);
				
				event.consume();
			}
		});
		
		cc.getColumnBody().setOnDragEntered(new EventHandler<DragEvent>() {
			@Override
			public void handle(DragEvent event) {
				// Bold pink colour: #FF1053
				cc.getColumnBody().setStyle("-fx-border-color: #FF1053;");
				event.consume();
			}
		});
		
		cc.getColumnBody().setOnDragExited(new EventHandler<DragEvent>() {
			@Override
			public void handle(DragEvent event) {
				cc.getColumnBody().setStyle("-fx-border-color: transparent");
				event.consume();
			}
		});
		
		cc.getColumnBody().setOnDragDropped(new EventHandler<DragEvent>() {
			@Override
			public void handle(DragEvent event) {
				System.out.println("Drag dropped");
				
				dnd.setTargetColumn(cc);
				
				if (dnd.getSourceColumn().getID() == dnd.getTargetColumn().getID()) {
					if (dnd.getSourceTask() != null)
						dnd.getSourceTask().getTaskBody().setStyle("-fx-border-color: #2C8C99");
				} else {
					dnd.dragToAnotherColumn();
				}
				
				event.setDropCompleted(true);
				event.consume();
			}
			
		});
	}
	
	public ColumnController getColumnByID(int colID) {
		ColumnController column = null;
		for (ColumnController cc : columns)
			if (cc.getID() == colID)
				column = cc;
			
		return column;
	}

	
	private void removeAllColumnsFromWorkspace() {
		// Never remove the last child; the last child is the 'add column' button. :)
		while (projectSpace.getChildren().size() > 1)
			projectSpace.getChildren().remove(0);
	}
	
	private void deleteColumnByID(int id) {
		ColumnDB.deleteColumn(id);
		loadColumns();
	}
	
	private Consumer<Integer> delColumnConsumer() {
		Consumer<Integer> delColumnByID = (colID) -> {
			deleteColumnByID(colID);
		};
		return delColumnByID;
	}
	
	private void addColumnsToWorkspace() {
		for (ColumnController cc : columns) {
			projectSpace.getChildren().add((projectSpace.getChildren().size()-1), cc.getColumnBody());
			cc.loadTasks();
		}
	}
	
	@FXML
	private void addNewColumn() {
		ColumnDB.insertColumn("Column Title", this.ID);
		loadColumns();
	}
	
	public HBox getProjectSpace() {
		return projectSpace;
	}

	public int getID() {
		return this.ID;
	}
	
	public void setID(int ID) {
		this.ID = ID;
	}

	public String getName() {
		return name.getValue();
	}
	
	public void setName(String name) {
		this.name.setValue(name);
	}
	
	public StringProperty getNameProperty() {
		return this.name;
	}
	
	public ScrollPane getProjectScroller() {
		return this.projectScroller;
	} 
	
}
