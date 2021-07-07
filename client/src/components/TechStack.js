import React from 'react';
import TechCard from './TechCard';
import '../styling/TechStack.css'

const EmptyStackMessage = "This Stack is Empty!"

class TechStack extends React.Component {

    constructor() {
        super();

        // Set State
        this.state = {
            dragTech: null,
            setDragTech: this.setDragTech,
            updateDragTech: this.updateDragTech
        }

        // Bind functions to make sure this.openCard resolves correctly
        this.createCard = this.createCard.bind(this); 
    };

    render() {
        let techStack = this.props.stack;
        let cardList = techStack.length > 0 ? techStack.map(this.createCard) : (<label>{EmptyStackMessage}</label>); 
        return (
            <div className="techStack">
                <h3 className="sectionText">
                    Tech Stack
                </h3>
                <form> 
                    <input type="text" placeholder="Search" 
                           ref={(s_input) => this.searchInput = s_input}
                           onChange={(e) => {this.props.searchStack(this.searchInput.value)}}/>
                </form>
                <ul className="cardList"> 
                    {cardList}
                </ul>
            </div>
        );
    }

    createCard(stackItem, idx) {
        return (
            <TechCard key={idx} tech={stackItem} 
                      openPopup={this.props.openPopup} 
                      dragTech={this.state.dragTech}
                      setDragTech={this.state.setDragTech.bind(this)}
                      updateDragTech={this.state.updateDragTech.bind(this)}/>
        );
    }

    setDragTech(tech) {
        this.setState({
            dragTech: tech,
            setDragTech: this.setDragTech,
            updateDragTech: this.updateDragTech
        });
    }

    updateDragTech(newTech) {
        let sourceTech = this.state.dragTech;
        sourceTech.name = newTech.name;
        sourceTech.image = newTech.image;
        sourceTech.exp = newTech.exp;
        sourceTech.date = newTech.name;
    }
}

export default TechStack;