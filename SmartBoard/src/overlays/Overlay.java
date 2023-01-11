package overlays;

import javafx.scene.Node;
import javafx.scene.control.Button;

public interface Overlay {
	
	// Used to ensure that App.overlay() and App.removeOverlay() methods work as intended.

	public Node getOverlayPane();
	public Button getCloseButton();
	
}
