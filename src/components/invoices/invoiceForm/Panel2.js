import React, { Component } from "react";

class Panel2 extends Component {
	render() {
		return (
			<div className="panel-2">
				<div className="notes">
					<div className="inv-description">
						<textarea
							onChange={() => this.props.changeNotes(event.target.value)}
							id="description"
							cols="30"
							rows="10"
							placeholder="Write the description here"
						></textarea>
					</div>
				</div>
				<div className="item-total" id="inv-items-list">
					<table className="item-total-tbl">
						<tbody>
							{this.props.itemList.map((item, index) => (
								<tr key={index}>
									<td className="item-total-tbl-name">{item["item"].name}</td>
									<td className="item-total-tbl-quantity">
										x{item["quantity"] ? item["quantity"] : 0}
									</td>
									<td className="item-total-tbl-amount">
										{(item["item"].amount / 100) *
											(item["quantity"] ? item["quantity"] : 0)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{this.props.itemList.length > 0 ? <hr></hr> : <span></span>}
					<div className="item-total-last-row">
						<span>TOTAL AMOUNT:</span>
						<span id="item-total-amount">
							{this.props.value ? this.props.value : 0}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Panel2;
