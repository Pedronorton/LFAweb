package br.com.ufla.web.grammar.activities.grammar.algorithm;

import br.com.ufla.web.grammar.core.AcademicSupport;
import br.com.ufla.web.grammar.core.Grammar;
import br.com.ufla.web.grammar.core.Rule;
import br.com.ufla.web.grammar.model.Rditto;
import br.com.ufla.web.grammar.utils.UtilActivities;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by root on 22/07/16.
 */
public class ChainRulesActivity  {

//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        setContentView(R.layout.activity_chain_rules);
//        super.onCreate(savedInstanceState);
//        setTitle();
//        removingChainRules(getGrammar());
//    }
//
//    private void setTitle() {
//        switch(algorithm) {
//            case CHOMSKY_NORMAL_FORM:
//                setTitle(getResources().getString(R.string.lfapp_cnf_title)
//                        + " - 3/6");
//                break;
//            case GREIBACH_NORMAL_FORM:
//                setTitle(getResources().getString(R.string.lfapp_gnf_title)
//                        + " - 3/8");
//                break;
//            case REMOVE_LEFT_RECURSION:
//                setTitle(getResources().getString(R.string.lfapp_left_recursion_title)
//                        + " - 3/7");
//                break;
//        }
//    }

//    @Override
//    protected Grammar getGrammar() {
//        switch(algorithm) {
//            case CHOMSKY_NORMAL_FORM:
//            case REMOVE_LEFT_RECURSION:
//            case GREIBACH_NORMAL_FORM:
//                Grammar g = new Grammar(grammar);
//                g = g.getGrammarWithInitialSymbolNotRecursive(g, new
//                        AcademicSupport());
//                return g.getGrammarEssentiallyNoncontracting(g, new
//                        AcademicSupport());
//            default: return super.getGrammar();
//        }
//    }

//    public void back(View view) {
//        changeActivity(this, EmptyProductionActivity.class);
//    }
//
//    public void next(View view) {
//        changeActivity(this, NoTermSymbolsActivity.class);
//    }

    public static String removingChainRules(final AcademicSupport academic) {
        //AcademicSupport academic = new AcademicSupport();

        //Realiza comentários sobre o processo
        StringBuilder comments = new StringBuilder();
        comments.append(Rditto.header())
                .append("</br>")
                .append(UtilActivities.grammarInput(academic.getNewGrammar().toStringRulesMapLeftToRight()))
                .append(Rditto.chain_rules_algol_comment())
                .append("<br/><br/>");

        //Realiza processo
        Grammar gc = academic.getOldGrammar();
        //academic.setResult(gc);

        //Configura a gramática de resultado
        //TextView grammarResult = (TextView) findViewById(R.id.ResultGrammarWithoutChainRules);
//        grammarResult.setText(Html.fromHtml(academic.getResult()));

        //Configura os comentários do processo
        academic.setComments(comments.toString());
        //TextView commentsOfProcces =  (TextView) findViewById(R.id.CommentsChainRules);
        comments.append((Rditto.algol_chain_rule_grammar_step_1()))
                .append("</br>")
                .append(getChainAlgorithm())
                .append("</br></br>");
                //.append(academic.getComments())

        //Configura o primeiro passo do processo
        //TextView creatingSetOfChains =  (TextView) findViewById(R.id.RemovingChainRulesStep1);
        //creatingSetOfChains.setText(Rditto.algol_chain_rule_grammar_step_1());
        //TextView pseudo =  (TextView) findViewById(R.id.PseudoChainAlgorithm);
        //pseudo.setText(Html.fromHtml(getChainAlgorithm()));
        //TableLayout tableOfChains = (TableLayout) findViewById(R.id.TableOfChains);
        //tableOfChains.setShrinkAllColumns(true);
        final String[] HEADER_TABLE = Rditto.chain_rules_table_header().split("#");
        comments.append(printTableOfChains(academic, HEADER_TABLE[0], HEADER_TABLE[1]))
                .append("</br>");

        //configura o segundo passo do processo
        if (academic.getInsertedRules().size() != 0) {
            //TextView creatingGrammarWithoutChains =  (TextView) findViewById(R.id.RemovingChainRulesStep2);
            comments.append(Rditto.algol_chain_rule_grammar_step_2())
                    .append("<br/>");
            //TableLayout tableWithoutChains = (TableLayout) findViewById(R.id.GrammarWithChains);
            comments.append(UtilActivities.printGrammarWithoutOldRules(gc, academic.getNewGrammar()));
            
        } else if (academic.getIrregularRules().size() != 0) {
            //TextView creatingGrammarWithoutChains = (TextView) findViewById(R.id.RemovingChainRulesStep2);
            
            comments.append(Rditto.algol_chain_rule_grammar_step_2_1())
                    .append("<br/><br/>");
        } else {
            //TextView creatingGrammarWithoutChains = (TextView) findViewById(R.id.RemovingChainRulesStep2);
            comments.append(Rditto.algol_chain_rule_grammar_step_2_2())
                    .append("<br/><br/>");
        }

        //Configura o terceiro passo do processo
        if (academic.getInsertedRules().size() != 0) {
            //TextView creatingGrammarWithoutChains = (TextView) findViewById(R.id.RemovingChainRulesStep3);
            comments.append(Rditto.algol_chain_rule_grammar_step_3());
            //TableLayout tableWithoutChains = (TableLayout) findViewById(R.id.GrammarWithoutChains);
            Grammar g = createGrammarWithoutChainRules(academic.getOldGrammar());
            comments.append(UtilActivities.printGrammarWithNewRules(academic.getNewGrammar(), g));

        } else if (academic.getIrregularRules().size() != 0) {
            //TextView creatingGrammarWithoutChains = (TextView) findViewById(R.id.RemovingChainRulesStep3);
            comments.append(Rditto.algol_chain_rule_grammar_step_3_1());
        } else {
            //TextView creatingGrammarWithoutChains = (TextView) findViewById(R.id.RemovingChainRulesStep3);
            comments.append(Rditto.algol_chain_rule_grammar_step_3_2());
        }

        return comments.toString();
    }

    /**
     * Método que retorna o pseudocódigo do algoritmo chain
     * @return
     */
    public static String getChainAlgorithm() {
        return Rditto.chain_rule_algol();
    }

    /**
     * Método que imprime a tabela de chains
     * @param academic
     * @param nameOfFisrtCell
     * @param nameOfSecondCell
     * @return Retorna de chains em formato HTML
     */
    private static String printTableOfChains(final AcademicSupport academic, String nameOfFisrtCell,
            String nameOfSecondCell) {
        //Configura o cabeçalho da tabela
        int i = 0;
        StringBuilder mountTable = new StringBuilder();
        mountTable.append("<table style=\"font-family: arial, sans-serif;\n" + "  border-collapse: collapse;\n"
                + "  width: 100%;\">" + "<tr style=\"background-color:white; color: black\">" + "<th>   </th>" + "<th>"
                + nameOfFisrtCell + "</th>" + "<th>" + nameOfSecondCell + "</th>" + "</tr>");

        String backcolor = "grey";
        Iterator<Set<Rule>> iteratorOfFirstCell = (Iterator) academic.getFirstSet().iterator();
        Iterator<Set<Rule>> iteratorOfSecondCell = (Iterator) academic.getSecondSet().iterator();

        while (iteratorOfFirstCell.hasNext() && iteratorOfSecondCell.hasNext()) {

            Set<Rule> firstSet = iteratorOfFirstCell.next();
            Set<Rule> secondSet = iteratorOfSecondCell.next();

            String set1 = firstSet.toString();
            set1 = set1.replace("[", "{");
            set1 = set1.replace("]", "}");

            String set2 = secondSet.toString();
            set2 = set2.replace("[", "{");
            set2 = set2.replace("]", "}");

            mountTable.append("<tr style=\"background-color:" + backcolor + "; color: black\">").append("<td>")
                    .append("(" + i + ")").append("</td>");

            mountTable.append("<td>").append(set1).append("</td>");

            mountTable.append("<td>").append(set2).append("</td>").append("</tr>");

            i++;
            backcolor = (backcolor == "white") ? "grey" : "white";
        }
        mountTable.append("</table>");

        return mountTable.toString();
    }

    //NEW
    /**
     *Método que cria gramática sem variáveis da regra da cadeia
     *@param final Grammar : Gramática sem original
     *@return Grammar
     */
    private static Grammar createGrammarWithoutChainRules (final Grammar gr) {
        
        Grammar gClone = (Grammar) gr.clone();
        
        Set<Rule> ruleClone = new LinkedHashSet<>();
        
        for (Rule rule : gClone.getRules()) {
            if ( (!rule.getRightSide().equals(rule.getRightSide().toUpperCase()))
                    || ( (rule.getRightSide().equals(rule.getRightSide().toUpperCase())) 
                            && (rule.getRightSide().length() > 1)  ) ) {
                ruleClone.add(rule);
            }
        }
        gClone.setRules(ruleClone);
        System.out.println(gClone);
        return gClone;
    }

}
