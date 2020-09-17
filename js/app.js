'use strict';

function SideBarItem(props) {
    const handleSidebarClick = (sidebar_choice) => {
        if (!sidebar_choice.includes('active'))
            props.changeSidebarChoice(sidebar_choice);
    }
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
    return <div className={props.cls} onClick={() => handleSidebarClick(props.cls)}>
        {icon()}
        {props.value}
    </div>;
}

class BlueButton extends React.Component {
    constructor(props) {
        super(props);
    }
    renderButtonName() {
        if (this.props.sidebar_choice && this.props.content_choice) {
            if (this.props.content_choice === 'list') {
                if (this.props.sidebar_choice === 'items')
                    return "Add Item";
                else
                    return `New ${this.props.sidebar_choice.charAt(0).toUpperCase() + this.props.sidebar_choice.slice(1, this.props.sidebar_choice.length - 1)}`
            }
            else if (this.props.content_choice === 'create') 
                return `Save ${this.props.sidebar_choice.charAt(0).toUpperCase()}${this.props.sidebar_choice.slice(1, this.props.sidebar_choice.length - 1)}`;
        }
    }
    handleButtonClick = (event) => {
        if (this.props.sidebar_choice && this.props.content_choice) {
            if (this.props.content_choice === 'list')
                this.props.changeContentChoice('create');
            else if (this.props.content_choice === 'create')
                this.props.handleSubmit(event);
        }
        return null;
    }
    icon() {
        if (this.props.content_choice === 'list')
            return <img src="images/plus.png" id="floppy" alt="Save"></img>;
        else if (this.props.content_choice === 'create')
            return <img src="images/floppy.png" id="floppy" alt="Save"></img>;
        return null;
    }
    render() {
        return <button type={this.props.type} id="button" value="" onClick={this.handleButtonClick}>
            {this.icon()}
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
        return null;
    }
    function renderButton() {
        if (props.sidebar_choice && props.content_choice) {
            if (props.content_choice === 'list') 
                return <BlueButton sidebar_choice={props.sidebar_choice} content_choice={props.content_choice} changeContentChoice={props.changeContentChoice}/>
        }
        return null;
    }
    return <div className="top-panel">
        {renderTitle()}
        {renderButton()}
    </div>;
}

class Content extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            content_choice: 'list'
        }
    }
    changeContentChoice = (content_choice) => {
        // this.setState({
        //     content_choice: content_choice
        // }, () => {console.log(this.state);});
        this.setState({
            content_choice
        });
    }
    componentDidUpdate(prevProp) {
        if (this.props.sidebar_choice != prevProp.sidebar_choice) {
            this.setState({
                content_choice: 'list'
            });
        }
    }
    render() {
        if (this.props.sidebar_choice === 'customers')
            return <Customers sidebar_choice={this.props.sidebar_choice} content_choice={this.state.content_choice} changeContentChoice={this.changeContentChoice}/>;
        else if (this.props.sidebar_choice === 'items')
            return <Items sidebar_choice={this.props.sidebar_choice} content_choice={this.state.content_choice} changeContentChoice={this.changeContentChoice}/>;
        else
            return <Invoices sidebar_choice={this.props.sidebar_choice} content_choice={this.state.content_choice} changeContentChoice={this.changeContentChoice}/>;

    }
}

class OutsideBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sidebar_choice: "items"
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
            <div className="outside-box">
                <div className="side-bar">
                    {arr.map(el => <SideBarItem key={el} value={el} sidebar_choice={el.toLowerCase()} cls={el.toLowerCase().concat(this.state.sidebar_choice === el.toLowerCase() ? ' active' : '')}  changeSidebarChoice={this.changeSidebarChoice}/>)}
                </div>
                <Content sidebar_choice={this.state.sidebar_choice}/>
            </div>
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<OutsideBox/>, domContainer);