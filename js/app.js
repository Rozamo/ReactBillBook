'use strict';

class SideBarItem extends React.Component{
    render(){
        return(
            <div className={this.props.cls}>{this.props.value}</div>
        );
    }
}

class Content extends React.Component{
    render(){
        return(
            <div className="content"></div>
        );
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
    render(){
        return(
            <div className="outside-box">
                <SideBar/>
                <Content/>
            </div>
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<OutsideBox/>, domContainer);