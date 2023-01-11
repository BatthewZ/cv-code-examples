package controllers;

public class DragAndDropHelper {
	
	// This class keeps track of state during the drag and drop procedure.
	
	// Some methods and fields (targetTask) were intended to include additional
	// drag and drop functionality that has not been completed. In particular,
	// dragging tasks up and down on the same column to swap it's place with
	// other tasks.

	private ColumnController sourceCol = null;
	private ColumnController targetCol = null;
	private TaskController sourceTask = null;
	private TaskController targetTask = null;

	public TaskController getTargetTask() {
		return targetTask;
	}

	public void setTargetTask(TaskController targetTask) {
		this.targetTask = targetTask;
	}	
	
	public void setSourceTask(TaskController tc) {
		sourceTask = tc;
	}
	
	public TaskController getSourceTask() {
		return sourceTask;
	}
	
	public void setSourceColumn(ColumnController source) {
		sourceCol = source;
	}
	
	public void setTargetColumn(ColumnController target) {
		targetCol = target;
	}
	
	public ColumnController getSourceColumn() {
		return sourceCol;
	}
	
	public ColumnController getTargetColumn() {
		return targetCol;
	}
	
	public void dragToTheSameColumn() {
		// Unfinished method left to remind us of the potential that this project never quite full fulfilled :'(
		
		// Swap tasks within the column.
		
		// from sourceColumn, swapTasksByID(sourceTaskID, targetTaskID)
		
	}
	
	public void dragToAnotherColumn() {
		
		// Once sourceCol, targetCol and sourceTask are set, make
		// the swap at the back end and reload the front end to
		// move a task from one column to the other.
		
		// Move task to another column
	
		if (targetCol == null) {
			System.out.println("Error in drag/drop: target columncontroller was null.");
			return;
		}
		
		if (sourceTask == null) {
			System.out.println("Error in drag/drop: task was null");
			return;
		}
		
		// Update new task
		sourceTask.setColumnID(targetCol.getID());	
		
		// add task to target column
		targetCol.addTaskToList(sourceTask);
		
		// remove task from source column
		sourceCol.removeTaskByID(sourceTask.getID());
		
		// refresh view on each column
		sourceCol.loadTasks();
		targetCol.loadTasks();
		
		// reset selectedTaskID to prevent weird drag/drop selection issues.
		sourceCol.resetSelectedTaskID();
		
		System.out.println("Transfer complete.");

	}
	
}
