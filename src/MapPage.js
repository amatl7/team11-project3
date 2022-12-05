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
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MapContainer from './MapContainer';

function MapPage() {
  function ReturnToHome() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }



  return (
    <div id='body'>
      <div class="headerdiv">
        Chick-fil-A!
      </div>
      <MapContainer/>
      <div class="footerdiv">
        <Button onClick={ReturnToHome}>Return</Button>
      </div>
    </div>

  );
}

export default MapPage;