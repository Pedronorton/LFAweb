package br.com.ufla.web.grammar.model;

public class StringLangsBR {

    // NEW
    public final static String header = "<h3  style=" + "\"" +
            "color:red" + "\"" + ">" + "Algoritmo" + "</h3>";
    
    //NEW
    public final static String textBox = "Resultado";

    public final static String grammar_to_string_parameters = "Variáveis: #Terminais: #Símbolo inicial: # Regras:";
    public final static String esentially_noncontracting_problems_parameters = "- A regra # é uma produção vazia.";
    public final static String recursion_initial_symbol_solution_descr_parameters = "A gramática # possui o símbolo inicial # recursivo. Logo, existe uma GLC #\n"
            + "        tal que L(G\\') = L(G) e o novo símbolo inicial #  não é recursivo.";
    public final static String recursion_found_initial = "Recursão encontrada na regra";
    public final static String initial_symbol_not_recursive = "O símbolo inicial deve se limitar a iniciar derivações, não podendo ser uma variável recursiva.\n"
            + "        Logo, não deve ser possível ter derivações do tipo";

    public final static String nullable_algol = "NULL = {A | {A → λ} ∈ P}<br>\n" + "        <b>repita</b><br>\n"
            + "            &nbsp;&nbsp;&nbsp;&nbsp;\n" + "            PREV = NULL<br>\n"
            + "            &nbsp;&nbsp;&nbsp;&nbsp;\n" + "            <b>para cada</b> A ∈ V <b>faça</b><br>\n"
            + "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n"
            + "                <b>se</b> A → w e w ∈ PREV<sup>∗</sup> <b>faça</b><br>\n"
            + "                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n"
            + "                    NULL = NULL ∪ {A}<br>\n" + "        <b>até</b> NULL == PREV";
    public final static String removal_empty_prod_comments = "<p align=justify>O algoritmo para remoção de regras λ consiste em 3 passos:";
    public final static String removal_empty_prod_step_1 = "(1) Determinar o conjunto das variáveis anuláveis.";
    public final static String removal_empty_prod_step_2 = "(2) Adicionar regras em que as ocorrências de variáveis nulas são omitidas.\n"
            + "        Por exemplo, assuma a regra A → BABa e B é uma variável anulável.\n"
            + "        Logo, são inseridas as seguintes regras: A → ABa, A → BAa e A → Aa.";
    public final static String removal_empty_prod_step_2_1 = "(2) Não há regras a serem inseridas.";
    public final static String removal_empty_prod_step_3 = "(3) Remover as regras λ. OBS: se símbolo inicial produz λ, não remover esta regra.";
    public final static String removal_empty_prod_step_3_1 = "(3) Não há regras a serem removidas.";
    public final static String no_empty_prod = "A gramática inserida não possui produções vazias.";
    public final static String chain_rules_algol_comment = "A remoção de regras de cadeia substitui as ocorrências de uma cadeia\n" + 
            "        diretamente pelas regras da variável renomeada.";
    public final static String algol_chain_rule_grammar_step_1 = "(1) O primeiro passo do algoritmo é montar as cadeias de cada variável.";
    public final static String chain_rules_table_header = "Variável#Cadeia";
    public final static String algol_chain_rule_grammar_step_2 = "(2) Destacar as cadeias encontradas.";
    public final static String algol_chain_rule_grammar_step_2_1 = "(2) Na gramática inserida, existem auto cadeias.\n" + 
            "        Esse tipo de regra também deve ser removida.";
    public final static String algol_chain_rule_grammar_step_2_2 = "(2) Não há cadeias na gramática inserida.";
    public final static String algol_chain_rule_grammar_step_3 = "(3) Substituir as cadeias encontradas.";
    public final static String algol_chain_rule_grammar_step_3_1 = "(3) Na gramática inserida, existem auto cadeias.\n" + 
            "        Esse tipo de regra também deve ser removida.";
    public final static String algol_chain_rule_grammar_step_3_2 = "(3) Não há cadeias na gramática inserida.";
    public final static String chain_rule_algol = ""
            + "  <div style="+"\""+"text-align:left"+ "\";" +"> CHAIN(A) = {A}<br>\n" + 
            "        PREV = ∅<br>\n" + 
            "        <b>repita</b><br>\n" + 
            "            &nbsp;&nbsp;\n" + 
            "            NEW = CHAIN(A) − PREV<br>\n" + 
            "            &nbsp;&nbsp;\n" + 
            "            PREV = CHAIN(A)<br>\n" + 
            "            &nbsp;&nbsp;\n" + 
            "            <b>para cada</b> B ∈ NEW <b>faça</b><br>\n" + 
            "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" + 
            "                <b>para cada</b> B → C <b>faça</b><br>\n" + 
            "                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" + 
            "                    CHAIN(A) = CHAIN(A) ∪ {C}<br>\n" + 
            "                    <b>até</b> CHAIN(A) == PREV";
    public final static String term_cnf_comments = "Remove as regras que não geram terminais. Consiste de dois passos:";
    public final static String term_cnf_step_1 = "(1) Determinar quais variáveis geram terminais direta e indiretamente.";
    public final static String term_cnf_algol = ""
            + "  <div style="+"\""+"text-align:left"+ "\";" +"> TERM = {A | existe uma regra A → w ∈ P, com w ∈ Σ<sup>∗</sup> }<br>\n" + 
            "        <b>repita</b><br>\n" + 
            "            &nbsp;&nbsp;\n" + 
            "            PREV = TERM<br>\n" + 
            "            &nbsp;&nbsp;\n" + 
            "            <b>para cada</b> A ∈ V <b>faça</b><br>\n" + 
            "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" + 
            "                <b>se</b> A → w ∈ P e w ∈ (PREV ∪ Σ)<sup>∗</sup> <b>então</b><br>\n" + 
            "                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" + 
            "                    TERM = TERM ∪ {A}<br><b>até</b> PREV == TERM"
            + "</div>";
    public final static String term_cnf_step_2 = "(2) Remover as variáveis que não estão em";
    public final static String term_cnf_result = "Todas variáveis da gramática geram terminais.";
    public final static String reach_cnf_comments = "Remover as variáveis não alcançáveis no processo de derivação de uma palavra.";
    public final static String reach_cnf_step_1 = "(1) Determinar quais variáveis são alcançáveis a partir do símbolo inicial";
    public final static String reach_cnf_algol = ""
            + "  <div style="+"\""+"text-align:left"+ "\";" +">REACH = {S}<br>\n" + 
            "        PREV = ∅<br>\n" + 
            "        <b>repita</b><br>\n" + 
            "            &nbsp;&nbsp;&nbsp;\n" + 
            "            NEW = REACH − PREV<br>\n" + 
            "            &nbsp;&nbsp;&nbsp;\n" + 
            "            PREV = REACH<br>\n" + 
            "            &nbsp;&nbsp;&nbsp;\n" + 
            "            <b>para cada</b> A ∈ NEW <b>faça</b><br>\n" + 
            "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" + 
            "                <b>para cada</b> A → w <b>faça</b><br>\n" + 
            "                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" + 
            "                    adicione as variáveis de w em REACH<br><b>até</b> REACH == PREV"
            + "</div>";
    public final static String reach_cnf_step_2 = "(2) Remover as variáveis que não estão em";
    public final static String reach_cnf_step_2_1 = "(2) Todos os símbolos são alcançáveis.";
    public final static String reach_cnf_step_comments_2 = "Não há símbolos alcançáveis na gramática inserida.";
}
