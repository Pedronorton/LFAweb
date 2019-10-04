package br.com.ufla.web.grammar.service;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import br.com.ufla.web.grammar.core.Grammar;
import br.com.ufla.web.grammar.model.AttrServ;

@Service
public class GrammarService {
	
	private  Grammar gr;
//    private  String variables;

//    public void setVariables(String variables) {
//		this.variables = variables;
//	}
//    
//	public String getVariables() {
//		return variables;
//	}
    
	public Grammar getGramatica () {
		return gr;
	}

	public void setGramatica (String s) {
		
		System.out.println("GrammarService: " + s);
      	
        String initSym = s.split("\n")[0].split("->")[0].replace(" ", "");
        
        System.out.println("Simbolo Inicial: " + initSym);
        
        String[] listRules = s.split("\n");        
        String[] listVariables;
        String[] listTerminal;

        Set<String> var = new LinkedHashSet<>();
        Set<String> terminal = new LinkedHashSet<>();

        for (String rule : listRules) {
        	
        	//aSb bb
        	String[] temp = rule.split("->")[1].split("|");
        	
        	//S A
        	var.add(String.valueOf(rule.split("->")[0].replace(" ", "")));
        	
        	for (String tp : temp) {
        		for (int i = 0; i <  tp.length(); ++i) {
                    if ((Character.isLowerCase(tp.charAt(i)))) terminal.add(String.valueOf(tp.charAt(i)));
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
	
	
	public String[] getGrammarReady (AttrServ ats, int flag) {
		Grammar[] gr = new Grammar[2];
    	
    	System.out.println("getGrammarReady: " + ats.getVariables());
    	
    	
    	setGramatica(ats.getVariables());
    	
    	gr[0] = getGramatica();
    	
    	System.out.println(gr[0].toHtml());
    	
    	switch (flag) {
    		case 1: {
    			gr[1] = gr[0].getGrammarWithInitialSymbolNotRecursive(gr[0]).getNewGrammar();
    			break;
    		}
    		
    		case 2: {
    			gr[1] = gr[0].getGrammarEssentiallyNoncontracting(gr[0]).getNewGrammar();
    			break;
    		}
    		
    		case 3: {
    			gr[1] = gr[0].getGrammarWithoutChainRules(gr[0]).getNewGrammar();
    			break;
    		}
    		
    		case 4: {
    			gr[1] = gr[0].getGrammarWithoutNoTerm(gr[0]).getNewGrammar();
    			break;
    		}
    		
    		case 5: {
    			gr[1] = gr[0].getGrammarWithoutNoReach(gr[0]).getNewGrammar();
    			break;
    		}
    	}
    	
    	String[] vetString = new String[3];
    	
		vetString[0] =  gr[0].toHtml();
		vetString[1] =  gr[1].HtmlWithColorInSpecialRules(gr[1].selectionRulesDiferent(gr[0].getRules()), "red");
		vetString[2] =  gr[1].toString();
		
		
		return vetString;
	}
	
	
}
