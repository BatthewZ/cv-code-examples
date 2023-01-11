package model;

import controllers.Coder;
import javafx.beans.property.StringProperty;
import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;

public class User {

	private StringProperty uName;
	private StringProperty password;
	private StringProperty fName;
	private StringProperty lName;
	private StringProperty profileImageURL;
	
	private IntegerProperty defaultProject;
	
	public User(String user, String pass, String fname, String lname, int defaultProject, String profileImageUrl) {
		this.uName = new SimpleStringProperty(Coder.decode(user));
		this.password = new SimpleStringProperty(Coder.decode(pass));
		this.fName = new SimpleStringProperty(Coder.decode(fname));
		this.lName = new SimpleStringProperty(Coder.decode(lname));
		this.profileImageURL = new SimpleStringProperty(Coder.decode(profileImageUrl));
		this.defaultProject = new SimpleIntegerProperty(defaultProject);
		
		setListeners();
	}
	
	private void setListeners() {
		// Update DB when changes are made to:
		
		this.password.addListener((o, oldval, newval) -> {
			UserDB.updateUser(this.uName.getValue(), "password", newval);
		});
		
		this.fName.addListener((o, oldval, newval) -> {
			UserDB.updateUser(this.uName.getValue(), "fname", newval);
		});
		
		this.lName.addListener((o, oldval, newval) -> {
			UserDB.updateUser(this.uName.getValue(), "lname", newval);
		});
		
		this.profileImageURL.addListener((o, oldval, newval) -> {
			UserDB.updateUser(this.uName.getValue(), "imgURL", newval);
		});
		
		this.defaultProject.addListener((o, oldval, newval) -> {
			UserDB.updateUser(this.uName.getValue(), "defaultProject", newval.intValue());
		});
	}
	
	public void setProfileImgUrl(String url) {
		this.profileImageURL.setValue(url);
	}
	
	public String getProfileImgUrl(){
		return this.profileImageURL.getValue();
	}
	
	public StringProperty getProfileImageURLProperty() {
		return this.profileImageURL;
	} 
	
	public void setDefaultProject(int projectID) {
		this.defaultProject.setValue(projectID);
	}
	
	public int getDefaultProject() {
		return this.defaultProject.getValue();
	}
	
	public String userInfo() {
		return uName + ", " + password + ", " + fName + ", " + lName + ", "	+ profileImageURL + ", " + defaultProject;
	}

	public String getuName() {
		return uName.getValue();
	}

	public void setuName(String uName) {
		this.uName.setValue(uName);
	}

	public String getPassword() {
		return password.getValue();
	}

	public void setPassword(String password) {
		this.password.setValue(password);
	}

	public String getfName() {
		return fName.getValue();
	}

	public void setfName(String fName) {
		this.fName.setValue(fName);
	}

	public String getlName() {
		return lName.getValue();
	}

	public void setlName(String lName) {
		this.lName.setValue(lName);
	}

	
}
