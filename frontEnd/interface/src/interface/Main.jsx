import React from 'react';
import './css/Main.css';
import Lambda from './img/icons8-lambda-24.png';

function App() {
  return (
    <React.Fragment>
      
      <div className="row">
        <div className="col-12 col-sm-7" id="text-area">
          <div className="palavra">
            <>Word: <input className="campo"/></> <br/>
						<i className="descricao">If you want to verify acceptances and derivations</i>
          </div>
          <div className="gramatica">
            <p>Grammar: <textarea className="campo" /></p>
          </div>
		  		<div>
						<br/>
					  <button type="button" className="btn btn-primary btn-m" id="ok">OK</button>
		  		</div>
        </div>
        <div className="col-12 col-lg-3 col-md-4 col-sm-5">
					<section className="container grid grid-template-columns-1">
						<div className = "item subgrid">
							<button type = "button" className = "btn btn-primary btn-s"><b id="lambda">λ</b>{/*<img src={Lambda} alt="Lambda"></img>*/}</button>
							<button type = "button" className = "btn btn-primary btn-s" id="">|</button>
							<button type = "button" className = "btn btn-primary btn-s" id="">-></button>
						</div>
						<div className = "item">
							<button type = "button" className = "btn btn-primary btn-m">Limpar</button>
						</div>
						<div className = "item">
							<button type = "button" className = "btn btn-primary btn-m">Histórico</button>
						</div>
						<div className = "item">
							<button type = "button" className = "btn btn-primary btn-m"><span className="fa fa-exclamation-circle"></span></button>
						</div>
					</section>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;