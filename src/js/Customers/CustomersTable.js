import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import load_gif from '../../images/load.gif';
import LoadData from '../Helper/API/LoadData';
import TableHead from '../Helper/TableMaker/TableHead';
import TableBody from '../Helper/TableMaker/TableBody';
import BlueButton from '../BlueButton/BlueButton';

export default function ItemsTable() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    async function getData() {
        const data = await LoadData("customers");
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
            {TableHead('NAME', 'PHONE', 'EMAIL', 'CREATED ON')}
            {TableBody(items, 'name', 'contact', 'email', 'created_at')}
        </table>;
    }
    return <div className="content">
        <div className="top-panel">
            <h1 id="title">Customers</h1>
            <Link to='/customers/create'>
                <BlueButton sidebar_choice="customers" content_choice="list"/>
            </Link>
        </div>     
        {handleContent()}        
    </div>;
}
