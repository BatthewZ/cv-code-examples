package overlays;

import java.util.function.Consumer;

import application.App;
import javafx.fxml.FXML;
import javafx.scene.layout.VBox;

public class ColumnMenuDelete implements SubMenu {
	
	// Alert to user: Warning: Are you sure you want to delete this column?

	@FXML VBox menuPane; 
	
	Consumer<Integer> deleteColumnConsumer;
	int id;
	
	public void initialize(int ID, Consumer<Integer> deleteColumnConsumer) {
		this.id = ID;
		this.deleteColumnConsumer = deleteColumnConsumer;
		
	}
	
	@FXML
	private void deleteColumn() {
		deleteColumnConsumer.accept(this.id);
		App.removeOverlay();
	}

	@Override
	public VBox getMenuPaneVBox() {
		return this.menuPane;
	}
	
}
