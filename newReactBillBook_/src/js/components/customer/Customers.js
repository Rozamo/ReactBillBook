import React from "react";
import SaveButton from "../SaveButton";

class Customers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			contact: "",
			email: "",
			isPosting: false,
		};
	}
	isValid() {
		if (!/^[a-z A-Z.]+$/.test(this.state.name)) {
			alert(
				"Name must not be blank and must contain only alphabets and/or a dot"
			);
			return false;
		}
		if (
			!/^\+?[0-9]+$/.test(this.state.contact) ||
			this.state.contact.length < 10
		) {
			alert(
				"Phone number must contain numbers and/or + and must have atleast 10 characters"
			);
			return false;
		}
		if (!/^[^@]+@[^@.]+.[^@.]+$/.test(this.state.email)) {
			alert("Enter valid email");
			return false;
		}
		return true;
	}
	handleSubmit = (event) => {
		event.preventDefault();
		if (!this.isValid()) return;
		const new_obj = {};
		for (const i in this.state)
			if (i !== "isPosting") new_obj[i] = this.state[i];
		this.setState({ isPosting: true });
		fetch("https://rzp-training.herokuapp.com/team2/customers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(new_obj),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					this.setState({
						isPosting: false,
					});
					alert(data.error);
				} else {
					this.props.changeContentChoice("list");
				}
			})
			.catch((error) => {
				alert(error.message);
			});
	};
	render() {
		if (this.state.isPosting)
			return <img src="images/load.gif" alt="Loading...." id="load-img"></img>;
		else
			return (
				<form className="customer-form" onSubmit={this.handleSubmit}>
					<div className="cust-panel-1">
						<div>
							<label htmlFor="name">Name</label>
							<input
								value={this.state.name}
								type="text"
								name="name"
								onChange={(event) => {
									this.setState({ name: event.target.value });
								}}
								required
							/>
						</div>
						<div>
							<label htmlFor="contact">Phone</label>
							<input
								value={this.state.contact}
								type="text"
								name="contact"
								onChange={(event) => {
									this.setState({ contact: event.target.value });
								}}
							/>
						</div>
					</div>
					<label htmlFor="email">Email</label>
					<div className="cust-panel-1">
						<input
							value={this.state.email}
							type="email"
							name="email"
							onChange={(event) => {
								this.setState({ email: event.target.value });
							}}
						/>
						<SaveButton
							sidebarChoice={this.props.sidebarChoice}
							contentChoice={this.props.contentChoice}
							handleSubmit={this.handleSubmit}
						/>
					</div>
				</form>
			);
	}
}

export default Customers;
