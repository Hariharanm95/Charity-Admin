// Home.js
import React, { useEffect } from 'react';
import { useDonationsContext } from '../hooks/useDonationsContext';
import { useFundraisersContext } from '../hooks/useFundraisersContext'; // Import the fundraisers context

import DonationDetails from '../components/DonationDetails';
import FundraiserDetails from '../components/FundraiserDetails';

const Home = () => {
  const { donations, dispatch: donationsDispatch } = useDonationsContext();
  const { fundraisers, dispatch: fundraisersDispatch } = useFundraisersContext(); // Use the fundraisers context

  useEffect(() => {
    const fetchDonations = async () => {
      const response = await fetch('/api/donations');
      const json = await response.json();

      if (response.ok) {
        donationsDispatch({ type: 'SET_DONATIONS', payload: json });
      }
    };

    const fetchFundraisers = async () => {
      const response = await fetch('/api/fundraisers');
      const json = await response.json();

      if (response.ok) {
        fundraisersDispatch({ type: 'SET_FUNDRAISERS', payload: json });
      }
    };

    fetchDonations();
    fetchFundraisers(); // Fetch fundraisers data
  }, [donationsDispatch, fundraisersDispatch]); // Include both dispatch functions in the dependency array

  return (
    <div className="home">
      <div className="donations">
      <h2>Users</h2>
      <hr />
        {donations &&
          donations.map((donation) => (
            <DonationDetails key={donation._id} donation={donation} />
          ))}
      </div>
      
      <div className="fundraisers"> {/* Use a separate container for fundraisers */}
      <h2>Fund Raise Request</h2>
      <hr />
        {fundraisers &&
          fundraisers.map((fundraiser) => (
            <FundraiserDetails key={fundraiser._id} fundraiser={fundraiser} />
          ))}
      </div>
    </div>
  );
};

export default Home;
