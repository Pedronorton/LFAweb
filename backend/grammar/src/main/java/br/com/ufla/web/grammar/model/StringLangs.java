package br.com.ufla.web.grammar.model;

public class StringLangs {

    // NEW
    public final static String header = "<h3  style=" + "\"" +
            "color:red" + "\"" + ">" + "Algorithm" + "</h3>";
    
    //NEW
    public final static String textBox = "Result";

    public final String input_grammar = "Input grammar:";
    public final String grammar_identification = "Grammar Identification";
    public final String leftmost_derivation = "Leftmost Derivation";

    public final static String grammar_to_string_parameters = "Variables: #Terminals: #Start symbol: # Rules:";
    public final static String esentially_noncontracting_problems_parameters = "- The rule # is an empty production.";
    public final static String recursion_initial_symbol_solution_descr_parameters = "The grammar # has the start symbol # recursive. Therefore, there is a CFG #\n"
            + "        such that L(G\\') = L(G) and the new start symbol #  is not recursive.";
    public final static String recursion_found_initial = "Recursion found in rule";
    public final static String initial_symbol_not_recursive = "The start symbol should be limited to start derivations, and can not be a recursive variable.\n"
            + "        Therefore, it should not be possible to have derivations of type";
    public final static String nullable_algol = "NULL = {A | {A → λ} ∈ P}<br>\n" + "        <b>repeat</b><br>\n"
            + "            &nbsp;&nbsp;&nbsp;&nbsp;\n" + "            PREV = NULL<br>\n"
            + "            &nbsp;&nbsp;&nbsp;&nbsp;\n" + "            <b>for each</b> A ∈ V <b>do</b><br>\n"
            + "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n"
            + "                <b>if</b> A → w and w ∈ PREV<sup>∗</sup> <b>do</b><br>\n"
            + "                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n"
            + "                    NULL = NULL ∪ {A}<br>\n" + "        <b>until</b> NULL == PREV";
    public final static String removal_empty_prod_comments = "<p align=justify>The algorithm for removing lambda rules consists of 3 steps:";
    public final static String removal_empty_prod_step_1 = "(1) Determine the set of nullable variables.";
    public final static String removal_empty_prod_step_2 = "(2) Add rules in which occurrences of null variables are omitted.\n"
            + "        For example, assume rule A → BABa and B is a nullable variable.\n"
            + "        Therefore, the following rules are inserted: A → ABa, A → BAa and A → Aa.";
    public final static String removal_empty_prod_step_2_1 = "(2) There are no rules to be inserted.";
    public final static String removal_empty_prod_step_3 = "(3) Remove the lambda rules. NOTE: if start symbol produces λ, do not remove this rule.";
    public final static String removal_empty_prod_step_3_1 = "(3) There are no rules to remove.";
    public final static String no_empty_prod = "The inserted grammar does not have lambda rules.";
    public final static String chain_rules_algol_comment = "The removal of chain rules consist in replaces the occurrences of a chain rule directly by the rules of chain variable.";
    public final static String algol_chain_rule_grammar_step_1 = "(1) The first step of the algorithm is to construct the set CHAIN of each variable.";
    public final static String chain_rules_table_header = "Variable#Chain";
    public final static String algol_chain_rule_grammar_step_2 = "(2) Highlight the chain rules found.";
    public final static String algol_chain_rule_grammar_step_2_1 = "(2) In the inserted grammar, there are auto chain rules.\n" + 
            "        This rule type should also be removed.";
    public final static String algol_chain_rule_grammar_step_2_2 = "(2) There are no chain rules in the inserted grammar.";
    public final static String algol_chain_rule_grammar_step_3 = "(3) Replace chains found.";
    public final static String algol_chain_rule_grammar_step_3_1 = "(3) In the inserted grammar, there are auto chain rules.\n" + 
            "        This rule type should also be removed.";
    public final static String algol_chain_rule_grammar_step_3_2 = "(3) There are no chain rules in the inserted grammar.";
    public final static String chain_rule_algol = ""
            + "  <div style="+"\""+"text-align:left"+ "\";" +"> CHAIN(A) = {A}<br>\n" + 
            "        PREV = ∅<br>\n" + 
            "        <b>repeat</b><br>\n" + 
            "            &nbsp;&nbsp;\n" + 
            "            NEW = CHAIN(A) − PREV<br>\n" + 
            "            &nbsp;&nbsp;\n" + 
            "            PREV = CHAIN(A)<br>\n" + 
            "            &nbsp;&nbsp;\n" + 
            "            <b>for each</b> B ∈ NEW <b>do</b><br>\n" + 
            "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" + 
            "                <b>for each</b> B → C <b>do</b><br>\n" + 
            "                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" + 
            "                    CHAIN(A) = CHAIN(A) ∪ {C}<br>\n" + 
            "                    <b>until</b> CHAIN(A) == PREV"
            + "     </div>";
    public final static String term_cnf_comments = "Removes rules that do not produce terminals:";
    public final static String term_cnf_step_1 = "(1) Determine which variables produce terminals directly and indirectly.";
    public final static String term_cnf_algol = ""
            + "  <div style="+"\""+"text-align:left"+ "\";" +"> TERM = {A | there is a rule A → w ∈ P, com w ∈ Σ<sup>∗</sup> }<br>\n" + 
            "        <b>repeat</b><br>\n" + 
            "            &nbsp;&nbsp;\n" + 
            "            PREV = TERM<br>\n" + 
            "            &nbsp;&nbsp;\n" + 
            "            <b>for each</b> A ∈ V <b>do</b><br>\n" + 
            "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" + 
            "                <b>if</b> A → w ∈ P e w ∈ (PREV ∪ Σ)<sup>∗</sup> <b>then</b><br>\n" + 
            "                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" + 
            "                    TERM = TERM ∪ {A}<br><b>until</b> PREV == TERM"
            + "</div>";
    public final static String term_cnf_step_2 = "(2) Remove variables that are not in";
    public final static String term_cnf_result = "All grammar variables generate terminal strings.";
    public final static String reach_cnf_comments = "Remove unreachable variables is the process of remove all variables that not be derivable from the start symbol.";
    public final static String reach_cnf_step_1 = "(1) Determine which variables are reachable from the start symbol ";
    public final static String reach_cnf_algol = ""
            + "  <div style="+"\""+"text-align:left"+ "\";" +">REACH = {S}<br>\n" + 
            "        PREV = ∅<br>\n" + 
            "        <b>repeat</b><br>\n" + 
            "            &nbsp;&nbsp;&nbsp;\n" + 
            "            NEW = REACH − PREV<br>\n" + 
            "            &nbsp;&nbsp;&nbsp;\n" + 
            "            PREV = REACH<br>\n" + 
            "            &nbsp;&nbsp;&nbsp;\n" + 
            "            <b>for each</b> A ∈ NEW <b>do</b><br>\n" + 
            "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" + 
            "                <b>for each</b> A → w <b>do</b><br>\n" + 
            "                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" + 
            "                    add the variables of w in REACH<br><b>until</b> REACH == PREV"
            + "</div>";
    public final static String reach_cnf_step_2 = "(2) Remove variables that are not in";
    public final static String reach_cnf_step_2_1 = "(2) All symbols are reachable.";
    public final static String reach_cnf_step_comments_2 = "There are no reachable symbols in the inserted grammar.";
}
