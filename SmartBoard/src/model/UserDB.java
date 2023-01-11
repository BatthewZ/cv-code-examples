package model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.function.Function;


public class UserDB extends DBManager {
	
	// User database statement methods.
	
	public static boolean verifyLogin(String username, String password) {
		
		String query = "SELECT username, password "
							+ "FROM user "
							+ "WHERE Username = '" + encode(username) + "';";
		
		Function<ResultSet, Boolean> validateUser = (ResultSet rs) -> {
			try {
				String resultUser = "";
				String resultPass = "";
				while (rs.next()) {
					resultUser = rs.getString(1);
					resultPass = rs.getString(2);
				}
				if (encode(username).equals(resultUser) 
					&& encode(password).equals(resultPass) 
					&& resultUser.length() > 0) 
				{	
						System.out.println("Login Successful!");
						return true;
				}
				rs.close();
			} catch (SQLException ex) {
				System.out.println(ex.getMessage());
			}
			System.out.println("Login failed.");
			return false;
		};
		
		return queryDB(query, validateUser);
	}
	
	public static User importUserFromDB(String username) {

		Function<ResultSet, User> createUser = (ResultSet rs) -> {
			User user = null;
			try {
				while (rs.next()) {
					user = new User(
							  decode(rs.getString("Username"))
							, decode(rs.getString("password"))
							, decode(rs.getString("fname"))
							, decode(rs.getString("lname"))
							, rs.getInt("defaultProject")
							, decode(rs.getString("imgURL")));
					
					System.out.println("User successfully loaded.");
				}	
			} catch (SQLException ex) {
				System.out.println("Something went wrong in createUser function:" + ex.getMessage());
			}
			return user;};
			
		return queryDB(selectUser(username), createUser);
	}
	
	public static String selectUser(String username) {
		return "Select * from user where Username = '" + encode(username) + "';";
	}
	
	public static boolean checkUserExists(String username) {
		
		Function<ResultSet, Boolean> checkUserExists = (ResultSet rs) -> {
			try {				
				while (rs.next()) 
					if (rs.getString("Username").equals(encode(username))) 
						return true;
			} catch (SQLException ex) {
				System.out.println("Something went wrong in checkUserExists:" + ex.getMessage());
			}
			System.out.println("User does not exist");
			return false;
		};
		
		return queryDB(selectUser(username), checkUserExists);
	}
	
	public static boolean insertUser(String username, String fname, String lname, String pass, int defaultProject, String imgURL) {
		
		
		String insertStatement = 
				"insert into user (Username, fname, lname, password, defaultProject, imgURL) values ("
				+ "'" + encode(username) + "', "
				+ "'" + encode(fname) + "', "
				+ "'" + encode(lname) + "', "
				+ "'" + encode(pass) + "', "
				+ "" + defaultProject + ", "
				+ "'" + encode(imgURL) 
				+ "');";
		
		System.out.println(insertStatement);
		
		if (queryDB(insertStatement, booleanRFunc) != null) {
			System.out.println("User inserted.");
			return true;
		}
		
		return false;
	}
	
	public static boolean updateUser(String username, String columnName, String value) {
		// Update String value value
		if (columnName.toLowerCase().equals("username")) {
			System.out.println("UserDB.updateUser() error: Cannot update username after user has been created.");
			return false;
		}
		
		String sqlStatement = "update user set " 
							+ columnName 
							+ " = '"
							+ encode(value)
							+ "' where username = '"
							+ encode(username)
							+ "';"; 
		
		return queryDB(sqlStatement, booleanRFunc);
	}
	
	public static boolean updateUser(String username, String columnName, int value) {
		// Update int value
		if (columnName.toLowerCase().equals("username")) {
			System.out.println("UserDB.updateUser() error: Cannot update username after user has been created.");
			return false;
		}
		
		String sqlStatement = "update user set " 
							+ columnName 
							+ " = "
							+ value
							+ " where username = '"
							+ encode(username)
							+ "';"; 
		
		if (columnName.toLowerCase().equals("defaultproject")) {
			return queryDB(sqlStatement, booleanRFunc);
		}

		return false;
	}
	
	public static boolean deleteUser(String username) {
		
		// This method is unused by the program, but is here for your interest.
		
		if (!checkUserExists(username))
			return false;
		
		if (!ProjectDB.deleteAllProjectsByUsername(username))
			return false;
		
		String sqlStatement = 
				"DELETE FROM user " 
				+ "WHERE " 
				+ "Username = '" + encode(username) + "';";
		
		if (queryDB((sqlStatement), booleanRFunc) != null) {
			System.out.println("User was deleted.");
			return true;
		}

		System.out.println("Could not delete " + username);
		return false;	
	}
}
