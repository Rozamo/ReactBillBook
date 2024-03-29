import React, { Component } from "react";
import { PropTypes } from "prop-types";

class CustomerSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			chosenCustomer: null,
			showDDL: false,
		};
	}
	componentDidMount() {
		fetch("https://rzp-training.herokuapp.com/team2/customers")
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result.items,
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error,
					});
				}
			);
	}

	handleClick = () => {
		this.setState({ showDDL: true });
	};

	handleChange(event, changeCustomerDetails) {
    const idx = event.target.value;
    const {items}=this.state;
		this.setState(
			{
				chosenCustomer: items[idx],
				showDDL: false,
			},
			() => changeCustomerDetails(this.state.chosenCustomer)
		);
	}

	render() {
		if (this.state.error) return "SOME ERROR OCCURED";

		if (!this.state.chosenCustomer && !this.state.showDDL)
			return (
				<div className="inv-cust-det">
					<div>No Customer Chosen</div>
					<button id="inv-cust-change" onClick={() => this.handleClick()}>
						Choose
					</button>
				</div>
			);
		else if (this.state.showDDL) {
			if (!this.state.isLoaded) return "Loading...";
			return (
				<div className="inv-cust-det">
					<select
						className="customer_ddl"
						id="cust_list"
						defaultValue="Choose Customer"
						onChange={(event) =>
							this.handleChange(event, this.props.changeCustomerDetails)
						}
					>
						<option value="Choose Customer">Choose Customer</option>
						{this.state.items.map((customer, index) => (
							<option key={index} value={index}>
								{customer.name}
							</option>
						))}
					</select>
				</div>
			);
		}
		return (
			<div className="inv-cust-det">
				<div>
					<p>{this.state.chosenCustomer.name}</p>
					<p>{this.state.chosenCustomer.contact}</p>
					<p>{this.state.chosenCustomer.email}</p>
				</div>
				<button id="inv-cust-change" onClick={() => this.handleClick()}>
					Change
				</button>
			</div>
		);
	}
}

CustomerSelect.propTypes={
  changeCustomerDetails: PropTypes.func.isRequired
}

export default CustomerSelect;
