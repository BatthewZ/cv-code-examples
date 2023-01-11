package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.function.Function;

import controllers.Coder;

public abstract class DBManager extends Coder {

	// This class provides the db name to connect to,
	// A generic return method called queryDB. 
	
	// QueryDB takes in a function that processes a resultset and
	// returns a generic.  
	
	// It also has methods for automatically getting the next available ID
	// when making projects, columns and tasks. This ID is the primary key
	// for those items in the database.
	
	// This class and it's children xDB classes user the Coder class to
	// ensure that special characters are replaced before writing to the DB,
	// and to ensure that the stored data is returned as readable for the user
	// upon reading from the DB.
	
	private static final String db = "jdbc:sqlite:smartboard.db";
	
	public static final Function<ResultSet, Boolean> booleanRFunc = (rs) -> {return true;};
	
	public static void setUpDB() {
		queryDB(createTable("user"), booleanRFunc);
		queryDB(createTable("project"), booleanRFunc);
		queryDB(createTable("column"), booleanRFunc);
		queryDB(createTable("task"), booleanRFunc);
	}
		
	private static String createTable(String tableName) {
		// All table statements required to set up the database.
		// If something should go wrong with the DB, call DBSubClass.setUpDB() from a JUnit test.
		
		String tableStatement = ";";
		
		String table = tableName.toLowerCase();
		
		switch (table) {
		case "user": 
			tableStatement = "Create table User("
					+ "    Username TEXT PRIMARY KEY,"
					+ "    fname TEXT,"
					+ "    lname TEXT,"
					+ "    password TEXT,"
					+ "    defaultProject INTEGER DEFAULT 0," 
					+ "    imgURL TEXT"
					+ ");";
			break;
		case "project":
			tableStatement = "Create table Project("
					+ "	projectID INTEGER PRIMARY KEY,"
					+ "	projectName TEXT,"
					+ "	user TEXT,"
					+ "	FOREIGN KEY (user) references user(username)"
					+ ");";
			break;
		case "column":
			tableStatement = "Create table Column("
					+ "	columnID INTEGER PRIMARY KEY,"
					+ "	ColumnName TEXT,"
					+ "	projID INTEGER,"
					+ "	FOREIGN KEY (projID) references PersonalProject(projectID)"
					+ ");";
			break;
		case "task":
			tableStatement = "Create table Task("
					+ "	taskID INTEGER PRIMARY KEY,"
					+ "	taskName TEXT,"
					+ "	description TEXT,"
					+ "	arrayIndex INTEGER,"
					+ "	colID INTEGER,"
					+ "	FOREIGN KEY (colID) references Column(columnID)"
					+ ");";
			break;
		default :
			break;
		}
		
		return tableStatement;
	}
	
	public static int getNextID(String tableName) {
		
		// This method is used for generating unique IDs for workspace items.
		
		// Note the whitespace in strings.
		
		String query = 
				"SELECT " + tableName 
				+ "ID FROM " 
				+ tableName 
				+ " ORDER BY " 
				+ tableName + "ID DESC "
				+ "LIMIT 1;";
		
		Function<ResultSet, Integer> getID = (ResultSet rs) -> {
			int id = 0;
			try {
				while (rs.next()) {
					id = rs.getInt(tableName+"ID");
				}
				rs.close();
			} catch (SQLException ex) {
				System.out.println("Something went wrong getting the highest ID: " + ex.getMessage());
			} catch (NullPointerException ne) {
				System.out.println("Something went wrong getting the highest ID: " + ne.getMessage());
			}
			return id;	
		};
		return queryDB(query, getID);
	}
	
	// generic delete and update methods: 
	
	protected static boolean deleteFromWorkspace(String tableName, int ID) {
		
		// where tableName would be 'task', 'column' or 'project'.
		
		String sqlStatement = "DELETE FROM " 
							+ tableName 
							+ " WHERE " 
							+ tableName + "ID = " + ID;
		
		if (queryDB(sqlStatement, booleanRFunc) != null) {
			System.out.println("deleteFromWorkspace fired");
			return true;
		}
		return false;
	}

	protected static boolean updateWorkspaceItem(String tableName, int ID, String columnName, String value) {
		// Used for updating TEXT.
		String sqlStatement = "update " + tableName + " "
							+ "set " + columnName + " = '" + encode(value) + "' "
							+ "where " + tableName + "ID = " + ID;
		
		if(queryDB(sqlStatement, booleanRFunc) != null)
			return true;
		
		return false;
	}
	
	protected static boolean updateWorkspaceItem(String tableName, int ID, String columnName, int value) {
		// Used for updating INTEGER.
		String sqlStatement = "update " + tableName + " "
							+ "set " + columnName + " = " + value + " "
							+ "where " + tableName + "ID = " + ID;
		
		if(queryDB(sqlStatement, booleanRFunc) != null)
			return true;
		
		return false;
	}
	
	public static <T> T queryDB(String query, Function<ResultSet, T> project) {
		
		// This method was created using generics and function parameters so that
		// I could re-use the try/catch and db connection code, even thought
		// I may want to do different things with the resultset. It also means that
		// I can ensure that the results, statement and connection are always closed
		// after use.
		
		Connection c = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {
			c = DriverManager.getConnection(db);
			
			stmt = c.createStatement();
			stmt.execute(query);
			rs = stmt.getResultSet();
			
			return project.apply(rs);
			
		} catch (SQLException ex) {
			System.out.println(ex.getMessage());
			System.exit(0);
		} finally {
			try {
				if (rs != null)
					rs.close();
				
				if (stmt != null)
					stmt.close();
				
				if (c != null)
					c.close();
			} catch (SQLException ex) {
				System.out.println(ex.getMessage());
			}
		}
		return null;
	}
	
		
		
}
