import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DonationsContextProvider } from './context/DonationContext';
import { AuthContextProvider } from './context/AuthContext';
import { FundraisersContextProvider } from './context/FundraisersContext'; // Import the Fundraisers context provider



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DonationsContextProvider>
        <FundraisersContextProvider>
          <App />
        </FundraisersContextProvider>
      </DonationsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
