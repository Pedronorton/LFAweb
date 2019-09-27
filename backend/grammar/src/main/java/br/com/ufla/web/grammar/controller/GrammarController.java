package br.com.ufla.web.grammar.controller;

import java.net.URI;

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
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.ufla.web.grammar.core.Grammar;

@SessionScope
@CrossOrigin(origins = {"http://locahost:3000", "http://localhost:4200"})
@RestController
public class GrammarController {

    private Grammar gramatica;

    @GetMapping("/grammar")
    public String getHtml () {
        System.out.println(gramatica.toHtml());
        return gramatica.toHtml();// gramatica.toString();
    }

    @ResponseBody
    @PostMapping("/{palavra}/grammar/nonContracting")
    public ResponseEntity<Void> CriaGramaticaNonContracting (@PathVariable String palavra, @RequestBody Grammar g ) {
        gramatica = g.getGrammarEssentiallyNoncontracting(g).getNewGrammar();

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/nonContracting").buildAndExpand(" ").toUri();

        return ResponseEntity.created(uri).build();
    }

    @ResponseBody
    @PostMapping("/{palavra}/grammar/nonRecursiveInitial")
    public ResponseEntity<Void> CriaGramaticaNonRecursiveInitial (@PathVariable String palavra, @RequestBody Grammar g ) {
        
    	gramatica = g.getGrammarWithInitialSymbolNotRecursive(g).getNewGrammar();

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/nonRecursiveInitial").buildAndExpand(" ").toUri();

        return ResponseEntity.created(uri).build();
    }
}