import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PostData from '../helper/api/PostData';
import loadingGif from '../../images/loading.gif';
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
    if (!isValid()) return;
    setIsPosting(true);
    const dataToPost = { name, contact, email };
    const responseData = await PostData(dataToPost, 'customers');
    if (responseData.statusCode === 400) alert(responseData.error.description);
    else if (responseData.entity === 'customer' || responseData.id) history.push('/customers/list', { submitSuccess: true });
    else alert(responseData);
    setIsPosting(false);
  }

  function handleContent() {
    if (isPosting) return <img src={loadingGif} alt="Loading...." id="load-img" />;
    return (
      <form className="customer-form" onSubmit={handleFormSubmit}>
        <div className="cust-panel-1">
          <div>
            <label htmlFor="name">Name</label>
            <input value={name} type="text" name="name" onChange={(event) => { setName(event.target.value); }} required />
          </div>
          <div>
            <label htmlFor="contact">Phone</label>
            <input
              value={contact}
              type="text"
              name="contact"
              onChange={(event) => {
                setContact(event.target.value);
              }}
              required
            />
          </div>
        </div>
        <label htmlFor="email">Email</label>
        <div className="cust-panel-1">
          <input
            value={email}
            type="email"
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
          <BlueButton sidebarChoice="customers" contentChoice="create" type="submit" />
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
