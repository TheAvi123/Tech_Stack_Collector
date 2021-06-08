import React from 'react';
import '../styling/TechCard.css';

class TechCard extends React.Component {

    render() {
        let tech = this.props.tech;
        return (
            <li className="techCard">
                {tech.name}
            </li>
        );
    }
}

export default TechCard;