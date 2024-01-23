import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { CampaignList } from '../components';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getUserCampaigns } = useStateContext();
  // const { data, error } = getUserCampaigns();
  // console.log('data', data);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getUserCampaigns();
      console.log('data', data);
      setCampaigns(data);
      setIsLoading(false);
    })();
  }, [address, contract]);

  return (
    <>
      <CampaignList
        title={'Campaigns'}
        campaigns={campaigns}
        isLoading={isLoading}
      />
    </>
  );
};

export default Profile;
