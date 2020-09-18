import React from 'react';
import CustomerSelect from './CustomerSelect.js';

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

export default Panel1;