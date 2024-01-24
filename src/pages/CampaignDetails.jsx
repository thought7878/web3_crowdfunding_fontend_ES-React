import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { Button } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../../public/assets';
import { CountCard } from '../components';

const CampaignDetails = () => {
  const { state: campaign } = useLocation();
  console.log(campaign);
  const { address, contract } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState(campaign.donators);

  const remainDays = daysLeft(campaign.deadline);

  return (
    <div>
      {isLoading && 'Loading'}
      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex flex-1 flex-col'>
          <img
            src={campaign.image}
            className='w-full h-[410px] object-cover rounded-xl'
            alt={campaign.title}
          />
          <div className='relative w-full h-[5px] bg-[#3a3a43] mt-2'>
            <div
              className='absolute h-full bg-[#4acd8d]'
              style={{
                width: `${calculateBarPercentage(
                  // ethers.utils.formatEther(campaign.target),
                  campaign.target,
                  // ethers.utils.formatEther(campaign.amountCollected)
                  campaign.amountCollected
                )}%`,
                maxWidth: '100%',
              }}
            ></div>
          </div>
        </div>

        <div className='flex flex-col md:w-[150px] w-full flex-wrap justify-between gap-[30px]'>
          <CountCard title='Days Left' value={remainDays} />
          <CountCard
            title={`Raised of ${ethers.utils.formatEther(campaign.target)}`}
            value={ethers.utils.formatEther(campaign.amountCollected)}
          />
          <CountCard title='Total Backers' value={remainDays} />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
