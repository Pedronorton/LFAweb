import Axios from "axios";

const URL = "http://localhost:8080";

class DataService {

    criarGrammatica (dados) {
        return Axios.post(`${URL}/grammar`, dados);
    }

    getGramatica () {
        return Axios.get(`${URL}/grammar`);
    }


}

export default new DataService();