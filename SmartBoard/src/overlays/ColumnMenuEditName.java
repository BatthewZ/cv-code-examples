package overlays;

import controllers.Coder;
import controllers.ColumnController;
import javafx.fxml.FXML;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;

public class ColumnMenuEditName implements SubMenu{

	@FXML VBox menuPane; 
	@FXML TextField columnName;
	@FXML Text cautionText;
	
	private ColumnController cc;
	
	public void initialize(ColumnController cc) {
		this.cc = cc;
		columnName.setText(Coder.decode(cc.getName()));
	}
	
	@FXML
	private void setName() {
		cautionText.setText("");
		columnName.setStyle("-fx-border-color: #2C8C99;");
		if (columnName.getText().length() > 0 ) {
			this.cc.setName(columnName.getText());
			this.cautionText.setStyle("-fx-fill: white");
			cautionText.setText("Changes have been set. :)");
		} else {
			this.cautionText.setStyle("-fx-fill: #BF1A2F");
			cautionText.setText("Column name must be more than 1 character long");
			columnName.setStyle("-fx-border-color: #BF1A2F;");
		}
	}
	
	@Override
	public VBox getMenuPaneVBox() {
		return this.menuPane;
	}
	
}
