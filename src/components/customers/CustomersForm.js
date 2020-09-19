import React, { useState } from 'react';
import PostData from '../helper/api/PostData';
import loadingGif from '../../images/loading.gif';
import { useHistory } from 'react-router-dom';
import BlueButton from '../bluebutton/BlueButton';

export default function CustomersForm() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  function isValid() {
    if (!/^[a-z A-Z.]+$/.test(name)) {
      alert('Name must not be blank and must contain only alphabets and/or a dot');
      return false;
    }
    if (!/^\+?[0-9]+$/.test(contact) || contact.length < 10) {
      alert('Phone number must contain numbers and/or + and must have atleast 10 characters');
      return false;
    }
    if (!/^[^@]+@[^@.]+.[^@.]+$/.test(email)) {
      alert('Enter valid email');
      return false;
    }
    return true;
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    if (!isValid())
      return;
    setIsPosting(true);
    const obj = { name, contact, email };
    const data = await PostData(obj, 'customers');
    if (data.statusCode === 400)
      alert(data.error.description);
    else if (data.entity === 'customer')
      history.push(`/customers/list/${data.id}`);
    else
      alert(data);
    setIsPosting(false);
  }

  function handleContent() {
    if (isPosting)
      return <img src={loadingGif} alt="Loading...." id="load-img"></img>;
    else
      return (
        <form className="customer-form" onSubmit={handleFormSubmit}>
          <div className="cust-panel-1">
            <div>
              <label htmlFor="name">Name</label>
              <input value={name} type="text" name="name" onChange={(event) => { setName(event.target.value) }} required />
            </div>
            <div>
              <label htmlFor="contact">Phone</label>
              <input value={contact} type="text" name="contact" onChange={(event) => { setContact(event.target.value) }} />
            </div>
          </div>
          <label htmlFor="email">Email</label>
          <div className="cust-panel-1">
            <input value={email} type="email" name="email" onChange={(event) => { setEmail(event.target.value) }} />
            <BlueButton sidebarChoice='customers' contentChoice='create' type='submit' />
          </div>
        </form>
      );
  }

  return (
    <div className="content">
      <div className="top-panel">
        <h1 id="title">New Customer</h1>
      </div>
      {handleContent()}
    </div>
  );
}