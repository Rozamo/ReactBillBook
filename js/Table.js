class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        
    }
    getData = async () => {
        get_req.abort();
        get_req = new AbortController();
        try {
            const response = await fetch(`https://rzp-training.herokuapp.com/team2/${this.props.sidebar_choice}`, { signal: get_req.signal });
            const data = await response.json();
            this.setState({
                isLoaded: true,
                items: data.items
            });
        }
        catch (error) {
            if (error.name === 'AbortError')
                return;
            this.setState({
                error,
                isLoaded: true
            });
        }
    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate(prevProp) {
        if (this.props.sidebar_choice != prevProp.sidebar_choice) {
            this.setState({
                isLoaded: false,
                items: []
            });
            this.getData();
        }
    }
    render(){
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } 
        else if (!isLoaded) {
            return <img src="images/load.gif" alt="Loading...." id="load-img"></img>;
        } 
        else if (this.props.sidebar_choice === 'customers') 
            return <table className="inv-table" id="inv-table">
                <tbody>
                    <tr>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
                        <th>CREATED ON</th>
                    </tr>
                        {items.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.contact}</td>
                                <td>{customer.email}</td>
                                <td>{transformDate(customer.created_at)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>;
        else if (this.props.sidebar_choice === 'items') 
            return <table className="inv-table" id="inv-table">
                <tbody>
                    <tr>
                        <th>NAME</th>
                        <th style={{width: "50%"}}>DESCRIPTION</th>
                        <th>PRICE</th>
                        <th>ADDED ON</th>
                    </tr>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>₹{item.amount / 100}</td>
                                <td>{transformDate(item.created_at)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>;
        else if (this.props.sidebar_choice === 'invoices')
            return <table className="inv-table" id="inv-table">
                <tbody>
                    <tr>
                        <th>DATE</th>
                        <th>CUSTOMER</th>
                        <th>PAID STATUS</th>
                        <th>AMOUNT</th>
                        <th>AMOUNT DUE</th>
                    </tr>
                        {items.map(invoice => (
                            <tr key={invoice.id}>
                                <td>{transformDate(invoice.date)}</td>                                    
                                <td>{invoice.customer_details ? invoice.customer_details.name : ''}</td>
                                <td>{invoice.status === 'PAID' ? <mark className="paid">{invoice.status} </mark> : <mark> {invoice.status} </mark>}</td>
                                <td>₹{invoice.amount / 100}</td>
                                <td>{invoice.amount_due ? "₹"+invoice.amount_due : 0}</td>
                            </tr>
                        ))}
                </tbody>
            </table>;
        return null;
    }
}
