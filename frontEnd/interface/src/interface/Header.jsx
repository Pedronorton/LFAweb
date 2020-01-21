import React, {useState} from 'react';
import Cookie from "js-cookie";
import "../../node_modules/font-awesome/css/font-awesome.css";
import './css/Header.css';
import { withRouter } from 'react-router-dom';
import DataService from "../service/DataService";

function toUser(props){
   
    props.history.push({
      pathname: "/user",
      state: {user: props.headerUser,
            authorization: props.headerAuthorization}
    });
}

function goHome(props) {

    props.history.push({
        pathname: "/",
        state: {user: props.headerUser,
                authorization: props.headerAuthorization}
      })
    window.location.href = "/";
}

function logout(props) {
    DataService.logout()
        .then(
            response => {
                props.history.push({
                    pathname: "/",
                    state: { credential: {headers:{Authorization: ""}},
                             user: {id: null, email: "",  name: null, dateCreation: null, historicalGrammar: []}
                            }

                  });
                Cookie.remove('token', { path: '/' });
                Cookie.remove('userMail', { path: '/' });
            }
        )
        .catch(
            error => {
                alert("Falha de logout");
                Cookie.remove('token', { path: '/' });
                Cookie.remove('userMail', { path: '/' });
            }
        );
        window.location.href = "/";
}

function Header(props) {

    const [userMenuDisplay, setUserMenuDisplay] = useState("none");
    let a = false;
    let nameNick = (props.headerUser.name === null) ? props.headerUser.email.split("@")[0] 
        : props.headerUser.name;

    let lang = navigator.languages;
    let gra = "Grammar";
    if (lang.includes("pt")) { gra = "Gramática"; }



    return (
        <React.Fragment>
            <header className="navbar navbar-dark bg-dark shadow-sm"
            style={{opacity: props.headerOpacity, pointerEvents: props.headerPointerEvents}}>
                <div className="navbar-brand container-fluid">
                <div id="title">
                    <strong> 
                        <i  style={{"font-size": "144%"}}
                            onClick={_ => goHome(props)} 
                            className="fa fa-home"></i> &nbsp; LfaAppWeb -&ensp;
                    </strong>
                    <strong>{gra}</strong>
                </div>
                <div id="profile" onMouseLeave={()=>{if(a===true){setUserMenuDisplay("none")}}}>
                        {nameNick+"   "}
                        <i className="fa fa-user" onMouseOver={() => {setUserMenuDisplay("block"); a=true}}
                        />
                        <div id="user-menu" style={{display: userMenuDisplay}} onMouseOver={()=>{a=true}}>
                            <span class="span" onClick={_ => toUser(props)} >profile</span><br/>
                            <span class="span" onClick={_ => logout(props)}>logout</span>
                        </div>
                </div>
                </div>
            </header>
        </React.Fragment>
    );
}

export default withRouter(Header);