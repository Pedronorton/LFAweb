import React, {Component} from "react";
import Header from './Header.jsx';
import "./css/User.css";
import DataService from "../service/DataService";
import publicIp from "public-ip";

class User extends Component {
    
    constructor(props){
        super(props);
       
        this.state = {

            user: props.location.state.user,
            userName: props.location.state.user.name,
            userEmail: props.location.state.user.email,
            creationDate: props.location.state.user.dateCreation,
            myIP: null
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
        DataService.updateUser(usr)
            .then(
                response => {
                    this.setState({user: response.data})
                }
            );
    }
    
    deleteUser(usr, ip){
        console.log("usr: " + usr.id + " " + usr.email + " " + usr.name + " " + usr.dateCreation);
        console.log("ip: " + ip);
        if (window.confirm('Are you sure you want to delete your account from our database?')){
            DataService.deleteUser(usr, ip)
                .then(
                    response =>
                        window.location.reload(false)
                );
        }
    }

    async getIP () {
        console.log("SÓ AQUI: " + await publicIp.v4());
        return await publicIp.v4();
    }
    
    render () {
        this.getIP().then( response => this.setState({myIP: response}) );
        return (
        <React.Fragment>
            <Header user={this.state.user} IP={this.state.myIP}/>
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
                    {/* <div id="login-button">
                        <button type="button" className="btn btn-danger" onClick={_ => this.deleteUser(this.state.user, this.state.myIP)}>DELETE</button>
                    </div> */}
                </div>
            </div>
        </React.Fragment>
        );
    }

}

export default User;