import React from 'react';
import Invoices from './Invoice/Invoices.js';
import TopPanel from './TopPanel';
import Table from './Table';
import Items from './Item/Items';
import Customers from './Customer/Customers';

class Content extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            content_choice: 'list'
        }
    }
    changeContentChoice = (content_choice) => {
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

export default Content;