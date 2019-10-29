package br.com.ufla.web.grammar.utils;

import br.com.ufla.web.grammar.model.Rditto;
import br.com.ufla.web.grammar.core.AcademicSupport;
import br.com.ufla.web.grammar.core.Grammar;
import br.com.ufla.web.grammar.core.Rule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by root on 21/07/16.
 */
public class UtilActivities {

    public static void logMap(Map<? extends Object, ? extends Object> mapa) {
        StringBuilder sb = new StringBuilder('[');
        for (Map.Entry<? extends Object, ? extends Object> entry : mapa.entrySet()) {
            sb.append(" {").append(entry.getKey().toString()).append(',').append(entry.getValue().toString())
                    .append("},");
        }
        sb.deleteCharAt(sb.length() - 1);

    }

    private UtilActivities() {

    }

    /**
     * Método que imprime a gramática com as regras irregulares em destaque
     * 
     * @param table
     * @param academic
     */
    public static String printGrammarWithoutOldRules(final Grammar graFusion, final Grammar grNEW) {
        System.out.print("RED GRAMMAR" + "\n" + graFusion);
        System.out.print("RED new" + "\n" + grNEW);
        return graFusion.HtmlWithColorInSpecialRules(graFusion.selectionRulesDiferent(grNEW.getRules()) , "red");
    }

    /**
     * Método que conta o número de dígitos a partir do índice fornecido
     * 
     * @param index
     * @param element
     * @return
     */
    private static int getNumberOfDigits(int index, String element) {
        int i = index;
        for (; i < element.length() && Character.isDigit(element.charAt(i)); i++)
            ;
        // i = (i == element.length() ? (i - 1) : (i));
        return i;
    }

    /**
     * Método que imprime a gramática com as novas regras inseridas em destaque
     * 
     * @param table
     * @param academic
     */
    public static String printGrammarWithNewRules(final Grammar grFusionNew, final Grammar grOld) {
        System.out.print("BLUE GRAMMAR" + "\n" + grFusionNew);
        System.out.print("BLUE new" + "\n" + grOld);
        return grFusionNew.HtmlWithColorInSpecialRules(grFusionNew.selectionRulesDiferent(grOld.getRules()) , "blue");
    }

    /**
     * Método que faz a tabela do algoritmo de eliminação de regras Lambdas
     * 
     * @param academic : informaçãos coletadas durante a execução do algoritmo
     * @return String : Retorna uma tabela em HTML dos anuláveis
     */
    public static String printTableOfSets(final AcademicSupport academic, String nameOfFirstSet,
            String nameOfSecondSet) {
        int i = 0;
        StringBuilder mountTable = new StringBuilder();
        mountTable.append("<table style=\"font-family: arial, sans-serif;\n" + "  border-collapse: collapse;\n"
                + "  width: 100%;\">" + "<tr style=\"background-color:white; color: black\">" + "<th>   </th>" + "<th>"
                + nameOfFirstSet + "</th>" + "<th>" + nameOfSecondSet + "</th>" + "</tr>");

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

    //converte um set em arraylist ordenando-o com o simbolo inicial da gramatica na primeira posicao
    public static List<String> convertSetToArray(Set<String> set, Grammar
            grammar) {
        List<String> array = new ArrayList<>();
        for (String variable : set) {
            if (!variable.equals(grammar.getInitialSymbol())) {
                array.add(variable);
            }
        }
        array.add(0, grammar.getInitialSymbol());
        return array;
    }

    public static String selectOthersVariables(Grammar g, Set<String> set) {
        List<String> array = new ArrayList<>();
        for (String variable : g.getVariables()) {
            if (!set.contains(variable))
                array.add(variable);
        }
        String aux = array.toString();
        aux = aux.replace("[", "{");
        aux = aux.replace("]", "}");
        return aux;
    }

    /**
     * Método que imprime a gramática com as regras irregulares em destaque
     * @param grammar
     * @param table
     * @param academic
     */
    public static String printOldGrammarOfTermAndReach(final Grammar grMOD, final
                                                Grammar grOLD
                                                ) {

        System.out.print("TERM GRAMMAR" + "\n" + grMOD);
        System.out.print("TERM new" + "\n" + grOLD);
        return grMOD.HtmlWithColorInSpecialRules(grMOD.selectionRulesDiferent(grOLD.getRules()) , "red");
    }
    
    
    //NEW
    public static String grammarInput (String grHTML) {
        return "<div style=\"border: 1px solid black;\n" + 
                "            width: 30VH;\n" + 
                "            text-align: center;\">\n" + 
                "  <b style=\"font-size: 14px;\">"+ Rditto.textBox() +": </b><br/>\n" +
                grHTML + "  \n" + "</div>" + "</br>";
    }

}
