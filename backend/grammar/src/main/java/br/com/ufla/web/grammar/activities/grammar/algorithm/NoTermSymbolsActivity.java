package br.com.ufla.web.grammar.activities.grammar.algorithm;

import br.com.ufla.web.grammar.model.Rditto;
import br.com.ufla.web.grammar.utils.UtilActivities;
import br.com.ufla.web.grammar.core.AcademicSupport;
import br.com.ufla.web.grammar.core.Grammar;

import java.util.List;

/**
 * Created by root on 25/07/16.
 */
public class NoTermSymbolsActivity {

    /*
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setContentView(R.layout.activity_no_term_symbols);
        super.onCreate(savedInstanceState);
        setTitle();
        removingNotTerminalsSymbols(getGrammar());
    }

    private void setTitle() {
        switch(algorithm) {
            case CHOMSKY_NORMAL_FORM:
                setTitle(getResources().getString(R.string.lfapp_cnf_title)
                        + " - 4/6");
                break;
            case GREIBACH_NORMAL_FORM:
                setTitle(getResources().getString(R.string.lfapp_gnf_title)
                        + " - 4/7");
                break;
            case REMOVE_LEFT_RECURSION:
                setTitle(getResources().getString(R.string.lfapp_left_recursion_title)
                        + " - 4/7");
                break;
        }
    }

    @Override
    protected Grammar getGrammar() {
        switch(algorithm) {
            case CHOMSKY_NORMAL_FORM:
            case REMOVE_LEFT_RECURSION:
            case GREIBACH_NORMAL_FORM:
                Grammar g = new Grammar(grammar);
                g = g.getGrammarWithInitialSymbolNotRecursive(g, new
                        AcademicSupport());
                g = g.getGrammarEssentiallyNoncontracting(g, new
                        AcademicSupport());
                return g.getGrammarWithoutChainRules(g, new AcademicSupport());
            default: return super.getGrammar();
        }
    } */

    /*
    public void back(View view) {
        changeActivity(this, ChainRulesActivity.class);
    }

    public void next(View view) {
        changeActivity(this, NoReachSymbolsActivity.class);
    }*/

    public static String removingNotTerminalsSymbols(final AcademicSupport academicSupport) {
        //AcademicSupport academicSupport = new AcademicSupport();
        //Realiza processo
        Grammar gc = academicSupport.getOldGrammar();
        academicSupport.setResult(gc);

        //Realiza comentários sobre o processo
        StringBuilder comments = new StringBuilder();
        comments.append(Rditto.header())
                .append("</br>")
                .append(UtilActivities.grammarInput(academicSupport.getNewGrammar().toStringRulesMapLeftToRight()))
                .append(Rditto.term_cnf_comments())
                .append("</br></br>");

        if (academicSupport.getSituation()) {
            //Configura os comentários
            academicSupport.setComments(comments.toString());
            //TextView result = (TextView) findViewById(R.id.CommentsNoTerms);
            //result.setText(Html.fromHtml(academicSupport.getComments()));

            //Configura o primeiro passo (Montar conjuntos)
            comments.append(Rditto.term_cnf_step_1())
                    .append("</br></br>")
                    .append(getTermAlgorithm())
                    .append("</br>")
                    .append(UtilActivities.printTableOfSets(academicSupport,"TERM", "PREV"))
                    .append("</br>");

            //Configura o segundo passo (Regras que foram removidas)
            List<String> array = UtilActivities.convertSetToArray(academicSupport.getFirstSet().get(academicSupport.getFirstSet().size() - 1), gc);
            String variables = array.toString();
            variables = variables.replace("[", "{");
            variables = variables.replace("]", "}");
            Grammar g = academicSupport.getNewGrammar();
            String othersVariables = UtilActivities.selectOthersVariables(gc,
                    academicSupport.getFirstSet().get(academicSupport.getFirstSet().size() - 1));
            comments.append("</br>")
                    .append(Rditto.term_cnf_step_2() + variables +", \n i.e., "
                    + othersVariables +".");
            
            comments.append(UtilActivities.printOldGrammarOfTermAndReach(gc, g));
        } else {
            comments.append(Rditto.term_cnf_result());
        }
        
        return comments.toString();
    }

    /**
     * Método que retorna o pseudocódigo do algoritmo TERM
     * @return
     */
    public static String getTermAlgorithm() {
        return Rditto.term_cnf_algol();
    }
}
