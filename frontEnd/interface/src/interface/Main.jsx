import React, {Component} from 'react';
import DataService from "../service/DataService";
import { withRouter } from "react-router-dom";
import {Popover, OverlayTrigger, ButtonToolbar} from "react-bootstrap";
import { Alert } from 'reactstrap';
import Popup from '../component/Popup';

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
        console.log("MAIN: " + this.props.mainOpacity + " " + this.props.mainPointerEvents);
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
                varCYK: ""
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
                lOnlyReach : ["Only reacheable","Apenas alcançáveis"],
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
                lSolutionCompleteRemRecDir: ""
            },

            lang: "en",
            activateOtherPage: null,
            diplayPop: "none",

            seconds: 0,
            buttonInfoShake: "freeze",

            buttonValidationSubmit: "danger",
            visibleAlert: false,

            menssage: "is empty field grammar",

            // visibleSolutionNRIS: "none",
            // visibleSolutionENC: "none",
            // visibleSolutionNC: "none",
            // visibleSolutionOT: "none",
            // visibleSolutionOR: "none",
            user: {
                id: this.props.user.id,
                name: this.props.user.name,
                email: this.props.user.email,
                dateCreation: this.props.user.dateCreation,
                historicalGrammar: this.props.user.historicalGrammar
            },
            mainOpacity: this.props.mainOpacity,
            mainPointerEvents: this.props.mainPointerEvents,
            showPopup: false,
            stepHeight: ["3.5em", "3.5em", "3.5em", "3.5em", "3.5em", "3.5em"],
            stepOverflowY: ["hidden", "hidden", "hidden", "hidden", "hidden", "hidden"]
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
    
    onChange(values) {
        console.log("Grammar " + values);
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
        
        console.log("BACKUP : " + tempGrammar);

        if (this.validation(tempGrammar))
            this.setState({buttonValidationSubmit : "success"});
        else this.setState({buttonValidationSubmit : "danger"});
    }

    validation (text) {

        console.log("Validation " + text.length + " " + text);
        if (text.length <= 2) {
            console.log("1 if");
            return false;
        }

        let rules = text.split("\n");
        
        for (let rule of rules) {

            console.log("RULES: " + rule);
            if ((rule === "") || (rule === " ")) //Não tem necessidade de verificar espaços
                continue;

            let tmpR = rule.split("→");
            if ((tmpR[0] === rule) || (tmpR.length > 2)) {
                console.log("2 if: " + (tmpR[0] === rule) + " " + (tmpR.length > 2) +
                " len : " + tmpR.length + " rule: " + rule + "\n");
                console.log("tmpR: " + tmpR);

                if (this.state.lang === "pt")
                    this.setState({menssage: "Faltando →"});
                else this.setState({menssage: "Without →"});
                return false;
            }
            if ((tmpR[0] === " ") || (tmpR[0] === "") ||
            (tmpR[1] === " ") || (tmpR[1] === "")) {

                console.log("3 if " + tmpR + " " + (tmpR[0] === " ") + " " + (tmpR[0] === "")
                + " " + (tmpR[1] === " ") + " " + (tmpR[1] === ""));

                if (this.state.lang === "pt")
                    this.setState({menssage: "gramática invalida"});
                else this.setState({menssage: "invalid grammar"});
                return false;
            }

            let tmpR2 = tmpR[1].split("|");
            for (let varTer of tmpR2) {
                
                if ((varTer === "") || (varTer === " ")) {
                    console.log("4 if");

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
            console.log("aux: " + aux);
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
                console.log("LETTER : " + l)
                console.log("1ª: " + (l.toUpperCase() === l) );
                console.log("2ª: " + !leftSide.includes(l));
                console.log("3ª: " + !(/[0-9]/ !== l));
                if (l.toUpperCase() === l && !leftSide.includes(l) &&!(/[0-9]/.test(l))) {
                    console.log("RIGHTSide: " + l);
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

        console.log("ListLeft : " + variablesTemp + "TAM : " + variablesTemp.length);
        console.log("listRule : " + listRule + "TAM: " + listRule.length);
        //let eqif = listRule.every(elem => variablesTemp.includes(elem));
        console.log("Elements is equals: " + eqif);

        if (!eqif) {
            let subtractionElem = [];

            listRule.every( elem => {
                if (!variablesTemp.includes(elem)){subtractionElem.push(elem); }
                return 0;
            } );
            console.log("5 if");
            if (this.state.lang === "pt")
                this.setState({menssage: `Sua gramática não está definido ${subtractionElem.toString()}
                como regra da esquerda.`});
            else this.setState({menssage: `Your grammar not definided ${subtractionElem.toString()}
                in left rule`});
            return false;
        }

        console.log("Último true");
        return true;
    }
 
    historicoFunction() {
        console.log("Historical Grammar : " + this.state.user.historicalGrammar.length);
        if (this.state.user.historicalGrammar.length > 0) {
            let grString = [];
            console.log(this.state.user.historicalGrammar[0].grammar);
            console.log("AQUIBDUBA" + this.state.user.historicalGrammar + " " 
            + this.state.user.historicalGrammar.length);
            for (let hg of this.state.user.historicalGrammar) {
                console.log("Tets: " + hg);
                grString.push(<div dangerouslySetInnerHTML={{__html:
                            "<button className='btn btn-primary'>WordInput: " + hg.wordInput + "<br/>" +
                                "GrammarInput: " + hg.grammar + "<br/><br/></button>"}}
                onClick={_ => this.writeHist(hg)} ></div>);
            }
            console.log("Tets: " + grString);
            return grString;
        } else return "Sem Dados";
    
    }
    
    writeHist(hg){
        console.log("nao ta entrando aki" + hg.wordInput + " " + hg.grammar);
        this.togglePopup();
        // this.onChange(gram);
        this.setState({variables: hg.grammar,
                        word: hg.wordInput,
                        buttonValidationSubmit : "success"
                        });
    }
    
    onSubmit (values) {

        console.log("Validation Button : " + this.state.buttonValidationSubmit);
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
    
            console.log("Variables : " + dados.variables);
    
            this.setState({variables: dados.variables});
            
            this.setState({activateOtherPage: dados.activateOtherPage});
    
            this.setState({word: dados.word});
    
            let hg = {
                grammar: dados.variables,
                wordInput: dados.word,
            }
    
            DataService.criaHTML(dados)
                .then(
                    DataService.postSaveHistoricalGr(this.state.user.email, hg)
                        .then(
                            response => {
                                this.setState({user: response.data});
                                console.log("USER with HG : " + this.state.user.id + " " + 
                                this.state.user.email + " " + this.state.user.dateCreation + " " + 
                                this.state.user.historicalGrammar);
                            }
                        )
                )
                .then(
                    response => {
                        console.log(response.data);
                        
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
                ).then(_ => this.props.history.push(`/`));

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
        
       
        DataService.criaNonRecursiveInitial(dados)
            
            .then(
                response => {
                    console.log(response.data);
           
                    this.setState({varNRIS: <div> <br/>                   
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}} /></div>,
                    lSolutionCompleteNRIS: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: response.data[3]}}/></div> });
                }
            ).then(_ => this.props.history.push(`/`));

    }


    /*Pegar os dados ao apertar o botão e fazer post e
    retornar a gramática modificada caso tenha regras contráteis
    */
    onSubmitNonContracting (values) {
        console.log("Non Contracting: " + values);
        let dados = {
            word: values.word,
            variables: values.variables
        };
         
        DataService.criaNonContracting(dados)
            .then(
                response => {
                    console.log("Non Contracting: " + response.data);
                    

                    this.setState({varENC: <div><br/>
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}} /></div>,
                    lSolutionCompleteENC: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: response.data[3]}}/></div> });
                }
            ).then(_ => this.props.history.push(`/`));
        }
        
    onSubmitNonCascade (values) {
        console.log("Non Cascade: " + values);
        let dados ={
            word: values.word,
            variables: values.variables
        };
        
        DataService.criaNonCascade(dados).then(
            response => {
                console.log("Non Cascade: " + response.data);
                
                // this.setState({variables: response.data[2]});
                this.setState({varNC: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/>
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}}/>
                </div>,
                lSolutionCompleteNC: <div className="popUpAccord">
                    <div dangerouslySetInnerHTML={{__html: response.data[3]}}/></div>});
            }
        )
    }
    
    onSubmitOnlyTerm (values) {
        console.log("Only TERM values: " + values);
        let dados ={
            word: values.word,
            variables: values.variables
        };
        
        DataService.criaOnlyTerm(dados).then(
            response => {
                console.log("Only TERM: " + response.data);

                // this.setState({variables: response.data[2]});
                this.setState({varOT: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/>
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}}/></div>,
                    lSolutionCompleteOT: <div className="popUpAccord">
                         <div dangerouslySetInnerHTML={{__html: response.data[3]}}/></div>});
            }
        )
    }
    
    onSubmitOnlyReach (values) {
        console.log("Only REACH: " + values);
        let dados ={
            word: values.word,
            variables: values.variables
        };
        
        DataService.criaOnlyReach(dados).then(
            response => {
                console.log("Only REACH: " + response.data);
                
                // this.setState({variables: response.data[2]});
                this.setState({varOR: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/><div dangerouslySetInnerHTML={{__html: response.data[1]}}/></div>,
                    lSolutionCompleteOR: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: response.data[3]}}/></div> });
            }
        );
    }

    onRequestIdGrammar(values) {
        console.log("Grammar Identification: " + values);
        let dados ={
            word: values.word,
            variables: values.variables
        };

        console.log("palavra: " + dados.word);
        DataService.criaGrId(dados).then(
            response => {
                console.log("GRaID: " + response.data[0] + response.data[0]);

                this.setState({varIdGr: <div>
                    <br/><div dangerouslySetInnerHTML={{__html: response.data[1]}}/></div>
                     });

            }
        )
    }

    onSubmitImmedLeftRecursion(values) {
        console.log("onSubmitImmedLeftRecursion: " + values);
        let dados ={
            word: values.word,
            variables: values.variables
        };
        
        DataService.createRemovingTheImmediateLeftRecursion(dados).then(
            response => {
                console.log("onSubmitImmedLeftRecursion: " + response.data);
                
                // this.setState({variables: response.data[2]});
                this.setState({varRemRecDir: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}}/> */}
                    <br/><div dangerouslySetInnerHTML={{__html: response.data[1]}}/></div>,
                    lSolutionCompleteRemRecDir: <div className="popUpAccord">
                        <div dangerouslySetInnerHTML={{__html: response.data[3]}}/></div> });
            }
        );
    }


    onSubmitCYK(values) {
        console.log("onSubmitImmedLeftRecursion: " + values);
        let dados ={
            word: values.word,
            variables: values.variables
        };
        
        DataService.createCYK(dados).then(
            response => {
                console.log("CYK: " + response.data);
                
                // this.setState({variables: response.data[2]});
                this.setState({varCYK: <div>
                    <br/><div dangerouslySetInnerHTML={{__html: response.data[1]}}/></div>});
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
        // if (this.state.palavra !== "") {
        //     DataService.getGramatica()
        //         .then(
        //             response => {
        //                 console.log(response);
        //             }
        //         );
        //     DataService.getGramaticaHTML()
        //         .then(
        //             response => {
        //                 console.log(response.data);
        //                 this.setState({varHTML: response.data});
        //             }
        //         );
        //     this.props.history.push(`/`);
        // }

    }

    componentDidUpdate(prevProps) {
        
        if ((this.props.mainOpacity !== prevProps.mainOpacity)
        || this.props.mainPointerEvents !== prevProps.mainPointerEvents) {
            this.setState({user: this.props.user,
                mainOpacity: this.props.mainOpacity,
                mainPointerEvents: this.props.mainPointerEvents
                            })
        }
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
        if(stepH[i] === "3.5em"){
            stepH[i] = "17em";
            stepO[i] = "scroll";
        }
        else{
            document.getElementById("i"+i).scrollTo(0, 0);
            stepH[i] = "3.5em";
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

                                <div className = "hist-popup">
                                    <button type = "button" className = "btn btn-time btn-m" onClick={/*this.historicoFunction*/this.togglePopup.bind(this)}><img alt="" src={HistoricoIcon} width="24"/></button>
                                    {this.state.showPopup ?
                                    <Popup className="hist-popup" text={this.historicoFunction()} closePopup={this.togglePopup.bind(this)} />
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
                    {/*{this.state.varHTML}*/}
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
                                    <div className="Internal i0" onClick={_ => this.clickStep(0)} style={{height: this.state.stepHeight[0], "overflow-y": this.state.stepOverflowY[0]}}>
                                        {this.state.lSolutionCompleteNRIS}
                                    </div>
                                {/* <div className="AccordTrigger" onClick={_ => this.setState({visibleSolutionNRIS: "block"}) } >
                                    <i className="fa fa-question-circle popbtn"></i> </div>
                                <div className="AccorModal" style={{display: `${this.state.visibleSolutionNRIS}`}}>
                                    <div className="AccordModal-content">
                                        <span className="close-bttn"
                                        onClick={_ => this.setState({visibleSolutionNRIS: "none"}) }>X</span>
                                        {this.state.lSolutionCompleteNRIS}
                                    </div>
                                </div> */}
                            </Accordion>
                        </div>

                        <div className="item">
                        <Accordion 
                            title={this.state.displayLang.lEsseniallyNonContract[this.state.index]}
                            onToggle={_ => this.onSubmitNonContracting(this.state)}>
                                <div className="internal-gram">
                                        {this.state.varENC}
                                    </div>
                                {/* <div className="AccordTrigger" onClick={_ => this.setState({visibleSolutionENC: "block"}) } >
                                    <i className="fa fa-question-circle popbtn"></i> </div>
                                <div className="AccorModal" style={{display: `${this.state.visibleSolutionENC}`}}>
                                    <div className="AccordModal-content">
                                        <span className="close-bttn"
                                        onClick={_ => this.setState({visibleSolutionENC: "none"}) }>X</span> */}
                                <div className="Internal" id="i1" onClick={_ => this.clickStep(1)} style={{height: this.state.stepHeight[1], "overflow-y": this.state.stepOverflowY[1]}}>
                                        {this.state.lSolutionCompleteENC}
                                </div>
                                
                                    {/* </div>
                                </div> */}
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
                                    {/* <div className="AccordTrigger" onClick={_ => this.setState({visibleSolutionNC: "block"}) } >
                                        <i className="fa fa-question-circle popbtn"></i> </div>
                                    <div className="AccorModal" style={{display: `${this.state.visibleSolutionNC}`}}>
                                        <div className="AccordModal-content">
                                            <span className="close-bttn"
                                            onClick={_ => this.setState({visibleSolutionNC: "none"}) }>X</span> */}
                                    <div className="Internal" id="i2" onClick={_ => this.clickStep(2)} style={{height: this.state.stepHeight[2], "overflow-y": this.state.stepOverflowY[2]}}>
                                        {this.state.lSolutionCompleteNC}
                                    </div>
                                    {/* </div>
                                    </div> */}
                            </Accordion>
                            
                        </div>


                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lOnlyTerm[this.state.index]}
                                onToggle={_ =>this.onSubmitOnlyTerm(this.state)}>
                                    <div className="internal-gram">
                                        {this.state.varOT}
                                    </div>
                                    {/* <div className="AccordTrigger" onClick={_ => this.setState({visibleSolutionOT: "block"}) } >
                                        <i className="fa fa-question-circle popbtn"></i> </div>
                                    <div className="AccorModal" style={{display: `${this.state.visibleSolutionOT}`}}>
                                        <div className="AccordModal-content">
                                            <span className="close-bttn"
                                            onClick={_ => this.setState({visibleSolutionOT: "none"}) }>X</span> */}
                                    <div className="Internal" id="i3" onClick={_ => this.clickStep(3)} style={{height: this.state.stepHeight[3], "overflow-y": this.state.stepOverflowY[3]}}>
                                        {this.state.lSolutionCompleteOT}
                                    </div>
                                            
                                        {/* </div>
                                    </div> */}
                            </Accordion>
                        
                        </div>
                    
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lOnlyReach[this.state.index]}
                                onToggle={_ => this.onSubmitOnlyReach(this.state)}>
                                    <div className="internal-gram">
                                        {this.state.varOR}
                                    </div>
                                    {/* <div className="AccordTrigger" onClick={_ => this.setState({visibleSolutionOR: "block"}) } >
                                        <i className="fa fa-question-circle popbtn"></i> </div>
                                    <div className="AccorModal" style={{display: `${this.state.visibleSolutionOR}`}}>
                                        <div className="AccordModal-content reach">
                                            <span className="close-bttn"
                                            onClick={_ => this.setState({visibleSolutionOR: "none"}) }>X</span> */}
                                    <div className="Internal" id="i4" onClick={_ => this.clickStep(4)} style={{height: this.state.stepHeight[4], "overflow-y": this.state.stepOverflowY[4]}}>
                                        {this.state.lSolutionCompleteOR}
                                    </div>
                                            
                                        {/* </div>
                                    </div> */}
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
                                            {this.state.varCYK}
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