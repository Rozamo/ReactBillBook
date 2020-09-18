import React from "react";
import BlueButton from "../BlueButton";

class Items extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			description: "",
			amount: "",
			currency: "INR",
			isPosting: false,
		};
	}
	isValidAmount() {
		if (!/^[0-9]*.?[0-9]+$/.test(this.state.amount)) {
			alert("Amount must be valid");
			return false;
		}
		return true;
	}
	handleSubmit = (event) => {
		event.preventDefault();
		if (!this.isValidAmount()) return;
		const new_obj = {};
		for (const i in this.state)
			if (i === "amount") new_obj[i] = Number(this.state[i]) * 100;
            else if (i !== "isPosting") new_obj[i] = this.state[i];
		this.setState({isPosting:true});
		fetch("https://rzp-training.herokuapp.com/team2/items", {
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
                    console.log("success", data);
                    this.props.changeContentChoice('list');
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				alert(error.message);
			});
	}
	render() {
		if (this.state.isPosting)
			return <img src="images/load.gif" alt="Loading...." id="load-img"></img>;
		else
			return (
				<form
					className="customer-form"
					style={{ width: "350px" }}
					onSubmit={this.handleSubmit}
				>
					<label htmlFor="name">Name</label>
					<input
						value={this.state.name}
						type="text"
						name="name"
						onChange={(event) => {
							this.setState({ name: event.target.value });
						}}
					/>
					<label htmlFor="amount">Price</label>
					<input
						value={this.state.amount}
						type="number"
						name="amount"
						onChange={(event) => {
							this.setState({ amount: event.target.value });
						}}
					/>
					<label htmlFor="name">Description</label>
					<textarea
						value={this.state.description}
						type="text"
						name="description"
						onChange={(event) => {
							this.setState({ description: event.target.value });
						}}
					/>
					<br></br>
					<BlueButton
						sidebar_choice={this.props.sidebar_choice}
						content_choice={this.props.content_choice}
						handleSubmit={this.handleSubmit}
					/>
				</form>
			);
	}
}

export default Items;
