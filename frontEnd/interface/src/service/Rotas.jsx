import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Interface from "../interface/Interface";
import User from "../interface/User";

class Rotas extends Component {

    render () {
        return (
            <Router history={this.history}>
                <>
                    <Switch>
                        <Route path="/" exact component={Interface}/>
                        <Route path="/grammar" exact component={User}/>
                    </Switch>
                </>
            </Router>
        );
    }

}

export default Rotas;