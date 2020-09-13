'use strict'

class Invoice extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          showList: true
        };
      }

      getData(){
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
          );
      }

    componentDidMount() {
        this.getData();
      }
    handleClick(){
        let showList=(!this.state.showList);
        if(this.state.showList)
        {
            this.setState({
                error:null,
                isLoaded: false,
                items: [],
                showList: showList
            });
        }
        else{
            this.setState({showList: showList});
            this.getData();
        }
    }

    render(){
        const { error, isLoaded, items, showList } = this.state;
        if(!showList){
            return (
                <div className="content">
                    <div className="top-panel">
                        <h1>New Invoice</h1>
                        <Button id='button' value='save-invoice' name='Save Invoice' onClick={()=>this.handleClick()}/>
                    </div>
                    
                </div>
            );
        }
        else if (error) {
            return <div>Error: {error.message}</div>;
        } 
        else if (!isLoaded) {
            return (
                <div className="content">
                    <div className="top-panel">
                        <h1>Invoices</h1>
                        <Button id='button' value='create-invoice' name='New Invoice' onClick={()=>this.handleClick()}/>
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
                        <Button id='button' value='create-invoice' name='New Invoice' onClick={()=>this.handleClick()}/>
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
                                    <tr key={invoice.receipt}>
                                        <td> {(new Date(invoice.date*1000)).getDate()} {(new Date(invoice.date*1000)).toLocaleString('default', { month: 'short' })} {(new Date(invoice.date*1000)).getFullYear()} </td>
                                        <td>{invoice.customer_details.name}</td>
                                        <td>{invoice.status === 'PAID' ? <mark className="paid">{invoice.status} </mark> : <mark> {invoice.status} </mark>}</td>
                                        <td>{invoice.amount/100}</td>
                                        <td>{invoice.amount_due ? invoice.amount_due/100 : 0}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}
