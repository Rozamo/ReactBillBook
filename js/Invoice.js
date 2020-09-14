'use strict'

class CustomerSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          chosenCustomer:null,
          showDDL:false
        };
    }
    componentDidMount() {
        fetch("https://rzp-training.herokuapp.com/team2/customers")
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
    
    handleClick=()=>{
        this.setState({showDDL:true})
    }

    handleChange(event){
        let idx=event.target.value;
        this.setState({
            chosenCustomer: this.state.items[idx],
            showDDL:false
        })
    }

    render() {

        if(this.state.error)return 'SOME ERROR OCCURED';
        
        if(!this.state.chosenCustomer&&!this.state.showDDL)
        return ( 
            <div className="inv-cust-det">
                <div>No Customer Chosen</div>
                <button id='inv-cust-change' onClick={()=>this.handleClick()}>Choose</button>
            </div>
        );
        else if(this.state.showDDL){
            if(!this.state.isLoaded)return 'Loading...';
            return(
                <div className="inv-cust-det">
                    <select className="customer_ddl" id="cust_list" defaultValue="Choose Customer" onChange={()=>this.handleChange(event)}>
                        <option value="Choose Customer">Choose Customer</option>
                        {
                            this.state.items.map((customer,index)=>(
                                <option key={index} value={index}>{customer.name}</option>
                            ))
                        }
                    </select>
                </div>
            );
        }
        return(
            <div className="inv-cust-det">
                <div>
                    <p>{this.state.chosenCustomer.name}</p>
                    <p>{this.state.chosenCustomer.contact}</p>
                    <p>{this.state.chosenCustomer.email}</p>
                </div>
                <button id='inv-cust-change' onClick={()=>this.handleClick()}>Change</button>
            </div>
            
        );
    }
}

class Panel1 extends React.Component {
    render() { 
        return ( 
            <div className="panel-1">
                <div className="inv-cust-panel">
                    <div style={{color: "rgb(125,123,123)"}}>Bill to</div>
                    <CustomerSelect/>
                </div>
                <div>
                    <label>Issued at</label>
                    <input type="date" id="issued-at" name="issued-at"></input>
                </div>
                <div>
                    <label>Due-Date</label>
                    <input type="date" id="due-date" name="due-date"></input>
                </div>
            </div>
         );
    }
}

class Panel2 extends React.Component {
    render() { 
        return (
            <div className="panel-2">
                <div className="notes">
                    <div className="inv-description">
                        <textarea id="description" cols="30" rows="10" placeholder="Write the description here"></textarea>
                    </div>
                </div>
                <div className="item-total" id="inv-items-list">
                    <table className="item-total-tbl">
                        <tbody>
                            {
                                this.props.itemList.map((item,index)=>(
                                    <tr key={index}>
                                        <td className="item-total-tbl-name">{item["item"].name}</td>
                                        <td className="item-total-tbl-quantity">x{item["quantity"]?item["quantity"]:0}</td>
                                        <td className="item-total-tbl-amount">{item["item"].amount/100*(item["quantity"]?item["quantity"]:0)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <hr></hr>
                    <div className="item-total-last-row">
                        <span>TOTAL AMOUNT:</span>
                        <span id="item-total-amount">{this.props.value?this.props.value:0}</span>
                    </div>
                </div>
            </div>
         );
    }
}

class ItemPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          selectedItems: [],
          showDDL: false,
          tot:0
        };
    }
    componentDidMount() {
        fetch("https://rzp-training.herokuapp.com/team2/items")
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

    handleAddItemClick=()=>{
        this.setState({showDDL:true});
    }
    handleSelectChange=(event,changeAmount)=>{
        let selectedItems=this.state.selectedItems,idx=event.target.value;
        let item=this.state.items[idx];
        let tot=Number(this.state.tot+item.amount/100);
        selectedItems.push({"item":item,"quantity":1,"id":idx});
        this.setState({
            showDDL:false,
            selectedItems:selectedItems,
            tot:tot
        },()=>changeAmount(this.state.tot,this.state.selectedItems));
    }
    handleInputChange=(event,changeAmount)=>{
        let item=this.state.selectedItems[event.target.id],tot=this.state.tot;
        tot-=Number(item["item"].amount/100*(item["quantity"]?item["quantity"]:0));
        item["quantity"]=event.target.value;
        let selectedItems=[...this.state.selectedItems];
        tot+=Number(item["item"].amount/100*(item["quantity"]?item["quantity"]:0));
        selectedItems[event.target.id]=item;
        this.setState({
            selectedItems:selectedItems,
            tot:tot
        },()=>{changeAmount(this.state.tot,this.state.selectedItems)});
    }
    render() {
        if(this.state.showDDL)
         return ( 
            <div className="inv-item-panel">
                <table className="item-tbl" id="inv-item-tbl">
                    <tbody>
                        <tr>
                            <th style={{width:"60%"}}>Items</th>
                            <th style={{width:"5%"}}>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                        {
                            this.state.selectedItems.map((item,index)=>(
                                <tr key={index}>
                                    <td>{item["item"].name}</td>
                                    <td>
                                        <input id={index} type="text" defaultValue='1' onChange={()=>{this.handleInputChange(event,this.props.changeAmount)}}></input>
                                    </td>
                                    <td>{item["item"].amount/100}</td>
                                    <td>{item["item"].amount*item["quantity"]/100}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="item-btn">
                    <select className="item_ddl" defaultValue="Select Items" onChange={()=>{this.handleSelectChange(event,this.props.changeAmount)}}>
                        <option value="Select Items">Select Items</option>
                        {
                            this.state.items.map((item,index)=>{
                                if(this.state.selectedItems.findIndex(e=>e["item"]===item)===-1)
                                    return (<option key={index} value={index}>{item.name}</option>);
                                }
                            )
                        }
                    </select>
                </div>
            </div>
         );
        return ( 
            <div className="inv-item-panel">
                <table className="item-tbl" id="inv-item-tbl">
                    <tbody>
                        <tr>
                            <th style={{width:"60%"}}>Items</th>
                            <th style={{width:"5%"}}>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                        {
                            this.state.selectedItems.map((item,index)=>(
                                <tr key={index}>
                                    <td>{item["item"].name}</td>
                                    <td>
                                        <input id={index} type="text" defaultValue='1' onChange={(event)=>{this.handleInputChange(event,this.props.changeAmount)}}></input>
                                    </td>
                                    <td>{item["item"].amount/100}</td>
                                    <td>{item["item"].amount*item["quantity"]/100}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="item-btn">
                    <button id="add-item" onClick={()=>this.handleAddItemClick()}>
                        Add Item
                    </button>
                </div>
            </div>
         );
    }
}

class CreateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Panel1/>
         );
    }
}

class Invoice extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          showList: true,
          totalAmount:0,
          selectedItems:[]
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
    
    changeAmount=(tot,selectedItems)=>{
        this.setState({totalAmount:tot,selectedItems:selectedItems});
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
                        <Button id='button' value='save-invoice' name='Save Invoice' onClick={()=>this.handleClick.bind(this)}/>
                    </div>
                    <CreateList/>
                    <ItemPanel changeAmount={this.changeAmount}/>
                    <hr></hr>
                    <Panel2 value={this.state.totalAmount} itemList={this.state.selectedItems}/>
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