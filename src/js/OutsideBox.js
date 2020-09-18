import React from "react";
import Content from './Content';

import {Link} from 'react-router-dom';

function SideBarItem(props) {
    function icon(){
        if (props.sidebar_choice === 'customers')
            return <svg width="1em" height="1em" viewBox="0 0 16 16" style={{margin: "0px 25px 0px 15px"}} className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>;
        else if (props.sidebar_choice === 'items')
            return <svg width="0.9em" height="0.9em" viewBox="0 0 16 16" style={{margin: "0px 25px 0px 17px"}} className="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>;
        else if (props.sidebar_choice === 'invoices')
            return <svg width="1em" height="0.9em" viewBox="0 0 14 16" style={{margin: "0px 25px 0px 15px"}} className="bi bi-file-earmark-text-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2 2a2 2 0 0 1 2-2h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm7 2l.5-2.5 3 3L10 5a1 1 0 0 1-1-1zM4.5 8a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
            </svg>;
    }
    return <div className={props.cls}>
        {icon()}
        {props.value}
    </div>;
}

class OutsideBox extends React.Component{
    constructor() {
        super();
        this.state = {
            sidebar_choice: "customers"
        };
    }
    changeSidebarChoice = (sidebar_choice) => {
        // this.setState({
        //     sidebar_choice: sidebar_choice
        // }, () => {console.log(this.state);});
        this.setState({
            sidebar_choice
        });
    }
    render() {
        const arr = ["Customers", "Items", "Invoices"];
        return(
            // <div className="outside-box">
            //     <div className="side-bar">
            //         {arr.map(el => 
            //         <Link to='/'>
            //         <SideBarItem key={el} value={el} sidebar_choice={el.toLowerCase()} cls={el.toLowerCase().concat(this.state.sidebar_choice === el.toLowerCase() ? ' active' : '')}  changeSidebarChoice={this.changeSidebarChoice}/>
            //         </Link>
            //         )}
            //     </div>
            //     <Content sidebar_choice={this.state.sidebar_choice}/>
            // </div>
            <div className="outside-box">
                <div className="side-bar">
                        <SideBarItem value="Customers" sidebar_choice="customers" cls=""  changeSidebarChoice={this.changeSidebarChoice}/>
                </div>
                <Content sidebar_choice={this.state.sidebar_choice}/>
            </div>
        );
    }
}

export default OutsideBox;