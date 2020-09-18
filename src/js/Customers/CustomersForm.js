import React from 'react';
import BlueButton from '../BlueButton/BlueButton';
import PostData from '../Helper/API/PostData';
import load_gif from '../../images/load.gif';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import floppy from '../BlueButton/floppy.png';

export default class CustomersForm extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            contact: '',
            email: '',
            isPosting: false
        };
    }
    changeIsPosting(isPosting) {
        this.setState({
            isPosting
        });
    }
    isValid() {
        if (!/^[a-z A-Z.]+$/.test(this.state.name)) {
            alert('Name must not be blank and must contain only alphabets and/or a dot');
            return false;
        }
        if (!/^\+?[0-9]+$/.test(this.state.contact) || this.state.contact.length < 10) {
            alert('Phone number must contain numbers and/or + and must have atleast 10 characters');
            return false;
        }
        if (!/^[^@]+@[^@.]+.[^@.]+$/.test(this.state.email)) {
            alert('Enter valid email');
            return false;
        }
        return true;
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        // if (!this.isValid())
        //     return;
        // this.changeIsPosting(true);
        // const new_obj = {};
        // for (const i in this.state)
        //     if (i !== 'isPosting')
        //         new_obj[i] = this.state[i];
        // const data = await PostData(new_obj, this.props.sidebar_choice);
        // if (data.statusCode === 400)
        //     alert(data.error.description);
        // else if (data.entity === 'customer' || data.id)
        //     this.props.changeContentChoice('list');
        // else
        //     alert(data);
        // this.changeIsPosting(false);
    }
    render() {
        if (this.state.isPosting)
            return <img src={load_gif} alt="Loading...." id="load-img"></img>;
        else
            return <Router>
                <form className="customer-form" onSubmit={this.handleSubmit}>
                <div className="cust-panel-1">
                    <div>
                        <label htmlFor="name">Name</label>
                        <input value={this.state.name} type="text" name="name" onChange={(event) => {this.setState({name: event.target.value})}} required/>
                    </div>
                    <div>
                        <label htmlFor="contact">Phone</label>
                        <input value={this.state.contact}type="text" name="contact" onChange={(event) => {this.setState({contact: event.target.value})}}/>
                    </div>
                </div>
                <label htmlFor="email">Email</label>
                <div className="cust-panel-1">
                    <input value={this.state.email} type="email" name="email" onChange={(event) => {this.setState({email: event.target.value})}}/>
                    <Link to='/customers/list'>
                        <button id="button" value="">
                            <img src={floppy} id="floppy" alt="Save"></img>
                            Save Customers
                        </button>
                    </Link>
                </div>
            </form></Router>;
    }        
}