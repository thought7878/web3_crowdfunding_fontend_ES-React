import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();
  // const { data, error } = getCampaigns();
  // console.log('data', data);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getCampaigns();
      console.log('data', data);
      setCampaigns(data);
      setIsLoading(false);
    })();
  }, [address, contract]);

  return <div>Home</div>;
};

export default Home;
