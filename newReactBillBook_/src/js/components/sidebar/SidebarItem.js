import React from "react";
import CustomerIcon from "./sidebarIcons/CustomerIcon";
import ItemIcon from "./sidebarIcons/ItemIcon";
import InvoiceIcon from "./sidebarIcons/InvoiceIcon";

function SidebarItem(props) {
	const handleSidebarClick = (sidebarChoice) => {
		if (!sidebarChoice.includes("active"))
			props.changeSidebarChoice(sidebarChoice);
	};

	function icon() {
		if (props.sidebarChoice === "customers") return <CustomerIcon />;
		else if (props.sidebarChoice === "items") return <ItemIcon />;
		else if (props.sidebarChoice === "invoices") return <InvoiceIcon />;
	}

	return (
		<div className={props.cls} onClick={() => handleSidebarClick(props.cls)}>
			{icon()}
			{props.value}
		</div>
	);
}

export default SidebarItem;
