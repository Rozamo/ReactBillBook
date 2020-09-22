import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '../Button';
import loading from '../../../images/loading.gif';
import Panel1 from './Panel1';
import ItemPanel from './ItemPanel';
import Panel2 from './Panel2';

class InvoiceForm extends React.Component {
	_isMounted = false;

	constructor(props) {
	  super(props);
	  this.state = {
	    error: null,
	    isLoaded: true,
	    items: [],
	    totalAmount: 0,
	    selectedItems: [],
	    invoice: {
	      // object to be sent in post req
	      customer: null,
	      line_items: [],
	      date: null,
	      expire_by: null,
	      comment: null,
	    },
	  };
	}

	changeCustomerDetails = (customer) => {
	  const { invoice } = this.state;
	  invoice.customer = {
	    name: customer.name,
	    contact: customer.contact,
	    email: customer.email,
	  };
	  this.setState({ invoice });
	};

	changeDate = (date) => {
	  const { invoice } = this.state;
	  invoice.date = Number(new Date(date).getTime() / 1000);
	  this.setState({ invoice });
	};

	changeExpirebyDate = (date) => {
	  const { invoice } = this.state;
	  invoice.expire_by = new Date(date).getTime() / 1000;
	  this.setState({ invoice });
	};

	changeAmount = (tot, selectedItems) => {
	  const listItems = selectedItems.map((item) => ({ item_id: item.item.id, quantity: item.quantity }));
	  const { invoice } = this.state;
	  invoice.line_items = listItems;
	  this.setState({
	    totalAmount: tot,
	    selectedItems,
	    invoice,
	  });
	};

	changeNotes = (notes) => {
	  const { invoice } = this.state;
	  invoice.comment = notes;
	  this.setState({ invoice });
	};

	componentDidMount() {
	  this._isMounted = true;
	}

	componentWillUnmount() {
	  this._isMounted = false;
	}

	handleSaveInvoiceClick = () => {
	  const newObj = {};

	  for (const i in this.state.invoice) {
	    newObj[i] = this.state.invoice[i];
	    if (i === 'line_items' && newObj[i].length === 0) {
	      alert('items cant be empty, please choose some items');
	      return;
	    }
	    if (i === 'line_items') {
	      let flag = 1;
	      newObj[i].forEach((item) => {
	        if (!item.quantity) {
	          alert('quantity cant be zero or empty');
	          flag = 0;
	        }
	      });
	      if (!flag) return;
	    }
	    if (!newObj[i]) {
	      alert(`${i} cant be null or empty`);
	      return;
	    }
	  }
	  this.setState({
	    error: null,
	    isLoaded: false,
	    items: [],
	  });
	  fetch('https://rzp-training.herokuapp.com/team2/invoices', {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(this.state.invoice),
	  })
	    .then((response) => response.json())
	    .then((data) => {
	      if (data.error) {
	        this.setState({
	          isLoaded: true,
	          error: data.error.description,
	        });
	      } else {
	        this.setState({ isLoaded: true });
	        this.props.history.push('/invoices');
	      }
	    })
	    .catch((error) => {
	      this.setState({ error });
	    });
	};

	render() {
	  const { error, isLoaded } = this.state;

	  if (error && isLoaded) {
	    return (
  <div className="content">
    <div className="top-panel">
      <h1>
        Error:
        {error}
      </h1>
      <p>{error.message}</p>
    </div>
  </div>
	    );
	  } if (!isLoaded) {
	    return (
  <div className="content">
    <div className="top-panel">
      <h1>Invoices</h1>
      <Link to="/invoices/create">
        <Button
          id="button"
          value="create-invoice"
          name="New Invoice"
          onClick={() => this.handleSaveInvoiceClick()}
        />
      </Link>
    </div>
    <img src={loading} alt="Loading...." id="load-img" />
  </div>
	    );
	  }
	  return (
  <div className="content">
    <div className="top-panel">
      <h1>New Invoice</h1>
      <Button
        id="button"
        value="create-invoice"
        name="Save Invoice"
        onClick={() => this.handleSaveInvoiceClick()}
      />
    </div>
    <Panel1
      changeCustomerDetails={this.changeCustomerDetails}
      changeDate={this.changeDate}
      changeExpirebyDate={this.changeExpirebyDate}
    />
    <ItemPanel changeAmount={this.changeAmount} />
    <hr />
    <Panel2
      value={this.state.totalAmount}
      itemList={this.state.selectedItems}
      changeNotes={this.changeNotes}
    />
  </div>
	  );
	}
}

export default withRouter(InvoiceForm);
