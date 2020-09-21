import React, { useState } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import SidebarItem from './sidebar/SidebarItem';
import CustomersTable from './customers/CustomersTable';
import CustomersForm from './customers/CustomersForm';
import ItemsTable from './items/ItemsTable';
import ItemsForm from './items/ItemsForm';
import Invoices from './invoices/Invoices';

export default function App() {
  const param = window.location.href;
  const history = useHistory();
  const [sidebarChoice, setSidebarChoice] = useState(getCurrentSidebarChoice(param));

  function getCurrentSidebarChoice(path) {
    if (path.includes('customers'))
      return 'customers';
    else if (path.includes('items'))
      return 'items';
    else if (path.includes('invoices'))
      return 'invoices';
    else
      return '';
  }

  history.listen(location => {
    if (location && location.pathname)
      setSidebarChoice(getCurrentSidebarChoice(location.pathname));
  });
  
  return (
      <div className="outside-box">
        <div className="side-bar">
          <Link to='/customers/list'>
            <SidebarItem value="Customers" sidebarChoice="customers" classValue={"customers".concat(sidebarChoice === "customers" ? " active" : "")} />
          </Link>
          <Link to='/items/list'>
            <SidebarItem value="Items" sidebarChoice="items" classValue={"items".concat(sidebarChoice === "items" ? " active" : "")} />
          </Link>
          <Link to='/invoices'>
            <SidebarItem value="Invoices" sidebarChoice="invoices" classValue={"invoices".concat(sidebarChoice === "invoices" ? " active" : "")} />
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
  );
}
