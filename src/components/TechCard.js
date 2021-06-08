import React, {useState, useRef} from 'react';
import '../styling/TechCard.css';

function TechCard(props) {

    const [dragging, setDragging] = useState(false);

    const dragNode = useRef();

    const handleDragStart = (event, tech) => {
        dragNode.current = event.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
        setTimeout(() => {
            setDragging(true);
            props.setDragTech(tech);
        }, 0);
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event, tech) => {
        event.preventDefault();
        let tempTech = {...props.dragTech};
        props.setDragTech(tech);
        props.updateDragTech(tech);
        tech.name = tempTech.name;
        tech.image = tempTech.image;
        tech.exp = tempTech.exp;
        tech.date = tempTech.date;
    }

    const handleDragEnd = () => {
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
    }

    const openCard = () => {
        props.openPopup(props.tech);
    }

    return (
        <li className={dragging ? "dragCard techCard" : "techCard"}
            onClick={openCard} 
            draggable onDragStart={(e) => handleDragStart(e, props.tech)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, props.tech)}>
            <label>{props.tech.name}</label>
            <img draggable="false" src={props.tech.image} alt=""/>   
        </li>
    );
}

export default TechCard;