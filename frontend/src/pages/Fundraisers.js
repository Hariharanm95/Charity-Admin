import React, { useEffect } from 'react';

import FundraiserDetails from '../components/FundraiserDetails';
import { useFundraisersContext } from '../hooks/useFundraisersContext';

const Fundraisers = () => {
  const { fundraisers, dispatch: fundraisersDispatch } = useFundraisersContext(); 
  

  useEffect(() => {


    const fetchFundraisers = async () => {
      const response = await fetch('/api/fundraisers');
      const json = await response.json();

      if (response.ok) {
        fundraisersDispatch({ type: 'SET_FUNDRAISERS', payload: json });
      }
    };

    fetchFundraisers(); // Fetch fundraisers data
  }, [fundraisersDispatch]); 

  return (
    <div>
      <h2>Fundraisers</h2>
      <div className="fundraisers"> {/* Use a separate container for fundraisers */}
        {fundraisers &&
          fundraisers.map((fundraiser) => (
            <FundraiserDetails key={fundraiser._id} fundraiser={fundraiser} />
          ))}
      </div>
    </div>
  );
};

export default Fundraisers;
