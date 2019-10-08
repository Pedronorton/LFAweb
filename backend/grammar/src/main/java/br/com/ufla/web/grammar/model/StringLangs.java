package br.com.ufla.web.grammar.model;

public class StringLangs {

	public final String rule_left_side = "u";
	public final String rule_right_side = "v";
	public final String regular_grammar = "Regular grammar";
	public final String rg_u = "u ∈ V";
	public final String rg_v = "v ∈ λ | Σ | ΣV";
	public final String context_free_grammar = "Context-Free Grammar";
	public final String cfg_u = "u ∈ V";
	public final String cfg_v = "v ∈ (V ∪ Σ)∗";
	public final String context_sensitive_grammar = "Context-Sensitive Grammar";
	public final String csg_u = "u ∈ (V ∪ Σ)+";
	public final String csg_v = "v ∈ (V ∪ Σ)+";
	public final String csg_condition = "|u| ≤ |v|";
	public final String unrestricted_grammar = "Unrestricted Grammar";
	public final String ug_u = "u ∈ (V ∪ Σ)+";
	public final String ug_v = "v ∈ (V ∪ Σ)*";
	public final String lambda = "λ";
	public final String arrow = "![CDATA[→]]";
	public final String pipe = "|";
	public final String ok = "OK";
	
	public final String input_grammar = "Input grammar:";
	public final String grammar_identification = "Grammar Identification";
	public final String leftmost_derivation = "Leftmost Derivation";
	
	public final static String grammar_to_string_parameters = "Variables: #Terminals: #Start symbol: # Rules:"; 
	public final static String esentially_noncontracting_problems_parameters = "- The rule # is an empty production.";
	public final static String recursion_initial_symbol_solution_descr_parameters = "The grammar # has the start symbol # recursive. Therefore, there is a CFG #\n" + 
			"        such that L(G\\') = L(G) and the new start symbol #  is not recursive.";
	public final static String recursion_found_initial = "Recursion found in rule";
	public final static String initial_symbol_not_recursive = "The start symbol should be limited to start derivations, and can not be a recursive variable.\n" + 
			"        Therefore, it should not be possible to have derivations of type";
	
}
