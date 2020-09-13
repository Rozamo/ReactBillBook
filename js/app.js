'use strict';

class Button extends React.Component{
    render(){
        return(
            <button id={this.props.id} className={this.props.cls} value={this.props.value} onClick={()=>this.props.onClick()}>
                {this.props.name}
            </button>
        );
    }
}

class SideBarItem extends React.Component{
    render(){
        return(
            <div className={this.props.cls+(this.props.active===this.props.cls?' active':'')} onClick={()=>this.props.onClick()}>{this.props.children}</div>
        );
    }
}

class Content extends React.Component{
    render(){
        if(this.props.contentToShow==='items')return(
            <Item/>
        );
        else if(this.props.contentToShow==='customers')return(
            <Customer/>
        );
        return(
            <Invoice/>
        );
    }   
}

class OutsideBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            contentToShow: 'invoices',
        }
    }
    handleSidebarClick=(contentToShow)=>{
        this.setState({ contentToShow: contentToShow?contentToShow:'invoices' });
    }

    render(){
        return(
            <div className="outside-box">
                <div className="side-bar">
                    <SideBarItem  cls="customers" onClick={()=>this.handleSidebarClick('customers')} active={this.state.contentToShow}>Customers</SideBarItem>
                    <SideBarItem cls="items" onClick={()=>this.handleSidebarClick('items')} active={this.state.contentToShow}>Items</SideBarItem>
                    <SideBarItem  cls="invoices" onClick={()=>this.handleSidebarClick('invoices')} active={this.state.contentToShow}>Invoices</SideBarItem>
                </div>
                <Content contentToShow={this.state.contentToShow} />
            </div>
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<OutsideBox/>, domContainer);