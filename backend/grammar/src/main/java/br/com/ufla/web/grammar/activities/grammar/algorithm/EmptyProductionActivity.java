package br.com.ufla.web.grammar.activities.grammar.algorithm;

import br.com.ufla.web.grammar.core.AcademicSupport;
import br.com.ufla.web.grammar.core.Grammar;
import br.com.ufla.web.grammar.core.Rule;
import br.com.ufla.web.grammar.model.Rditto;
import br.com.ufla.web.grammar.utils.UtilActivities;

/**
 * Created by root on 21/07/16.
 */
public class EmptyProductionActivity {

    /**
     * Método que junta duas gramáticas em um String
     * 
     * @param grammar1
     * @param grammar2
     * @return
     */
    public static String joinGrammars(final Grammar grammar1, final Grammar grammar2) {
        StringBuilder newG = new StringBuilder();

        for (Rule element : grammar2.getRules()) {
            if (element.getLeftSide().equals(grammar1.getInitialSymbol()) && !grammar1.getRules().contains(element)) {
                newG.append(element);
                newG.append("\n");
            }
        }

        for (Rule element : grammar1.getRules(/* grammar1.getInitialSymbol() */)) {
            newG.append(element).append("\n");
        }

        for (Rule element : grammar1.getRules()) {
            if (!element.getLeftSide().equals(grammar1.getInitialSymbol())) {
                newG.append(element);
                newG.append("\n");
            }
        }
        for (Rule element : grammar2.getRules()) {
            if (!element.getLeftSide().equals(grammar1.getInitialSymbol()) && !grammar1.getRules().contains(element)) {
                newG.append(element);
                newG.append("\n");
            }
        }
        return newG.toString();
    }

    /**
     * Método que retorna o pseudocódigo do algoritmo nullable
     * 
     * @return
     */
    public static String getNullableAlgorith() {
        return Rditto.nullable_algol();
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
     * Método que realiza a remoção de produções vazias e acrescenta as informações
     * acadêmicas.
     * 
     * @param g : Gramática
     * @return String : O resultado completo de como foi feito RemovalEmpty
     */
    public static String removingEmptyProductions(final AcademicSupport academicSupport) {
//        AcademicSupport academicSupport = new AcademicSupport();
        Grammar g = academicSupport.getNewGrammar();
        StringBuilder academicInfoComments = new StringBuilder();

        // Configura comentários sobre o processo
        academicInfoComments.append(Rditto.header())
                            .append("</br>")
                            .append(UtilActivities.grammarInput(academicSupport.getNewGrammar().toStringRulesMapLeftToRight()));
        academicSupport.setComments(academicInfoComments.toString());

        // Realiza processo
        Grammar gc = academicSupport.getOldGrammar();//(Grammar) g.clone();// g.getGrammarEssentiallyNoncontracting(g, academicSupport);
        //academicSupport.setResult(gc);

        // configura a gramática de resultado
//        TextView grammarResult = (TextView) findViewById(R.id.ResultGrammarEmptyProductions);
//        assert grammarResult != null;
        // grammarResult.setText(Html.fromHtml(academicSupport.getResult()));

        if (academicSupport.getSituation()) {
            // Configura os comentários sobre a solução
//            TextView result = (TextView) findViewById(R.id.AnswerOfEmptyProductions);
//            result.setText(academicSupport.getComments());

            // Configuração do passo 1 (Tabela dos conjuntos)
//            TextView explanation1 = (TextView) findViewById(R.id.ExplanationEmptyRules1);
//            explanation1.setText(Html.fromHtml(getString(R.string.removal_empty_prod_step_1)));
//            TextView pseudo =(TextView) findViewById(R.id.PseudoNullableAlgorith);
//            assert pseudo != null;
//            pseudo.setText(Html.fromHtml(getNullableAlgorith()));
//            TableLayout tableOfSets = (TableLayout) findViewById(R.id.TableOfSets);
//            tableOfSets.setShrinkAllColumns(true);
//            tableOfSets.setBackgroundColor(getResources().getColor(R.color.Gainsboro));

            academicInfoComments.append(Rditto.removal_empty_prod_comments())
                    .append("<br/><br/>")
                    .append(Rditto.removal_empty_prod_step_1())
                    .append("<br/>")
                    .append(getNullableAlgorith())
                    .append(UtilActivities.printTableOfSets(academicSupport, "NULL", "PREV"))
                    .append("<br/>");

            // Configuração do passo 2 (Gramática com as regras criadas no processo)
            if (academicSupport.getInsertedRules().size() != 0) { // RESOLVER AQUI NÃO ESTÁ ENTRANDO
//                TextView explanation2 = (TextView) findViewById(R.id.ExplanationEmptyRules2);
//                explanation2.setText(R.string.removal_empty_prod_step_2);
//                TableLayout grammarWithNewRules = (TableLayout) findViewById(R.id.AddingRulesTable);
//                Grammar blueGrammar = new Grammar(joinGrammars(gc, g));
//                UtilActivities.printGrammarWithNewRules(blueGrammar,
//                        grammarWithNewRules,
//                        academicSupport, this);
                academicInfoComments.append(Rditto.removal_empty_prod_step_2())
                                    .append("<br/>");
                Grammar blueGrammar = new Grammar(joinGrammars(gc, g));
                
                academicInfoComments.append(UtilActivities.printGrammarWithNewRules(blueGrammar, academicSupport.getOldGrammar()))
                                    .append("<br/>");
            } else {

                academicInfoComments.append(Rditto.removal_empty_prod_step_2_1())
                                    .append("<br/>");
            }

            // Configuração do passo 3 (Gramática com as regras irregulares removida)
            if (academicSupport.getIrregularRules().size() != 0) {

                academicInfoComments.append(Rditto.removal_empty_prod_step_3())
                                    .append("</br>");
                Grammar redGrammar = new Grammar(joinGrammars(gc, g));
                academicInfoComments.append(UtilActivities.printGrammarWithoutOldRules(redGrammar, academicSupport.getNewGrammar()));
            } else {
                academicInfoComments.append(Rditto.removal_empty_prod_step_3_1());
            }

        } else {

            academicInfoComments.append(Rditto.no_empty_prod());
        }
        return academicInfoComments.toString();
    }

}