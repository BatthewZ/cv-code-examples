package controllers;

import java.util.regex.Pattern;

public class Coder {

	public static String capitalizer(String str) {
			// Capitalizes first letter of each word in a string. 
		    // Used for preparing column and task headers in the view.
		String string = str.trim();
		String[] words = string.split(" ");
		String capitalized = "";
		for (String s : words) {
			char firstLetter = s.charAt(0);
			String word = "";
			word  += firstLetter;
			word = word.toUpperCase();
			word += s.substring(1);
			word += " ";
			capitalized += word;
		}
		capitalized = capitalized.trim();
		return capitalized;
	}
	
	public static String formatDateForView(String dateString) {
		// Takes in "2021_10_24", creates "24.11.2021" <-- month '0' is January.
		String[] date = dateString.split("_");
		int month = 0;
		
		String formatted = date[2] + ".";
		
		try {
			month = Integer.parseInt(date[1]) + 1; 
			formatted += month + ".";
		} catch (NumberFormatException nfe) { 
			System.out.println(nfe);
			formatted += date[1] + ".";
		}
		
		formatted += date[0];
		return formatted;
	}
	
	public static String formatDateForDB(String dateString) {
		// Unfinished code made in preparation for storing task due dates.
		String date = "";
		if (dateString.length() > 10) {
			System.out.println("Date string was too long for DB, inserting empty date: " + dateString);
			return date;
		}
		
		return dateString;
	}
	
	public static String encode(String s) {
		
		String coded = s.replaceAll(Pattern.quote("::"), "<//D0ubl3c0lon>");
		coded = coded.replaceAll(Pattern.quote("("), "<//0penBr@<ket>");
		coded = coded.replaceAll(Pattern.quote("\n"), "<//n3wl1Ne>");
		coded = coded.replaceAll(Pattern.quote(","), "<//c0mm@>");
		coded = coded.replaceAll(Pattern.quote("'"), "<//s1nglequ0t3>");
		coded = coded.replaceAll(Pattern.quote("\""), "<//d0ublequ0t3>");
		coded = coded.replaceAll(Pattern.quote("*"), "<//@steR1sk>");
		coded = coded.replaceAll(Pattern.quote(";"), "<//s3mIc0lon>");
		coded = coded.replaceAll(Pattern.quote("\\\\"), "<//8@<kslaSh>");
		
		return coded;
	}

	public static String decode(String s) {
		String decoded = s.replaceAll(Pattern.quote("<//D0ubl3c0lon>"), "::");
		decoded = decoded.replaceAll(Pattern.quote("<//0penBr@<ket>"), "(");
		decoded = decoded.replaceAll(Pattern.quote("<//n3wl1Ne>"), "\n");
		decoded = decoded.replaceAll(Pattern.quote("<//c0mm@>"), ",");
		decoded = decoded.replaceAll(Pattern.quote("<//s1nglequ0t3>"), "'");
		decoded = decoded.replaceAll(Pattern.quote("<//d0ublequ0t3>"), "\"");
		decoded = decoded.replaceAll(Pattern.quote("<//@steR1sk>"), "*");
		decoded = decoded.replaceAll(Pattern.quote("<//s3mIc0lon>"), ";");
		decoded = decoded.replaceAll(Pattern.quote("<//8@<kslaSh>"), "\\\\");
		return decoded;
	}
}
