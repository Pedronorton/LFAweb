import React from 'react';
import './css/Main.css';
import Lambda from './img/icons8-lambda-24.png';

function App() {
  return (
    <React.Fragment>
      
      <div className="row">
        <div className="col-sm-6">
          <div className="palavra">
            <p>Word (if you want to verify acceptances and derivations):</p>
            <input/>
          </div>
          <div className="gamatica">
            <p>Grammar:</p>
            <input/>
          </div>
        </div>
        <div className="col-sm-6">
          <div className = "row linha">
            <div className = "col-sm-6">
              <button type = "button" className = "btn btn-primary"><img src={Lambda} alt="Lambda"></img></button>
            </div>
            <div className = "col-sm-4">
              <button type = "button" className = "btn btn-primary">-></button>
            </div>
          </div>
          <div className = "row linha">
            <div className = "col-sm-6">
              <button type = "button" className = "btn btn-primary">|</button>
            </div>
            <div className = "col-sm-4">
              <button type = "button" className = "btn btn-primary">Limpar</button>
            </div>
          </div>
          <div className = "row linha">
            <div className = "col-sm-6">
              <button type = "button" className = "btn btn-primary">OK</button>
            </div>
            <div className = "col-sm-4">
              <button type = "button" className = "btn btn-primary"><span className="fa fa-exclamation-circle"></span></button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;