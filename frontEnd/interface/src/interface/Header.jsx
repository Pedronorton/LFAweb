import React, {useState} from 'react';
import "../../node_modules/font-awesome/css/font-awesome.css";
import './css/Header.css';
import { withRouter } from 'react-router-dom';
import DataService from "../service/DataService";

function toUser(props){
   
    props.history.push({
      pathname: "/user",
      state: {user: props.user}
    });
}

function goHome(props) {
    window.location.href = "/";
}

function logout(IP) {
    DataService.putLogout(IP);
    window.location.href = "/";
}

function Header(props) {

    const [userMenuDisplay, setUserMenuDisplay] = useState("none");
    let a = false;
    let nameNick = (props.user.name === null) ? props.user.email.split("@")[0] : props.user.name;

    let lang = navigator.languages;
    let gra = "Grammar";
    if (lang.includes("pt")) { gra = "Gramática"; }



    return (
        <React.Fragment>
            <header className="navbar navbar-dark bg-dark shadow-sm"
            style={{opacity: props.headerOpacity, pointerEvents: props.headerPointerEvents}}>
                <div className="navbar-brand container-fluid">
                <div id="title">
                    <strong> <i onClick={_ => goHome(props)} className="fa fa-home"></i>LfaAppWeb - </strong>
                    <strong>{gra}</strong>
                </div>
                <div id="profile" onMouseLeave={()=>{if(a===true){setUserMenuDisplay("none")}}}>
                        {nameNick+"   "}
                        <i className="fa fa-user" onMouseOver={() => {setUserMenuDisplay("block"); a=true}}
                        />
                        <div id="user-menu" style={{display: userMenuDisplay}} onMouseOver={()=>{a=true}}>
                            <span class="span" onClick={_ => toUser(props)} >profile</span><br/>
                            <span class="span" onClick={_ => logout(props.IP)}>logout</span>
                        </div>
                </div>
                </div>
            </header>
        </React.Fragment>
    );
}

export default withRouter(Header);