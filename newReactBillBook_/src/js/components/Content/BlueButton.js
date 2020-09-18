import React from "react";

class BlueButton extends React.Component {
	constructor(props) {
		super(props);
	}
	renderButtonName() {
		if (this.props.sidebar_choice && this.props.content_choice) {
			if (this.props.content_choice === "list") {
				if (this.props.sidebar_choice === "items") return "Add Item";
				else
					return `New ${
						this.props.sidebar_choice.charAt(0).toUpperCase() +
						this.props.sidebar_choice.slice(
							1,
							this.props.sidebar_choice.length - 1
						)
					}`;
			} else if (this.props.content_choice === "create")
				return `Save ${this.props.sidebar_choice
					.charAt(0)
					.toUpperCase()}${this.props.sidebar_choice.slice(
					1,
					this.props.sidebar_choice.length - 1
				)}`;
		}
	}
	handleButtonClick = (event) => {
		if (this.props.sidebar_choice && this.props.content_choice) {
			if (this.props.content_choice === "list")
				this.props.changeContentChoice("create");
			else if (this.props.content_choice === "create")
				this.props.handleSubmit(event);
		}
		return null;
	};
	icon() {
		if (this.props.content_choice === "list")
			return <img src="images/plus.png" id="floppy" alt="Save"></img>;
		else if (this.props.content_choice === "create")
			return <img src="images/floppy.png" id="floppy" alt="Save"></img>;
		return null;
	}
	render() {
		return (
			<button
				type={this.props.type}
				id="button"
				value=""
				onClick={this.handleButtonClick}
			>
				{this.icon()}
				{this.renderButtonName()}
			</button>
		);
	}
}

export default BlueButton;
