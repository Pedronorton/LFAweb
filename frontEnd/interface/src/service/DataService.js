import Axios from "axios";

const URL = "http://localhost:8080";

class DataService {

    criaNonRecursiveInitial (dados) {
        console.log("DADOS VAR: " + dados.variables);
        console.log("DADOS WORD: " + dados.palavras);
        return Axios.post(`${URL}/${dados.palavra}/grammar/nonRecursiveInitial`, dados);
    }

    getGramatica () {
        return Axios.get(`${URL}/grammar`);
    }

    getGramaticaHTML () {
        return Axios.get(`${URL}/grammar/html`);
    }

}

export default new DataService();