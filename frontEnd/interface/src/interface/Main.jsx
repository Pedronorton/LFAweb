import React, {Component} from 'react';
import DataService from "../service/DataService";
import { withRouter } from "react-router-dom";

import Accordion from "react-collapsy";
import "../../node_modules/react-collapsy/lib/index.css";

import './css/Main.css';

class Main extends Component {
    
    constructor () {
        super();
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
                lSubmit : ["Submit","Submeter"],
                lInitialNonRec : ["Initial non recursive","Inicial não recusivo"],
                lEsseniallyNonContract : ["Essentially non contractile","Essencialmente não contrátil"],
                lNonCascade : ["No cascade","Sem cascata"],
                lOnlyTerm : ["Only terminals","Apenas terminais"],
                lOnlyReach : ["Only reacheable","Apenas alcançáveis"]
            },
            display: {
                displayNRIS: false,
                displayENC: false,
                displayNC: false,
                displayOT: false,
                displayOR: false
            },
            lang: "en",
            historico: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitNonRecursiveInitialSymbol = this.onSubmitNonRecursiveInitialSymbol.bind(this);
    }
    
    lambdaFunction() {
        document.getElementById("grammar-text").value=document.getElementById("grammar-text").value+" λ ";
    }
    // pipeFunction() {
    //     document.getElementById("grammar-text").value=document.getElementById("grammar-text").value+" | ";
    // }
    // arrowFunction() {
    //     document.getElementById("grammar-text").value=document.getElementById("grammar-text").value+" -> ";
    // }
    limparFunction() {
        document.getElementById("grammar-text").value="";
    }
    historicoFunction() {
        try {
            alert(this.state.historico[0] + "\n" + this.state.historico[1]);
        } catch (error) {
            alert("Sem Dados");
        }
    }
    informacoesFunction() {
        alert(" Grammar do Projeto LfaAppWeb ");
    }
    
    onSubmit (values) {

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

                    this.setState({varHTML: <div dangerouslySetInnerHTML={{__html: response.data}} />

                    });
                }
            ).then(_ => this.props.history.push(`/`));

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
                    {/* <div dangerouslySetInnerHTML={{__html: response.data[0]}} />  */}
                    <div dangerouslySetInnerHTML={{__html: response.data[1]}} /></div>});
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
            this.setState({lang: "pt"});
            this.setState({index: 1});
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
    
    render() {

        if (!this.state.historico) {
            console.log("AQUI !!!");
            return (
                <React.Fragment>
                    <div className="row">
                        <div className="col-12 col-sm-7" id="text-area">
                            <div className="palavra">
                                <>{this.state.displayLang.lWord[this.state.index]}: <input name="palavra" className="campo" value={this.state.palavra} 
                                onChange={event => this.setState({palavra : event.target.value})} /></> <br/>
                                <i className="descricao">{this.state.displayLang.lDescription[this.state.index]}</i>
                            </div>
                            <div className="gramatica">
                                <p>
                                    {this.state.displayLang.lGrammar[this.state.index]}: <textarea name="gramatica" className="campo" id="grammar-text" value={this.state.variables} 
                                    onChange={event => this.setState({variables : event.target.value})} />
                                </p>
                            </div>
                            
                        </div>
                        <div className="col-12 col-lg-3 col-md-4 col-sm-5">
                            <section className="container grid grid-template-columns-1">
                                <div className = "item">
                                    <button type = "button" className = "btn btn-primary btn-m" onClick={this.lambdaFunction}><b id="lambda">λ</b></button>
                                    {/* <button type = "button" className = "btn btn-primary btn-s" onClick={this.pipeFunction}>|</button>
                                    <button type = "button" className = "btn btn-primary btn-s" onClick={this.arrowFunction}>-></button> */}
                                </div>
                                <div classNam="item">
                                    <button type="button" className="btn btn-primary btn-m btn-b" id="ok" onClick={_ => this.onSubmit(this.state)}>{this.state.displayLang.lSubmit[this.state.index]}</button>
                                </div>
                                {/* <div className = "item">
                                    <button type = "button" className = "btn btn-primary btn-m" onClick={this.historicoFunction}>Histórico</button>
                                </div> */}
                               
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
                            </Accordion>
                            {/* <button type="button" className="btn btn-primary btn-m" onClick={_ => this.onSubmitNonRecursiveInitialSymbol(this.state)}>Initial non recursive</button>
                            {this.state.varNRIS} */}
                        </div>

                        <div className="item">
                        <Accordion 
                            title={this.state.displayLang.lEsseniallyNonContract[this.state.index]}
                            onToggle={_ => this.onSubmitNonContracting(this.state)}>
                                {this.state.varENC}
                        </Accordion>
                            {/* <button type="button" className="btn btn-primary btn-m" onClick={_ => this.onSubmitNonContracting(this.state)}>Essentially non contractile</button>
                            {this.state.varENC} */}
                        </div>
                        
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lNonCascade[this.state.index]}
                                onToggle={_ =>this.onSubmitNonCascade(this.state)}>
                                    {this.state.varNC}
                            </Accordion>
                            {/* <button type="button" className="btn btn-primary btn-m" onClick={_ =>this.onSubmitNonCascade(this.state)}>No cascade</button>
                            {this.state.varNC} */}
                        </div>
                    </div>
                    <div className="container grid grid-template-columns-1 conteudo">
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lOnlyTerm[this.state.index]}
                                onToggle={_ =>this.onSubmitOnlyTerm(this.state)}>
                                    {this.state.varOT}
                            </Accordion>
                            {/* <button type="button" className="btn btn-primary btn-m" onClick={_ =>this.onSubmitOnlyTerm(this.state)}>Only terminals</button>
                            <div id="one">
                                {this.state.varOT}
                            </div> */}
                        </div>
                        
                        <div className="item">
                            <Accordion 
                                title={this.state.displayLang.lOnlyReach[this.state.index]}
                                onToggle={_ =>this.onSubmitOnlyReach(this.state)}>
                                    {this.state.varOR}
                            </Accordion>

                            {/* <button type="button" className="btn btn-primary btn-m" onClick={_ =>this.onSubmitOnlyReach(this.state)}>Only reacheable</button>
                            {this.state.varOR} */}
                        </div>
                        
                        {/* <div className = "item">
                            <button type = "button" className = "btn btn-primary btn-m" onClick={this.historicoFunction}>Histórico</button>
                        </div>
                        <div className = "item">
                            <button type = "button" className = "btn btn-primary btn-m" onClick={this.informacoesFunction}><span className="fa fa-exclamation-circle"></span></button>
                        </div> */}

                    </div>
                </React.Fragment>
            );
        }
    }
}

export default withRouter(Main);