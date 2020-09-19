import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loadingGif from '../../images/loading.gif';
import LoadData from '../helper/api/LoadData';
import TableHead from '../helper/table/TableHead';
import TableBody from '../helper/table/TableBody';
import BlueButton from '../bluebutton/BlueButton';

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
  }, []);

  function handleContent() {
    if (error)
      return <div>Error: {error.message}</div>;
    else if (!isLoaded)
      return <img src={loadingGif} alt="Loading...." id="load-img"></img>;
    else return (
      <table className="inv-table" id="inv-table">
        {TableHead('NAME', 'DESCRIPTION', 'PRICE', 'ADDED ON')}
        {TableBody(items, 'name', 'description', 'amount', 'created_at')}
      </table>
    );
  }
  
  return (
    <div className="content">
      <div className="top-panel">
        <h1 id="title">Items</h1>
        <Link to='/items/create'>
          <BlueButton sidebarChoice="items" contentChoice="list" />
        </Link>
      </div>
      {handleContent()}
    </div>
  );
}