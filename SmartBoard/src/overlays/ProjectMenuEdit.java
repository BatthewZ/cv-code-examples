package overlays;

import application.App;
import controllers.WorkspaceController;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;



public class ProjectMenuEdit implements SubMenu {
	@FXML TextField projName;
	@FXML CheckBox defaultProject;
	@FXML Button setChanges;
	@FXML Button goBack;
	@FXML VBox menuPane;
	@FXML Text cautionText;
	
	private int activeProject = 0;
	
	public void initialize(String projName, boolean defaultProject, int activeProject) {
		this.projName.setText(projName);
		this.defaultProject.setSelected(defaultProject);
		this.activeProject = activeProject;
	}
	
	@FXML
	private void setChanges() {
		if (this.defaultProject.isSelected())
			App.getUser().setDefaultProject(this.activeProject);
		
		if (projName.getText().length() < 1 || projName.getText().length() > 25) {
			cautionText.setText("Project name must be 1-25 characters long.");
		} else
			WorkspaceController.getProjectByID(activeProject).setName(projName.getText());
	}
	
	public Button getBackButton() {
		return this.goBack;
	}

	@Override
	public VBox getMenuPaneVBox() {
		return this.menuPane;
	}
	
}
