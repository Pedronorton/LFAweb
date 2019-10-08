import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Interface from "../interface/Interface";
import Test from "../interface/Test";

class Rotas extends Component {

    render () {
        return (
            <Router history={this.history}>
                <>
                    <Switch>
                        <Route path="/" exact component={Interface}/>
                        <Route path="/test" exact component={Test}/>
                    </Switch>
                </>
            </Router>
        );
    }

}

export default Rotas;