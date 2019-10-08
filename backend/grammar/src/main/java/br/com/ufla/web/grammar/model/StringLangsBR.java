package br.com.ufla.web.grammar.model;

public class StringLangsBR {
	
	public final static String grammar_to_string_parameters = "Variáveis: #Terminais: #Símbolo inicial: # Regras:";
	public final static String esentially_noncontracting_problems_parameters = "- A regra # é uma produção vazia.";
	public final static String recursion_initial_symbol_solution_descr_parameters = "A gramática # possui o símbolo inicial # recursivo. Logo, existe uma GLC #\n" + 
			"        tal que L(G\\') = L(G) e o novo símbolo inicial #  não é recursivo.";
	public final static String recursion_found_initial = "Recursão encontrada na regra";
	public final static String initial_symbol_not_recursive = "O símbolo inicial deve se limitar a iniciar derivações, não podendo ser uma variável recursiva.\n" + 
			"        Logo, não deve ser possível ter derivações do tipo";
}
