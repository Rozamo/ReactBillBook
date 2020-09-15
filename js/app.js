'use strict';

let get_req = new AbortController();
let save_req = new AbortController();

const inr = new Intl.NumberFormat('en-IN', { 
	style: 'currency', 
	currency: 'INR', 
	minimumFractionDigits: 2, 
}); 

function transformDate(date) {
    const newDate = new Date(date * 1000);
    return `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })} ${newDate.getFullYear()}`;
}

function SideBarItem(props) {
    const handleSidebarClick = (sidebar_choice) => {
        // if (sidebar_choice.includes('active'))
        //     props.changeSidebarChoice(event, sidebar_choice.replace(' active', ''));
        // else
        //     props.changeSidebarChoice(event, sidebar_choice);
        if (!sidebar_choice.includes('active'))
            props.changeSidebarChoice(sidebar_choice);
    }
    return <div className={props.cls} onClick={() => handleSidebarClick(props.cls)}>{props.value}</div>;
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
                    return `Create ${this.props.sidebar_choice.charAt(0).toUpperCase() + this.props.sidebar_choice.slice(1, this.props.sidebar_choice.length - 1)}`
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
    render() {
        return <button type={this.props.type} id="button" value="" onClick={this.handleButtonClick}>
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
    handleContent() {
        if (this.props.sidebar_choice && this.state.content_choice) {
            if (this.state.content_choice === 'list')
                return <Table sidebar_choice={this.props.sidebar_choice}/>;
            else if (this.props.sidebar_choice === 'customers')
                return <Customers sidebar_choice={this.props.sidebar_choice} content_choice={this.state.content_choice} changeContentChoice={this.changeContentChoice}/>;
            else if (this.props.sidebar_choice === 'items')
                return <Items sidebar_choice={this.props.sidebar_choice} content_choice={this.state.content_choice} changeContentChoice={this.changeContentChoice}/>;
        }
        return null;
    }
    render() {
        if (this.props.sidebar_choice === 'customers' || this.props.sidebar_choice === 'items')
            return <div className="content">
                <TopPanel sidebar_choice={this.props.sidebar_choice} content_choice={this.state.content_choice} changeContentChoice={this.changeContentChoice}/>
                {this.handleContent()}
            </div>;
        else
            return <Invoices sidebar_choice={this.props.sidebar_choice} content_choice={this.state.content_choice} changeContentChoice={this.changeContentChoice}/>;

    }
}

class OutsideBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sidebar_choice: "invoices"
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
                    {arr.map(el => <SideBarItem key={el} value={el} cls={el.toLowerCase().concat(this.state.sidebar_choice === el.toLowerCase() ? ' active' : '')}  changeSidebarChoice={this.changeSidebarChoice}/>)}
                </div>
                <Content sidebar_choice={this.state.sidebar_choice}/>
            </div>
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<OutsideBox/>, domContainer);