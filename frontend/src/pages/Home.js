// Home.js
import React, { useEffect } from 'react';
import { useDonationsContext } from '../hooks/useDonationsContext';

import DonationDetails from '../components/DonationDetails';
// import DonationForm from '../components/DonationForm';

const Home = () => {
  const { donations, dispatch } = useDonationsContext();

  useEffect(() => {
    const fetchDonations = async () => {
      const response = await fetch('/api/donations');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_DONATIONS', payload: json });
      }
    };
    fetchDonations();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="donations">
        {donations &&
          donations.map((donation) => (
            <DonationDetails key={donation._id} donation={donation} />
          ))}
      </div>
      {/* <DonationForm /> */}
    </div>
  );
};

export default Home;
