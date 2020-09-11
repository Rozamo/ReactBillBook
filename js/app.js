'use strict';

class Button extends React.Component{
    render(){
        return(
            <button id={this.props.id} className={this.props.cls} value={this.props.value}>
                {this.props.name}
            </button>
        );
    }
}

class SideBarItem extends React.Component{
    render(){
        return(
            <div className={this.props.cls}>{this.props.value}</div>
        );
    }
}

class Content extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }

    componentDidMount() {
        fetch("https://rzp-training.herokuapp.com/team2/invoices?type=invoice")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.items
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    render(){
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } 
        else if (!isLoaded) {
            return (
                <div className="content">
                    <div className="top-panel">
                        <h1>Invoices</h1>
                        <Button id='button' value='create-invoice' name='New Invoice'/>
                    </div>
                    <img src="images/load.gif" alt="Loading...." id="load-img"></img>
                </div>
            );
        } 
        else {
            return (
                <div className="content">
                    <div className="top-panel">
                        <h1>Invoices</h1>
                        <Button id='button' value='create-invoice' name='New Invoice'/>
                    </div>

                    <table className="inv-table" id="inv-table">
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
                                        <td> {(new Date(invoice.date*1000)).getDate()} {(new Date(invoice.date*1000)).toLocaleString('default', { month: 'short' })} {(new Date(invoice.date*1000)).getFullYear()} </td>
                                        <td>{invoice.customer_details.name}</td>
                                        <td>{invoice.status === 'PAID' ? <mark className="paid">{invoice.status} </mark> : <mark> {invoice.status} </mark>}</td>
                                        <td>{invoice.amount}</td>
                                        <td>{invoice.amount_due ? invoice.amount_due : 0}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>


                // <ul>
                // {items.map(item => (
                //     <li key={item.customer_details.name}>
                //     {item.customer_details.name}
                //     </li>
                // ))}
                // </ul>
            );
        }
    }
}

class SideBar extends React.Component{
    render(){
        return(
            <div className="side-bar">
                <SideBarItem value="Customers" cls="customers"/>
                <SideBarItem value="Items" cls="items"/>
                <SideBarItem value="Invoices" cls="invoices active"/>
            </div>
        );
    }
}

class OutsideBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            contentToShow: "invoice-list",
        }
    }
    render(){
        return(
            <div className="outside-box">
                <SideBar/>
                <Content contentToShow={this.state.contentToShow}/>
            </div>
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<OutsideBox/>, domContainer);