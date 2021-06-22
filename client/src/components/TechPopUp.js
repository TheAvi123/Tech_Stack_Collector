import React from 'react';
import '../styling/TechPopUp.css'

class TechPopUp extends React.Component {

    render() {
        return (
            <div>
                <div className="popup-bg" onClick={this.props.closePopup}></div>  
                <div className="popup-fg">
                    <label>{this.props.tech.name}</label>
                    <img src={this.props.tech.image} alt=""/>
                    <label>Experience Level: {this.props.tech.exp}</label>
                    <button className="delete-tech" onClick={this.props.deleteTech}>DELETE</button>
                </div>
            </div>
        );
    }
}

export default TechPopUp;