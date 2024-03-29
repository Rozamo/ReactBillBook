import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import loadingGif from '../../images/loading.gif';
import LoadData from '../helper/api/LoadData';
import BlueButton from '../bluebutton/BlueButton';
import Table from '../helper/table/Table';

export default function ItemsTable(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  async function getData() {
    const data = await LoadData('items');
    if (data && data.entity === 'collection') {
      setIsLoaded(true);
      setItems(data.items);
    } else if (data) {
      setError(data);
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function handleContent() {
    if (error) {
      return (
        <div>
          Error:
          {error.message}
        </div>
      );
    }
    if (!isLoaded) return <img src={loadingGif} alt="Loading...." id="load-img" />;

    const submitSuccess = props.location.state ? props.location.state.submitSuccess : false;
    return Table(items, ['NAME', 'DESCRIPTION', 'PRICE', 'ADDED ON'], ['name', 'description', 'amount', 'created_at'], submitSuccess);
  }

  return (
    <div className="content">
      <div className="top-panel">
        <h1 id="title">Items</h1>
        <Link to="/items/create">
          <BlueButton sidebarChoice="items" contentChoice="list" />
        </Link>
      </div>
      {handleContent()}
    </div>
  );
}

ItemsTable.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
