package testing;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.*;

import org.junit.jupiter.api.Test;

import controllers.Coder;
import model.ColumnDB;
import model.DBManager;
import model.ProjectDB;
import model.TaskDB;
import model.User;
import model.UserDB;

class TestingDB {

	// All of these tests are tests that have been run at various stages of the development of this program.
	// As they interact with the live database, I have commented out the the code in tests that were previously
	// run when they were working or no longer relevant.
	// Some of the model has changed since some of these test methods were created, and some may now be
	// redundant. I have left them here so that they may serve as a record of the testing involved with
	// the creation of this app.
	
	@Test void addTheThings(){
		
		TaskDB.setUpDB();
		
//		ColumnDB.insertColumn("New Project!", 2);
//		ColumnDB.insertColumn("New Project!", 2);
//		TaskDB.insertTask("TaskName!", "Here's a description!", 0, 2);
//		TaskDB.insertTask("TaskName!", "Here's a description!", 1, 2);
//		TaskDB.insertTask("TaskName!", "Here's a description!", 2, 2);
//		TaskDB.insertTask("TaskName!", "Here's a description!", 3, 2);
	}
	
	
	@Test void deleteColumnByProjectID() {
//		assertEquals(ColumnDB.deleteColumnsByProjectID(2), true);
	}
	
	@Test void deleteTasksByColumnID() {
//		ProjectDB.deleteProject(2);
	}
	
	void setUpWorkspaceItems() {
		// insert user, insert project, column, task.
	}
	
	@Test void cascadeDelete() {
//		assertEquals(ProjectDB.deleteProject(2), true);
	}
	
	// ColumnDB Testing:
	
	@Test void deleteColumnByID() {
//		assertEquals(ColumnDB.deleteColumn(3), false);
	}
	
	@Test void insertColumn() {
//		assertEquals(ColumnDB.insertColumn("Another Column", 2), true);
	}
	
	
	
	@Test void updateColumn() {
//		assertEquals(ColumnDB.updateColumnName("New Name", 1), true);
//		assertEquals(ColumnDB.updateColumnName("New Name", 0), false);
		
	}
	
	// TaskDB Testing:
	
	@Test void addTask() {
//		assertEquals(TaskDB.insertTask("TaskName!", "Here's a description!", "2021_10_18", 0, 2), true);
	}
	
	@Test void updateTask() {
//		assertEquals(TaskDB.updateTask("taskName", "Different Name", 1), true);
//		assertEquals(TaskDB.updateTask("description", "Here's a description", 1), true);
//		assertEquals(TaskDB.updateTask("duedate", "2021_11_14", 1), true);
//		assertEquals(TaskDB.updateTask("arrayIndex", "1", 1), true);
//		assertEquals(TaskDB.updateTask("colID", 1, 1), true);
	}
	
	// ProjectDB Testing:
	
	@Test void deleteAllProjects() {
//		assertEquals(ProjectDB.deleteAllProjects("Sarah-Mae"), true);
		
	}
	
	@Test void deleteProject() {
//		assertEquals(ProjectDB.deleteProject(2), true);
		
	}
	
	@Test void insertProject() {
//		assertEquals(ProjectDB.insertProject("DefaultProject", "Sarah-Mae"), true);
//		assertEquals(ProjectDB.insertProject("failedProject", "WyrEZ"), false);	
//		assertEquals(ProjectDB.insertProject("New Project", "WyreZ"), true);
	
	}
	
	@Test void checkProjectExists() {
//		assertEquals(ProjectDB.checkProjectExists(1), true);
//		assertEquals(ProjectDB.checkProjectExists(5), false);
	}
	
	
	// UserDB testing:
	
	@Test void deleteUser() {
//		assertEquals(UserDB.deleteUser("h'z"), true);
	}

	@Test void validateLogin() {
//			assertEquals(UserDB.verifyLogin("Sarah-Mae", "(it'sAsecret*)"), true);
	}
	
	@Test void updateUser() {
//		assertEquals(UserDB.updateUser("Sarah-Mae", "Username", "Banagram"), false);
//		assertEquals(UserDB.updateUser("Sarah-Mae", "fname", "Banagram"), true);
//		assertEquals(UserDB.updateUser("Sarah-Mae", "defaultProject", 1), true);
//		assertEquals(UserDB.updateUser("Sarah-Mae", "imgURL", "https://www.google.com/"), true);
	}
	
	@Test void importUserFromDB() {
//		User user = UserDB.importUserFromDB("Sarah-Mae");
//		assertEquals(user.getfName(), "D'razio");
//		assertEquals(user.getlName(), "P*n1sh3r,");
//		assertEquals(user.getPassword(), "(it'sAsecret*)");
//		assertEquals(user.getDefaultProject(), 0);
//		assertEquals(user.getProfileImgUrl(), "");
	}
	
	@Test
	void insertUser() {
//		assertEquals(UserDB.insertUser("Sarah-Mae", "D'razio", "P*n1sh3r,", "(it'sAsecret*)", 0, ""), true);
	}
	
	@Test
	void checkUserExists() {
//		assertEquals(UserDB.checkUserExists("Sarah-Mae"), true);
//		assertEquals(UserDB.checkUserExists("Sarah-mae"), false);
		
	}
	
	@Test void printName() {
//		String name = "h'z";
//		System.out.println(Coder.encode(name));
	}
}
