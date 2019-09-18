import React from 'react';
import './css/Main.css';
import Lambda from './img/icons8-lambda-24.png';

function App() {
  return (
    <React.Fragment>
      
      <div className="row">
		<div className="col-sm-3"></div>
        <div className="col-sm-4" id="text-area">
          <div className="palavra">
            <p>Word: <input/></p>
			<i>If you want to verify acceptances and derivations</i>
          </div>
          <div className="gramatica">
            <p>Grammar: <textarea/></p>
          </div>
		  		<div>
						<br/>
					  <button type="button" className="btn btn-primary btnM">OK</button>
		  		</div>
        </div>
        <div className="col-sm-3">
          <div className = "row linha">
            <div className = "col-sm-2">
              <button type = "button" className = "btn btn-primary btnS btnL"><b id="lambda">λ</b>{/*<img src={Lambda} alt="Lambda"></img>*/}</button>
            </div>
						<div className = "col-sm-2">
              <button type = "button" className = "btn btn-primary btnS">|</button>
            </div>
            <div className = "col-sm-2">
              <button type = "button" className = "btn btn-primary btnS">-></button>
            </div>
          </div>
          <div className = "row linha">
						<div className="col-sm-3"></div>
            <div className = "col-sm-4">
              <button type = "button" className = "btn btn-primary btnM">Limpar</button>
            </div>
          </div>
          <div className = "row linha">
						<div className="col-sm-3"></div>
            <div className = "col-sm-4">
              <button type = "button" className = "btn btn-primary btnM">Histórico</button>
						</div>
          </div>
		  		<div className = "row linha">
						<div className="col-sm-3"></div>
            <div className = "col-sm-4">
              <button type = "button" className = "btn btn-primary btnM"><span className="fa fa-exclamation-circle"></span></button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;