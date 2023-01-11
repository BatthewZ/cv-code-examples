package testing;

import static org.junit.jupiter.api.Assertions.*;

import java.util.regex.Pattern;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import controllers.Coder;

class TestingMain {
	

	// Tests for coding and encoding information using what is now in the model.Coder class.
	
	
	@Test
	void testDatFormatting() {
		// This test was created in preparation for including DueDates in the task
		String dateString = "2021_10_23";
				
		String[] date = dateString.split("_");
		String formatted = date[2] + "." + date[1] + "." + date[0];
		
		assertEquals(formatted, "23.10.2021");
	}
	
	@Test
	void codeAThing() {
		System.out.println(Coder.encode("What I really need to do, is make a bangin' sql integration. I can't wait! "));
	}
	
	@Test
	void encode() {
		System.out.println("Coding:");
		String s = "G'day, how's it going? I haven't :: ever \n put some; pants* on. \\";
		
		String coded = s.replaceAll(Pattern.quote("::"), "<D0ubl3c0lon>");
		coded = coded.replaceAll(Pattern.quote("("), "<0penBr@<ket>");
		coded = coded.replaceAll(Pattern.quote("\n"), "<n3wl1Ne>");
		coded = coded.replaceAll(Pattern.quote(","), "<c0mm@>");
		coded = coded.replaceAll(Pattern.quote("'"), "<s1nglequ0t3>");
		coded = coded.replaceAll(Pattern.quote("\""), "<d0ublequ0t3>");
		coded = coded.replaceAll(Pattern.quote("*"), "<@steR1sk>");
		coded = coded.replaceAll(Pattern.quote(";"), "<s3mIc0lon>");
		coded = coded.replaceAll(Pattern.quote("\\"), "<b@<kslaSh>");
		System.out.println(coded);
		System.out.println("\n");
		assertEquals(coded, "G<s1nglequ0t3>day<c0mm@> how<s1nglequ0t3>s it going? I haven<s1nglequ0t3>t <D0ubl3c0lon> ever <n3wl1Ne> put some<s3mIc0lon> pants<@steR1sk> on. <b@<kslaSh>");
	}
	
	@Test
	void decode() {
		
		System.out.println("Decoding:");
		String s = "G<s1nglequ0t3>day<c0mm@> how<s1nglequ0t3>s it going? I haven<s1nglequ0t3>t <D0ubl3c0lon> ever <n3wl1Ne> put some<s3mIc0lon> pants<@steR1sk> on. <b@<kslaSh>";
		
		String decoded = s.replaceAll(Pattern.quote("<D0ubl3c0lon>"), "::");
		decoded = decoded.replaceAll(Pattern.quote("<0penBr@<ket>"), "(");
		decoded = decoded.replaceAll(Pattern.quote("<n3wl1Ne>"), "\n");
		decoded = decoded.replaceAll(Pattern.quote("<c0mm@>"), ",");
		decoded = decoded.replaceAll(Pattern.quote("<s1nglequ0t3>"), "'");
		decoded = decoded.replaceAll(Pattern.quote("<d0ublequ0t3>"), "\"");
		decoded = decoded.replaceAll(Pattern.quote("<@steR1sk>"), "*");
		decoded = decoded.replaceAll(Pattern.quote("<s3mIc0lon>"), ";");
		decoded = decoded.replaceAll(Pattern.quote("<b@<kslaSh>"), "\\\\");
		System.out.println(decoded);
		System.out.println("\n");
		
		assertEquals(decoded, "G'day, how's it going? I haven't :: ever \n put some; pants* on. \\");
	}

}
