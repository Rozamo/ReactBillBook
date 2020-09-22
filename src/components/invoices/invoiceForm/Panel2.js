import React, { Component } from "react";
import { any, PropTypes } from "prop-types";

class Panel2 extends Component {
	render() {
    const {itemList,value}=this.props;
		return (
			<div className="panel-2">
				<div className="notes">
					<div className="inv-description">
						<textarea
							onChange={(event) => this.props.changeNotes(event.target.value)}
							id="description"
							cols="30"
							rows="10"
							placeholder="Write the description here"
						 />
					</div>
				</div>
				<div className="item-total" id="inv-items-list">
					<table className="item-total-tbl">
						<tbody>
							{itemList.map((item, index) => (
								<tr key={index}>
									<td className="item-total-tbl-name">{item.item.name}</td>
									<td className="item-total-tbl-quantity">
										x{item.quantity ? item.quantity : 0}
									</td>
									<td className="item-total-tbl-amount">
										{(item.item.amount / 100) *
											(item.quantity ? item.quantity : 0)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{itemList.length > 0 ? <hr /> : <span />}
					<div className="item-total-last-row">
						<span>TOTAL AMOUNT:</span>
						<span id="item-total-amount">
							{value ? value : 0}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

Panel2.propTypes={
  itemList:PropTypes.arryof(any),
  value:PropTypes.number,
  changeNotes:PropTypes.func
}

export default Panel2;
