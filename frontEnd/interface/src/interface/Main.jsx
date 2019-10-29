import React, {Component} from 'react';
import DataService from "../service/DataService";
import { withRouter } from "react-router-dom";
import {Popover, OverlayTrigger, ButtonToolbar} from "react-bootstrap";
import { Alert } from 'reactstrap';

import './css/Main.css';
import HistoricoIcon from "../img/tempo-restante.svg";
import InfoIcon from "../img/160px-Infobox_info_icon.svg.png";

import Accordion from "react-collapsy";
import "../../node_modules/react-collapsy/lib/index.css";

import "./css/ShakeInfoButton.css";

// import Doubt from "../img/doubtII.png";
import "../../node_modules/font-awesome/css/font-awesome.css";
import "./css/PopUps.css";

class Main extends Component {
    
    constructor (props) {
        super(props);

        this.timer = 0;

        this.state = {
            palavra: "",
            variables: "",
            vari: {
                varHTML: "",
                varNRIS: "",
                varENC: "",
                varNC: "",
                varOT: "",
                varOR: "",
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
                ltextBox: ["Input Grammar: ","Gramática de entrada: "],
                lSolutionCompleteNRIS: "",
                lSolutionCompleteENC: "",
                lSolutionCompleteNC: "",
                lSolutionCompleteOT: ""

            },
            display: {
                displayNRIS: false,
                displayENC: false,
                displayNC: false,
                displayOT: false,
                displayOR: false
            },
            lang: "en",
            historico: null,
            buttonLambda: this.props.lambda,
            buttonGrammar: this.props.grammar,
            buttonArrow: this.props.arrow,

            seconds: 0,
            buttonInfoShake: "freeze",

            buttonValidationSubmit: "danger",
            visibleAlert: false,

            menssage: "is empty field grammar",

            visibleSolutionNRIS: "none",
            visibleSolutionENC: "none",
            visibleSolutionNC: "none",
            visibleSolutionOT: "none",
            visibleSolutionOR: "none"
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitNonRecursiveInitialSymbol = this.onSubmitNonRecursiveInitialSymbol.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validation = this.validation.bind(this);

        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    
    onChange(values) {
        console.log("Grammar " + values);
        let tempGrammar = values;
        let len = values.length;
        let wordTest = values[len-1];
        let wordTest1 = values[len-2] + values[len-1];
        if ( wordTest === "."){
            let tmp = values.split(".");
            tmp[0] += "λ";
            tempGrammar = tmp[0];
            this.setState( {variables : tmp[0] } );
        }else if (wordTest1 === "->"){
            let tmp = values.split("->");
            tmp[0] += "→";
            tempGrammar = tmp[0];
            this.setState({variables: tmp[0]});
        }else {
            
            this.setState( {variables : values});

            tempGrammar = values;
            console.log("AQIO VAR : " + tempGrammar + " " + values);
        }
        
        console.log("BACKUP : " + tempGrammar);

        if (this.validation(tempGrammar))
            this.setState({buttonValidationSubmit : "success"});
        else this.setState({buttonValidationSubmit : "danger"});
    }

   
    validation (text) {

        console.log("Validation " + text.length + " " + text);
        if (text.length <= 3) {
            console.log("1 if");
            return false;
        }

        let rules = text.split("\n");
        
        for (let rule of rules) {

            let tmpR = rule.split("→");
            if ((tmpR[0] === rule) || (tmpR.length > 2)) {
                console.log("2 if " + (tmpR[0] === rule) + " " + (tmpR.length > 2) +
                " " + "len : " + tmpR.length + " rule: " + rule);

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

        // // Lista das Variáriaveis da regra da esquerda
        // let variablesTemp = [];

        // //Lista de regra da direita
        // let listRule = [];
        // for (let r of rules) {
        //     let tmp = r.split("→");
        //     let tmp2 = tmp[1].split("|");
        //     for (let v of tmp2) {
        //         listRule.push(v.trim());
        //     }
        //     variablesTemp.push(tmp[0].trim());
        // }
        // variablesTemp.reverse();
        // let initialSymbol = variablesTemp.pop();

        // let listVarRight = [];
        // for (let t of listRule) {
        //     for (let char of t) {
        //         console.log("CHAR : " + char);
        //         console.log("CHAR : " + char.toUpperCase());
        //         console.log("Teste : " + (char.toUpperCase === char) + " " +
        //         (char !== initialSymbol) + " " + (!listVarRight.includes(char)));
        //         if ((char.toUpperCase() === char) && (char !== " ")
        //         && (char !== "")) {
        //             if ((char !== initialSymbol) && (!listVarRight.includes(char))) {
        //                 console.log("enter: " + char)
        //                 listVarRight.push(char.trim());
        //             }
        //         }
        //     }
               
        // }

        // console.log("ListLeft : " + variablesTemp + "TAM : " +variablesTemp.length);
        // console.log("ListRight : " + listVarRight + "TAM: " + listVarRight.length);
        // let eqif = variablesTemp.every(elem => listVarRight.includes(elem));
        // console.log("Elements is equals: " + eqif);

        // if ((variablesTemp.length !== listVarRight.length) || (!eqif)) {
        //     let subtractionElem = [];

        //     variablesTemp.every( elem => { 
        //         if (!listVarRight.includes(elem)) subtractionElem.push(elem); } );
        //     console.log("5 if");
        //     if (this.state.lang === "pt")
        //         this.setState({menssage: `Sua gramática não contém ${subtractionElem.toString()}
        //         como regra da esquerda.`});
        //     else this.setState({menssage: `Your grammar missing ${subtractionElem.toString()}
        //         in left rule`});
        //     return false;
        // }

        console.log("Último true");
        return true;
    }
 
    historicoFunction() {
        try {
            alert(this.state.historico[0] + "\n" + this.state.historico[1]);
        } catch (error) {
            alert("Sem Dados");
        }
    }
     
    onSubmit (values) {

        console.log("Validation Button : " + this.state.buttonValidationSubmit);
        if (this.state.buttonValidationSubmit === "success") {
            if (values.palavra === "") {
                values.palavra = "a";
            }
            
            let dados = {
                palavra: values.palavra,
                variables: values.variables,
                historico: values.variables,
                lang: this.state.lang
            };
    
            console.log("Variables : " + dados.variables);
    
            this.setState({variables: dados.variables});
            
            this.setState({historico: dados.historico});
    
            this.setState({palavra: dados.palavra});
    
    
            DataService.criaHTML(dados)
                
                .then(
                    response => {
                        console.log(response.data);
                        
                        // this.state.historico.push(
                        //     "palavra : " + dados.palavra + "\n" +
                        //     "Gramática : " + dados.variables + "\n"
                        // );
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
                                <br/><div style={{"font-size": "20px",
                                                "border": "1px solid black",
                                                "text-align": "center",
                                                "width": "30VH"
                                                }}
                                dangerouslySetInnerHTML={{__html: this.state.displayLang.ltextBox[this.state.index] + "<br/>" 
                                    + response.data[0][1] }}/><br/></div>,
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
            palavra: values.palavra,
            variables: values.variables
        };
        
        // this.state.historico.push(
        //     "palavra : " + dados.palavra + "\n" +
        //     "Gramática : " + dados.variables + "\n"
        //     );
        
        DataService.criaNonRecursiveInitial(dados)
            
            .then(
                response => {
                    console.log(response.data);
                    
                    // this.state.historico.push(
                    //     "palavra : " + dados.palavra + "\n" +
                    //     "Gramática : " + dados.variables + "\n"
                    // );
                    // this.setState({variables: response.data[2]});

                    this.setState({varNRIS: <div> <br/>                   
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}} /><br/></div>,
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
            palavra: values.palavra,
            variables: values.variables
        };
        
        // this.state.historico.push(
        //     "palavra : " + dados.palavra + "\n" +
        //     "Gramática : " + dados.variables + "\n"
        //     );
        
        DataService.criaNonContracting(dados)
            .then(
                response => {
                    console.log("Non Contracting: " + response.data);
                    

                    // this.state.historico.push(
                    //     "palavra : " + dados.palavra + "\n" +
                    //     "Gramática : " + dados.variables + "\n"
                    // );
                    // this.setState({variables: response.data[2]});

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
            palavra: values.palavra,
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
            palavra: values.palavra,
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
            palavra: values.palavra,
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
        //                 this.state.historico.push("Gramática: " + response.data + "\n");
        //                 // this.setState({variables: response.data});
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
    
    render() {

        if (!this.state.historico) {
            console.log("AQUI !!!");
            return (
                <React.Fragment>
                    <Alert color="danger" isOpen={this.state.visibleAlert} toggle={_ => this.setState({visibleAlert: false})}>
                        {this.state.menssage}
                    </Alert>
                    <div className="row body">
                        <div className="col-12 col-sm-8" id="text-area">
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
                                name="palavra" className="campo" value={this.state.palavra} 
                                onChange={event => this.setState({palavra : event.target.value})} /></p> <br/>
                            </div>
                        </div>
                        <div className="col-12 col-sm-4">

                            <section className="submit-div">

                                <div className="submit-button">
                                    <button type="button" className={`btn btn-${this.state.buttonValidationSubmit} btn-m btn-b`} id="ok"
                                    onClick={_ => this.onSubmit(this.state)}>{this.state.displayLang.lSubmit[this.state.index]}</button>
                                </div>
                
                                
                                    <ButtonToolbar>
                                        <OverlayTrigger trigger="click" key="top" placement="top"
                                        overlay={
                                            <Popover id="popover-positioned-top">
                                                <Popover.Title as="div">Tutorial</Popover.Title>
                                                    <Popover.Content>
                                                        <div class="btn-group-toggle" data-toggle="buttons">
                                                            {this.state.buttonGrammar}

                                                            {this.state.buttonLambda}
                                                                
                                                            {this.state.buttonArrow}
                                                        </div>
                                                    </Popover.Content>
                                            </Popover>
                                        }>
                                            <div className={`shake-slow shake-${this.state.buttonInfoShake} `}>
                                                <button type="button" className="btn btn-info btn-m" title="Tutorial">
                                                    <b id="lambda"> <img alt="" src={InfoIcon} width="24"/> </b>
                                                </button>
                                            </div>
                                        </OverlayTrigger>
                                    </ButtonToolbar>

                                <div className = "">
                                    <button type = "button" className = "btn btn-time btn-m" onClick={this.historicoFunction}><img alt="" src={HistoricoIcon} width="24"/></button>
                                </div>
                               
                            </section>
                        </div>

                    </div>
                </React.Fragment>
                
                
                
            );
        } else {
            
            return(
                <React.Fragment>
                    <div className="container grid grid-template-columns-5 conteudo">
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
                    {this.state.varHTML}
                    <br/>
                    <div className="container grid grid-template-columns-3 conteudo">
                        
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lInitialNonRec[this.state.index]}
                                onToggle={_ => this.onSubmitNonRecursiveInitialSymbol(this.state)}>
                                    {this.state.varNRIS}
                                <div className="AccordTrigger" onClick={_ => this.setState({visibleSolutionNRIS: "block"}) } >
                                    <i className="fa fa-question-circle popbtn"></i> </div>
                                <div className="AccorModal" style={{display: `${this.state.visibleSolutionNRIS}`}}>
                                    <div className="AccordModal-content">
                                        <span className="close-bttn"
                                        onClick={_ => this.setState({visibleSolutionNRIS: "none"}) }>X</span>
                                        {this.state.lSolutionCompleteNRIS}
                                    </div>
                                </div>
                            </Accordion>
                            
                        </div>

                        <div className="item">
                        <Accordion 
                            title={this.state.displayLang.lEsseniallyNonContract[this.state.index]}
                            onToggle={_ => this.onSubmitNonContracting(this.state)}>
                                {this.state.varENC}
                                <div className="AccordTrigger" onClick={_ => this.setState({visibleSolutionENC: "block"}) } >
                                    <i className="fa fa-question-circle popbtn"></i> </div>
                                <div className="AccorModal" style={{display: `${this.state.visibleSolutionENC}`}}>
                                    <div className="AccordModal-content">
                                        <span className="close-bttn"
                                        onClick={_ => this.setState({visibleSolutionENC: "none"}) }>X</span>
                                        {this.state.lSolutionCompleteENC}
                                    </div>
                                </div>
                        </Accordion>
                            
                        </div>
                        
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lNonCascade[this.state.index]}
                                onToggle={_ =>this.onSubmitNonCascade(this.state)}>
                                    {this.state.varNC}
                                    <div className="AccordTrigger" onClick={_ => this.setState({visibleSolutionNC: "block"}) } >
                                        <i className="fa fa-question-circle popbtn"></i> </div>
                                    <div className="AccorModal" style={{display: `${this.state.visibleSolutionNC}`}}>
                                        <div className="AccordModal-content">
                                            <span className="close-bttn"
                                            onClick={_ => this.setState({visibleSolutionNC: "none"}) }>X</span>
                                            {this.state.lSolutionCompleteNC}
                                        </div>
                                    </div>
                            </Accordion>
                            
                        </div>
                    </div>
                    <div className="container grid grid-template-columns-3 conteudo">
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lOnlyTerm[this.state.index]}
                                onToggle={_ =>this.onSubmitOnlyTerm(this.state)}>
                                    {this.state.varOT}
                                    <div className="AccordTrigger" onClick={_ => this.setState({visibleSolutionOT: "block"}) } >
                                        <i className="fa fa-question-circle popbtn"></i> </div>
                                    <div className="AccorModal" style={{display: `${this.state.visibleSolutionOT}`}}>
                                        <div className="AccordModal-content">
                                            <span className="close-bttn"
                                            onClick={_ => this.setState({visibleSolutionOT: "none"}) }>X</span>
                                            {this.state.lSolutionCompleteOT}
                                        </div>
                                    </div>
                            </Accordion>
                        
                        </div>
                        
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lOnlyReach[this.state.index]}
                                onToggle={_ => this.onSubmitOnlyReach(this.state)}>
                                    {this.state.varOR}
                                    <div className="AccordTrigger" onClick={_ => this.setState({visibleSolutionOR: "block"}) } >
                                        <i className="fa fa-question-circle popbtn"></i> </div>
                                    <div className="AccorModal" style={{display: `${this.state.visibleSolutionOR}`}}>
                                        <div className="AccordModal-content reach">
                                            <span className="close-bttn"
                                            onClick={_ => this.setState({visibleSolutionOR: "none"}) }>X</span>
                                            {this.state.lSolutionCompleteOR}
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