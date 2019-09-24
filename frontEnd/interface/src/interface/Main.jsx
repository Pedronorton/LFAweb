import React, {Component} from 'react';
import './css/Main.css';
import Lambda from './img/icons8-lambda-24.png';



class Main extends Component {
	
	
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
	
	render() {
		return (
			<React.Fragment>
				
				<div className="row">
					<div className="col-12 col-sm-7" id="text-area">
						<div className="palavra">
							<>Word: <input className="campo"/></> <br/>
							<i className="descricao">If you want to verify acceptances and derivations</i>
						</div>
						<div className="gramatica">
							<p>
								Grammar: <textarea className="campo" id="grammar-text" />
							</p>
						</div>
						<div>
							<br/>
							<button type="button" className="btn btn-primary btn-m" id="ok">OK</button>
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