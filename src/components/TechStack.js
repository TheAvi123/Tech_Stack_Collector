import React from 'react';
import TechCard from './TechCard';
import '../styling/TechStack.css'

class TechStack extends React.Component {

    render() {
        let techStack = this.props.stack;
        let cardList = techStack.map(this.createCard);
        return (
            <div className="techStack">
                <h3 className="sectionText">
                    Tech Stack
                </h3>
                <ul className="cardList"> 
                    {cardList}
                </ul>
            </div>
        );
    }

    createCard(stackItem, idx) {
        return (
            <TechCard key={idx} tech={stackItem}/>
        );
    }
}

export default TechStack;