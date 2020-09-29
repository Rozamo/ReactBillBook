import React, { Component } from "react";
import { PropTypes } from "prop-types";
import AddItemIcon from "../icons/AddItemIcon";

class ItemPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			selectedItems: [],
			showDDL: false,
			tot: 0,
		};
	}
	componentDidMount() {
		fetch("https://rzp-training.herokuapp.com/team2/items")
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						items: result.items,
					});
				}
			);
	}

	handleAddItemClick = () => {
		this.setState({ showDDL: true });
	};
	handleSelectChange = (event, changeAmount) => {
    const {selectedItems,items} = this.state;
    let {tot}=this.state;
		const idx = event.target.value;
		const item = items[idx];
    tot = Number(tot + item.amount / 100);
    
		selectedItems.push({ item, quantity: 1, id: idx });
		this.setState(
			{
				showDDL: false,
				selectedItems,
				tot,
			},
			() => changeAmount(this.state.tot, this.state.selectedItems)
		);
	};
	handleQuantityInputChange = (event, changeAmount) => {
    const{selectedItems}=this.state;
		const item = selectedItems[event.target.id];
		let {tot} = this.state;
		tot -= Number(
			(item.item.amount / 100) * (item.quantity ? item.quantity : 0)
		);
		item.quantity = event.target.value;
		tot += Number(
			(item.item.amount / 100) * (item.quantity ? item.quantity : 0)
		);
		selectedItems[event.target.id] = item;
		this.setState(
			{
				selectedItems,
				tot,
			},
			() => {
				changeAmount(this.state.tot, this.state.selectedItems);
			}
		);
	};
	handleDeleteClick = (event, changeAmount) => {
		const {selectedItems} = this.state;
			let {tot} = this.state;
		tot -=
			(selectedItems[event.target.id].item.amount / 100) *
			selectedItems[event.target.id].quantity;
		selectedItems.splice(event.target.id, 1);
		this.setState({ selectedItems, tot }, () => {
			changeAmount(this.state.tot, this.state.selectedItems);
		});
	};
	renderSelect() {
		return (
			<div className="item-btn">
				<select
					className="item_ddl"
					defaultValue="Select Items"
					onChange={(event) => {
						this.handleSelectChange(event, this.props.changeAmount);
					}}
				>
					<option value="Select Items">Select Items</option>
					{this.state.items.map((item, index) => {
						if (
							this.state.selectedItems.findIndex((e) => e.item === item) ===
							-1
						)
							return (
								<option key={index} value={index}>
									{item.name}
								</option>
              );
              else return <></>
					})}
				</select>
			</div>
		);
	}
	renderAddItemButton() {
		return (
			<div className="item-btn">
				<button id="add-item" onClick={() => this.handleAddItemClick()}>
					<AddItemIcon />
					Add Item
				</button>
			</div>
		);
	}
	render() {
		return (
			<div className="inv-item-panel">
				<table className="item-tbl" id="inv-item-tbl">
					<tbody>
						{this.state.selectedItems.length ? (
							<tr>
								<th style={{ width: "40%" }}>Items</th>
								<th style={{ width: "5%" }}>Quantity</th>
								<th>Price</th>
								<th>Amount</th>
							</tr>
						) : (
							<tr />
						)}
						{this.state.selectedItems.map((item, index) => (
							<tr key={index}>
								<td>{item.item.name}</td>
								<td>
									<input
										id={index}
										style={{ width: "100px" }}
										type="text"
										defaultValue="1"
										value={item.quantity}
										onChange={(event) => {
											this.handleQuantityInputChange(
												event,
												this.props.changeAmount
											);
										}}
									 />
								</td>
								<td>{item.item.amount / 100}</td>
								<td>
									{(item.item.amount * item.quantity) / 100}
									<i
										id={index}
										className="fa fa-trash"
										onClick={(event) =>
											this.handleDeleteClick(event, this.props.changeAmount)
										}
									 />
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{this.state.showDDL ? this.renderSelect() : this.renderAddItemButton()}
			</div>
		);
	}
}

ItemPanel.propTypes={
  changeAmount:PropTypes.func.isRequired
}

export default ItemPanel;
