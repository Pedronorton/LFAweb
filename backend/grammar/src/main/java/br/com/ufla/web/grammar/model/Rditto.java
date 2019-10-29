package br.com.ufla.web.grammar.model;

import br.com.ufla.web.grammar.model.StringLangs;
import br.com.ufla.web.grammar.model.StringLangsBR;;

public class Rditto {

    private static String langs;

    public static void setLangs(String l) {
        langs = l;
    }

    public static String grammar_to_string_parameters() {
        if (langs.equals("pt"))
            return StringLangsBR.grammar_to_string_parameters;
        return StringLangs.grammar_to_string_parameters;
    }

    public static String esentially_noncontracting_problems_parameters() {
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

    public static String header() {
        if (langs.equals("pt"))
            return StringLangsBR.header;
        return StringLangs.header;
    }

    public static String nullable_algol() {
        if (langs.equals("pt"))
            return StringLangsBR.nullable_algol;
        return StringLangs.nullable_algol;
    }

    public static String removal_empty_prod_comments() {
        if (langs.equals("pt"))
            return StringLangsBR.removal_empty_prod_comments;
        return StringLangs.removal_empty_prod_comments;
    }

    public static String removal_empty_prod_step_1() {
        if (langs.equals("pt"))
            return StringLangsBR.removal_empty_prod_step_1;
        return StringLangs.removal_empty_prod_step_1;
    }

    public static String removal_empty_prod_step_2() {
        if (langs.equals("pt"))
            return StringLangsBR.removal_empty_prod_step_2;
        return StringLangs.removal_empty_prod_step_2;
    }

    public static String removal_empty_prod_step_2_1() {
        if (langs.equals("pt"))
            return StringLangsBR.removal_empty_prod_step_2_1;
        return StringLangs.removal_empty_prod_step_2_1;
    }

    public static String removal_empty_prod_step_3() {
        if (langs.equals("pt"))
            return StringLangsBR.removal_empty_prod_step_3;
        return StringLangs.removal_empty_prod_step_3;
    }

    public static String removal_empty_prod_step_3_1() {
        if (langs.equals("pt"))
            return StringLangsBR.removal_empty_prod_step_3_1;
        return StringLangs.removal_empty_prod_step_3_1;
    }

    public static String no_empty_prod() {
        if (langs.equals("pt"))
            return StringLangsBR.no_empty_prod;
        return StringLangs.no_empty_prod;
    }
    
    public static String chain_rules_algol_comment() {
        if (langs.equals("pt"))
            return StringLangsBR.chain_rules_algol_comment;
        return StringLangs.chain_rules_algol_comment;
    }
    
    public static String algol_chain_rule_grammar_step_1() {
        if (langs.equals("pt"))
            return StringLangsBR.algol_chain_rule_grammar_step_1;
        return StringLangs.algol_chain_rule_grammar_step_1;
    }
    
    public static String chain_rules_table_header() {
        if (langs.equals("pt"))
            return StringLangsBR.chain_rules_table_header;
        return StringLangs.chain_rules_table_header;
    }
    
    public static String algol_chain_rule_grammar_step_2() {
        if (langs.equals("pt"))
            return StringLangsBR.algol_chain_rule_grammar_step_2;
        return StringLangs.algol_chain_rule_grammar_step_2;
    }
    
    public static String algol_chain_rule_grammar_step_2_1() {
        if (langs.equals("pt"))
            return StringLangsBR.algol_chain_rule_grammar_step_2_1;
        return StringLangs.algol_chain_rule_grammar_step_2_1;
    }
    
    public static String algol_chain_rule_grammar_step_2_2() {
        if (langs.equals("pt"))
            return StringLangsBR.algol_chain_rule_grammar_step_2_2;
        return StringLangs.algol_chain_rule_grammar_step_2_2;
    }
    
    public static String algol_chain_rule_grammar_step_3() {
        if (langs.equals("pt"))
            return StringLangsBR.algol_chain_rule_grammar_step_3;
        return StringLangs.algol_chain_rule_grammar_step_3;
    }
    
    public static String algol_chain_rule_grammar_step_3_1() {
        if (langs.equals("pt"))
            return StringLangsBR.algol_chain_rule_grammar_step_3_1;
        return StringLangs.algol_chain_rule_grammar_step_3_1;
    }
    
    public static String algol_chain_rule_grammar_step_3_2() {
        if (langs.equals("pt"))
            return StringLangsBR.algol_chain_rule_grammar_step_3_2;
        return StringLangs.algol_chain_rule_grammar_step_3_2;
    }
    
    public static String chain_rule_algol() {
        if (langs.equals("pt"))
            return StringLangsBR.chain_rule_algol;
        return StringLangs.chain_rule_algol;
    }
    
    public static String term_cnf_comments() {
        if (langs.equals("pt"))
            return StringLangsBR.term_cnf_comments;
        return StringLangs.term_cnf_comments;
    }
    
    public static String term_cnf_step_1() {
        if (langs.equals("pt"))
            return StringLangsBR.term_cnf_step_1;
        return StringLangs.term_cnf_step_1;
    }
    
    public static String term_cnf_algol() {
        if (langs.equals("pt"))
            return StringLangsBR.term_cnf_algol;
        return StringLangs.term_cnf_algol;
    }
    
    public static String term_cnf_step_2() {
        if (langs.equals("pt"))
            return StringLangsBR.term_cnf_step_2;
        return StringLangs.term_cnf_step_2;
    }
    
    public static String term_cnf_result() {
        if (langs.equals("pt"))
            return StringLangsBR.term_cnf_result;
        return StringLangs.term_cnf_result;
    }

    public static String reach_cnf_comments() {
        if (langs.equals("pt"))
            return StringLangsBR.reach_cnf_comments;
        return StringLangs.reach_cnf_comments;
    }
    
    public static String reach_cnf_step_1() {
        if (langs.equals("pt"))
            return StringLangsBR.reach_cnf_step_1;
        return StringLangs.reach_cnf_step_1;
    }
    
    public static String reach_cnf_algol() {
        if (langs.equals("pt"))
            return StringLangsBR.reach_cnf_algol;
        return StringLangs.reach_cnf_algol;
    }
    
    public static String reach_cnf_step_2() {
        if (langs.equals("pt"))
            return StringLangsBR.reach_cnf_step_2;
        return StringLangs.reach_cnf_step_2;
    }
    
    public static String reach_cnf_step_2_1() {
        if (langs.equals("pt"))
            return StringLangsBR.reach_cnf_step_2_1;
        return StringLangs.reach_cnf_step_2_1;
    }
    
    public static String reach_cnf_step_comments_2() {
        if (langs.equals("pt"))
            return StringLangsBR.reach_cnf_step_comments_2;
        return StringLangs.reach_cnf_step_comments_2;
    }
    
    public static String textBox() {
        if (langs.equals("pt"))
            return StringLangsBR.textBox;
        return StringLangs.textBox;
    }
}
