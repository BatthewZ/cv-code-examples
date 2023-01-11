package overlays;

import java.util.function.Consumer;

import application.App;
import javafx.fxml.FXML;
import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import model.ProjectDB;
import javafx.scene.text.Text;

public class ProjectMenuCreate<T> implements SubMenu {
	@FXML TextField newProjName;
	@FXML Button createProject;
	@FXML Button goBack;
	@FXML Text cautionText;
	@FXML VBox menuPane;
	
	private Consumer<T> createProjectConsumer = null;
	
	public void setConsumer(Consumer<T> consumer) {
		this.createProjectConsumer = consumer;
	}
	
	@FXML
	private void createNewProject() {
		cautionText.setText("");
		if (newProjName.getText().length() > 0) {
			if (this.createProjectConsumer != null) {
				this.createProjectConsumer.accept((T) newProjName.getText());
				App.removeOverlay();
			} else {
				System.out.println("Something went wrong creating a new project.");
			}
			
		} else
			cautionText.setText("Project name must be at least 1 character long.");
	}
	
	public Button getBackButton() {
		return this.goBack;
	}

	@Override
	public VBox getMenuPaneVBox() {
		return this.menuPane;
	}
	
}
