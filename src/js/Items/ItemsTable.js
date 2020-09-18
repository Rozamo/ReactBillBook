import React, { useEffect, useState } from 'react';
import load_gif from '../../images/load.gif';
import LoadData from '../Helper/API/LoadData';
import TableHead from '../Helper/TableMaker/TableHead';
import TableBody from '../Helper/TableMaker/TableBody';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import BlueButton from '../BlueButton/BlueButton';

export default function ItemsTable() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    async function getData() {
        const data = await LoadData("items");
        if (data && data.entity === 'collection') {
            setIsLoaded(true);
            setItems(data.items);
        }
        else if (data) {
            setError(data);
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        getData();
    });
    function handleContent() {
        if (error)
            return <div>Error: {error.message}</div>;
        else if (!isLoaded)
            return <img src={load_gif} alt="Loading...." id="load-img"></img>;
        else return <table className="inv-table" id="inv-table">
            {TableHead('NAME', 'DESCRIPTION', 'PRICE', 'ADDED ON')}
            {TableBody(items, 'name', 'description', 'amount', 'created_at')}
        </table>;
    }
    return <div className="content">
        <div className="top-panel">
            <h1 id="title">Items</h1>
            <Link to='/items/create'>
                <BlueButton sidebar_choice="items" content_choice="list"/>
            </Link>
        </div>     
        {handleContent()}        
    </div>;
}