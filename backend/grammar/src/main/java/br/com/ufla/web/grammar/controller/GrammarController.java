package br.com.ufla.web.grammar.controller;

import java.net.URI;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
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
import br.com.ufla.web.grammar.model.AttrServ;
import br.com.ufla.web.grammar.service.GrammarService;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "localhost:3000", "localhost:4200",
		"https://immense-tundra-58333.herokuapp.com", "192.168.1.102:3000"})
@RestController
public class GrammarController {

	@Autowired
    private GrammarService grServ;

   
//    @GetMapping("/grammar/html")
//    public String getHtml () {
//        System.out.println("HTML : " + gr[1].toHtml());
//        return gr[1].toHtml() + "\n\n" +gr[1].HtmlWithColorInSpecialRules(gr[1].selectionRulesDiferent(gr[0].getRules()), "red");
//    }
//    
//    @GetMapping("/grammar")
//    public String getGrammar () {
//        System.out.println("grammar[1]: " + gr[1]);
//        return gr[1].toString();
//    }
	
	@ResponseBody
    @PostMapping("/grammar/HTML")
    public String CriaGramaticaHTML (@RequestBody AttrServ attrGCont ) {
    	
    	System.out.println("AttrServ: " + attrGCont.getVariables());
    	
    	grServ.setGramatica(attrGCont.getVariables());
    	
        Grammar gram = grServ.getGramatica();
           	
    	String stringGram =  gram.toHtml();
    	 
    	return stringGram;
    }
	
	@ResponseBody
	@PostMapping("/{palavra}/grammar/nonRecursiveInitial")
	public String[] CriaGramaticaNonRecursiveInitial (@PathVariable String palavra, @RequestBody AttrServ attrGCont ) {
		
	
	//	        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/nonRecursiveInitial").buildAndExpand(" ").toUri();
	
	//	        return ResponseEntity.created(uri).build();
	 	return grServ.getGrammarReady(attrGCont, 1);
	}

    @ResponseBody
    @PostMapping("/{palavra}/grammar/nonContracting")
    public String[] CriaGramaticaNonContracting (@PathVariable String palavra, @RequestBody AttrServ attrGCont ) {
        
    	
    	
//        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/nonContracting").buildAndExpand(" ").toUri();
//
//        return ResponseEntity.created(uri).build();
    	return grServ.getGrammarReady(attrGCont, 2);
    }
    
	@ResponseBody
	@PostMapping("/{palavra}/grammar/nonCascade")
	public String[] CriaGramaticaNonCascade (@PathVariable String palavra, @RequestBody AttrServ attrGCont ) {
	    
		
		
	//      URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/nonContracting").buildAndExpand(" ").toUri();
	//
	//      return ResponseEntity.created(uri).build();
	  	return grServ.getGrammarReady(attrGCont, 3);
	}

    
	@ResponseBody
	@PostMapping("/{palavra}/grammar/onlyTerm")
	public String[] CriaGramaticaOnlyTerm (@PathVariable String palavra, @RequestBody AttrServ attrGCont ) {
	    
		
		
	//      URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/nonContracting").buildAndExpand(" ").toUri();
	//
	//      return ResponseEntity.created(uri).build();
	  	return grServ.getGrammarReady(attrGCont, 4);
	}
	
	
	@ResponseBody
	@PostMapping("/{palavra}/grammar/onlyReach")
	public String[] CriaGramaticaOnlyReach (@PathVariable String palavra, @RequestBody AttrServ attrGCont ) {
	    
		
		
	//      URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/nonContracting").buildAndExpand(" ").toUri();
	//
	//      return ResponseEntity.created(uri).build();
	  	return grServ.getGrammarReady(attrGCont, 5);
	}

}