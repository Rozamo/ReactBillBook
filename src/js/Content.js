import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import SidebarItem from './SideBar/SidebarItem';
import CustomersTable from './Customers/CustomersTable';
import CustomersForm from './Customers/CustomersForm';
import ItemsTable from './Items/ItemsTable';
import ItemsForm from './Items/ItemsForm';

export default function Content() {
    const param = window.location.href;
    const [sidebarChoice, setSidebarChoice] = useState(() => {
        if (param.includes('customers'))
            return 'customers';
        else if (param.includes('items'))
            return 'items';
        else if (param.includes('invoices'))
            return 'invoices';
        else
            return '';
    });
    function changeSidebarChoice(sidebarChoice) {
        setSidebarChoice(sidebarChoice);
    }
    // useEffect(() => {
    //     console.log(sidebarChoice);
    // });
    return <Router>
        <div className="outside-box">
            <div className="side-bar">
                <Link to='/customers/list'>
                    <SidebarItem value="Customers" sidebarChoice="customers" cls={"customers".concat(sidebarChoice === "customers" ? " active" : "")} changeSidebarChoice={changeSidebarChoice}/>
                </Link>
                <Link to='/items/list'>
                    <SidebarItem value="Items" sidebarChoice="items" cls={"items".concat(sidebarChoice === "items" ? " active" : "")} changeSidebarChoice={changeSidebarChoice}/>
                </Link>
            </div>
            <Switch>
                <Route exact path='/' component={() => <div className="content"></div>}/>
                <Route path='/customers/list' component={CustomersTable}/>
                <Route path='/customers/create' component={CustomersForm}/>
                <Route path='/items/list' exact component={ItemsTable}/>
                <Route path='/items/create' exact component={ItemsForm}/>
            </Switch>
        </div>
    </Router>;
}
