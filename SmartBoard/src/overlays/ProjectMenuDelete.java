package overlays;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.layout.VBox;

import java.util.function.*;

import application.App;

public class ProjectMenuDelete<T> implements SubMenu {
	
	@FXML Button delProjButton;
	@FXML Button goBack;
	@FXML VBox menuPane;
	
	private Consumer<T> deleteProjConsumer;
	
	public void initialize(Consumer<T> delProj) {
		this.deleteProjConsumer = delProj;
	}
	
	@FXML
	private void deleteProject() {
		deleteProjConsumer.accept(null);
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
