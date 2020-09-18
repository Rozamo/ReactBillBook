import React, { useState } from 'react';
import BlueButton from '../BlueButton/BlueButton';
import PostData from '../Helper/API/PostData';
import load_gif from '../../images/load.gif';
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation} from 'react-router-dom';
import floppy from '../BlueButton/floppy.png';
import {useHistory} from 'react-router-dom';

export default function ItemsForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const currency = 'INR';
    const [isPosting, setIsPosting] = useState(false);
    function isValid() {
        if (!/^[0-9]*.?[0-9]+$/.test(this.state.amount)) {
            alert('Amount must be valid');
            return false;
        }
        return true;
    }
    function handleSubmit(event) {
        console.log("sad");
        // if (!this.isValid())
        //     return;
        // this.changeIsPosting(true);
        // const new_obj = {};
        // for (const i in this.state)
        //     if (i === 'amount')
        //         new_obj[i] = Number(this.state[i]) * 100;
        //     else if (i !== 'isPosting')
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
    function handleContent() {
        if (isPosting)
            return <img src={load_gif} alt="Loading...." id="load-img"></img>;
        else return <form className="customer-form" style={{width: "50%"}}>
            <label htmlFor="name">Name</label>
            <input value={name} type="text" name="name" onChange={(event) => {setName(event.target.value)}}/>
            <label htmlFor="amount">Price</label>
            <input value={amount} type="number" name="amount" onChange={(event) => {setAmount(event.target.value)}}/>
            <label htmlFor="name">Description</label>
            <textarea value={description} type="text" name="description" onChange={(event) => {setDescription(event.target.value)}}/>
            <br></br>
            {/* <BlueButton sidebar_choice={this.props.sidebar_choice} content_choice={this.props.content_choice} handleSubmit={this.handleSubmit}/> */}
            <button onClick={event => {handleSubmit(event)}} id="button" value="">
                <img src={floppy} id="floppy" alt="Save"></img>
                Save Item
            </button>
        </form>;
    }
    return <div className="content">
        <div className="top-panel">
            <h1 id="title">New Item</h1>
        </div>     
        {handleContent()}        
    </div>;
}
