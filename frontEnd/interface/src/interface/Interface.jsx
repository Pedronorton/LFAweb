import React, {useState, useEffect} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Header from './Header.jsx';
import Main from './Main.jsx';
import DataService from '../service/DataService';

import "./css/Login.css";
import "./css/Interface.css";

import { withRouter} from 'react-router-dom';

import publicIp from "public-ip";

function Interface() {

    const [myIP, setmyIP] = useState(undefined);
    getIP().then( response => setmyIP(response) );

    console.log("Test1: " + myIP);

    //const [loginStatus, setLoginStatus] = useState(0);
    const [loginDisplay, setLoginDisplay] = useState("block");
    const [interfacePointerEvents, setInterfacePointerEvents] = useState("none");
    const [interfaceOpacity, setInterfaceOpacity] = useState(0.6);
    const [opCityEmail, setOpCityEmail] = useState(0);
    const [user, setUser] = useState({id: null, email: "",  name: null, dateCreation: null, historicalGrammar: []});

    useEffect(() => {

        getIP().then( response =>  setmyIP(response));
        console.log("test2: " + myIP);
        if ((myIP !== undefined) && user.id == null) {
            DataService.getConfirmUserLogged(myIP)
            .then(
                response => {
                    console.log("loginStatus: " + response.data.id);
                    if (response.data.id !== undefined) {
                        setUser(response.data);
                        setLoginDisplay("none");
                        setInterfacePointerEvents("auto");
                        setInterfaceOpacity(1);
                    } else {
                        setLoginDisplay("block");
                        setInterfaceOpacity(0.6);
                        setInterfacePointerEvents("none");
                    }
                });
        }
    });

    async function getIP () {
        console.log("SÓ AQUI: " + await publicIp.v4());
        return await publicIp.v4();
    }

    function loginFunction() {
        if (opCityEmail === 1) {
 

            let usr = {
                name: user.name,
                email: user.email,
            };
        
            console.log("USER : "+ usr.name + usr.email + " " + usr.dateCreation);
         
         

            DataService.postSigLogUser(usr, myIP)
            .then(
                response =>  {

                        console.log("Return: " + response.data.id)
                        setUser(response.data);
                        console.log("usr: " +  response.data.id + " " + response.data.email + " " + response.data.name + " " +
                        response.data.dateCreation + " " + response.data.historicalGrammar);
                        
                        setInterfaceOpacity(1);
                        setLoginDisplay("none");
                        setInterfacePointerEvents("auto");
                        console.log("FUNCIONOU");

                }
            );
            
        
        }
    }
    
    function onChangeEmail(value) {
        console.log("Email: " + value)
        let arroba = value.split('@');
        console.log("1ª: " + (arroba.length === 2) )
        if (arroba.length === 2) {
            let point = arroba[1].split('.');
            console.log("2ª: " + (point.length > 2) +
                " " + (point[1] !== "") + " " + (point[1] !== " "))
            if ((point.length >= 2) && (point[1] !== "") &&
                (point[1] !== " ")) {
                    // Confirma se email existe no Login
                    console.log("EMAILLogin: " + value);
                    setOpCityEmail(1);
                    setUser({ email: value });
                
            } else setOpCityEmail(0);
        } else setOpCityEmail(0);
        
    }
    function _handleKeyDown(event) {
        console.log("ENTER" + event.key);
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
            <Header user={user} headerOpacity={interfaceOpacity} 
                IP={myIP} headerPointerEvents={interfacePointerEvents}/>
            <Main user={user} mainOpacity={interfaceOpacity} mainPointerEvents={interfacePointerEvents}/>
        </React.Fragment>
    );
    }

export default withRouter(Interface);
