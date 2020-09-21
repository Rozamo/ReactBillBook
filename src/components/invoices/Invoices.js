import React from "react";
import Button from "./Button.js";
import Table from "./Table.js";
import { Link } from "react-router-dom";

class Invoices extends React.Component {
	render() {
		return (
			<div className="content">
				<div className="top-panel">
					<h1>Invoices</h1>
					<Link to="/invoices/create">
						<Button
							id="button"
							value="create-invoice"
							name="New Invoice"
							onClick={() => {}}
						/>
					</Link>
				</div>

				<Table sidebarChoice="invoices" />
			</div>
		);
	}
}

export default Invoices;
