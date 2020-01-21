import Axios from "axios";

const URL = "https://limitless-garden-05070.herokuapp.com";//"http://localhost:8080";

class DataService {

    criaNonRecursiveInitial (dados, cred) {
        return Axios.post(`${URL}/grammar/nonRecursiveInitial`, dados, cred);
    }

    criaNonContracting (dados, cred) {
        return Axios.post(`${URL}/grammar/nonContracting`, dados, cred);
    }

    criaNonCascade (dados, cred) {
        return Axios.post(`${URL}/grammar/nonCascade`, dados, cred);
    }

    criaOnlyTerm (dados, cred) {
        return Axios.post(`${URL}/grammar/onlyTerm`, dados, cred);
    }

    criaOnlyReach (dados, cred) {
        return Axios.post(`${URL}/grammar/onlyReach`, dados, cred);
    }

    criaGrId (dados, cred) {
        return Axios.post(`${URL}/grammar/grammaId`, dados, cred);
    }

    createChomsky (dados, cred) {

        return Axios.post(`${URL}/grammar/chomSky`, dados, cred);
    }


    createRemovingTheImmediateLeftRecursion (dados, cred) {
        return Axios.post(`${URL}/grammar/immedLeftRecursion`, dados, cred);
    }

    createCYK (dados, cred) {
        return Axios.post(`${URL}/grammar/cyk`, dados, cred);
    }



    criaHTML (dados, cred) {
        return Axios.post(`${URL}/a/grammar/HTML`, dados, cred);
    }

    getGramatica (cred) {
        return Axios.get(`${URL}/grammar`, cred);
    }

    getGramaticaHTML (cred) {
        return Axios.get(`${URL}/grammar/html`, cred);
    }

    //USER

    signUp (user) {
        return Axios.post(`${URL}/signUp`, user);
    }

    login(dataLogin) {
        return Axios.post(`${URL}/login`, dataLogin);
    }

    logout () {
        return Axios.put(`${URL}/logout`);
    }

    getUserByEmail (email, cred) {
        return Axios.get(`${URL}/user/${email}`, cred);
    }

    postSaveHistoricalGr (email, historicalGrammar, cred) {
        console.log("HEADERS HISTORY:");
        console.log(cred);
        return Axios.post(`${URL}/${email}/user/grammar`, historicalGrammar, cred);
    }

    updateUser (user, cred) {
        return Axios.put(`${URL}/user`, user, cred);
    }
    
    deleteUser (user, cred) {
        return Axios.delete(`${URL}/user`, user, cred);
    }

}

export default new DataService();