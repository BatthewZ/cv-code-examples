package overlays;

import java.util.function.Consumer;

import application.App;
import controllers.Coder;
import controllers.ProjectController;
import controllers.WorkspaceController;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.ListView;
import javafx.scene.layout.VBox;

public class ProjectMenuLoad<T> implements SubMenu {

	@FXML VBox menuPane;
	@FXML ListView<String> projectList;
	@FXML Button selectProject;
	@FXML Button goBack;
	
	private Consumer<T> setProject = null;
	
	public void initialize(Consumer<T> setProject) {
		for (ProjectController pc : WorkspaceController.getProjControls()) 
			projectList.getItems().add(Coder.decode(pc.getName()));
		
		this.setProject = setProject;
	}
	
	@FXML
	private void selectProject() {
		Integer selectedProject = projectList.getSelectionModel().getSelectedIndex(); 
		setProject.accept((T) selectedProject);
		App.removeOverlay();
	}
	
	@Override
	public VBox getMenuPaneVBox() {
		return this.menuPane;
	}
	
	public Button getBackButton() {
		return this.goBack;
	}

}
