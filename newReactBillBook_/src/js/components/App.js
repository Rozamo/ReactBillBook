import React from "react";
import SideBarItem from "./sidebar/SidebarItem.js";
import Content from "./Content.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarChoice: "invoices",
		};
	}

	changeSidebarChoice = (sidebarChoice) => {
		this.setState({
			sidebarChoice,
		});
	};

	render() {
		const arr = ["Customers", "Items", "Invoices"];
		const sidebarItemStyle = {
			textDecoration: "none",
			color: "black",
		};

		return (
			<div className="outside-box">
				<Router>
					<div className="side-bar">
						{arr.map((el, index) => (
							<Link
								key={index}
								style={sidebarItemStyle}
								to={"/" + el.toLowerCase()}
							>
								<SideBarItem
									value={el}
									sidebarChoice={el.toLowerCase()}
									cls={el
										.toLowerCase()
										.concat(
											this.state.sidebarChoice === el.toLowerCase()
												? " active"
												: ""
										)}
									changeSidebarChoice={this.changeSidebarChoice}
								/>
							</Link>
						))}
					</div>

					<Switch>
						<Route
							exact
							path="/"
							render={() => <Content sidebarChoice="invoices" />}
						></Route>
						<Route
							exact
							path="/invoices"
							render={() => <Content sidebarChoice="invoices" />}
						></Route>
						<Route
							exact
							path="/customers"
							render={() => <Content sidebarChoice="customers" />}
						></Route>
						<Route
							exact
							path="/items"
							render={() => <Content sidebarChoice="items" />}
						></Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
