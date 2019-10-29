package br.com.ufla.web.grammar.activities.grammar.algorithm;

import br.com.ufla.web.grammar.core.AcademicSupport;
import br.com.ufla.web.grammar.core.Grammar;
import br.com.ufla.web.grammar.core.Rule;
import br.com.ufla.web.grammar.model.Rditto;
import br.com.ufla.web.grammar.utils.UtilActivities;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * Created by root on 25/07/16.
 * Modified by Andrew on 29/10/2019.
 */
public class NoReachSymbolsActivity {

//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        setContentView(R.layout.activity_no_reach_symbols);
//        super.onCreate(savedInstanceState);
//        setTitle();
//        removingNotReachableSymbols(getGrammar());
//    }
//
//    private void setTitle() {
//        switch(algorithm) {
//            case CHOMSKY_NORMAL_FORM:
//                setTitle(getResources().getString(R.string.lfapp_cnf_title)
//                        + " - 5/6");
//                break;
//            case GREIBACH_NORMAL_FORM:
//                setTitle(getResources().getString(R.string.lfapp_gnf_title)
//                        + " - 5/7");
//                break;
//            case REMOVE_LEFT_RECURSION:
//                setTitle(getResources().getString(R.string.lfapp_left_recursion_title)
//                        + " - 5/7");
//                break;
//        }
//    }
//
//    @Override
//    protected Grammar getGrammar() {
//        switch(algorithm) {
//            case CHOMSKY_NORMAL_FORM:
//            case REMOVE_LEFT_RECURSION:
//            case GREIBACH_NORMAL_FORM:
//                Grammar g = new Grammar(grammar);
//                g = g.getGrammarWithInitialSymbolNotRecursive(g, new
//                        AcademicSupport());
//                g = g.getGrammarEssentiallyNoncontracting(g, new
//                        AcademicSupport());
//                g = g.getGrammarWithoutChainRules(g, new AcademicSupport());
//                return g.getGrammarWithoutNoTerm(g, new AcademicSupport());
//            default: return super.getGrammar();
//        }
//    }
//
//    public void back(View view) {
//        changeActivity(this, NoTermSymbolsActivity.class);
//    }
//
//    public void next(View view) {
//        changeActivity(this, ChomskyNormalFormActivity.class);
//    }

    public static String removingNotReachableSymbols(final AcademicSupport academic) {
        Grammar gc = academic.getNewGrammar();
//        AcademicSupport academic = new AcademicSupport();
        StringBuilder comments = new StringBuilder();

        //Realiza processo
        //gc = gc.getGrammarWithoutNoReach(gc, academic);
        //academic.setResult(gc);

        //Realiza comentários sobre o processo
        comments.append(Rditto.header())
                .append("</br>")
                .append(UtilActivities.grammarInput(academic.getNewGrammar().toStringRulesMapLeftToRight()))
                .append(Rditto.reach_cnf_comments())
                .append("</br>");
//                .append(academic.getResult());//Mostra o resultado do processo

        if (academic.getSituation()) {
            //Configura comentários
            academic.setComments(comments.toString());
            

            //Primeiro passo do processo (Construção dos Conjuntos)
            
            comments.append(Rditto.reach_cnf_step_1() + gc.getInitialSymbol() + ".")
                    .append("</br>")
                    .append(getReachAlgorithm())
                    .append("</br>")
                    .append(printTableOfReachSets(academic, "REACH", "PREV", "NEW"))
                    .append("</br>");

            //Segundo passo do processo (Eliminar os símbolos não terminais)
            if (academic.getIrregularRules().size() != 0) {

                List<String> array = UtilActivities.convertSetToArray
                        (academic.getFirstSet
                        ().get(academic.getFirstSet().size() - 1), gc);
                String variables = array.toString();
                variables = variables.replace("[", "{");
                variables = variables.replace("]", "}");
                Grammar g = academic.getOldGrammar();
                String othersVariables = UtilActivities.selectOthersVariables(g, academic.getFirstSet().get(academic.getFirstSet().size() - 1));
                comments.append(Rditto.reach_cnf_step_2() + variables + ", i.e., " + othersVariables +".")
                        .append(UtilActivities.printOldGrammarOfTermAndReach(g, gc));
            } else {
                comments.append(Rditto.reach_cnf_step_2_1());
            }

        } else {
            comments.append(Rditto.reach_cnf_step_comments_2());
        }
        return comments.toString();
    }

    /**
     * Método que retorna o pseudocódigo do algoritmo  REACH
     * @return
     */
    private static String getReachAlgorithm() {
        StringBuilder algol = new StringBuilder();
        algol.append(Rditto.reach_cnf_algol());
        return algol.toString();
    }

    /**
     * Método faz tabela dos conjuntos utilizados durante a execução do algoritmo REACH
     * @param academic : informaçãos coletadas durante a execução do algoritmo
     * @param nameOfFirstSet : cabeçalho da primeira coluna
     * @param nameOfSecondSet : cabeçalho da segunda coluna
     * @param nameOfThirdSet : cabeçalho da terceira coluna
     * @return String : tabela do conjuto REACH
     */
    private static String printTableOfReachSets(final AcademicSupport academic,
        final String nameOfFirstSet, final String nameOfSecondSet,
                                      final String nameOfThirdSet) {
        int i = 0;
        StringBuilder mountTable = new StringBuilder();
        mountTable.append("<table style=\"font-family: arial, sans-serif;\n" + 
                "border-collapse: collapse;\n" + "  width: 100%;\">" +
                "<tr style=\"background-color:white; color: black\">" +
                    "<th>   </th>" +
                    "<th>" + nameOfFirstSet + "</th>" +
                    "<th>" + nameOfSecondSet + "</th>" +
                    "<th>" + nameOfThirdSet + "</th>" +
                    "</tr>");

        String backcolor = "grey";

        Iterator<Set<Rule>> iteratorOfFirstCell = (Iterator) academic.getFirstSet().iterator();
        Iterator<Set<Rule>> iteratorOfSecondCell = (Iterator) academic.getSecondSet().iterator();
        Iterator<Set<Rule>> iteratorOfThirdCell = (Iterator) academic.getThirdSet().iterator();

        while (iteratorOfSecondCell.hasNext()) {
            Set<Rule> firstSet = iteratorOfFirstCell.next();
            Set<Rule> secondSet = iteratorOfSecondCell.next();
            Set<Rule> thirdSet = iteratorOfThirdCell.next();

            String set1 = firstSet.toString();
            set1 = set1.replace("[", "{");
            set1 = set1.replace("]", "}");

            String set2 = secondSet.toString();
            set2 = set2.replace("[", "{");
            set2 = set2.replace("]", "}");

            String set3 = thirdSet.toString();
            set3 = set3.replace("[", "{");
            set3 = set3.replace("]", "}");

            mountTable.append("<tr style=\"background-color:" + backcolor + "; color: black\">").append("<td>")
            .append("(" + i + ")").append("</td>");

            mountTable.append("<td>").append(set1).append("</td>");

            mountTable.append("<td>").append(set2).append("</td>");

            mountTable.append("<td>").append(set3).append("</td>").append("</tr>");

            i++;
            backcolor = (backcolor == "white") ? "grey" : "white";
        }
        mountTable.append("</table>");

        return mountTable.toString();
    }

}
