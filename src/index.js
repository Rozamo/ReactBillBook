import React from "react";
import ReactDOM from "react-dom";
import './css/style1.css';
import './css/style2.css';
import App from './components/App';

const domContainer = document.querySelector('#root');
ReactDOM.render(<App/>, domContainer);