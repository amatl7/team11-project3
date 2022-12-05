import './App.css';
import './index.css'
import React from 'react';
import App from './App';
import Manager from './Manager';
import Server from './Server';
import ReactDOM from 'react-dom/client';
import New_Customer_Order from './New_Customer_Order';
import New_Order from './New_Order';
import { Button } from 'antd';

function Customer() {
  function ReturnToHome() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
  function GoToNewOrder() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <New_Customer_Order />
      </React.StrictMode>
    );
  }
  return (
    <div id='body'>
      <div class="headerdiv">
        Chick-fil-A!
      </div>
      <header className="SelectRole">
        <div class="flex-container">
          <div class="pageHeader">Welcome to the Customer Page!</div>
        </div>
        <div className="container">
          <Button type="primary" onClick={GoToNewOrder}>New Order</Button>
        </div>
      </header>
      <div class="footerdiv">
        <Button onClick={ReturnToHome}>Return</Button>
      </div>
    </div>

  );
}

export default Customer;