import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../../public/assets';
import { CampaignCard } from './';

const CampaignList = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className='font-semibold text-[18px] text-left'>{`${title} ${
        campaigns && campaigns.length
      }`}</h1>

      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && (
          <img
            src={loader}
            alt='loader'
            className='w-[100px] h-[100px] object-contain'
          />
        )}
        {/* {isLoading && <Loader />} */}
        {!isLoading && campaigns?.length === 0 && (
          <p className='font-semibold text-[14px] leading-[30px] text-[#818183]'>
            You have not created any campaign yet
          </p>
        )}

        {!isLoading &&
          campaigns?.length > 0 &&
          campaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              {...campaign}
              handleClick={() => {
                handleNavigate(campaign);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default CampaignList;
