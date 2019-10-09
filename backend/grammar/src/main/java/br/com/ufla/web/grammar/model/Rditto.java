package br.com.ufla.web.grammar.model;

import br.com.ufla.web.grammar.model.StringLangs;
import br.com.ufla.web.grammar.model.StringLangsBR;;


public class Rditto {
	
	private static String langs;
	
	public static void setLangs (String l) {
		langs = l;
	}
	
	public static String grammar_to_string_parameters () {
		if (langs.equals("pt"))
			return StringLangsBR.grammar_to_string_parameters;
		return StringLangs.grammar_to_string_parameters;
	}
	
	public static String esentially_noncontracting_problems_parameters () {
		if (langs.equals("pt"))
			return StringLangsBR.esentially_noncontracting_problems_parameters;
		return StringLangs.esentially_noncontracting_problems_parameters;
	}
	
	public static String initial_symbol_not_recursive() {
		if (langs.equals("pt"))
			return StringLangsBR.initial_symbol_not_recursive;
		return StringLangs.initial_symbol_not_recursive;
	}
	
	public static String recursion_found_initial() {
		if (langs.equals("pt"))
			return StringLangsBR.recursion_found_initial;
		return StringLangs.recursion_found_initial;
	}
	
	public static String recursion_initial_symbol_solution_descr_parameters() {
		if (langs.equals("pt"))
			return StringLangsBR.recursion_initial_symbol_solution_descr_parameters;
		return StringLangs.recursion_initial_symbol_solution_descr_parameters;
	}
	
}
