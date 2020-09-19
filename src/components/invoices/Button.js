import React from "react";
import floppy from '../../images/floppy.png';
import plus from '../../images/plus.png';

class Button extends React.Component {
	icon() {
		if (this.props.name === "Save Invoice")
			return <img src={floppy} id="floppy" alt="Save"></img>;
		else return <img src={plus} id="floppy" alt="Save"></img>;
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
