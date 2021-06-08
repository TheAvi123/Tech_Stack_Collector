import TechStack from './components/TechStack';
import InputForm from './components/InputForm';
import React from 'react';

class App extends React.Component {

	constructor(props) {
        super(props);

        this.state = {
            stack: []
        };
    }

	render() {
		return (
			<div className="app">
            	<InputForm stack={this.state.stack} updateStack={this.updateStack.bind(this)}/>
            	<TechStack stack={this.state.stack}/>
        	</div>
		);
        
	}

	updateStack(stack) {
		this.setState({stack});
		console.log(this.state.stack);
	}
};

export default App;
