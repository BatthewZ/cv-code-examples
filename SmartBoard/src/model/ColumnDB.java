package model;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.function.Function;
import java.sql.SQLException;

public class ColumnDB extends DBManager {
	
	// 	Column database statement methods.
	
	public static boolean updateColumnName(String value, int columnID){
		String sqlStatement = "update column set columnName = '" + encode(value) + "' where columnID = "+columnID;
		
		if(queryDB(sqlStatement, booleanRFunc) != null)
			return true;
		
		return false;
	}
	
	public static boolean insertColumn(String columnName, int projectID) {
		
		String sqlStatement = "INSERT INTO column (columnID, columnName, projID) values ("
				+ (getNextID("column")+1) + ", '" 
				+ columnName + "', " 
				+ projectID + ");";
		
		if (queryDB(sqlStatement, booleanRFunc) != null) {
			System.out.println("Column inserted.");
			return true;
		}

		return false;
	}

	public static boolean deleteColumnsByProjectID(int projectID) {
		
		String sqlStatement = "select * from column where projID = " + projectID +";";
		Function<ResultSet, Boolean> deleteTasks = (ResultSet rs) -> {
			try {
				while (rs.next()) {
					TaskDB.deleteTasksByColumnID(rs.getInt(1));
				 }
				System.out.println("Finished deleting tasks.");
				return true;
			}catch (SQLException ex) {
				System.out.println("Could not delete tasks from ColumnDB.deleteColumnsByProjectID(): " + ex.getMessage());
			}
			
			return false;
		};
		
		
		if (queryDB(sqlStatement, deleteTasks) != null) {
			sqlStatement = "delete from task where projID = " + projectID + ";";
			if (queryDB(sqlStatement, booleanRFunc) != null)
				return true;
		}
		return false;
	}

	public static boolean deleteColumn(int columnID) {
		if (!checkColumnExists(columnID))
			return false;
		
		System.out.println("Deleting tasks:");
		TaskDB.deleteTasksByColumnID(columnID);
		
		System.out.println("Deleting Column: " + columnID);
		return deleteFromWorkspace("column", columnID);

	}


	public static ArrayList<Integer> getColumnIDsByProjectID(int projectID){
		
		String sql = "select columnID from column where projID = " +projectID +";";

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
	
	public static boolean checkColumnExists(int columnID) {
		String sqlStatement = "select * from column where columnID = " + columnID + ";";
		
		Function<ResultSet, Boolean> checkProjectExists = (ResultSet rs)-> {
			try {
				while (rs.next())
					if (rs.getInt(1) == columnID)
						return true;
			} catch (SQLException ex) {
				System.out.println("Something went wrong in checkColumnExists: " + ex.getMessage());
			}
			System.out.println("Column does not exist, ID: " + columnID);
			return false;
		};		
		return queryDB(sqlStatement, checkProjectExists);
	}
	
}
