import React, {Component} from "react";
import Cookie from "js-cookie";
import Header from './Header.jsx';
import "./css/User.css";
import DataService from "../service/DataService";

class User extends Component {
    
    constructor(props){
        super(props);
       
        this.state = {

            user: props.location.state.user,
            userName: props.location.state.user.name,
            userEmail: props.location.state.user.email,
            creationDate: props.location.state.user.dateCreation,
            credential: props.location.state.authorization
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChangeName(event) {

        if (event.target.value === "")
            this.setState({userName: null});
        else this.setState({userName: event.target.value});
    }
    
    handleChangeEmail(event){
        
        this.setState({userEmail: event.target.value});
    }
    
    handleSubmit(event){
        
        let usr = {
            id: this.state.user.id,
            email: this.state.userEmail,
            name: this.state.userName,
            dateCreation: this.state.user.dateCreation,
            historicalGrammar: this.state.user.historicalGrammar
        };
        
        event.preventDefault();
        DataService.updateUser(usr, this.state.credential)
            .then(
                response => {
                    this.setState({user: response.data})
                }
            ).catch(
                error => {
                    alert("Falha de atualização de dados ");
                    Cookie.remove('token', { path: '/' });
                    Cookie.remove('userMail', { path: '/' });
                    window.location.href = "/";
                }
            );
    }
    
    deleteUser(usr){

        if (window.confirm('Are you sure you want to delete your account from our database?')){
            DataService.deleteUser(usr, this.state.credential)
                .then(
                    response => {
                        DataService.logout()
                        .then(
                            response => {
                                this.props.history.push({
                                    pathname: "/",
                                    state: {credential: null}
                                });
                            }
                        )
                        .catch(
                            error => {
                                alert("Falha ao fazer logout");
                                Cookie.remove('token', { path: '/' });
                                Cookie.remove('userMail', { path: '/' });
                                window.location.href = "/";
                            }
                        );
                    }
                ).catch(
                    error => {
                        alert("Falha ao apagar conta ");
                        Cookie.remove('token', { path: '/' });
                        Cookie.remove('userMail', { path: '/' });
                        window.location.href = "/";
                    }
                );
        }
    }
    
    render () {

        return (
        <React.Fragment>
            <Header headerUser={this.state.user} headerAuthorization={this.state.credential}/>
            <div id="body">
                <div id="user-box">
                    <form onSubmit={event => this.handleSubmit(event)}>
                        <div id="user-image">
                            <h1>User</h1>
                        </div>
                        <div id="user-name">
                            Name:<br/>
                            <input type="text" value={this.state.userName} onChange={event => this.handleChangeName(event)}/>
                        </div>
                        <br/>
                        <div id="user-email">
                            Email:<br/>
                            <input type="email" value={this.state.userEmail} onChange={event => this.handleChangeEmail(event)}/>
                        </div>
                        <br/>
                        <div id="user-creationDate">
                            Creation Date:<br/>
                            {this.state.creationDate}
                        </div>
                        <br/>
                        <div id="login-button">
                            <input type="submit" className="btn btn-primary" value="UPDATE"/>
                        </div>
                    </form>
                    <br/>

                </div>
            </div>
        </React.Fragment>
        );
    }

}

export default User;