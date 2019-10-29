import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Header from './Header.jsx';
import Main from './Main.jsx';

import Popup from "reactjs-popup";
import Content from "../component/Content";

import "./css/Interface.css";

function App() {
  let lang = navigator.languages;
  let descToggle = {
        lambda: "point",
        grammar : "click me",
        arrow: "->"
  };
  let buttonNames = {
      grammar: "grammar",
      arrow: "arrow"
  }
  if (lang.includes("pt")) { 
    descToggle.lambda = "ponto";
    descToggle.grammar = "Clique aqui";
    descToggle.arrow = "->";
    buttonNames.grammar = "Gramática";
    buttonNames.arrow = "seta";
  }
  return (
    <React.Fragment>
        <Header/>


        <Main
          lambda={
            <Popup modal trigger={
              <button className="btn btn-secondary btnLabel" >
                <div className="tooltiphtml">
                    <input type="radio" name="options" id="option1" autocomplete="off"/>Lambda
                    <span className="tooltiptext">{descToggle.lambda} </span>
                </div>
              </button> } >
              {close => <Content close={close}/> }
            </Popup>
          }
            
          grammar={
            <Popup modal trigger={
                <button className="btn btn-secondary btnLabel">
                    <div className="tooltiphtml">
                        <input type="radio" name="options" id="option1" autocomplete="off"/>{buttonNames.grammar}
                        <span className="tooltiptext">{descToggle.grammar} </span>
                    </div>
                </button>} >
                {close => <Content close={close} numImg={1}/> }
            </Popup>
          }

         arrow = {
           <Popup modal trigger= {
              <button className="btn btn-secondary btnLabel">
                  <div className="tooltiphtml">
                      <input type="radio" name="options" id="option3" autocomplete="off"/>{buttonNames.arrow}
                      <span className="tooltiptext">{descToggle.arrow}</span>
                  </div>
              </button>}>
              {close => <Content close={close} numImg={2}/>}
            </Popup>
          }
          />
          
        
        
    </React.Fragment>
  );
}

export default App;
