module FPA2 {
	requires javafx.controls;
	requires javafx.fxml;
	requires javafx.graphics;
	requires org.junit.jupiter.api;
	requires javafx.base;
	requires java.sql;
	requires java.base;
	
	opens application to javafx.graphics, javafx.fxml;
	opens controllers to javafx.graphics, javafx.fxml;
	opens overlays to javafx.graphics, javafx.fxml;
}
