import React from "react";
import SideBarItem from "./SidebarItem.js";
import Content from "./Content/Content.js";
import { BrowserRouter as Router, Switch, Route , Link } from "react-router-dom";

class OutsideBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebar_choice: "invoices",
		};
	}
	changeSidebarChoice = (sidebar_choice) => {
		this.setState({
			sidebar_choice,
		});
	};
	render() {
        const arr = ["Customers", "Items", "Invoices"];
        const sidebarItemStyle={
            textDecoration: "none"
        };
		return (
			<div className="outside-box">
                <Router>
					<div className="side-bar">
						{arr.map((el,index) => (
                            <Link to={'/'+el.toLowerCase()}>
                            <SideBarItem
                        key={index}
                        value={el}
                        sidebar_choice={el.toLowerCase()}
                        cls={el
                            .toLowerCase()
                            .concat(
                                this.state.sidebar_choice === el.toLowerCase()
                                    ? " active"
                                    : ""
                            )}
                        changeSidebarChoice={this.changeSidebarChoice}
                    />
                            </Link>
                        
                    ))}
					</div>
				
                <Switch>
                <Route exact path="/" style={this.sidebarItemStyle} render={()=><Content sidebar_choice="invoices"/>}></Route>
                    <Route exact path="/invoices" style={this.sidebarItemStyle}  render={()=><Content sidebar_choice="invoices"/>}></Route>
                    <Route exact path="/customers" style={this.sidebarItemStyle}  render={()=><Content sidebar_choice="customers"/>}></Route>
                    <Route exact path="/items" style={this.sidebarItemStyle}  render={()=><Content sidebar_choice="items"/>}></Route>
                </Switch>
                    
                </Router>
			</div>
		);
	}
}

export default OutsideBox;
