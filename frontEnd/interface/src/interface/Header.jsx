import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './css/Header.css';

function App() {
  return (
    <React.Fragment>
        <header className="navbar navbar-dark bg-dark shadow-sm">
            <div className="navbar-brand">
								<strong><i className="fa fa-home"></i>LfaAppWeb - </strong>
								<strong>Grammar</strong>
            </div>
        </header>
    </React.Fragment>
  );
}

export default App;