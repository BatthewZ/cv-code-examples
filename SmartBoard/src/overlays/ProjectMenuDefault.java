package overlays;

import javafx.fxml.FXML;
import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;


public class ProjectMenuDefault implements SubMenu{

	@FXML Text editProj;
	@FXML Text newProj;
	@FXML Text loadProj;
	@FXML Text delProj;
	@FXML VBox menuPane;
	
	@Override
	public VBox getMenuPaneVBox() {
		return this.menuPane;
	}

	// These methods are used for onClicked listeners set in ProjectMenuOverlay.
	
	public Text getEditProj() {
		return editProj;
	}

	public Text getNewProj() {
		return newProj;
	}

	public Text getLoadProj() {
		return loadProj;
	}

	public Text getDelProj() {
		return delProj;
	}

}
