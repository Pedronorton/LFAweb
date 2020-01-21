import React, {Component} from 'react';
import DataService from "../service/DataService";
import { withRouter } from "react-router-dom";
import {Popover, OverlayTrigger, ButtonToolbar} from "react-bootstrap";
import { Alert } from 'reactstrap';
import Popup from '../component/Popup';
import Cookie from "js-cookie";

import './css/Main.css';
import HistoricoIcon from "../img/tempo-restante.svg";
import InfoIcon from "../img/160px-Infobox_info_icon.svg.png";

import Accordion from "react-collapsy";
import "../../node_modules/react-collapsy/lib/index.css";

import "./css/ShakeInfoButton.css";

// import Doubt from "../img/doubtII.png";
import "../../node_modules/font-awesome/css/font-awesome.css";
import "./css/PopUps.css";

import Content from "../component/Content";

class Main extends Component {
    
    constructor (props) {
        super(props);
        this.timer = 0;
        this.state = {
            word: "",
            variables: "",
            vari: {
                varHTML: "",
                varNRIS: "",
                varENC: "",
                varNC: "",
                varOT: "",
                varOR: "",
                varIdGr: "",
                varRemRecDir: "",
                varCYK: "",

                varChomSky: "",
                varChomSkyNRIS: "",
                varChomSkyENC: "",
                varChomSkyNC: "",
                varChomSkyOT: "",
                varChomSkyOR: "",
                varChomSkyRDI: "",
                varChomFNG: ""
            },
            grammarV: "",
            grammarE: "",
            grammarP: "",
            grammarS: "",
            index : 0,
            displayLang: {
                lWord : ["Word","Palavra"],
                lDeion : ["If you want to verify acceptances and derivations","Se você quiser verificar aceitações e derivações"],
                lGrammar : ["Grammar","Gramática"],
                lSubmit : ["GO !","Vamos !"],
                lInitialNonRec : ["Initial non recursive","Inicial não recusivo"],
                lEsseniallyNonContract : ["Essentially non contractile","Essencialmente não contrátil"],
                lNonCascade : ["No chain rules","Sem regras da cadeia"],
                lOnlyTerm : ["Only terminals","Apenas terminais"],
                lOnlyReach : ["Only reachable","Apenas alcançáveis"],
                lChomsky: "Chomsky & Greibach",
                lIdGrammar: ["Grammar Identification", "Identificação da Gramática"],
                limmedLeftRecursion: ["Removal of Direct Left Recursion", "Remoção de Recursão Direta"],
                lCYK: "CYK",
                descToggleLambda: ["point", "ponto"],
                descToggleGrammar : ["click me", "Clique aqui"],
                arrow: ["arrow", "seta"],
                descToggleArrow: "->",
                lSolutionCompleteNRIS: "",
                lSolutionCompleteENC: "",
                lSolutionCompleteNC: "",
                lSolutionCompleteOT: "",
                lSolutionCompleteOR: "",
                lSolutionCompleteRemRecDir: "",

                lSolutionCompleteChsNRIS: "",
                lSolutionCompleteChsENC: "",
                lSolutionCompleteChsNC: "",
                lSolutionCompleteChsOT: "",
                lSolutionCompleteChsOR: "",
                lSolutionCompleteChomSky: "",
                lSolutionCompleteRDI: "",
                lSolutionCompleteChsFNG: ""
            },

            lang: "en",
            activateOtherPage: null,
            diplayPop: "none",

            seconds: 0,
            buttonInfoShake: "freeze",

            buttonValidationSubmit: "danger",
            visibleAlert: false,

            menssage: "is empty field grammar",

            user: {
                id: this.props.mainUser.id,
                name: this.props.mainUser.name,
                email: this.props.mainUser.email,
                dateCreation: this.props.mainUser.dateCreation,
                historicalGrammar: (this.props.mainUser.historicalGrammar.length === undefined)?
                    [] : this.props.mainUser.historicalGrammar
            },
            mainOpacity: this.props.mainOpacity,
            mainPointerEvents: this.props.mainPointerEvents,
            showPopup: false,
            stepHeight: ["2.5em", "2.5em", "2.5em", "2.5em", "2.5em", "2.5em", "2.5em", "2.5em", "2.5em", "2.5em", "2.5em", "2.5em", "2.5em"],
            stepOverflowY: ["hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden",
                            "hidden", "hidden"],

            mainCredential: this.props.mainAuthorization
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validation = this.validation.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.writeHist = this.writeHist.bind(this);
        this.historicoFunction = this.historicoFunction.bind(this);
        this.clickStep = this.clickStep.bind(this);
    }

    reload () {
        alert("Falha de login ");
        Cookie.remove('token', { path: '/' });
        Cookie.remove('userMail', { path: '/' });
        window.location.href = "/";
    }
    
    onChange (values) {

        let tempGrammar = values;
        let len = values.length;
        let wordTest = values[len-2] + values[len-1];

        let wordTesLambda = values.split(".");

        // Condição que verifica se houve split, se houve é porque existe ponto.
        if ( wordTesLambda.length > 1) {
            wordTesLambda[0] = wordTesLambda[0] + "λ" + wordTesLambda[1];
            tempGrammar = wordTesLambda[0];
            this.setState( {variables : wordTesLambda[0] } );
        }else if (wordTest === "->"){
            let tmp = values.split("->");
            tmp[0] += "→";
            tempGrammar = tmp[0];
            this.setState({variables: tmp[0]});
        }else {
            
            this.setState( {variables : values});

            tempGrammar = values;
        }
        

        if (this.validation(tempGrammar))
            this.setState({buttonValidationSubmit : "success"});
        else this.setState({buttonValidationSubmit : "danger"});
    }

    validation (text) {


        if (text.length <= 2) {
   
            return false;
        }

        let rules = text.split("\n");
        
        for (let rule of rules) {

 
            if ((rule === "") || (rule === " ")) //Não tem necessidade de verificar espaços
                continue;

            let tmpR = rule.split("→");
            if ((tmpR[0] === rule) || (tmpR.length > 2)) {

                if (this.state.lang === "pt")
                    this.setState({menssage: "Faltando →"});
                else this.setState({menssage: "Without →"});
                return false;
            }
            if ((tmpR[0] === " ") || (tmpR[0] === "") ||
            (tmpR[1] === " ") || (tmpR[1] === "")) {

                if (this.state.lang === "pt")
                    this.setState({menssage: "gramática invalida"});
                else this.setState({menssage: "invalid grammar"});
                return false;
            }

            let tmpR2 = tmpR[1].split("|");
            for (let varTer of tmpR2) {
                
                if ((varTer === "") || (varTer === " ")) {

                    if (this.state.lang === "pt")
                        this.setState({menssage: "Faltando regra após |"});
                    else this.setState({menssage: "Without rule after |"});
                    return false;
                }
            }
            
        }
        
        // Lista das Variáriaveis da regra da esquerda
        let tmp = rules[0].split("→");
        //let tmp2 = tmp[1].split("|");
        
        let rightSide = [];
        for (let rule of rules) {
            let aux = rule.replace(/ /g,'');

            aux = aux.split("→");
            if (aux.length > 1){
                aux = aux[1].split("|");
                for (let v of aux){
                    rightSide.push(v);
                }
            }
        }
        
        let variablesTemp = [];
        let popped;
        for (let r of rules) {
            tmp = r.split("→");
            variablesTemp.push(tmp[0].trim());
        }
        variablesTemp.reverse();
        popped = variablesTemp.pop();

        //Lista de regra da direita do S -> A 
        let listRule = [];
        let leftSide = variablesTemp;
        leftSide.push(popped);
        let eqif = 1;
        for (let v of rightSide) {
            for (let l of v) {

                if (l.toUpperCase() === l && !leftSide.includes(l) &&!(/[0-9]/.test(l))) {

                    eqif = 0;
                }
            }
        }
        
        /*for (let v of tmp2) {
            let elem = v.trim();
            if (elem.toUpperCase() === elem && popped !== elem)//se entra no if, o botão fica vermelho
                listRule.push(v.trim());
            else if (elem.length > 1) {
                for (let l of elem) {
                    if (l.toUpperCase() === l)
                        listRule.push(l.trim());
                }
            }
        }*/

        if (!eqif) {
            let subtractionElem = [];

            listRule.every( elem => {
                if (!variablesTemp.includes(elem)){subtractionElem.push(elem); }
                return 0;
            } );

            if (this.state.lang === "pt")
                this.setState({menssage: `Sua gramática não está definido ${subtractionElem.toString()}
                como regra da esquerda.`});
            else this.setState({menssage: `Your grammar not definided ${subtractionElem.toString()}
                in left rule`});
            return false;
        }

        return true;
    }
 
    historicoFunction() {

        if (this.state.user.historicalGrammar.length > 0) {
            let grString = [];
            
            for (let hg of this.state.user.historicalGrammar) {
               
                grString.push(<div className="itemFuncHis" dangerouslySetInnerHTML={{__html:
                            "<button class='btn btn-primary'>WordInput: " + hg.wordInput + "<br/>" +
                                "GrammarInput: " + hg.grammar + "<br/><br/></button>"}}
                onClick={_ => this.writeHist(hg)} ></div>);
            }
            
            return grString;
        } else return "Sem Dados";
    
    }
    
    writeHist(hg){
        
        this.togglePopup();
        // this.onChange(gram);
        this.setState({variables: hg.grammar,
                        word: hg.wordInput,
                        buttonValidationSubmit : "success"
                        });
    }
    
    onSubmit (values) {

        if (this.state.buttonValidationSubmit === "success") {
            if (values.word === "") {
                values.word = " ";
            }
            
            let dados = {
                word: values.word,
                variables: values.variables,
                activateOtherPage: values.variables,
                lang: this.state.lang
            };
        
            this.setState({variables: dados.variables});
            
            this.setState({activateOtherPage: dados.activateOtherPage});
    
            this.setState({word: dados.word});
    
            let hg = {
                grammar: dados.variables,
                wordInput: dados.word,
            }
    
            DataService.criaHTML(dados, this.state.mainCredential)
                .then(
                    DataService.postSaveHistoricalGr(this.state.user.email, hg, this.state.mainCredential)
                        .then(
                            response => {
                                this.setState({user: response.data});

                            }
                        )
                        .catch(
                            error => {
                                alert("Falha ao salvar histórico");
                            }
                        )
                )
                .then(
                    response => {
                                        
                        let vetV = "{";
                        let count = 0;
                        for (let elem of response.data[1]){
                            count ++;
                            vetV += elem;
                            if (count < response.data[1].length){
                                vetV += ", ";
                            }
                        }
                        vetV+="}";
                        count = 0;
                        let vetE = "{";
                        for (let elem of response.data[2]){
                            count ++;
                            vetE += elem;
                            if (count < response.data[2].length){
                                vetE += ", "
                            }
                        }
                        vetE+="}";
                        let vetP = "{";
                        count = 0;
                        let count1 = 0;
                        for (let elem of response.data[3]){
                            vetP += elem;
                            count++;
                            count1++;
                            if (count < response.data[3].length){
                                vetP += ", ";
                                if (count1 === 3){
                                    count1 = 0;
                                    vetP+="<br>";
                                }
                            }
                        }
                        vetP+="}";
                        this.setState({varHTML: <div className="grammarInput">
                                <br/><div style={{"font-size":"124%"}} dangerouslySetInnerHTML={{__html: '<h4>G:</h4><ul style="list-style-type:none"><li>' +
                                response.data[0][1] +"</li></ul>" }}/><br/></div>,
                                grammarV: <div className="grammarAttributes" dangerouslySetInnerHTML={{__html: vetV}}></div>,
                                grammarE: <div className="grammarAttributes" dangerouslySetInnerHTML={{__html: vetE}}></div>,
                                grammarP: <div className="grammarAttributes" dangerouslySetInnerHTML={{__html: vetP}}></div>,
                                grammarS: <div className="grammarAttributes" dangerouslySetInnerHTML={{__html: "{" + response.data[0][0] + "}"}}></div>
                        });
                    }
                ).then(_ => this.props.history.push(`/`))
                .catch(
                    error => {
                        this.reload();
                    }
                );

            } else {
                this.setState({ visibleAlert: true,
                                buttonInfoShake: "constant"
                });
                this.startTimer();
            }

    }

    /*Pegar os dados ao apertar o botão e fazer post e
    retornar a gramática modificada caso tenha símbolo
    inicial recursivo.
    */
    onSubmitNonRecursiveInitialSymbol (values) {
        let dados = {
            word: values.word,
            variables: values.variables
        };
        
       
        DataService.criaNonRecursiveInitial(dados, this.state.mainCredential)
            
            .then(
                response => {
                       
                    this.setState({varNRIS: <div> <br/>                   
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}} /></div>,
                    lSolutionCompleteNRIS: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: response.data[3]}}/></div> });
                }
            ).then(_ => this.props.history.push(`/`))
            .catch(
                error => {
                    this.reload();
                }
            );

    }


    /*Pegar os dados ao apertar o botão e fazer post e
    retornar a gramática modificada caso tenha regras contráteis
    */
    onSubmitNonContracting (values) {
        let dados = {
            word: values.word,
            variables: values.variables
        };
         
        DataService.criaNonContracting(dados, this.state.mainCredential)
            .then(
                response => {
                 
                    this.setState({varENC: <div><br/>
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}} /></div>,
                    lSolutionCompleteENC: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: response.data[3]}}/></div> });
                }
            ).then(_ => this.props.history.push(`/`))
            .catch(
                error => {
                    this.reload();
                }
            );
        }
        
    onSubmitNonCascade (values) {

        let dados ={
            word: values.word,
            variables: values.variables
        };
        
        DataService.criaNonCascade(dados, this.state.mainCredential).then(
            response => {

                
                // this.setState({variables: response.data[2]});
                this.setState({varNC: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/>
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}}/>
                </div>,
                lSolutionCompleteNC: <div className="popUpAccord">
                    <div dangerouslySetInnerHTML={{__html: response.data[3]}}/></div>});
            }
        ).catch(
            error => {
                this.reload();
            }
        )
    }
    
    onSubmitOnlyTerm (values) {
 
        let dados ={
            word: values.word,
            variables: values.variables
        };
        
        DataService.criaOnlyTerm(dados, this.state.mainCredential).then(
            response => {
      
                // this.setState({variables: response.data[2]});
                this.setState({varOT: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/>
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}}/></div>,
                    lSolutionCompleteOT: <div className="popUpAccord">
                         <div dangerouslySetInnerHTML={{__html: response.data[3]}}/></div>});
            }
        ).catch(
            error => {
                this.reload();
            }
        )
    }
    
    onSubmitOnlyReach (values) {

        let dados ={
            word: values.word,
            variables: values.variables
        };
        
        DataService.criaOnlyReach(dados, this.state.mainCredential).then(
            response => {
                   
                // this.setState({variables: response.data[2]});
                this.setState({varOR: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/><div dangerouslySetInnerHTML={{__html: response.data[1]}}/></div>,
                    lSolutionCompleteOR: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: response.data[3]}}/></div> });
            }
        ).catch(
            error => {
                this.reload();
            }
        );
    }

    onRequestIdGrammar(values) {
         let dados ={
            word: values.word,
            variables: values.variables
        };

           DataService.criaGrId(dados, this.state.mainCredential).then(
            response => {
 
                this.setState({varIdGr: <div>
                    <br/><div dangerouslySetInnerHTML={{__html: response.data[1]}}/></div>
                     });

            }
        ).catch(
            error => {
                this.reload();
            }
        )
    }

    onSubmitImmedLeftRecursion(values) {
         let dados ={
            word: values.word,
            variables: values.variables
        };
        
        DataService.createRemovingTheImmediateLeftRecursion(dados, this.state.mainCredential).then(
            response => {
                         
                // this.setState({variables: response.data[2]});
                this.setState({varRemRecDir: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/><div dangerouslySetInnerHTML={{__html: response.data[1]}}/></div>,
                    lSolutionCompleteRemRecDir: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: response.data[3]}}/></div> });
            }
        ).catch(
            error => {
                this.reload();
            }
        );
    }


    onSubmitCYK(values) {
         let dados ={
            word: values.word,
            variables: values.variables
        };
        
        DataService.createCYK(dados, this.state.mainCredential).then(
            response => {
                    
                // this.setState({variables: response.data[2]});
                this.setState({varCYK: <div>
                    <br/><div dangerouslySetInnerHTML={{__html: response.data[1]}}/></div>});
            }
        ).catch(
            error => {
                this.reload();
            }
        );
    }
    
    onSubmitChomsky(values){
        let dados ={
            word: values.word,
            variables: values.variables
        };

        DataService.createChomsky(dados, this.state.mainCredential).then(
            response => {
                
                let vetTemp = response.data[0].split('*++*');

                this.setState({varChomSkyNRIS: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/><div dangerouslySetInnerHTML={{__html: vetTemp[0]}}/></div>,
                    lSolutionCompleteChsNRIS: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: vetTemp[1]}}/></div> });
                
                vetTemp = response.data[1].split('*++*');

                this.setState({varChomSkyENC: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/><div dangerouslySetInnerHTML={{__html: vetTemp[0]}}/></div>,
                    lSolutionCompleteChsENC: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: vetTemp[1]}}/></div> });

                vetTemp = response.data[2].split('*++*');

                this.setState({varChomSkyNC: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/><div dangerouslySetInnerHTML={{__html: vetTemp[0]}}/></div>,
                    lSolutionCompleteChsNC: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: vetTemp[1]}}/></div> });
                

                vetTemp = response.data[3].split('*++*');

                this.setState({varChomSkyOT: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/><div dangerouslySetInnerHTML={{__html: vetTemp[0]}}/></div>,
                    lSolutionCompleteChsOT: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: vetTemp[1]}}/></div> });
                
                vetTemp = response.data[4].split('*++*');

                this.setState({varChomSkyOR: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/><div dangerouslySetInnerHTML={{__html: vetTemp[0]}}/></div>,
                    lSolutionCompleteChsOR: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: vetTemp[1]}}/></div> });

                
                vetTemp = response.data[5].split('*++*');

                this.setState({varChomSky: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/><div dangerouslySetInnerHTML={{__html: vetTemp[0]}}/></div>,
                    lSolutionCompleteChomSky: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: vetTemp[1]}}/></div> });


                vetTemp = response.data[6].split('*++*');

                this.setState({varChomSkyRDI: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/><div dangerouslySetInnerHTML={{__html: vetTemp[0]}}/></div>,
                    lSolutionCompleteRDI: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: vetTemp[1]}}/></div> });

                
                vetTemp = response.data[7].split('*++*');

                this.setState({varChomFNG: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/><div dangerouslySetInnerHTML={{__html: vetTemp[0]}}/></div>,
                    lSolutionCompleteChsFNG: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: vetTemp[1]}}/></div> });
               

            }
        ).catch(
            error => {
                this.reload();
            }
        );
    }




    componentDidMount () {
        let lang = navigator.languages;
        if (lang.includes("pt")) {
            this.setState({lang: "pt",
                            menssage: "Está vazio o campo da gramática",
                            index: 1});
        }
        
    }

    componentDidUpdate(prevProps) {
        
        if ((this.props.mainOpacity !== prevProps.mainOpacity)
        || this.props.mainPointerEvents !== prevProps.mainPointerEvents ) {
            this.setState({user: this.props.mainUser,
                mainOpacity: this.props.mainOpacity,
                mainPointerEvents: this.props.mainPointerEvents,
                mainCredential: this.props.mainAuthorization
                            })
        }

        let tempVarProps = this.props.mainUser.historicalGrammar;
        let tempVarPrevs = prevProps.mainUser.historicalGrammar;
        if (tempVarProps === undefined) tempVarProps = [];
        if (tempVarPrevs === undefined) tempVarPrevs = [];

        if ( tempVarProps.length > tempVarPrevs.length)
            this.setState({user: this.props.mainUser});
    }

    startTimer() {
        if (this.state.seconds === 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
    }
    
    countDown() {
        // Remove one second, set state so a re-render happens.
        let secondsCount = this.state.seconds + 1;
        this.setState({seconds: secondsCount});
        
        // Check if we're at zero.
        if (secondsCount === 2) { 
            clearInterval(this.timer);
            this.setState({
                buttonInfoShake: "freeze",
                seconds: 0
            });
        }
    }
    
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    
    clickStep(i) {
        let stepH = this.state.stepHeight.slice();
        let stepO = this.state.stepOverflowY.slice();
        if(stepH[i] >= "2.5em"){
            stepH[i] = "17em";
            stepO[i] = "scroll";
        }
        else{
            document.getElementById("i"+i).scrollTo(0, 0);
            stepH[i] = (i === 11) ? "3.5em" : "2.5em";
            stepO[i] = "hidden";
        }
        this.setState({
            stepHeight: stepH,
            stepOverflowY: stepO
        });
    }
    
    render() {

        if (!this.state.activateOtherPage) {

            return (
                <React.Fragment>
                    <Alert color="danger" isOpen={this.state.visibleAlert} toggle={_ => this.setState({visibleAlert: false})}>
                        {this.state.menssage}
                    </Alert>

                    <div style={{display:this.state.diplayPop}}>
                        <Content close={_ => this.setState({diplayPop : "none"})} numImg={this.state.numG}/>
                    </div>
                    <div className="row body" id="main-body" style={{opacity: this.state.mainOpacity, pointerEvents: this.state.mainPointerEvents}}>
                        <div className="col-lg-4 col-md-3 col-sm-0"></div>
                        <div className="col-12 col-sm-8 col-lg-3 col-md-4" id="text-area">
                            <div className="gramatica">
                                <p>
                                    {this.state.displayLang.lGrammar[this.state.index]}: <br/>
                                    <textarea name="gramatica" className="campo gramatica" id="grammar-text" value={this.state.variables} 
                                    onChange={event => this.onChange(event.target.value)} />
                                </p>
                                
                            </div>
                            <br/>
                            <div className="palavra">
                                <p><input placeholder={this.state.displayLang.lWord[this.state.index] + " (" + this.state.displayLang.lDeion[this.state.index]+")" }
                                name="palavra" className="campo campo-palavra" value={this.state.word} 
                                onChange={event => this.setState({word : event.target.value})} /></p> <br/>
                            </div>
                        </div>
                        <div className="col-12 col-sm-4 col-md-3 col-lg-2">

                            <section className="submit-div">

                                <div className="submit-button">
                                    <button type="button" className={`btn btn-success ${this.state.buttonValidationSubmit} btn-m btn-b`} id="ok"
                                    onClick={_ => this.onSubmit(this.state)}>{this.state.displayLang.lSubmit[this.state.index]}</button>
                                </div>
                
                                
                                    <ButtonToolbar>
                                        <OverlayTrigger 
                                        trigger={'focus'} key="top" placement="top"
                                        overlay={
                                            <Popover id="popover-positioned-top">
                                                <Popover.Title as="div">Tutorial</Popover.Title>
                                                    <Popover.Content>
                                                        <div class="btn-group-toggle" data-toggle="buttons">
                                                            
                                                            <button className="btn btn-secondary btnLabel"onClick={ _ => {
                                                                this.setState({diplayPop: "block", numG: 1}) }  }>
                                                                <div className="tooltiphtml">
                                                                    <input type="radio" name="options" id="option1" autocomplete="off"/>{this.state.displayLang.lGrammar[this.state.index]}
                                                                    <span className="tooltiptext">
                                                                        {this.state.displayLang.descToggleGrammar[this.state.index]} 
                                                                    </span>
                                                                </div>
                                                            </button>

                                                            <button className="btn btn-secondary btnLabel" onClick={ _ => {
                                                                this.setState({diplayPop: "block"}) } }>
                                                                <div className="tooltiphtml">
                                                                    <input type="radio" name="options" id="option1" autocomplete="off"/>Lambda
                                                                    <span className="tooltiptext">
                                                                        {this.state.displayLang.descToggleLambda[this.state.index]}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                                
                                                            <button className="btn btn-secondary btnLabel"onClick={ _ => {
                                                                this.setState({diplayPop: "block", numG: 2}) }  }>
                                                                <div className="tooltiphtml">
                                                                    <input type="radio" name="options" id="option1" autocomplete="off"/>{this.state.displayLang.arrow[this.state.index]}
                                                                    <span className="tooltiptext">
                                                                        {this.state.displayLang.descToggleArrow} 
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </Popover.Content>
                                            </Popover>
                                        }>
                                            <div className={`btn-m shake-slow shake-${this.state.buttonInfoShake} `}>
                                                <button type="button" className="btn btn-info" title="Tutorial">
                                                    <b id="lambda"> <img alt="" src={InfoIcon} width="24"/> </b>
                                                </button>
                                            </div>
                                        </OverlayTrigger>
                                    </ButtonToolbar>

                                <div className="hist-popup">
                                    
                                    <button type = "button" className = "btn btn-time btn-m" onClick={this.togglePopup.bind(this)}><img alt="" src={HistoricoIcon} width="24"/></button>
                                    {this.state.showPopup ?
                                    <Popup
                                        className="hist-popup" 
                                        text={this.historicoFunction()} 
                                        closePopup={this.togglePopup.bind(this)} />
                                    : null
                                    }
                                    
                                </div>
                               
                            </section>
                        </div>
                        <div className = "col-sm-0 col-md-1 col-lg-2"></div>
                        
                    </div>
                    
                </React.Fragment>
                
                
                
            );
        } else {
            
            return(
                <React.Fragment>
                    <div className="container grid grid-template-columns-5 conteudo" id="gramDesc">
                        <div className="item G">
                        </div>
                        <div className="item V">
                            {this.state.grammarV}
                        </div>
                        <div className="item E">
                            {this.state.grammarE}
                        </div>
                        <div className="item P">
                            {this.state.grammarP}
                        </div>
                        <div className="item S">
                            {this.state.grammarS}
                        </div>
                    </div>
                    <br/>
                    
                    <br/>
                    <div className="container grid grid-template-columns-3 conteudo">

                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lIdGrammar[this.state.index]}
                                onToggle={_ => this.onRequestIdGrammar(this.state)}>
                                    <p>{this.state.varIdGr}</p>
                            </Accordion>
                        </div>
                        
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lInitialNonRec[this.state.index]}
                                onToggle={_ => this.onSubmitNonRecursiveInitialSymbol(this.state)}>
                                    <div className="internal-gram">
                                        {this.state.varNRIS}
                                    </div>
                                    <div className="Internal" id="i0" onClick={_ => this.clickStep(0)} style={{height: this.state.stepHeight[0], "overflow-y": this.state.stepOverflowY[0]}}>
                                        {this.state.lSolutionCompleteNRIS}
                                    </div>
                               
                            </Accordion>
                        </div>

                        <div className="item">
                        <Accordion 
                            title={this.state.displayLang.lEsseniallyNonContract[this.state.index]}
                            onToggle={_ => this.onSubmitNonContracting(this.state)}>
                                <div className="internal-gram">
                                        {this.state.varENC}
                                    </div>
                               
                                <div className="Internal" id="i1" onClick={_ => this.clickStep(1)} style={{height: this.state.stepHeight[1], "overflow-y": this.state.stepOverflowY[1]}}>
                                        {this.state.lSolutionCompleteENC}
                                </div>
                                
                        </Accordion>
                            
                        </div>
                        
                    </div>
                    <div className="container grid grid-template-columns-3 conteudo">

                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lNonCascade[this.state.index]}
                                onToggle={_ =>this.onSubmitNonCascade(this.state)}>
                                    <div className="internal-gram">
                                        {this.state.varNC}
                                    </div>

                                    <div className="Internal" id="i2" onClick={_ => this.clickStep(2)} style={{height: this.state.stepHeight[2], "overflow-y": this.state.stepOverflowY[2]}}>
                                        {this.state.lSolutionCompleteNC}
                                    </div>

                            </Accordion>
                            
                        </div>


                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lOnlyTerm[this.state.index]}
                                onToggle={_ =>this.onSubmitOnlyTerm(this.state)}>
                                    <div className="internal-gram">
                                        {this.state.varOT}
                                    </div>
                                    
                                    <div className="Internal" id="i3" onClick={_ => this.clickStep(3)} style={{height: this.state.stepHeight[3], "overflow-y": this.state.stepOverflowY[3]}}>
                                        {this.state.lSolutionCompleteOT}
                                    </div>
                                            

                            </Accordion>
                        
                        </div>
                    
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lOnlyReach[this.state.index]}
                                onToggle={_ => this.onSubmitOnlyReach(this.state)}>
                                    <div className="internal-gram">
                                        {this.state.varOR}
                                    </div>
                                    
                                    <div className="Internal" id="i4" onClick={_ => this.clickStep(4)} style={{height: this.state.stepHeight[4], "overflow-y": this.state.stepOverflowY[4]}}>
                                        {this.state.lSolutionCompleteOR}
                                    </div>

                            </Accordion>
                        </div>

                    </div>

                    <div className="container grid grid-template-columns-3 conteudo">
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.limmedLeftRecursion[this.state.index]}
                                onToggle={_ => this.onSubmitImmedLeftRecursion(this.state)}>
                                    <div className="internal-gram">
                                        {this.state.varRemRecDir}
                                    </div>
                                    
                                    <div className="Internal" id="i5" onClick={_ => this.clickStep(5)} style={{height: this.state.stepHeight[5], "overflow-y": this.state.stepOverflowY[5]}}>
                                        {this.state.lSolutionCompleteRemRecDir}
                                    </div>
                            </Accordion>
                        </div>

                        <div className="item cyk">
                            <Accordion 
                                title={this.state.displayLang.lCYK}
                                onToggle={_ => this.onSubmitCYK(this.state)}>
                                    <div className="internal-gram cyk">
                                        <div className="cymk">
                                            {this.state.varCYK}
                                        </div>
                                    </div>
                            </Accordion>
                        </div>

                        
                    </div>
                    <div className="container grid grid-template-columns-1 conteudo">
                        <div className="item">
                            <Accordion title={this.state.displayLang.lChomsky} onToggle={_=>this.onSubmitChomsky(this.state)}>
                                
                                <div className="internal-gram">
                                    {this.state.varChomSky}
                                </div>
                                <div className="container grid grid-template-columns-3 conteudo">
                                    <div id="initial-non-recursive-chomsky" className="item i-chomsky">
                                        <div className="accordion_chomsky_internal">{this.state.displayLang.lInitialNonRec[this.state.index]}</div>
                                        <div className="internal-gram">
                                            {this.state.varChomSkyNRIS}
                                        </div> 
                                        <div className="Internal" id="i6" onClick={_ => this.clickStep(6)} style={{height: this.state.stepHeight[6], "overflow-y": this.state.stepOverflowY[6]}}>
                                            {this.state.lSolutionCompleteChsNRIS}
                                        </div>
                                    </div>

                                    <div id="essentially-non-contractile-chomsky" className="item i-chomsky">
                                        <div className="accordion_chomsky_internal">{this.state.displayLang.lEsseniallyNonContract[this.state.index]}</div>
                                        <div className="internal-gram">
                                            {this.state.varChomSkyENC}
                                        </div>
                                        <div className="Internal" id="i7" onClick={_ => this.clickStep(7)} style={{height: this.state.stepHeight[7], "overflow-y": this.state.stepOverflowY[7]}}>
                                            {this.state.lSolutionCompleteChsENC}
                                        </div>
                                    </div>
                                    <div id="no-chain-rules-chomsky" className="item i-chomsky">
                                        <div className="accordion_chomsky_internal">{this.state.displayLang.lNonCascade[this.state.index]}</div>
                                        <div className="internal-gram">
                                            {this.state.varChomSkyNC}
                                        </div>
                                        <div className="Internal" id="i8" onClick={_ => this.clickStep(8)} style={{height: this.state.stepHeight[8], "overflow-y": this.state.stepOverflowY[8]}}>
                                            {this.state.lSolutionCompleteChsNC}
                                        </div>
                                    </div>
                                </div>
                                <div className="container grid grid-template-columns-3 conteudo">
                                    
                                    <div id="only-terminals-chomsky" className="item i-chomsky">
                                        <div className="accordion_chomsky_internal">{this.state.displayLang.lOnlyTerm[this.state.index]}</div>
                                        <div className="internal-gram">
                                            {this.state.varChomSkyOT}
                                        </div>
                                        <div className="Internal" id="i9" onClick={_ => this.clickStep(9)} style={{height: this.state.stepHeight[9], "overflow-y": this.state.stepOverflowY[9]}}>
                                            {this.state.lSolutionCompleteChsOT}
                                        </div>
                                    </div>

                                    <div id="only-reacheable-chomsky" className="item i-chomsky">
                                        <div className="accordion_chomsky_internal">{this.state.displayLang.lOnlyReach[this.state.index]}</div>
                                        <div className="internal-gram">
                                            {this.state.varChomSkyOR}
                                        </div>
                                        <div className="Internal" id="i10" onClick={_ => this.clickStep(10)} style={{height: this.state.stepHeight[10], "overflow-y": this.state.stepOverflowY[10]}}>
                                            {this.state.lSolutionCompleteChsOR}
                                        </div>
                                    </div>

                                    <div className="item i-chomsky">
                                        <div className="internal-gram-c">
                                            {this.state.lSolutionCompleteChomSky}
                                        </div>
                                    </div>

                                </div>

                                <div className="container grid grid-template-columns-2 conteudo">
                                    
                                    <div id="only-reacheable-chomsky" className="item i-chomsky">
                                        <div className="accordion_chomsky_internal">{this.state.displayLang.limmedLeftRecursion[this.state.index]}</div>
                                        <div className="internal-gram">
                                            {this.state.varChomSkyRDI}
                                        </div>
                                        <div className="Internal" id="i11" onClick={_ => this.clickStep(11)} 
                                        style={{height: this.state.stepHeight[11], "overflow-y": this.state.stepOverflowY[11]}}>
                                            {this.state.lSolutionCompleteRDI}
                                        </div>
                                    </div>


                                    <div id="only-reacheable-chomsky" className="item i-chomsky">
                                    <div className="accordion_chomsky_internal">Greibach</div>
                                        <div className="internal-gram">
                                            {this.state.varChomFNG}
                                        </div>
                                        <div className="Internal" id="i12" onClick={_ => this.clickStep(12)} 
                                        style={{height: this.state.stepHeight[12], "overflow-y": this.state.stepOverflowY[12]}}>
                                            {this.state.lSolutionCompleteChsFNG}
                                        </div>
                                    </div>

                                    </div>
                            </Accordion>
                        </div>
                    </div>
                    
                    
                </React.Fragment>
            );
        }
    }
}

export default withRouter(Main);