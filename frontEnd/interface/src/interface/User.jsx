import React , {Component}from 'react';
import './css/Bootstrap.css';


class User extends Component() {
    constructor (props) {
        super(props);
    }

    render () {
      return (
        <div>{this.props.gramatica}</div>
      )
    }

}
export default User;