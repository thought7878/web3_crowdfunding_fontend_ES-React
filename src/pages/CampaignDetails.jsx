import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { Button } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../../public/assets';
import { CountCard } from '../components';

const CampaignDetails = () => {
  const navigate = useNavigate();
  const { state: campaign } = useLocation();
  // console.log(campaign);
  const { address, contract, donate, getDonations } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  // Convert data format
  const remainDays = daysLeft(campaign.deadline);
  // const remainDays = daysLeft(campaign.deadline.toNumber());
  const amountCollected = campaign.amountCollected;
  const target = campaign.target;

  const handleDonate = async () => {
    console.log('handleDonate');

    setIsLoading(true);
    // await donate(campaign._id, amount);
    console.log('handleDonate', await donate(campaign._id, amount));
    navigate('/');
    setIsLoading(false);
  };

  const fetchDonators = async () => {
    const data = await getDonations(campaign._id);
    // console.log('fetchDonators:', data);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) {
      fetchDonators();
    }
  }, [contract, address]);

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
                  target,
                  // campaign.target._hex,
                  amountCollected
                  // campaign.amountCollected._hex
                )}%`,
                maxWidth: '100%',
              }}
            ></div>
          </div>
        </div>

        <div className='flex flex-col md:w-[150px] w-full flex-wrap justify-between gap-[30px]'>
          <CountCard title='Days Left' value={remainDays} />
          <CountCard title={`Raised of ${target}`} value={amountCollected} />
          <CountCard title='Total Backers' value={remainDays} />
        </div>
      </div>

      <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>
        <div className='flex-[2] flex flex-col gap-[20px]'>
          <h4 className='font-bold text-[18px]'>Creator</h4>
          <div className='flex items-center'>
            <div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#3c2f32] cursor-pointer mr-5'>
              <img
                className='w-[60%] h-[60%] object-contain'
                src={thirdweb}
                alt='creator'
              />
            </div>
            <div>
              <p className='font-semibold text-[14px] break-all'>
                {campaign.owner}
              </p>
              <p className='mt-[4px] font-normal text-[12px] text-[#808191]'>
                10 Campaigns
              </p>
            </div>
          </div>
        </div>

        <div className='flex-[2] flex flex-col gap-[20px]'>
          <h4 className='font-bold text-[18px]'>Story</h4>
          <div className='font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>
            {campaign.description}
          </div>
        </div>

        <div>
          <h4 className='font-epilogue font-semibold text-[18px] text-white'>
            Donators
          </h4>
          <div className='mt-[20px] flex flex-col gap-4'>
            {donators.length > 0 ? (
              donators.map((item, index) => (
                <div
                  key={`${item.donator}-${index}`}
                  className='flex justify-between items-center gap-4'
                >
                  <p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll'>
                    {index + 1}. {item.donator}
                  </p>
                  <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll'>
                    {item.donation}
                  </p>
                </div>
              ))
            ) : (
              <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>
                No donators yet. Be the first one!
              </p>
            )}
          </div>
        </div>

        <div className='flex-1'>
          <h4 className='font-epilogue font-semibold text-[18px] text-white'>
            Fund
          </h4>
          <div className='mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
            <p className='font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]'>
              Fund the campaign
            </p>
            <div className='mt-[30px]'>
              <input
                type='number'
                placeholder='ETH 0.1'
                step='0.01'
                className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className='my-[20px] p-4 bg-[#13131a] rounded-[10px]'>
                <h4 className='font-epilogue font-semibold text-[14px] leading-[22px]'>
                  Back it because you believe in it.
                </h4>
                <p className='mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]'>
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <Button
                btnType='button'
                title='Fund Campaign'
                styles='w-full bg-[#8c6dfd]'
                onClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
