// var React = require('react');

class Clock extends React.Component{
	constructor(props){
		super(props);
		this.state = {date :new Date()};
	}

	render(){
		return (
		<div>
			<h1>hellsssaaaaao</h1>
						
			<h2> {this.state.date.toLocaleTimeString}</h2>	
		</div> 
		);
	}
}


ReactDOM.render(
	<Clock />,
	document.getElementById('react')
	)
