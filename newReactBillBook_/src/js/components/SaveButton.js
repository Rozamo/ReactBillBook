import React from "react";

class SaveButton extends React.Component {
	renderButtonName() {
		const [sidebarChoice, contentChoice] = [
			this.props.sidebarChoice,
			this.props.contentChoice,
		];

		if (sidebarChoice && contentChoice) {
			if (contentChoice === "list") {
				if (sidebarChoice === "items") return "Add Item";
				else
					return `New ${
						sidebarChoice.charAt(0).toUpperCase() +
						sidebarChoice.slice(1, sidebarChoice.length - 1)
					}`;
			} else if (contentChoice === "create")
				return `Save ${sidebarChoice
					.charAt(0)
					.toUpperCase()}${sidebarChoice.slice(1, sidebarChoice.length - 1)}`;
		}
	}

	handleButtonClick = (event) => {
		const [sidebarChoice, contentChoice] = [
			this.props.sidebarChoice,
			this.props.contentChoice,
		];

		if (sidebarChoice && contentChoice) {
			if (contentChoice === "list") this.props.changeContentChoice("create");
			else if (contentChoice === "create") this.props.handleSubmit(event);
		}
		return null;
	};

	icon() {
		if (this.props.contentChoice === "list")
			return <img src="images/plus.png" id="floppy" alt="Save"></img>;
		else if (this.props.contentChoice === "create")
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

export default SaveButton;
