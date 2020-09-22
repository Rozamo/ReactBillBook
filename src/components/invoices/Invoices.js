import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Table from "./Table";

function Invoices(){
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

export default Invoices;
