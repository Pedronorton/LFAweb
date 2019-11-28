import Axios from "axios";

const URL = "http://192.168.1.104:8080";

class DataService {

    criaNonRecursiveInitial (dados) {
        console.log("DADOS VAR: " + dados.variables);
        console.log("DADOS WORD: " + dados.word);
        return Axios.post(`${URL}/grammar/nonRecursiveInitial`, dados);
    }

    criaNonContracting (dados) {
        console.log("DADOS VAR: " + dados.variables);
        console.log("DADOS WORD: " + dados.word);
        return Axios.post(`${URL}/grammar/nonContracting`, dados);
        }
        
    criaNonCascade (dados) {
        console.log("DADOS VAR: " + dados.variables);
        console.log("DADOS WORD: " + dados.word);
        return Axios.post(`${URL}/grammar/nonCascade`, dados);
    }
    
    criaOnlyTerm (dados) {
        console.log("DADOS VAR: " + dados.variables);
        console.log("DADOS WORD: " + dados.word);
        return Axios.post(`${URL}/grammar/onlyTerm`, dados);
    }
    
    criaOnlyReach (dados) {
        console.log("DADOS VAR: " + dados.variables);
        console.log("DADOS WORD: " + dados.word);
        return Axios.post(`${URL}/grammar/onlyReach`, dados);
    }

    criaGrId (dados) {
        console.log("DADOS VAR: " + dados.variables);
        console.log("DADOS WORD: " + dados.word);
        return Axios.post(`${URL}/grammar/grammaId`, dados);
    }

    createRemovingTheImmediateLeftRecursion (dados) {
        return Axios.post(`${URL}/grammar/immedLeftRecursion`, dados);
    }

    createCYK (dados) {
        return Axios.post(`${URL}/grammar/cyk`, dados);
    }

    criaHTML (dados) {
        return Axios.post(`${URL}/${dados.word}/grammar/HTML`, dados);
    }

    getGramatica () {
        return Axios.get(`${URL}/grammar`);
    }

    getGramaticaHTML () {
        return Axios.get(`${URL}/grammar/html`);
    }

    //USER
    getUserByEmail (email) {
        return Axios.get(`${URL}/user/${email}`);
    }

    postSigLogUser (user, ip) {
        return Axios.post(`${URL}/sign/${ip}`, user);
    }

    postSaveHistoricalGr (email, historicalGrammar) {
        return Axios.post(`${URL}/${email}/user/grammar`, historicalGrammar);
    }

    updateUser (user) {
        return Axios.put(`${URL}/user`, user);
    }
    
    deleteUser (user, ip) {
        return Axios.delete(`${URL}/user/${ip}`, user);
    }

    getConfirmUserLogged (IP) {
        return Axios.get(`${URL}/login/${IP}`);
    }

    putLogout (IP) {
        return Axios.put(`${URL}/logout/${IP}`);
    }
}

export default new DataService();