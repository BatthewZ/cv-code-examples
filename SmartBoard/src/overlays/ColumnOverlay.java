package overlays;

import java.io.IOException;
import java.util.function.Consumer;

import application.App;
import controllers.ColumnController;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;

public class ColumnOverlay implements Overlay {

	@FXML private VBox overlayPane;
	@FXML private Button closeButton;
	@FXML private StackPane menuPane;
	
	// default overlay dimensions
	private final double defaultHeight = 150;
	private final double defaultWidth = 350;
	
	@Override
	public VBox getOverlayPane() {
		return this.overlayPane;
	}

	@Override
	public Button getCloseButton() {
		return this.closeButton;
	}
	
	public void setEditNameMenu(ColumnController cc) {
		try {
			FXMLLoader loader = App.makeLoader("ColumnMenuEditName");
			Parent root = loader.load();
			ColumnMenuEditName controller = loader.getController();
			double menuWidth = controller.getMenuPaneVBox().getPrefWidth();
			double menuHeight = controller.getMenuPaneVBox().getPrefHeight();
			
			controller.initialize(cc);
			
			setMenuToMenuPane(controller.getMenuPaneVBox());
			resizeOverlay(menuWidth, menuHeight);
			
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("Unable to load edit column name menu");
		}
	}
	
	public void setDeleteColumnMenu(int ID, Consumer<Integer> deleteColumn) {
		try {
			FXMLLoader loader = App.makeLoader("ColumnMenuDelete");
			Parent root = loader.load();
			ColumnMenuDelete controller = loader.getController();
			double menuWidth = controller.getMenuPaneVBox().getPrefWidth();
			double menuHeight = controller.getMenuPaneVBox().getPrefHeight();
			
			controller.initialize(ID, deleteColumn);
			
			setMenuToMenuPane(controller.getMenuPaneVBox());
			resizeOverlay(menuWidth, menuHeight);
			
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("Unable to load delete column menu");
		}
	}

	private void resizeOverlay(double width, double height) {
		// Automatically resize the overlay to house
		// the submenu panes.
		if (width > defaultWidth-10) 
			overlayPane.setPrefWidth(width+5);
		
		overlayPane.setPrefHeight(height+defaultHeight);
	}
	
	private void setMenuToMenuPane(Node menu) {
		removeAllMenusFromMenuPane();
		this.menuPane.getChildren().add(menu);
	}
	
	private void removeAllMenusFromMenuPane() {
		ObservableList<Node> kids = this.menuPane.getChildren();
		while (kids.size() > 0)
			kids.remove(0);
	}

}
