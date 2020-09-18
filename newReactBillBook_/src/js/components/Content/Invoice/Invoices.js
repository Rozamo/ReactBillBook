import React from "react";
import Button from "./Button.js";
import Panel1 from "./Panel1.js";
import ItemPanel from "./ItemPanel.js";
import Panel2 from "./Panel2.js";
import Table from "../Table.js";

class Invoices extends React.Component {
    _isMounted=false;
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			showList: true,
			totalAmount: 0,
			selectedItems: [],
			invoice: {
				customer: null,
				line_items: [],
				date: null,
				expire_by: null,
				comment: null,
			},
		};
	}
	changeCustomerDetails = (customer) => {
		let invoice = this.state.invoice;
		invoice.customer = {
			name: customer.name,
			contact: customer.contact,
			email: customer.email,
		};
		this.setState({ invoice: invoice });
	};
	changeDate = (date) => {
		let invoice = this.state.invoice;
		invoice.date = Number(new Date(date).getTime() / 1000);
		this.setState({ invoice: invoice });
	};
	changeExpirebyDate = (date) => {
		let invoice = this.state.invoice;
		invoice.expire_by = new Date(date).getTime() / 1000;
		this.setState({ invoice: invoice });
	};
	changeAmount = (tot, selectedItems) => {
		let listItems = selectedItems.map((item) => {
			return { item_id: item["item"].id, quantity: item["quantity"] };
		});
		let invoice = this.state.invoice;
		invoice.line_items = listItems;
		this.setState({
			totalAmount: tot,
			selectedItems: selectedItems,
			invoice: invoice,
		});
	};
	changeNotes = (notes) => {
		let invoice = this.state.invoice;
		invoice.comment = notes;
		this.setState({ invoice: invoice });
	};
	componentDidMount() {
		this._isMounted=true;
		this.setState({isLoaded:true})
    }
    componentWillUnmount() {
        this._isMounted=false;
    }
	handleClick = () => {
        let showList = !this.state.showList;
		if (this.state.showList) {
			this.setState({
				error: null,
				isLoaded: false,
				items: [],
				showList: showList,
			});
        }
        else {
			const new_obj = {};
			for (const i in this.state.invoice) {
				new_obj[i] = this.state.invoice[i];
				if (i === "line_items" && new_obj[i].length === 0) {
					alert("items cant be empty, please choose some items");
					return;
				}
				if (i === "line_items") {
					let flag = 1;
					new_obj[i].forEach((item) => {
						if (!item.quantity) {
							alert("quantity cant be zero or empty");
							flag = 0;
							return;
						}
					});
					if (!flag) return;
				}
				if (!new_obj[i]) {
					alert(i + " cant be null or empty");
					return;
				}
            }
            this.setState({
				error: null,
				isLoaded: false,
				items: [],
				showList: showList,
			});
			fetch("https://rzp-training.herokuapp.com/team2/invoices", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(this.state.invoice),
			})
				.then((response) => response.json())
				.then((data) => {
                    if(data.error){
                        this.setState({
                            isLoaded:true,
                            error:data.error.description,
                        })
                    }
                    else {
                        this.setState({ showList: showList , isLoaded:true });
                        console.log("success",data);
                    }
				})
				.catch((error) => {
					console.error("Error:", error);
					this.setState({ error: error });
				});
		}
	};

	render() {
		const { error, isLoaded, items, showList } = this.state;
		if (!showList) {
			return (
				<div className="content">
					<div className="top-panel">
						<h1>New Invoice</h1>
						<Button
							id="button"
							value="save-invoice"
							name="Save Invoice"
							onClick={this.handleClick}
						/>
					</div>
					<Panel1
						changeCustomerDetails={this.changeCustomerDetails}
						changeDate={this.changeDate}
						changeExpirebyDate={this.changeExpirebyDate}
					/>
					<ItemPanel changeAmount={this.changeAmount} />
					<hr></hr>
					<Panel2
						value={this.state.totalAmount}
						itemList={this.state.selectedItems}
						changeNotes={this.changeNotes}
					/>
				</div>
			);
		} else if (error && isLoaded) {
			return (
				<div className="content">
					<div className="top-panel">
						<h1>Error: {error}</h1>
						<p>{error.message}</p>
					</div>
				</div>
			);
		} else if (!isLoaded) {
			return (
				<div className="content">
					<div className="top-panel">
						<h1>Invoices</h1>
						<Button
							id="button"
							value="create-invoice"
							name="New Invoice"
							onClick={() => this.handleClick()}
						/>
					</div>
					<img src="images/load.gif" alt="Loading...." id="load-img"></img>
				</div>
			);
		} else {
			return (
				<div className="content">
					<div className="top-panel">
						<h1>Invoices</h1>
						<Button
							id="button"
							value="create-invoice"
							name="New Invoice"
							onClick={() => this.handleClick()}
						/>
					</div>

					<Table sidebar_choice='invoices'/>
				</div>
			);
		}
	}
}

export default Invoices;
