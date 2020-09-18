import React from 'react';
import CustomersForm from './CustomersForm';
import CustomersTable from './CustomersTable';
import BlueButton from '../BlueButton/BlueButton';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default class Customers extends React.Component {
    constructor() {
        super();
        this.state = {
            content_choice: 'list'
        }
    }
    changeContentChoice = (content_choice) => {
        this.setState({
            content_choice: content_choice
        }, () => {console.log(this.state);});
        // this.setState({
        //     content_choice
        // });
    }
    renderButton() {
        if (this.state.content_choice === 'list')
            return <Link to='/customers/create'>
                <BlueButton sidebar_choice="customers" content_choice={this.state.content_choice} changeContentChoice={this.changeContentChoice}/>
            </Link>;
        else
            return null;
    }
    render() {
        return <Router>
            <div className="content">
                <div className="top-panel">
                    <h1 id="title">Customers</h1>
                    {this.renderButton()}
                </div>  
                <Switch>
                    <Route exact path='/customers/list' component={() => <CustomersTable sidebar_choice='customers'/>}/>
                    <Route path='/customers/create' component={() => <CustomersForm sidebar_choice='customers' content_choice={this.state.content_choice} changeContentChoice={this.changeContentChoice}/>}/>    
                </Switch>              
            </div>
        </Router>;
    }
}

