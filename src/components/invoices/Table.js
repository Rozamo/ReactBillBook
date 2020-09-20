import React from "react";
import INR from '../helper/utils/INR';
import TransformDate from '../helper/utils/TransformDate';
import loading from '../../images/loading.gif';

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
			return <img src={loading} alt="Loading...." id="load-img"></img>;
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
								<td>{TransformDate(invoice.date)}</td>
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
								<td>{INR.format(invoice.amount / 100)}</td>
								<td>
									{invoice.amount_due
										? INR.format(invoice.amount_due / 100)
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
