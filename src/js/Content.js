import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import SideBarItem from './SideBar/SideBarItem';
import CustomersTable from './Customers/CustomersTable';
import CustomersForm from './Customers/CustomersForm';
import ItemsTable from './Items/ItemsTable';
import ItemsForm from './Items/ItemsForm';

export default function Content() {
    return <Router>
        <div className="outside-box">
            <div className="side-bar">
                <Link to='/customers/list'>
                    <SideBarItem value="Customers" sidebar_choice="customers" cls="customers"/>
                </Link>
                <Link to='/items/list'>
                    <SideBarItem value="Items" sidebar_choice="items" cls="items"/>
                </Link>
            </div>
            <Switch>
                <Route exact path='/' component={() => <div className="content"></div>}/>
                <Route exact path='/customers/list' component={CustomersTable}/>
                <Route exact path='/customers/create' component={CustomersForm}/>
                <Route exact path='/items/list' exact component={ItemsTable}/>
                <Route exact path='/items/create' exact component={ItemsForm}/>
            </Switch>
        </div>
    </Router>;
}
