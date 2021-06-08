import React from 'react';
import '../styling/InputForm.css';

class InputForm extends React.Component {

    constructor() {
        super();

        // Bind functions to make sure this.addTech resolves correctly
        this.addTech = this.addTech.bind(this); 
    }

    render() {
        return (
            <div className="form"> 
                <h3>Add New Technology</h3>
                <form onSubmit={this.addTech}>
                    <div className="inputs">
                        <input id="nameInput" type="text" placeholder="Tech Name" 
                            ref={(t_name) => this.input_name = t_name}>
                        </input>
                        <input id="imageInput" type="url" placeholder="Tech Image URL" 
                            ref={(t_img) => this.input_img = t_img}>
                        </input>
                        <select id="expInput" ref={(t_exp) => this.input_exp = t_exp}>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                    <div className="buttons">
                        <button id="addButton" type="submit">Add Technology</button>
                        <button id="clearButton" type="reset">Reset Fields</button>
                    </div>
                </form>
            </div>
        );
    }

    addTech = (event) => {
        // Prevent page from reloading
        event.preventDefault();
        // Error handling: checking for empty strings
        if (this.input_name.value === "" || this.input_name.value === undefined) {
            console.log("ERROR: Invalid Name");
            return;
        }
        if (this.input_img.value === ""  || this.input_img.value === undefined) {
            console.log("ERROR: Invalid Image URL");
            return;
        }
        // Create new object for technology
        let newTech = {
            name: this.input_name.value,
            image: this.input_img.value,
            exp: this.input_exp.value,
            date: Date.now()
        };
        // Add new technology to state
        this.props.updateStack(this.props.stack.concat(newTech));
    }
}

export default InputForm;