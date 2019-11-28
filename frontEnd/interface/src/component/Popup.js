import React from 'react';
import './Popup.css';


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
                <div className='popup_inner'>
                    { this.state.value }
                    <button onClick={this.props.closePopup}>close me</button>  
                </div>
                
            </div>  
        );
}  
}  

export default Popup;