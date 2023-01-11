package application;

import java.util.Random;

public class Quoter {
	
	// Randomly select a quote from the list.

	private static String[] quotes = {
			"Perfection is not attainable, but if we chase perfection we can catch excellence."
			, "People who are crazy enough to think they can change the world, are the ones who do."
			, "Optimism is the one quality more associated with success and happiness than any other."
			, "Happiness is not something readymade. It comes from your own actions."
			, "To explore new waters you must become comfortable with losing sight of the shore."
			, "A dream without a deadline will always be a dream."
	};
	
	public static String getQuote() {
		return quotes[new Random().nextInt(quotes.length-1)];		
	}
	
}
