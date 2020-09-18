import React from "react";
import Invoices from "./invoice/Invoices.js";
import TopPanel from "./TopPanel";
import Table from "./Table";
import Items from "./item/Items";
import Customers from "./customer/Customers";

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contentChoice: "list", //either create or list
		};
	}
	changeContentChoice = (contentChoice) => {
		this.setState({
			contentChoice,
		});
	};
	componentDidUpdate(prevProp) {
		if (this.props.sidebarChoice != prevProp.sidebarChoice) {
			this.setState({
				contentChoice: "list",
			});
		}
	}
	handleContent() {
		const [sidebarChoice, contentChoice] = [
			this.props.sidebarChoice,
			this.state.contentChoice,
		];

		if (sidebarChoice && contentChoice) {
			if (contentChoice === "list")
				return <Table sidebarChoice={sidebarChoice} />;
			else if (sidebarChoice === "customers")
				return (
					<Customers
						sidebarChoice={sidebarChoice}
						contentChoice={contentChoice}
						changeContentChoice={this.changeContentChoice}
					/>
				);
			else if (sidebarChoice === "items")
				return (
					<Items
						sidebarChoice={sidebarChoice}
						contentChoice={contentChoice}
						changeContentChoice={this.changeContentChoice}
					/>
				);
		}
		return null;
	}
	render() {
		const [sidebarChoice, contentChoice] = [
			this.props.sidebarChoice,
			this.state.contentChoice,
		];

		if (sidebarChoice === "customers" || sidebarChoice === "items")
			return (
				<div className="content">
					<TopPanel
						sidebarChoice={sidebarChoice}
						contentChoice={contentChoice}
						changeContentChoice={this.changeContentChoice}
					/>
					{this.handleContent()}
				</div>
			);
		else
			return (
				<Invoices
					sidebarChoice={sidebarChoice}
					contentChoice={contentChoice}
					changeContentChoice={this.changeContentChoice}
				/>
			);
	}
}

export default Content;
