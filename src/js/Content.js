import React from 'react';
import SideBarItem from './SideBar/SideBarItem';
import Customers from './Customers/Customers';
import Items from './Items/Items';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default class Content extends React.Component{
    render() {
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
                    <Route exact path='/customers/list' component={Customers}/>
                    <Route exact path='/items/list' exact component={Items}/>
                </Switch>
            </div>
        </Router>;
    }
}
