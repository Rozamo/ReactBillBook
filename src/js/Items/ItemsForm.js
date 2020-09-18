import React, { useState } from 'react';
import PostData from '../Helper/API/PostData';
import loadingGif from '../../images/loading.gif';
import floppy from '../BlueButton/floppy.png';
import {useHistory} from 'react-router-dom';
import BlueButton from '../BlueButton/BlueButton';

export default function ItemsForm() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const currency = 'INR';
    const [isPosting, setIsPosting] = useState(false);
    function isValid() {
        if (!/^[0-9]*.?[0-9]+$/.test(amount)) {
            alert('Amount must be valid');
            return false;
        }
        return true;
    }
    async function handleFormSubmit(event) {
        event.preventDefault();
        if (!isValid())
            return;
        setIsPosting(true);
        const new_amount = Number(amount) * 100;
        const new_obj = {name, description, amount: new_amount, currency};
        const data = await PostData(new_obj, 'items');
        if (data.statusCode === 400)
            alert(data.error.description);
        else if (data.entity === 'customer' || data.id)
            history.push('/items/list');
        else
            alert(data);
        setIsPosting(false);
    }
    function handleContent() {
        if (isPosting)
            return <img src={loadingGif} alt="Loading...." id="load-img"></img>;
        else return <form className="customer-form" style={{width: "50%"}} onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name</label>
            <input value={name} type="text" name="name" onChange={(event) => {setName(event.target.value)}}/>
            <label htmlFor="amount">Price</label>
            <input value={amount} type="number" name="amount" onChange={(event) => {setAmount(event.target.value)}}/>
            <label htmlFor="name">Description</label>
            <textarea value={description} type="text" name="description" onChange={(event) => {setDescription(event.target.value)}}/>
            <br></br>
            <BlueButton sidebarChoice='items' contentChoice='create' type='submit'/>
        </form>;
    }
    return <div className="content">
        <div className="top-panel">
            <h1 id="title">New Item</h1>
        </div>     
        {handleContent()}        
    </div>;
}
