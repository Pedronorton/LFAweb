import React, {Component} from 'react';
import DataService from "../service/DataService";
import { withRouter } from "react-router-dom";

import './css/Main.css';

class Main extends Component {

    varHTML;
    historico;
    
    constructor () {
        super();

        this.state = {
            palavra: "",
            variables: ""
        };

        this.historico = [];
        this.varHTML = null;

        this.onSubmit = this.onSubmit.bind(this);

        
    }
    
    lambdaFunction() {
        document.getElementById("grammar-text").value=document.getElementById("grammar-text").value+" λ ";
        
    }
    pipeFunction() {
        document.getElementById("grammar-text").value=document.getElementById("grammar-text").value+" | ";
    }
    
    arrowFunction() {
        document.getElementById("grammar-text").value=document.getElementById("grammar-text").value+" -> ";
    }
    
    limparFunction() {
        document.getElementById("grammar-text").value="";
    }
    
    historicoFunction() {
        try {
            alert(this.historico);
        } catch (error) {
            alert("Sem Dados");
        }
    }
    
    informacoesFunction() {
        alert(" Grammar do Projeto LfaAppWeb ");
    }


    onSubmit (values) {

 
        this.historico = [];
 

        let dados = {
            palavra: values.palavra,
            variables: values.variables
        };

        this.historico.push(
            "palavra : " + dados.palavra + "\n" +
            "Gramática : " + dados.variables + "\n"
            );

        DataService.criaNonRecursiveInitial(dados)
            
            .then(
                DataService.getGramaticaHTML()
                .then(
                    response => {
                        console.log(response);
                        this.varHTML = response;
                    }
                )
            ).then(_ => this.props.history.push(`/`));

    }


    componentDidMount () {


        if (this.state.palavra !== "") {
                DataService.getGramatica()
                    .then(
                        response => {
                            console.log(response);
                            this.historico.push("Gramática: " + response.data + "\n");
                            this.setState({variables: response.data});
                        }
                    );
            
                
                DataService.getGramaticaHTML()
                    .then(
                        response => {
                            console.log(response.data);
                            this.varHTML = response.data;
                        }
                    );
                
                this.props.history.push(`/`);
            }
        }



    
    render() {

        if (!this.historico) {
            console.log("AQUI !!!");
            return (
                <React.Fragment>
                    <div className="row">
                        <div className="col-12 col-sm-7" id="text-area">
                            <div className="palavra">
                                <>Word: <input name="palavra" className="campo" value={this.state.palavra} 
                                onChange={event => this.setState({palavra : event.target.value})} /></> <br/>
                                <i className="descricao">If you want to verify acceptances and derivations</i>
                            </div>
                            <div className="gramatica">
                                <p>
                                    Grammar: <textarea name="gramatica" className="campo" id="grammar-text" value={this.state.variables} 
                                    onChange={event => this.setState({variables : event.target.value})} />
                                </p>
                            </div>
                            <div>
                                <br/>
                                <button type="button" className="btn btn-primary btn-m" id="ok" onClick={_ => this.onSubmit(this.state)}>Submeter</button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-3 col-md-4 col-sm-5">
                            <section className="container grid grid-template-columns-1">
                                <div className = "item subgrid">
                                    <button type = "button" className = "btn btn-primary btn-s" onClick={this.lambdaFunction}><b id="lambda">λ</b></button>
                                    <button type = "button" className = "btn btn-primary btn-s" onClick={this.pipeFunction}>|</button>
                                    <button type = "button" className = "btn btn-primary btn-s" onClick={this.arrowFunction}>-></button>
                                </div>
                                <div className = "item">
                                    <button type = "button" className = "btn btn-primary btn-m" onClick={this.limparFunction}>Limpar</button>
                                </div>
                                <div className = "item">
                                    <button type = "button" className = "btn btn-primary btn-m" onClick={this.historicoFunction}>Histórico</button>
                                </div>
                                <div className = "item">
                                    <button type = "button" className = "btn btn-primary btn-m" onClick={this.informacoesFunction}><span className="fa fa-exclamation-circle"></span></button>
                                </div>
                            </section>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            console.log("II : " + this.varHTML);
                return(
                    <React.Fragment>
                        {this.varHTML}

                        <section className="container grid grid-template-columns-1">
                            <div className = "item">
                                <button type = "button" className = "btn btn-primary btn-m" onClick={this.historicoFunction}>Histórico</button>
                            </div>
                            <div className = "item">
                                <button type = "button" className = "btn btn-primary btn-m" onClick={this.informacoesFunction}><span className="fa fa-exclamation-circle"></span></button>
                            </div>
                        </section>
                    </React.Fragment>
                );
        }

    }
}

export default withRouter(Main);