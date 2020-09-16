'use strict'

async function PostForm1(obj, sidebar_choice) {
    try {
        const response = await fetch(`https://rzp-training.herokuapp.com/team2/${sidebar_choice}`, { method: "POST", 
            body: JSON.stringify(obj), headers: { "Content-type": "application/json; charset=UTF-8"}, signal: save_req.signal
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        alert(error);
        return error;
    }
}

class Button extends React.Component{
    icon() {
        if (this.props.name === 'Save Invoice')
            return <img src="images/floppy.png" id="floppy" alt="Save"></img>;
        else
            return <img src="images/plus.png" id="floppy" alt="Save"></img>;
    }
    render(){
        return(
            <button id={this.props.id} className={this.props.cls} value={this.props.value} onClick={()=>this.props.onClick()}>
                {this.icon()}
                {this.props.name}
            </button>
        );
    }
}

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
        this.setState({showDDL:true});
    }

    handleChange(event,changeCustomerDetails){
        let idx=event.target.value;
        this.setState({
            chosenCustomer: this.state.items[idx],
            showDDL:false
        },()=>changeCustomerDetails(this.state.chosenCustomer));
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
                    <select className="customer_ddl" id="cust_list" defaultValue="Choose Customer" onChange={()=>this.handleChange(event,this.props.changeCustomerDetails)}>
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
                    <CustomerSelect changeCustomerDetails={this.props.changeCustomerDetails}/>
                </div>
                <div>
                    <label>Issued at</label>
                    <input style={{width: "170px"}} onChange={()=>this.props.changeDate(event.target.value)} type="date" id="issued-at" name="issued-at"></input>
                </div>
                <div>
                    <label>Due-Date</label>
                    <input style={{width: "170px"}} onChange={()=>this.props.changeExpirebyDate(event.target.value)} type="date" id="due-date" name="due-date"></input>
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
                        <textarea onChange={()=>this.props.changeNotes(event.target.value)} id="description" cols="30" rows="10" placeholder="Write the description here"></textarea>
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
    handleDeleteClick=(event,changeAmount)=>{
        let selectedItems=this.state.selectedItems,tot=this.state.tot;
        tot-=selectedItems[event.target.id]["item"].amount/100*selectedItems[event.target.id]["quantity"];
        console.log(selectedItems[event.target.id]["item"]);
        selectedItems.splice(event.target.id,1);
        this.setState({selectedItems:selectedItems,tot:tot},()=>{changeAmount(this.state.tot,this.state.selectedItems)});
    }
    render() {
        if(this.state.showDDL)
         return ( 
            <div className="inv-item-panel">
                <table className="item-tbl" id="inv-item-tbl">
                    <tbody>
                        <tr>
                            <th style={{width:"40%"}}>Items</th>
                            <th style={{width:"5%"}}>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                        {
                            this.state.selectedItems.map((item,index)=>(
                                <tr key={index}>
                                    <td>{item["item"].name}</td>
                                    <td>
                                        <input id={index} style={{width:"100px"}} type="text" defaultValue='1' value={item.quantity} onChange={()=>{this.handleInputChange(event,this.props.changeAmount)}}></input>
                                    </td>
                                    <td>{item["item"].amount/100}</td>
                                    <td>
                                        {item["item"].amount*item["quantity"]/100}
                                        <i id={index} className="fa fa-trash" onClick={()=>this.handleDeleteClick(event,this.props.changeAmount)}></i>
                                    </td>
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
                            <th style={{width:"40%"}}>Items</th>
                            <th style={{width:"5%"}}>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                        {
                            this.state.selectedItems.map((item,index)=>(
                                <tr key={index}>
                                    <td>{item["item"].name}</td>
                                    <td>
                                        <input id={index} style={{width:"100px"}} type="text" defaultValue='1' value={item.quantity} onChange={(event)=>{this.handleInputChange(event,this.props.changeAmount)}}></input>
                                    </td>
                                    <td>{item["item"].amount/100}</td>
                                    <td>
                                        {item["item"].amount*item["quantity"]/100}
                                        <i id={index} className="fa fa-trash" onClick={()=>this.handleDeleteClick(event,this.props.changeAmount)}></i>
                                    </td>
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

class Invoices extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          showList: true,
          totalAmount:0,
          selectedItems:[],
          invoice:{
                    "customer": null,
                    "line_items": [],
                    "date": null,
                    "expire_by": null,
                    "comment": null
                }
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
    changeCustomerDetails=(customer)=>{
        let invoice=this.state.invoice;
        invoice.customer={
            "name":customer.name,
            "contact":customer.contact,
            "email":customer.email
        }
        this.setState({invoice:invoice});
    }
    changeDate=(date)=>{
        let invoice=this.state.invoice;
        invoice.date=Number(new Date(date).getTime()/1000);
        this.setState({invoice:invoice})
    }
    changeExpirebyDate=(date)=>{
        let invoice=this.state.invoice;
        invoice.expire_by=new Date(date).getTime()/1000;
        this.setState({invoice:invoice})
    }
    changeAmount=(tot,selectedItems)=>{
        let listItems=selectedItems.map(item=>{
                return { "item_id": item["item"].id, "quantity": item["quantity"]}
        });
        let invoice=this.state.invoice;
        invoice.line_items=listItems;
        this.setState({
            totalAmount:tot,
            selectedItems:selectedItems,
            invoice:invoice
        });
    }
    changeNotes=(notes)=>{
        let invoice=this.state.invoice;
        invoice.comment=notes;
        this.setState({invoice:invoice});
    }
    componentDidMount() {
        this.getData();
      }
    handleClick = async () => {
        if (!this.state.showList) {
            const new_obj = {};
            for (const i in this.state.invoice)
                {
                    new_obj[i] = this.state.invoice[i];
                    if(i==="line_items"&& new_obj[i].length===0)
                    {
                        console.log("items cant be empty, please choose some items");
                        alert("items cant be empty, please choose some items");
                        return ;
                    }
                    if(i==="line_items")
                    {
                        let flag=1;
                        new_obj[i].forEach(item => {
                            if(!item.quantity){
                                console.log("quantity cant be zero or empty");
                                alert("quantity cant be zero or empty");
                                flag=0;
                                return ;
                            }
                        });
                        if(!flag)return;
                        
                    }
                    if(!new_obj[i]){
                        console.log(i," cant be null or empty");
                        alert(i+" cant be null or empty");
                        return;
                    }
                }
            save_req.abort();
            save_req = new AbortController();
            const data = await PostForm1(new_obj, "invoices");
            if (data.statusCode === 400) {
                alert(data.error.description);
                return;
            }
            else if (data.entity !== 'invoice') {
                alert(data);
                return;
            }
        }
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
                        <Button id='button' value='save-invoice' name='Save Invoice' onClick={this.handleClick}/>
                    </div>
                    <Panel1 changeCustomerDetails={this.changeCustomerDetails} changeDate={this.changeDate} changeExpirebyDate={this.changeExpirebyDate}/>
                    <ItemPanel changeAmount={this.changeAmount}/>
                    <hr></hr>
                    <Panel2 value={this.state.totalAmount} itemList={this.state.selectedItems} changeNotes={this.changeNotes}/>
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
                                    <tr key={invoice.id}>
                                        <td>{transformDate(invoice.date)}</td>                                    
                                        <td>{invoice.customer_details ? invoice.customer_details.name : ''}</td>
                                        <td>{invoice.status === 'PAID' ? <mark className="paid">{invoice.status} </mark> : <mark> {invoice.status} </mark>}</td>
                                        <td>{inr.format(invoice.amount / 100)}</td>
                                        <td>{invoice.amount_due ? inr.format(invoice.amount_due / 100) : 0}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}