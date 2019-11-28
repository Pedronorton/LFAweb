import React, {Component} from "react";
import { withRouter } from "react-router-dom";

import "./css/LoginSign.css";

import DataService from "../service/DataService";


class LoginSign extends Component {

    constructor (props) {
        super(props);
        this.timer = 0;
        this.state = {
            backDownLogin: "",
            activateRegister: "none",
            dispAuthoSucess: "block",
            dispSucess: "none",
            authentVisible: "",
            positionAuth: "90px",
            opacityAuth: "1",
            seconds: 0,
            opCitLogin: 0,
            opCitSign: 0,
            opCitUSer: 0,
            email: "",
            userName: "",
            user: null,
            textResult: ""
        }

        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);

        this.onStartAutenthentication = this.onStartAutenthentication.bind(this);
        this.startTimerAuth = this.startTimerAuth.bind(this);
        this.countDownAuth = this.countDownAuth.bind(this);
        this.countDownTimer = this.countDownTimer.bind(this);
        this.startTimerLogin = this.startTimerLogin.bind(this);

        this.countTimer = this.countTimer.bind(this);
        this.startGoNextPage = this.startGoNextPage.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    startTimer () {
          this.timer = setInterval(this.countDown, 900);
      }
    
    countDown () { 
      clearInterval(this.timer);
      this.timer = 0;
      let displayStatus = (this.state.activateRegister === "none") ?
                "block" : "none";
      this.setState({activateRegister: displayStatus});
    }

    startTimerAuth () {
            console.log("test: " + this.state.seconds);
            if (this.state.seconds === 0) {
                console.log("LOG");
                this.timer = setInterval(this.countDownTimer, 900);
            }
    }


    countDownTimer () {
         // Remove one second, set state so a re-render happens.
        let secondsCount = this.state.seconds + 1;
        this.setState({seconds: secondsCount});
        
        console.log("secondsCount: " + secondsCount);
        // Check if we're at zero.
        if (secondsCount === 2) {
            console.log("ASDJ");
            clearInterval(this.timer);
            this.setState({
                activateRegister: "none",
                dispAuthoSucess: "block",
                dispSucess: "none",
                seconds: 0
            });
        }
    }


    onStartAutenthentication (values) {
        if (this.state.opCitLogin === 1) {
            this.setState({
                backDownLogin: "test testtwo",
            })
            this.startTimerLogin(values);
        }
     
    }

    startTimerLogin (values) {
        this.setState({
            dispSucess: "block",
            opacityAuth: 1,
            authentVisible: "visible testtworight",
        });

        this.startGoNextPage(values);

    }

    startGoNextPage (values) {
        if (this.state.seconds === 0)
            this.timer = setInterval(_ => this.countTimer(values), 900);
    }

    countTimer (values) {
        let secondsCount = this.state.seconds + 1;
        this.setState({seconds: secondsCount});

        console.log("seconds: " + secondsCount);

        switch (secondsCount) {
            case 2 : {
                DataService.getUserByEmail(values.email)
                .then(
                    response => {
                        console.log("USER: " + response.data);
                        this.setState({user: response.data});
                        this.setState({
                                    opacityAuth: "0.4",
                                    authentVisible: "visible",
                        });
                    }
                )
                break;
            }

            case 3 : {
                this.setState({
                    opacityAuth: 0,
                    backDownLogin: "",
                    dispAuthoSucess: "none",
                    dispSucess: "block",
                    textResult: "<h2>Authentication Success</h2>" +
                                    "<p>Welcome back</p>",
                });
                break;
            }

            case 4 : {
                clearInterval(this.timer);
                this.timer = 0;
                this.setState({seconds: 0})
                this.props.history.push("/grammar");
                break;
            }

        }


    }

    countDownAuth (values) {
        // Remove one second, set state so a re-render happens.

        this.setState({authentVisible: "visible testtworight"});

        let currentDate = new Date();
        
        console.log("Dia: " + currentDate.getDate());
        console.log("Mês: " + currentDate.getMonth()+1);
        console.log("Ano: " + currentDate.getFullYear());

        let mouth = currentDate.getMonth()+1;
        let date = currentDate.getDate() + '/' + mouth
            + "/" + currentDate.getFullYear();


        console.log("DATA: " + date);

        let user = {
            name: values.userName,
            email: values.email,
            dateCreation: date,
            dateLastUse: date
        }

        DataService.postSignNewUser(user)
            .then(
                response => {
                    console.log("Respose data: " + response.data);

                    if (response.data) {
                        
                            this.setState({
                                opacityAuth: "0.4",
                                authentVisible: "visible",
                            });
                            this.setState({
                                opacityAuth: 0,
                                backDownLogin: "",
                                dispAuthoSucess: "none",
                                dispSucess: "block",
                                textResult: "<h2>Authentication Success</h2>" +
                                                "<p>Welcome back</p>"
                            });

                    } else {
                        this.setState({
                                opacityAuth: "0.4",
                                authentVisible: "visible",
                            });
                    
                        this.setState({
                            opacityAuth: 0,
                            backDownLogin: "",
                            dispAuthoSucess: "none",
                            dispSucess: "block",
                            textResult: "<h2>Authentication Failed</h2>",
                        });
                    }


                    this.startTimerAuth();
                }
            );

        // this.setState({dispSucess: "block"});

    }

    onChange (value, option) {

        if (option < 2) {
            let arroba = value.split('@');

            console.log("1ª: " + (arroba.length === 2) )
            if (arroba.length === 2) {
                let point = arroba[1].split('.');
                console.log("2ª: " + (point.length > 2) +
                    " " + (point[1] !== "") + " " + (point[1] !== " "))
                if ((point.length >= 2) && (point[1] !== "") &&
                    (point[1] !== " ")) {
                    if (option === 0) { // Confirma se email existe no Login
                        let confirm = false;

                        DataService.getConfirmUser(value)
                            .then(
                                response => {
                                    
                                    console.log("confirm: " + response.data);
                                    console.log("EMAILLogin: " + value);
                                    if (response.data) {
                                        this.setState({
                                            opCitLogin: 1,
                                            email: value
                                        });
                                    }
                                }
                            );
                    }
                    else {// Confirma se email não existe no Sign
                        let confirm = false;

                        DataService.getConfirmUser(value)
                            .then(
                                response => {
                                    console.log(!response.data);
                                    console.log("EmailSign: " + value);
                                    if (!response.data)
                                        this.setState({opCitSign: 1, email: value });
                                }
                            );
                        
                    }


                } else if (option === 0) // Desativa a submit após o ponto é nulo
                    this.setState({opCitLogin: 0});
                else this.setState({opCitSign: 0});

            } else if (option === 0)// Desativa a submit após o @ é nulo
                this.setState({opCitLogin: 0});
            else this.setState({opCitSign: 0});

        } else { // userName
            if (value.length > 0) {
                this.setState({opCitUSer: 1,
                    userName: value
                })
            }
            else this.setState({opCitUSer: 0})
        }
    }

    onSubmit (values) {
        if ((this.state.opCitSign === 1) &&
            (this.state.opCitUSer === 1)) {
            this.setState({backDownLogin: "test"});
            this.countDownAuth(values);
            //this.startTimer();
        }
    }

    render () {
        return (
        <div className="logBody">
            
            <div className="brand">
              <a href="https://www.jamiecoulter.co.uk" target="_blank">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/logo.png" />
              </a>
            </div>

            <div className={`login ${this.state.backDownLogin}`}>
                <div className="login_title"  style={{"display": `${this.state.dispAuthoSucess}`}}>
                    <span>Login to your account</span>
                </div>
                <div className="login_fields"  style={{"display": `${this.state.dispAuthoSucess}`}}>
                    <div className="login_fields__user" style={{"display": `${this.state.dispAuthoSucess}`}}>
                          <div className="icon" style={{"display": `${this.state.dispAuthoSucess}`}}>
                            <i style={{"color": "white"}} className="fa fa-at"  width="20"/>
                          </div>
                          <input placeholder="email" type="text"
                          onChange={event => this.onChange(event.target.value, 0)}/>
                          <div className="validation"  style={{"opacity": `${this.state.opCitLogin}`}}>
                            <i className="fa fa-check" style={{"color": "green"}}/>
                          </div>
                    </div>
                    <div className="login_fields__submit" style={{"display": `${this.state.dispAuthoSucess}`}}>
                          <input onClick={_ => this.onStartAutenthentication(this.state)} type="submit" value="Log In" />
                          <div className="forgot">
                                <p>
                                  &nbsp;    If not Account 
                                  <strong className="registerChange" onClick={
                                    _ => {this.setState({backDownLogin: "test testtwo"})
                                         this.startTimer();
                                        } 
                                    }>
                                      &nbsp;    REGISTER
                                  </strong>
                                </p>
                          </div>
                    </div>
                </div>




                <div className="success" style={{"display": `${this.state.dispSucess}`} }>
                    <h2>Authentication Success</h2>
                    <p>Welcome back</p>
                    </div>

                    <div className="disclaimer"  style={{"display": `${this.state.dispAuthoSucess}`}}>
                    <strong style={{color: "white"}}>This page for register is only save your history</strong>
                </div>
            </div>


            <div className="login" style={{"display": `${this.state.activateRegister}`}}>
                <div className="login_title" style={{"display": `${this.state.dispAuthoSucess}`}}>
                    <span>Sign to your account</span>
                </div>
                <div className="login_fields" style={{"display": `${this.state.dispAuthoSucess}`}}>
                    <div className="login_fields__user" style={{"display": `${this.state.dispAuthoSucess}`}}>
                          <div className="icon" style={{"display": `${this.state.dispAuthoSucess}`}}>
                            <i style={{"color": "white"}} className="fa fa-at"  width="20"/>
                          </div>
                          <input placeholder="email" type="text"
                          onChange={event => this.onChange(event.target.value, 1)}/>
                          <div className="validationSign" style={{"opacity": `${this.state.opCitSign}`}}>
                            <i className="fa fa-check" style={{"color": "green"}}/>
                          </div>


                          <div className="iconUser" style={{"display": `${this.state.dispAuthoSucess}`}}>
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png" />
                          </div>
                          <input placeholder="username" type="text"
                          onChange={event => this.onChange(event.target.value, 2)}/>
                          <div className="validationUser"  style={{"opacity": `${this.state.opCitUSer}`}}>
                            <i className="fa fa-check" style={{"color": "green"}}/>
                          </div>

                    </div>
                    <div className="login_fields__submit" style={{"display": `${this.state.dispAuthoSucess}`}}>
                          <input type="submit" value="Submit" onClick={
                            _ => this.onSubmit(this.state)
                          }/>
                    </div>
                </div>




                <div className="success" style={{"display": `${this.state.dispSucess}`}}>
                    <div dangerouslySetInnerHTML={{__html: this.state.textResult }} />
                </div>

                <div className="disclaimer"  style={{"display": `${this.state.dispAuthoSucess}`}}>
                    <strong style={{color: "white"}}>This page for register is only save your history</strong>
                </div>
            </div>

            {/*-241.7339px    0.988474 */}
            <div className={`authent ${this.state.authentVisible}`} 
            style={{"display": `${this.state.dispSucess}`,
                    "right": `${this.state.positionAuth}`,
                    "opacity": `${this.state.opacityAuth}` }}>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/puff.svg" />
              <p>Authenticating...</p>
            </div>
            {/* partial */}
      </div>
        );
    }

}

export default withRouter(LoginSign);