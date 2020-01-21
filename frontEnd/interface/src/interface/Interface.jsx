import React, {useState, useEffect} from 'react';
import Cookie from "js-cookie";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Header from './Header.jsx';
import Main from './Main.jsx';
import DataService from '../service/DataService';

import "./css/Login.css";
import "./css/Interface.css";

import { withRouter} from 'react-router-dom';

function Interface(props) {

    const [loginDisplay, setLoginDisplay] = useState("block");
    const [interfacePointerEvents, setInterfacePointerEvents] = useState("none");
    const [interfaceOpacity, setInterfaceOpacity] = useState(0.8);
    const [opCityEmail, setOpCityEmail] = useState(0);
    const [user, setUser] = useState({id: null, email: "",  name: null, dateCreation: null, historicalGrammar: []});
    const [credential, setCredential] = useState({headers: {Authorization: ""}});

    useEffect(() => {
        if ( Cookie.get("token") !== undefined && 
            (Cookie.get("token") !== credential.headers.Authorization) && 
        (Cookie.get("userMail") !== user.email)) {
            
    
            setInterfaceOpacity(1);
            setLoginDisplay("none");
            setInterfacePointerEvents("auto");


            setCredential(
                {
                    headers: {
                        Authorization: Cookie.get("token")
                    }
                }
            );

            DataService.getUserByEmail(Cookie.get("userMail"), 
            {
                headers: {
                    Authorization: Cookie.get("token")
                }
            })
                .then(
                    response => {
                        setUser(response.data)
                    }
                )
                .catch(
                    error => {
                        alert("Falha ao encontrar usuário !!!")
                        Cookie.remove('token', { path: '/' });
                        Cookie.remove('userMail', { path: '/' });
                        window.location.href = "/";
                    }
                )
        }
    });

    function loginFunction() {
        if (opCityEmail === 1) {
 

            let usr = {
                name: (user.name === null | user.name === undefined)? 
                    user.email.split('@')[0] : user.name,
                email: user.email,
            };
        
            DataService.signUp(usr)
            .then(
                response =>  {

                        setUser(response.data);

                        let data = {
                            email: response.data.email,
                            password: response.data.autho
                        }

                        Cookie.set("userMail", response.data.email);

                        DataService.login(data)
                            .then(
                                response => {

                                    setCredential( {
                                            headers: {
                                                Authorization: response.headers.authorization
                                            }
                                    } );

                                    Cookie.set("token", response.headers.authorization);
                                     

                                    setInterfaceOpacity(1);
                                    setLoginDisplay("none");
                                    setInterfacePointerEvents("auto");

                                }
                            )
                            .catch(
                                error => {
                                    alert("Falha de login ");
                                    Cookie.remove('token', { path: '/' });
                                    Cookie.remove('userMail', { path: '/' });
                                    setUser({id: null, email: "",  name: null, 
                                    dateCreation: null, historicalGrammar: []});
                                    window.location.href="/";
                                }
                            )

                }
            ).catch(
                error => {
                    alert("Falha ao enviar dados de usuários");
                    Cookie.remove('token', { path: '/' });
                    Cookie.remove('userMail', { path: '/' });
                    window.location.href = "/";
                }
            );
            
        
        }
    }
    
    function onChangeEmail(value) {

        let arroba = value.split('@');

        if (arroba.length === 2) {
            let point = arroba[1].split('.');

            if ((point.length >= 2) && (point[1] !== "") &&
                (point[1] !== " ")) {
                    // Confirma se email existe no Login
  
                    setOpCityEmail(1);
                    setUser({ email: value });
                
            } else setOpCityEmail(0);
        } else setOpCityEmail(0);
        
    }

    function _handleKeyDown(event) {

        if(event.key === 'Enter') {
            loginFunction();
        }
    }

    return (
        <React.Fragment>
            <div id = "login-body" style={{display: loginDisplay}}>
                <div className = "login-menu">
                    <div className = "item" id = "login-title">
                        <t>Register to keep your history saved</t>
                    </div>
                    <div className = "item" id = "login-email">
                        <input className = "input-email" type="email" placeholder="e-mail" 
                        onChange={event => onChangeEmail(event.target.value)} onKeyDown={event => _handleKeyDown(event)} />
                        <i className="fa fa-check validationUser" style={{opacity: opCityEmail, "color": "green"}}/>
                    </div>
                    <div className="">
                        <button className="btn btn-success buttonildo" onClick={_ => loginFunction()}>OK</button>
                    </div>
                </div>
            </div>
            <Header headerUser={user} headerOpacity={interfaceOpacity}
                headerAuthorization={credential} headerPointerEvents={interfacePointerEvents}/>
            <Main mainUser={user} mainOpacity={interfaceOpacity} mainPointerEvents={interfacePointerEvents}
            mainAuthorization={credential}/>
        </React.Fragment>
    );
}

export default withRouter(Interface);
