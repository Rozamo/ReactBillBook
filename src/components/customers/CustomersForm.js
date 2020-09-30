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

  function validate(event) {
    if (event.target.validity.patternMismatch || event.target.validity.tooShort) {
      event.target.setCustomValidity('Please enter valid entry');
      event.target.classList.add('wrong-input');
    } else {
      event.target.setCustomValidity('');
      event.target.classList.remove('wrong-input');
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
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
            <input
              value={name}
              type="text"
              pattern="^[a-z A-Z.]+$"
              name="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
              onKeyUp={validate}
              required
            />
          </div>
          <div>
            <label htmlFor="contact">Phone</label>
            <input
              value={contact}
              type="text"
              pattern="^\+?[0-9]+$"
              minLength="10"
              name="contact"
              onChange={(event) => {
                setContact(event.target.value);
              }}
              onKeyUp={validate}
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
