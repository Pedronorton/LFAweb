package br.com.ufla.web.grammar.service;

import br.com.ufla.web.grammar.model.Rditto;

import org.springframework.stereotype.Service;

@Service
public class RdittoService {

	private String lang;

	public void setLang(String lang) {
		this.lang = lang;
	}
	
	public void constructorRditto () {
		Rditto.setLangs(lang);
	}
	
}
