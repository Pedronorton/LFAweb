import React, {Component} from 'react';
import DataService from "../service/DataService";
import './css/Main.css';

class Main extends Component {
    
    constructor (props) {
        
        super(props);

        this.state = {
            palavra: "",
            grammatica: ""
        };

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
        alert("Sem Histórico");
    }
    
    informacoesFunction() {
        alert("Em desenvolvimento, aguarde um tempo...")
    }


    onSubmit (values) {

        let dados = {
            palavra: values.palavra,
            gramatica: values.gramatica
        };

        console.log("palavra: " + dados.palavra + "\n" + "Grammar" + dados.gramatica);
        DataService.criarGrammatica(dados)
            .then(_ => this.props.history.push("/grammar"));

    }
    
    render() {
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
                                Grammar: <textarea name="gramatica" className="campo" id="grammar-text" value={this.state.gramatica} 
                                onChange={event => this.setState({gramatica : event.target.value})} />
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
    }
}

export default Main;