package model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.function.Function;


public class ProjectDB extends DBManager {
	
	// Project database statement methods.
	
	public static boolean updateProjectName(String projectName, int ID) {
		
		if (!checkProjectExists(ID))
			return false;
		
		String sqlStatement = "update project "
				+ "set projectName = '" + encode(projectName) + "' "
				+ "where projectID = " + ID;

		if(queryDB(sqlStatement, booleanRFunc) != null)
			return true;
		
		
		return false;
	}
	
	public static boolean insertProject(String projectName, String username) {
		
		if (!UserDB.checkUserExists(username)) {
			System.out.println("Could not insert project as user does not exist: " + username);
			return false;
		}
				
		String sqlStatement = "INSERT INTO project (projectID, projectName, user) values ("
				+ (getNextID("project")+1) + ", '" 
				+ encode(projectName) + "', '" 
				+ encode(username) + "');";
		
		if (queryDB(sqlStatement, booleanRFunc) != null) {
			System.out.println("Project inserted.");
			return true;
		}
		return false;
	}
	
	public static boolean deleteProject(int projectID) {
		if (!checkProjectExists(projectID)) 
			return false;
		
		if (!deleteProjectColumns(projectID))
			return false;
		
		return deleteFromWorkspace("project", projectID);
	}
	
	public static boolean deleteProjectColumns(int projectID) {
		ArrayList<Integer> columnIDs = ColumnDB.getColumnIDsByProjectID(projectID);
		
		for (Integer i : columnIDs) {
			ColumnDB.deleteColumn(i);
		}
		
		return true;
	}
	
	public static boolean checkProjectExists(int projectID) {
		
		String sqlStatement = "select * from project where projectId = " + projectID + ";";
		
		Function<ResultSet, Boolean> checkProjectExists = (ResultSet rs)-> {
			try {
				while (rs.next())
					if (rs.getInt(1) == projectID)
						return true;
			} catch (SQLException ex) {
				System.out.println("Something went wrong in checkProjectExists: " + ex.getMessage());
			}
			System.out.println("Project does not exist, ID: " + projectID);
			return false;
		};		
		return queryDB(sqlStatement, checkProjectExists);
	}
	
	public static boolean deleteAllProjectsByUsername(String username) {
		// Used when deleting a user.
		
		if (!UserDB.checkUserExists(username))
			return false;
		
		
		String sqlStatement = "Select * from project where username = '" + encode(username) + ";";
		
		Function<ResultSet, Boolean> deleteAllColumns = (ResultSet rs) -> {
			try {
				while (rs.next()) {
					ColumnDB.deleteColumnsByProjectID(rs.getInt(1));
				 }
				System.out.println("Finished deleting columns.");
				return true;
			}catch (SQLException ex) {
				System.out.println("Could not delete columns from ProjectDB.deleteAllProjects(): " + ex.getMessage());
			}
			return false;
		};
		
		if (queryDB(sqlStatement, deleteAllColumns) != null) {
			
		// Delete all projects for user.
		sqlStatement = "delete from project where user = '" + encode(username) + "';";
		if (queryDB(sqlStatement, booleanRFunc) != null)
			System.out.println("Finished deleting projects");
			return true;
		}
		
		return false;
	}
	
	public static ArrayList<Integer> getProjectIDsByUsername(String username){
		
		String sql = "select user from project where user = " + encode(username) +";";

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
