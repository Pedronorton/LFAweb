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
import "./css/PopUps.css"

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
            index : 0,
            displayLang: {
                lWord : ["Word","Palavra"],
                lDescription : ["If you want to verify acceptances and derivations","Se você quiser verificar aceitações e derivações"],
                lGrammar : ["Grammar","Gramática"],
                lSubmit : ["GO !","Vamos !"],
                lInitialNonRec : ["Initial non recursive","Inicial não recusivo"],
                lEsseniallyNonContract : ["Essentially non contractile","Essencialmente não contrátil"],
                lNonCascade : ["No cascade","Sem cascata"],
                lOnlyTerm : ["Only terminals","Apenas terminais"],
                lOnlyReach : ["Only reacheable","Apenas alcançáveis"],
                lSolutionComplete: ""
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

            visibleSolution: "none"
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
        let wordTest = values[len-3] + values[len-2] + values[len-1];
        let wordTest1 = values[len-4] + values[len-3] + values[len-2] + values[len-1];
        if ( wordTest === " . "){
            let tmp = values.split(" . ");
            tmp[0] += " λ ";
            tempGrammar = tmp[0];
            this.setState( {variables : tmp[0] } );
        }else if (wordTest1 === " -> "){
            let tmp = values.split(" -> ");
            tmp[0] += " → ";
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
                " " + "len : " + tmpR.length + "rule: " + rule);

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
        let variablesTemp = [];

        //Lista de regra da direita
        let listRule = [];
        for (let r of rules) {
            let tmp = r.split("→");
            let tmp2 = tmp[1].split("|");
            for (let v of tmp2) {
                listRule.push(v.trim());
            }
            variablesTemp.push(tmp[0].trim());
        }
        variablesTemp.reverse();
        let initialSymbol = variablesTemp.pop();

        let listVarRight = [];
        for (let t of listRule) {
            for (let char of t) {
                console.log("CHAR : " + char);
                console.log("CHAR : " + char.toUpperCase());
                console.log("Teste : " + (char.toUpperCase === char) + " " +
                (char !== initialSymbol) + " " + (!listVarRight.includes(char)));
                if ((char.toUpperCase() === char) && (char !== " ")
                && (char !== "")) {
                    if ((char !== initialSymbol) && (!listVarRight.includes(char))) {
                        console.log("enter: " + char)
                        listVarRight.push(char.trim());
                    }
                }
            }
               
        }

        console.log("ListLeft : " + variablesTemp + "TAM : " +variablesTemp.length);
        console.log("ListRight : " + listVarRight + "TAM: " + listVarRight.length);
        let eqif = variablesTemp.every(elem => listVarRight.includes(elem));
        console.log("Elements is equals: " + eqif);

        if ((variablesTemp.length !== listVarRight.length) || (!eqif)) {
            let subtractionElem = [];

            variablesTemp.every( elem => { 
                if (!listVarRight.includes(elem)) subtractionElem.push(elem); } );
            console.log("5 if");
            if (this.state.lang === "pt")
                this.setState({menssage: `Sua gramática não contém ${subtractionElem.toString()}
                como regra da esquerda.`});
            else this.setState({menssage: `Your grammar missing ${subtractionElem.toString()}
                in left rule`});
            return false;
        }

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
    
                        this.setState({varHTML: <div className="fundo" dangerouslySetInnerHTML={{__html: response.data}} />
    
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
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}} /></div>,
                    lSolutionComplete: <div><br/> <div dangerouslySetInnerHTML={{__html: response.data[3]}}/>  </div> });
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

                    this.setState({varENC: <div>
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}} />  */}
                    <br/>
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}} /></div>});
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
                </div>});
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
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}}/>
                </div>});
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
                    <br/>
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}}/>
                </div>});
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
                                <p><input placeholder={this.state.displayLang.lWord[this.state.index] + " (" + this.state.displayLang.lDescription[this.state.index]+")" }
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

                                                            {/* <label className="btn btn-secondary btnLabel">
                                                                <div className="tooltiphtml">
                                                                    <input type="radio" name="options" id="option1" autocomplete="off"/>Grammar
                                                                    <span className="tooltiptext">click me </span>
                                                                </div>
                                                            </label> */}
                                                            {this.state.buttonGrammar}

                                                            {/*<Popup modal trigger={<button className="btn btn-secondary btnLabel">
                                                                    <div className="tooltiphtml">
                                                                        <input type="radio" name="options" id="option1" autocomplete="off"/>Lambda
                                                                        <span className="tooltiptext">space point space </span>
                                                                    </div>
                                                                </button>}>
                                                                {close => <Content close={close} />}
                                                            </Popup>*/}
                                                            {this.state.buttonLambda}
                                                                

                                                            {/* <label
                                                                className="btn btn-secondary btnLabel">
                                                                <div className="tooltiphtml">
                                                                    <input type="radio" name="options" id="option3" autocomplete="off"/>Arrow
                                                                    <span className="tooltiptext">space -> space</span>
                                                                </div>
                                                            </label> */}
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
                    {this.state.varHTML}
                    
                    <div className="container grid grid-template-columns-1 conteudo">
                        
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lInitialNonRec[this.state.index]}
                                onToggle={_ => this.onSubmitNonRecursiveInitialSymbol(this.state)}>
                                    {this.state.varNRIS}
                                <div className="AccordTrigger" onClick={_ => this.setState({visibleSolution: "block"}) } ><i className="fa fa-question-circle"></i> </div>
                                {/* <div className="AccorModal overflow-auto" style={{display: `${this.state.visibleSolution}`}}>
                                    <div className="AccordModal-content">
                                        <span className="close-bttn"
                                        onClick={_ => this.setState({visibleSolution: "none"}) }>X</span>
                                        {this.state.lSolutionComplete}
                                    </div>
                                </div> */}
                            </Accordion>
                            
                        </div>

                        <div className="item">
                        <Accordion 
                            title={this.state.displayLang.lEsseniallyNonContract[this.state.index]}
                            onToggle={_ => this.onSubmitNonContracting(this.state)}>
                                {this.state.varENC}
                        </Accordion>
                            
                        </div>
                        
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lNonCascade[this.state.index]}
                                onToggle={_ =>this.onSubmitNonCascade(this.state)}>
                                    {this.state.varNC}
                            </Accordion>
                            
                        </div>
                    </div>
                    <div className="container grid grid-template-columns-1 conteudo">
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lOnlyTerm[this.state.index]}
                                onToggle={_ =>this.onSubmitOnlyTerm(this.state)}>
                                    {this.state.varOT}
                            </Accordion>
                        
                        </div>
                        
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lOnlyReach[this.state.index]}
                                onToggle={_ => this.onSubmitOnlyReach(this.state)}>
                                    {this.state.varOR}
                            </Accordion>

                        </div>
                
                    </div>
                    
                </React.Fragment>
            );
        }
    }
}

export default withRouter(Main);