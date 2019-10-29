package br.com.ufla.web.grammar.service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import br.com.ufla.web.grammar.activities.grammar.algorithm.EmptyProductionActivity;
import br.com.ufla.web.grammar.activities.grammar.algorithm.ChainRulesActivity;
import br.com.ufla.web.grammar.activities.grammar.algorithm.NoTermSymbolsActivity;
import br.com.ufla.web.grammar.activities.grammar.algorithm.NoReachSymbolsActivity;

import br.com.ufla.web.grammar.core.AcademicSupport;
import br.com.ufla.web.grammar.core.Grammar;
import br.com.ufla.web.grammar.core.Rule;
import br.com.ufla.web.grammar.model.AttrServ;

@Service
public class GrammarService {

    private Grammar gr;
//    private  String variables;

//    public void setVariables(String variables) {
//		this.variables = variables;
//	}
//    
//	public String getVariables() {
//		return variables;
//	}

    public Grammar getGramatica() {
        return gr;
    }

    public void setGramatica(String s) {

        System.out.println("GrammarService: " + s);

        String initSym = s.split("\n")[0].split("→")[0].replace(" ", "");

        System.out.println("Simbolo Inicial: " + initSym);

        String[] listRules = s.split("\n");
        String[] listVariables;
        String[] listTerminal;

        Set<String> var = new LinkedHashSet<>();
        Set<String> terminal = new LinkedHashSet<>();

        for (String rule : listRules) {

            // aSb bb
            String[] temp = rule.split("→")[1].split("|");

            for (String tp : temp) {
                System.out.println("terminais: " + tp);
            }

            // S A
            var.add(String.valueOf(rule.split("→")[0].replace(" ", "")));

            for (String tp : temp) {
                for (int i = 0; i < tp.length(); ++i) {
                    if ((Character.isLowerCase(tp.charAt(i))))
                        terminal.add(String.valueOf(tp.charAt(i)));
                    else if (tp.charAt(i) == '|')
                        terminal.add(String.valueOf("λ"));
                }
            }

        }

        listVariables = new String[var.size()];
        int i = 0;
        for (String v : var) {
            listVariables[i] = v;
            ++i;
        }

        listTerminal = new String[terminal.size()];
        i = 0;
        for (String t : terminal) {
            listTerminal[i] = t;
            ++i;
        }

//        System.out.println("inicial: " + initSym);
//        
//        System.out.print("Termis : ");
//        for(String t : listTerminal) {
//        	System.out.print(t + " ");
//        }
//        System.out.println();
//        
//        System.out.print("vars : ");
//        for(String v : listVariables) {
//        	System.out.print(v + " ");
//        }
//        System.out.println();
//      
//        System.out.print("Rules : ");
//        for(String r : listRules) {
//        	System.out.print(r + " ");
//        }
//        System.out.println();

        gr = new Grammar(listVariables, listTerminal, initSym, listRules);

//        return g;
    }
    
    
    public List<String[]> criaVetHTML (final Grammar gr) {

        List<String[]> listDataGrammar = new ArrayList<>();
        
        String[] vetVar = new String[gr.getVariables().size()];
        int i = 0;
        for (String vr : gr.getVariables()) {
            vetVar[i] = vr;
            ++i;
        }
   
        String[] vetTer = new String[gr.getTerminals().size()];
        i = 0;
        for (String ter : gr.getTerminals()) {
            vetTer[i] = ter;
            ++i;
        }
        
        String[] vetRules = new String[gr.getRules().size()];
        i = 0;
        for (Rule rules : gr.getRules()) {
            vetRules[i] = rules.toString();
            ++i;
        }
        
        String[] arr = new String[2];
        arr[0] = gr.getInitialSymbol();
        arr[1] = gr.toStringRulesMapLeftToRight();
        
        listDataGrammar.add(arr);
        listDataGrammar.add(vetVar);
        listDataGrammar.add(vetTer);
        listDataGrammar.add(vetRules);
        
        return listDataGrammar;
    }

    public String[] getGrammarReady(AttrServ ats, int flag) {
        Grammar[] gr = new Grammar[2];
        String solutionComplete = "";

        System.out.println("getGrammarReady: " + ats.getVariables());

        setGramatica(ats.getVariables());

        gr[0] = getGramatica();

        System.out.println(gr[0].toHtml());

        AcademicSupport acadsup;
        switch (flag) {
            case 1: {
                acadsup = gr[0].getGrammarWithInitialSymbolNotRecursive(gr[0]);
                solutionComplete = acadsup.getComments() + acadsup.getSolutionDescription();
                gr[1] = acadsup.getNewGrammar();
                break;
            }
    
            case 2: {
                acadsup = gr[0].getGrammarEssentiallyNoncontracting(gr[0]);
                gr[1] = acadsup.getNewGrammar();
                solutionComplete = EmptyProductionActivity.removingEmptyProductions(acadsup);
                break;
            }
    
            case 3: {
                acadsup = gr[0].getGrammarWithoutChainRules(gr[0]);
                gr[1] = acadsup.getNewGrammar();
                solutionComplete = ChainRulesActivity.removingChainRules(acadsup);
                break;
            }
    
            case 4: {
                acadsup = gr[0].getGrammarWithoutNoTerm(gr[0]);
                gr[1] = acadsup.getNewGrammar();
                solutionComplete = NoTermSymbolsActivity.removingNotTerminalsSymbols(acadsup);
                break;
            }
    
            case 5: {
                acadsup = gr[0].getGrammarWithoutNoReach(gr[0]);
                gr[1] = acadsup.getNewGrammar();
                solutionComplete = NoReachSymbolsActivity.removingNotReachableSymbols(acadsup);
                break;
            }
        }

        System.out.println("Solution : " + solutionComplete);

        String[] vetString = new String[4];

        vetString[0] = gr[0].toHtml();
        vetString[1] = gr[1].HtmlWithColorInSpecialRules(gr[1].selectionRulesDiferent(gr[0].getRules()), "red");
        vetString[2] = gr[1].toString();
        vetString[3] = solutionComplete;
        
        return vetString;
    }

}
