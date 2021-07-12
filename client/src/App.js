import InputForm from './components/InputForm';
import TechStack from './components/TechStack';
import TechPopUp from './components/TechPopUp';

import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SERVER = "http://localhost:3001";

function App() {

	const [stack, setStack] = useState([]);
	const [showPopup, setShowPopup] = useState(false);
	const [selectedTech, setSelectedTech] = useState(null);

	const [addTrigger, setAddTrigger] = useState(null);
	const [resetTrigger, setResetTrigger] = useState(null);
	const [deleteTrigger, setDeleteTrigger] = useState(null);
	const [searchTrigger, setSearchTrigger] = useState("");

	// useEffect(() => {  
	// 	getCurrentStack();
	// }, []);
	
	// let getCurrentStack = () => {
	// 	console.log("Initiating GET Request");
    //     axios.get(SERVER + '/stack').then(res => {	
	// 		console.log("Received GET Response");
	// 		if (res.status === 200) {
	// 			setStack(res.data.stack);
	// 		} else {
	// 			console.log("GET Request for Stack Failed:");
	// 			console.log(res);
	// 		}
	// 	}); 
	// };

	useEffect(() => {  
		let addToStack = () => {
			if (addTrigger) {
				console.log("Initiating POST Request");
				let params = addTrigger.name + '/';
				params += addTrigger.exp + '/';
				params += addTrigger.image;
				axios.post(SERVER + '/stack/' + params).then(res => {
					console.log("Received POST Response");
					if (res.status === 200) {
						setStack(res.data.stack);
					} else {
						console.log("POST Request Failed:");
						console.log(res);
					}
				});
				setAddTrigger(null);
			}
		}
		addToStack();
	}, [addTrigger]);

	useEffect(() => {
		let resetStack = () => {
			if (resetTrigger) {
				console.log("Initiating Reset POST Request");
				axios.post(SERVER + '/stack/reset').then(res => {
					console.log("Received POST Response");
					if (res.status === 200) {
						setStack(res.data.stack);
					} else {
						console.log("POST Request Failed:");
						console.log(res);
					}
				});
				setResetTrigger(null);
			}
		};
		resetStack();
	}, [resetTrigger]);
	
	useEffect(() => { 
		let deleteTech = () => {
			if (selectedTech) {
				console.log("Initiating DELETE Request");
				axios.delete(SERVER + '/stack/' + selectedTech.name).then(res => {
					console.log("Received DELETE Response");
					if (res.status === 200) {
						setStack(res.data.stack);
					} else {
						console.log("DELETE Request Failed:");
						console.log(res);
					}
				});
				setSelectedTech(null);
				setShowPopup(false);
			}
		} 
		deleteTech();
	}, [deleteTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {  
		console.log("SEARCH STRING: " + searchTrigger);
		let getStack = () => {
			console.log("Initiating GET Request");
			axios.get(SERVER + '/stack/' + searchTrigger).then(res => {
				console.log("Received GET Response");
				console.log(res.data);
				if (res.status === 200) {
					setStack(res.data.stack);
				} else {
					console.log("GET Request Failed:");
					console.log(res);
				}
			});
		}
		getStack();
	}, [searchTrigger]);

	let togglePopup = (selectedTech) => {
		if (showPopup) {
			setSelectedTech(null);
		} else {
			setSelectedTech(selectedTech);
		}
		setShowPopup(!showPopup);
	}

	return (
		<div className="app">
			<h1>Tech Stack Collector</h1>
			<InputForm addToStack={(newTech) => {setAddTrigger(newTech)}}/>
			<TechStack stack={stack} 
			    	   openPopup={togglePopup.bind(this)}
			           searchStack={(input) => {setSearchTrigger(input)}}
					   resetStack={() => {setResetTrigger(1)}}/>
			{
				showPopup && 
				<TechPopUp tech={selectedTech} 
						   closePopup={togglePopup.bind(this)}
						   deleteTech={() => {setDeleteTrigger(!deleteTrigger)}}/>
			}
    	</div>
	);
};

export default App;
