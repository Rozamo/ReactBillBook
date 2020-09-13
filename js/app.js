'use strict';

let get_req = new AbortController();

function transformDate(date) {
    const newDate = new Date(date * 1000);
    return `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })} ${newDate.getFullYear()}`;
}

function SideBarItem(props) {
    const handleSidebarClick = (event, sidebar_choice) => {
        // if (sidebar_choice.includes('active'))
        //     props.changeSidebarChoice(event, sidebar_choice.replace(' active', ''));
        // else
        //     props.changeSidebarChoice(event, sidebar_choice);
        if (!sidebar_choice.includes('active'))
            props.changeSidebarChoice(event, sidebar_choice);
    }
    return <div className={props.cls} onClick={event => handleSidebarClick(event, props.cls)}>{props.value}</div>;
}

class BlueButton extends React.Component {
    constructor(props) {
        super(props);
    }
    checkVisibility() {
        if (this.props.content_choice === 'list')
            return "visible";
        else 
            return "hidden";
    }
    renderButtonName() {
        if (this.props.sidebar_choice && this.props.content_choice) {
            if (this.props.sidebar_choice === 'items')
                return "Add Item";
            else
                return `Create ${this.props.sidebar_choice.charAt(0).toUpperCase() + this.props.sidebar_choice.slice(1, this.props.sidebar_choice.length - 1)}`
        }
    }
    handleButtonClick = (event) => {
        this.props.changeContentChoice(event, 'create');
    }
    render() {
        return <button id="button" value="" style={{visibility: this.checkVisibility()}} onClick={event => this.handleButtonClick(event)}>
            {this.renderButtonName()}
        </button>;
    }
}

function TopPanel(props) {
    function renderTitle() {
        if (props.sidebar_choice && props.content_choice) {
            if (props.content_choice === 'list') 
                return <h1 id="title">{props.sidebar_choice.charAt(0).toUpperCase() + props.sidebar_choice.slice(1)}</h1>
            else
                return <h1 id="title">New {props.sidebar_choice.charAt(0).toUpperCase() + props.sidebar_choice.slice(1, props.sidebar_choice.length - 1)}</h1>
        }
    }
    return <div className="top-panel">
        {renderTitle()}
        <BlueButton sidebar_choice={props.sidebar_choice} content_choice={props.content_choice} changeContentChoice={props.changeContentChoice}/>
    </div>;
}

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
                            <tr>
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
                            <tr>
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
                            <tr>
                                <td>{transformDate(invoice.date)}</td>                                    
                                <td>{invoice.customer_details ? invoice.customer_details.name : ''}</td>
                                <td>{invoice.status === 'PAID' ? <mark className="paid">{invoice.status} </mark> : <mark> {invoice.status} </mark>}</td>
                                <td>₹{invoice.amount / 100}</td>
                                <td>{invoice.amount_due ? "₹"+invoice.amount_due : 0}</td>
                            </tr>
                        ))}
                </tbody>
            </table>;
    }
}

function Customers() {
    return <h1>Create Customer</h1>;
}

class Content extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            content_choice: 'list'
        }
    }
    changeContentChoice = (event, content_choice) => {
        this.setState({
            content_choice: content_choice
        }, () => {console.log(this.state);});
    }
    componentDidUpdate(prevProp) {
        if (this.props.sidebar_choice != prevProp.sidebar_choice) {
            this.setState({
                content_choice: 'list'
            });
        }
    }
    render() {
        if (this.props.sidebar_choice && this.state.content_choice) {
            if (this.state.content_choice === 'list') 
                return <div className="content">
                    <TopPanel sidebar_choice={this.props.sidebar_choice} content_choice={this.state.content_choice} changeContentChoice={this.changeContentChoice}/>
                    <Table sidebar_choice={this.props.sidebar_choice}/>
                </div>;
            else if (this.props.sidebar_choice === 'customers')
                return <Customers/>;
            // else if (this.props.sidebar_choice === 'items')
            //     return <Items/>;
            // else if (this.props.sidebar_choice === 'invoices')
            //     return <Invoices/>;
            else null;
        }
        else
            return null;
    }
}

function SideBar(props) {
    const arr = ["Customers", "Items", "Invoices"];
    return <div className="side-bar">
        {arr.map(el => <SideBarItem value={el} cls={el.toLowerCase().concat(props.sidebar_choice === el.toLowerCase() ? ' active' : '')}  changeSidebarChoice={props.changeSidebarChoice}/>)}
    </div>;
}

class OutsideBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sidebar_choice: "invoices"
        };
    }
    changeSidebarChoice = (event, sidebar_choice) => {
        this.setState({
            sidebar_choice: sidebar_choice
        }, () => {console.log(this.state);});
        // this.setState({
        //     sidebar_choice: sidebar_choice,
        //     content_choice: 'list'
        // });
    }
    render(){
        return(
            <div className="outside-box">
                <SideBar sidebar_choice={this.state.sidebar_choice} changeSidebarChoice={this.changeSidebarChoice}/>
                <Content sidebar_choice={this.state.sidebar_choice}/>
            </div>
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<OutsideBox/>, domContainer);