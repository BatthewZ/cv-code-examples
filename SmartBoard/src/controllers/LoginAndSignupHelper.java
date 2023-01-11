package controllers;

import javafx.scene.control.TextField;
import javafx.scene.text.Text;


public abstract class LoginAndSignupHelper {
	
	// Business and style rules used for the SignUpController in particular.
	// LoginController uses a few of these methods as well.

	protected static final String red = "#BF1A2F";
	protected static final String darkTeal = "#28464B";
	protected static final String midTeal = "#326771";
	protected static final String lightTeal = "#2C8C99";
	protected static final String white = "#FBFEF9";
	
	protected void setColor(TextField tf, String colour) {
		tf.setStyle("-fx-border-color: "+colour+";");
	}
	
	protected void setColor(Text t, String colour) {
		t.setStyle("-fx-fill: "+colour+";");
	}
	
	protected void setColor(TextField tf, Text t, String colour) {
		setColor(tf, colour);
		setColor(t, colour);
	}
	
	protected boolean checkInputLength(String str) {
		if (str.trim().length() > 1 && str.trim().length() < 12)
			return true;
		return false;
	}
	
	protected boolean checkLoginAndPassText(TextField tf, Text textFieldHeader) {
		boolean fail = false;
		
		if (tf.getText() == null)
			fail = true;
		
		if (!checkInputLength(tf.getText()))
			fail = true;
		
		return fail;
	}
	
	protected boolean checkInputText(TextField tf) {
		if (tf.getText() == null)
			return false;
		
		if (!checkInputLength(tf.getText()))
			return false;
		
		return true;
	}
	
	protected boolean checkInputText(TextField tf, Text textFieldHeader) {
		boolean fail = false;
		
		if (tf.getText() == null)
			fail = true;
		
		if (!checkInputLength(tf.getText()))
			fail = true;
				
		if (fail) {
			setColor(tf, textFieldHeader, red);
			return false;
		}
		
		return true;
	}
}
