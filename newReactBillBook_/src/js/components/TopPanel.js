import React from "react";
import SaveButton from "./SaveButton";

export default function TopPanel(props) {
	function renderTitle() {
		if (props.sidebarChoice && props.contentChoice) {
			if (props.contentChoice === "list")
				return (
					<h1 id="title">
						{props.sidebarChoice.charAt(0).toUpperCase() +
							props.sidebarChoice.slice(1)}
					</h1>
				);
			else
				return (
					<h1 id="title">
						New{" "}
						{props.sidebarChoice.charAt(0).toUpperCase() +
							props.sidebarChoice.slice(1, props.sidebarChoice.length - 1)}
					</h1>
				);
		}
		return null;
	}
	function renderButton() {
		if (props.sidebarChoice && props.contentChoice) {
			if (props.contentChoice === "list")
				return (
					<SaveButton
						sidebarChoice={props.sidebarChoice}
						contentChoice={props.contentChoice}
						changeContentChoice={props.changeContentChoice}
					/>
				);
		}
		return null;
	}
	return (
		<div className="top-panel">
			{renderTitle()}
			{renderButton()}
		</div>
	);
}
