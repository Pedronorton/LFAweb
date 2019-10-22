import React from 'react';
import "../../node_modules/font-awesome/css/font-awesome.css";

function App() {
  
  let lang = navigator.languages;
  let gra = "Grammar";
  if (lang.includes("pt")) { gra = "Gramática"; }
  return (
    <React.Fragment>
      <head></head>
        <header className="navbar navbar-dark bg-dark shadow-sm">
            <div className="navbar-brand">
                <strong><a href="/"> <i className="fa fa-home"></i></a>LfaAppWeb - </strong>
                <strong>{gra}</strong>
            </div>
        </header>
    </React.Fragment>
  );
}

export default App;