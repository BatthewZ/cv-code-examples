package model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.function.Function;

public class TaskDB extends DBManager {
	
	// Task database statement methods.
	
	public static final String col_TASKNAME = "taskName";
	public static final String col_DESCRIPTION = "description";
	public static final String col_DUEDATE = "duedate";
	public static final String col_ARRAYINDEX = "arrayIndex";
	public static final String col_COLID = "colID";
	
	public static boolean updateTask(String columnName, String value, int taskID) {
		String sqlStatement = "update task set " 
							+ columnName + " = '" + encode(value) + "' "
							+ "where taskID = " + taskID;
	
		if(queryDB(sqlStatement, booleanRFunc) != null)
			return true;
		
		return false;
	}
	
	public static boolean updateTask(String columnName, int value, int taskID) {
		
		if (columnName.toLowerCase().equals("taskid")) {
			System.out.println("Cannot update taskID.");
			return false;
		}
		
		String sqlStatement = "update task set " 
							+ columnName + " = " + value + " "
							+ "where taskID = " + taskID;
		
		if(queryDB(sqlStatement, booleanRFunc) != null)
			return true;
		
		return false;
	}
	
	public static boolean updateTask(String columnName, Number value, int taskID) {
		
		if (columnName.toLowerCase().equals("taskid")) {
			System.out.println("Cannot update taskID.");
			return false;
		}
		
		String sqlStatement = "update task set " 
							+ columnName + " = " + value + " "
							+ "where taskID = " + taskID;
		
		if(queryDB(sqlStatement, booleanRFunc) != null)
			return true;
		
		return false;
	}
	
	public static boolean insertTask(String taskName, String description, int arrayIndex, int columnID) {

		String sqlStatement = "INSERT INTO Task (taskID, taskName, description, arrayIndex, colID) values ("
				+ (getNextID("task")+1) + ", '" 
				+ encode(taskName) + "', '"
				+ encode(description) + "', "
				+ arrayIndex + ", "
				+ columnID + ");";
		
		if (queryDB(sqlStatement, booleanRFunc) != null) {
			System.out.println("Task inserted.");
			return true;
		}
		
		return false;
	}
	
	public static boolean deleteTask(int id) {
		System.out.println("deleting task");
		return deleteFromWorkspace("task", id);
	}
	
	public static boolean deleteTasksByColumnID(int id) {
		ArrayList<Integer> taskIDs = TaskDB.getTaskIDsByColumnID(id);
		
		for (Integer i: taskIDs) {
			System.out.println("Deleting Task: " + i);
			TaskDB.deleteTask(i);
		}
		return true;
	}
	
	public static ArrayList<Integer> getTaskIDsByColumnID(int columnID){
		
		String sql = "select taskID from task where colID = " +columnID +";";

		Function<ResultSet, ArrayList<Integer>> getColumnIDs = (rs) -> {
			ArrayList<Integer> IDs = new ArrayList<Integer>();	
			try {
				while (rs.next()) {
					IDs.add(rs.getInt(1));
				}
			} catch (SQLException ex) {
				System.out.println("Couldn't get columnIDs: " + ex.getMessage());
			}
			return IDs;
		};
		
		return queryDB(sql, getColumnIDs); 
		
	}
	
}
