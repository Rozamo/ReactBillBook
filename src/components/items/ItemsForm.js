import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PostData from '../helper/api/PostData';
import loadingGif from '../../images/loading.gif';
import BlueButton from '../bluebutton/BlueButton';

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
    if (!isValid()) return;
    setIsPosting(true);
    const newAmount = Number(amount) * 100;
    const dataToPost = {
      name, description, amount: newAmount, currency,
    };
    const responseData = await PostData(dataToPost, 'items');
    if (responseData.statusCode === 400) alert(responseData.error.description);
    else if (responseData.entity === 'item' || responseData.id) {
      setIsPosting(false);
      history.push('/items/list', { submitSuccess: true });
    } else alert(responseData);
    setIsPosting(false);
  }

  function handleContent() {
    if (isPosting) return <img src={loadingGif} alt="Loading...." id="load-img" />;
    return (
      <form
        className="customer-form"
        style={{ width: '50%' }}
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          value={name}
          type="text"
          name="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
          required
        />
        <label htmlFor="amount">Price</label>
        <input
          value={amount}
          type="number"
          name="amount"
          onChange={(event) => {
            setAmount(event.target.value);
          }}
          required
        />
        <label htmlFor="name">Description</label>
        <textarea
          value={description}
          type="text"
          name="description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <br />
        <BlueButton
          sidebarChoice="items"
          contentChoice="create"
          type="submit"
        />
      </form>
    );
  }

  return (
    <div className="content">
      <div className="top-panel">
        <h1 id="title">New Item</h1>
      </div>
      {handleContent()}
    </div>
  );
}
