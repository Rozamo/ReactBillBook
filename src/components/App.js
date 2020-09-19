import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SidebarItem from './sidebar/SidebarItem';
import CustomersTable from './customers/CustomersTable';
import CustomersForm from './customers/CustomersForm';
import ItemsTable from './items/ItemsTable';
import ItemsForm from './items/ItemsForm';
import Invoices from './invoices/Invoices';

export default function App() {
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
  return (
    <Router>
      <div className="outside-box">
        <div className="side-bar">
          <Link to='/customers/list'>
            <SidebarItem value="Customers" sidebarChoice="customers" classValue={"customers".concat(sidebarChoice === "customers" ? " active" : "")} changeSidebarChoice={changeSidebarChoice} />
          </Link>
          <Link to='/items/list'>
            <SidebarItem value="Items" sidebarChoice="items" classValue={"items".concat(sidebarChoice === "items" ? " active" : "")} changeSidebarChoice={changeSidebarChoice} />
          </Link>
          <Link to='/invoices'>
            <SidebarItem value="Invoices" sidebarChoice="invoices" classValue={"invoices".concat(sidebarChoice === "invoices" ? " active" : "")} changeSidebarChoice={changeSidebarChoice} />
          </Link>
        </div>
        <Switch>
          <Route exact path='/' component={() => <div className="content"></div>} />
          <Route path='/customers/list' component={CustomersTable} />
          <Route path='/customers/create' component={CustomersForm} />
          <Route path='/items/list' component={ItemsTable} />
          <Route path='/items/create' component={ItemsForm} />
          <Route exact path="/invoices" component={Invoices}></Route>
        </Switch>
      </div>
    </Router>
  );
}
