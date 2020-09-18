import React from 'react';
import BlueButton from '../BlueButton/BlueButton';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import ItemsForm from './ItemsForm';
import ItemsTable from './ItemsTable';

export default class Items extends React.Component {
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
            return <Link to='/items/create'>
                <BlueButton sidebar_choice="items" content_choice={this.state.content_choice} changeContentChoice={this.changeContentChoice}/>
            </Link>;
        else
            return null;
    }
    render() {
        return <Router>
            <div className="content">
                <div className="top-panel">
                    <h1 id="title">Items</h1>
                    {this.renderButton()}
                </div>  
                <Switch>
                    <Route exact path='/items/list' component={() => <ItemsTable sidebar_choice='items'/>}/>
                    <Route path='/items/create' component={() => <ItemsForm sidebar_choice='items' content_choice={this.state.content_choice} changeContentChoice={this.changeContentChoice}/>}/>    
                </Switch>              
            </div>
        </Router>;    
    }
}
