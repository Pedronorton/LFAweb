package br.com.ufla.web.grammar.controller;

import java.net.URI;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.ufla.web.grammar.core.Grammar;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "localhost:3000", "localhost:4200"})
@RestController
public class GrammarController {

    private Grammar[] gr = new Grammar[2];
    private String variables;

    public void setVariables(String variables) {
		this.variables = variables;
	}
    
    public String getVariables() {
		return variables;
	}

	public Grammar criaGramatica (String s) {
      	
		
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

        Grammar g = new Grammar(listVariables, listTerminal, initSym, listRules);

        return g;
    }

    @GetMapping("/grammar/html")
    public String getHtml () {
        System.out.println("HTML : " + gr[1].toHtml());
        return gr[1].toHtml() + "\n\n" +gr[1].HtmlWithColorInSpecialRules(gr[1].selectionRulesDiferent(gr[0].getRules()), "red");
    }
    
    @GetMapping("/grammar")
    public String getGrammar () {
        System.out.println("grammar[1]: " + gr[1]);
        return gr[1].toString();
    }

    @ResponseBody
    @PostMapping("/{palavra}/grammar/nonContracting")
    public String[] CriaGramaticaNonContracting (@PathVariable String palavra, @RequestBody GrammarController attrGCont ) {
        
    	System.out.println("nonContracting: " + attrGCont.getVariables());
    	System.out.println(gr[0].toHtml());
    	
    	Grammar gram = criaGramatica(attrGCont.getVariables());
    	gr[0] = gram;
    	gr[1] = gram.getGrammarEssentiallyNoncontracting(gram).getNewGrammar();
    	
    	String[] vetString = new String[3];
    	
		vetString[0] =  gr[0].toHtml();
		vetString[1] =  gr[1].HtmlWithColorInSpecialRules(gr[1].selectionRulesDiferent(gr[0].getRules()), "red");
		vetString[2] =  gr[1].toString();
    	
//        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/nonContracting").buildAndExpand(" ").toUri();
//
//        return ResponseEntity.created(uri).build();
		return vetString;
    }

    @ResponseBody
    @PostMapping("/{palavra}/grammar/nonRecursiveInitial")
    public String[] CriaGramaticaNonRecursiveInitial (@PathVariable String palavra, @RequestBody GrammarController attrGCont ) {
    	
    	
    	System.out.println("attrGCont.getVariables(): " + attrGCont.getVariables());
        Grammar gram = criaGramatica(attrGCont.getVariables());
        gr[0] = gram;
    	gr[1] = gram.getGrammarWithInitialSymbolNotRecursive(gram).getNewGrammar();
    	
    	String[] vetString = new String[3];
    	
		 vetString[0] =  gr[0].toHtml();
		 vetString[1] =  gr[1].HtmlWithColorInSpecialRules(gr[1].selectionRulesDiferent(gr[0].getRules()), "red");
		 vetString[2] =  gr[1].toString();

//        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/nonRecursiveInitial").buildAndExpand(" ").toUri();

//        return ResponseEntity.created(uri).build();
    	 return vetString;
    }
    
    @ResponseBody
    @PostMapping("/grammar/HTML")
    public String CriaGramaticaHTML (@RequestBody GrammarController attrGCont ) {
    	
        Grammar gram = criaGramatica(attrGCont.getVariables());
           	
    	String stringGram;
    	
    	stringGram =  gram.toHtml();
    	 
    	return stringGram;
    }

}