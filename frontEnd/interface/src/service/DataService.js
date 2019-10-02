import Axios from "axios";

const URL = "http://localhost:8080";

class DataService {

    criaNonRecursiveInitial (dados) {
        console.log("DADOS VAR: " + dados.variables);
        console.log("DADOS WORD: " + dados.palavras);
        return Axios.post(`${URL}/${dados.palavra}/grammar/nonRecursiveInitial`, dados);
    }

    criaNonContracting (dados) {
        console.log("DADOS VAR: " + dados.variables);
        console.log("DADOS WORD: " + dados.palavras);
        return Axios.post(`${URL}/${dados.palavra}/grammar/nonContracting`, dados);
		}
		
		criaNonCascade (dados) {
			console.log("DADOS VAR: " + dados.variables);
			console.log("DADOS WORD: " + dados.palavras);
			return Axios.post(`${URL}/${dados.palavra}/grammar/nonCascade`, dados);
		}
		
		criaOnlyTerm (dados) {
			console.log("DADOS VAR: " + dados.variables);
			console.log("DADOS WORD: " + dados.palavras);
			return Axios.post(`${URL}/${dados.palavra}/grammar/onlyTerm`, dados);
		}
		
		criaOnlyReach (dados) {
			console.log("DADOS VAR: " + dados.variables);
			console.log("DADOS WORD: " + dados.palavras);
			return Axios.post(`${URL}/${dados.palvra}/grammar/onlyReach`, dados);
		}

    criaHTML (dados) {
        
        return Axios.post(`${URL}/grammar/HTML`, dados);
    }

    getGramatica () {
        return Axios.get(`${URL}/grammar`);
    }

    getGramaticaHTML () {
        return Axios.get(`${URL}/grammar/html`);
    }

}

export default new DataService();