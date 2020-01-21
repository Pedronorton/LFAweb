import React from 'react';
import './Popup.css';
//import '../interface/css/Main.css';


class Popup extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            value: this.props.text
        }
    }

    render() {  
        return (  
            <div className='popup'>
                <button className="btn btn-secondary cls" onClick={this.props.closePopup}>X</button>
                <div className='popup_inner'>
                    <div className="container grid grid-template-col-3">
                        { this.state.value }
                    </div>  
                </div>
                
            </div>  
        );
}  
}  

export default Popup;