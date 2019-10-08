package br.com.ufla.web.grammar.model;

public class AttrServ {
	private  String variables;
	private String lang;

	public String getVariables() {
		return variables;
	}

	public void setVariables(String variables) {
		this.variables = variables;
	}

	public void setLang(String lang) {
		this.lang = lang;
		Rditto.setLangs(lang);
	}
	

}
