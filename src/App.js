import InputForm from './components/InputForm';
import TechStack from './components/TechStack';
import TechPopUp from './components/TechPopUp';

import React from 'react';

const defaultTechStack = '{"stack": [{"name": "HTML", "exp": "Intermediate", "image": "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_1280.png"},{"name": "CSS",  "exp": "Advanced", "image": "https://storage.needpix.com/rsynced_images/logo-2582747_1280.png"},{"name": "JavaScript",  "exp": "Expert", "image": "https://purecode.sa/wp-content/uploads/two-4-1200x1200.png"}]}';

class App extends React.Component {

	constructor(props) {
        super(props);

		// Set default state
		let parsedStack = JSON.parse(defaultTechStack);
        this.state = {
			stack: parsedStack.stack,
			showPopup: false,
			selectedTech: null
		};
		
    }

	render() {
		return (
			<div className="app">
				<h1>Tech Stack Collector</h1>
            	<InputForm addToStack={this.addToStack.bind(this)}/>
            	<TechStack stack={this.state.stack} openPopup={this.togglePopup.bind(this)}/>
				{
					this.state.showPopup &&
					<TechPopUp tech={this.state.selectedTech} closePopup={this.togglePopup.bind(this)}/>
				}
        	</div>
		);
        
	}

	addToStack(newTech) {
		let newStack = [newTech].concat(this.state.stack);
		this.setState({
			stack: newStack,
			showPopup: this.state.showPopup
		});
	}

	togglePopup(selectedTech) {
		if (this.state.showPopup) {
			this.setState({
				stack: this.state.stack,
				showPopup: false,
				selectedTech: null
			});
		} else {
			this.setState({
				stack: this.state.stack,
				showPopup: true,
				selectedTech: selectedTech
			});
		}
	}
};

export default App;
