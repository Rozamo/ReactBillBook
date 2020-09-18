import React from "react";
class Button extends React.Component {
	icon() {
		if (this.props.name === "Save Invoice")
			return <img src="images/floppy.png" id="floppy" alt="Save"></img>;
		else return <img src="images/plus.png" id="floppy" alt="Save"></img>;
	}
	render() {
		return (
			<button
				id={this.props.id}
				className={this.props.cls}
				value={this.props.value}
				onClick={() => this.props.onClick()}
			>
				{this.icon()}
				{this.props.name}
			</button>
		);
	}
}

export default Button;
