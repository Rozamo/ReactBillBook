import React from "react";
import inr from "./util/inr";
import transformDate from "./util/transformDate";

class Table extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
		};
	}
	getData() {
		fetch(
			`https://rzp-training.herokuapp.com/team2/${this.props.sidebarChoice}`
		)
			.then((res) => res.json())
			.then(
				(result) => {
					if (this._isMounted && result.error)
						this.setState({ isLoaded: true, error: result.message });
					else if (this._isMounted)
						this.setState({
							isLoaded: true,
							items: result.items,
						});
				},
				(error) => {
					if (this._isMounted)
						this.setState({
							isLoaded: true,
							error,
						});
				}
			);
	}
	componentDidMount() {
		this._isMounted = true;
		this.getData();
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	componentDidUpdate(prevProp) {
		if (this.props.sidebarChoice != prevProp.sidebarChoice) {
			this.setState({
				isLoaded: false,
				items: [],
			});
			this.getData();
		}
	}
	render() {
		const { error, isLoaded, items } = this.state;
		if (error) return <div>Error: {error.message}</div>;
		else if (!isLoaded)
			return <img src="images/load.gif" alt="Loading...." id="load-img"></img>;
		else if (this.props.sidebarChoice === "customers")
			return (
				<table className="inv-table" id="inv-table">
					<tbody>
						<tr>
							<th>NAME</th>
							<th>PHONE</th>
							<th>EMAIL</th>
							<th>CREATED ON</th>
						</tr>
						{items.map((customer) => (
							<tr key={customer.id}>
								<td>{customer.name}</td>
								<td>{customer.contact}</td>
								<td>{customer.email}</td>
								<td>{transformDate(customer.created_at)}</td>
							</tr>
						))}
					</tbody>
				</table>
			);
		else if (this.props.sidebarChoice === "items")
			return (
				<table className="inv-table" id="inv-table">
					<tbody>
						<tr>
							<th>NAME</th>
							<th style={{ width: "50%" }}>DESCRIPTION</th>
							<th>PRICE</th>
							<th>ADDED ON</th>
						</tr>
						{items.map((item) => (
							<tr key={item.id}>
								<td>{item.name}</td>
								<td>{item.description}</td>
								<td>{inr.format(item.amount / 100)}</td>
								<td>{transformDate(item.created_at)}</td>
							</tr>
						))}
					</tbody>
				</table>
			);
		else if (this.props.sidebarChoice === "invoices")
			return (
				<table className="inv-table" id="inv-table">
					<tbody>
						<tr>
							<th>DATE</th>
							<th>CUSTOMER</th>
							<th>PAID STATUS</th>
							<th>AMOUNT</th>
							<th>AMOUNT DUE</th>
						</tr>
						{items.map((invoice) => (
							<tr key={invoice.id}>
								<td>{transformDate(invoice.date)}</td>
								<td>
									{invoice.customer_details
										? invoice.customer_details.name
										: ""}
								</td>
								<td>
									{invoice.status === "PAID" ? (
										<mark className="paid">{invoice.status} </mark>
									) : (
										<mark> {invoice.status} </mark>
									)}
								</td>
								<td>{inr.format(invoice.amount / 100)}</td>
								<td>
									{invoice.amount_due
										? inr.format(invoice.amount_due / 100)
										: 0}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			);
		return null;
	}
}

export default Table;
