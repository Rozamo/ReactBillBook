import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/style1.css';
import './css/style2.css';
import App from './components/App';

const domContainer = document.querySelector('#root');
ReactDOM.render(<Router><App /></Router>, domContainer);
