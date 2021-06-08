import React from 'react';
import '../styling/TechPopUp.css'

class TechPopUp extends React.Component {

    render() {
        return (
            <div className="popup-bg" onClick={this.props.closePopup}>
                <div className="popup-fg">
                    <label>{this.props.tech.name}</label>
                    <img src={this.props.tech.image} alt=""/>
                    <label>Experience Level: {this.props.tech.exp}</label>
                </div>
            </div>  
        );
    }
}

export default TechPopUp;