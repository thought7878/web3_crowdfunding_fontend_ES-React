import React from 'react';
import { tagType, thirdweb } from '../../public/assets';
import { daysLeft } from '../utils';
import { ethers } from 'ethers';

const CampaignCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainDays = daysLeft(deadline.toNumber());

  return (
    <div className='sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer'>
      <img
        src={image}
        alt={title}
        className='w-full h-[158px] object-cover rounded-[15px]'
      />
      <div className='flex flex-col p-4'>
        <div className='flex items-center mb-[18px]'>
          <img
            src={tagType}
            alt='tag'
            className='w-[17px] h-[17px] object-contain'
          />
          <p className='ml-[12px] mt-[2px] font-medium text-[12px] text-[#808191]'>
            Education
          </p>
        </div>

        <h3 className='font-bold text-[16px] text-left leading-[26px] truncate'>
          {title}
        </h3>
        <p className='mt-[5px] font-normal text-[12px] text-[#808191] text-left leading-[18px] truncate'>
          {description}
        </p>

        <div className='flex justify-between flex-wrap mt-[15px] gap-2'>
          <div className='flex flex-col'>
            <h4 className='font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>
              {ethers.utils.formatEther(amountCollected.toString())}
            </h4>
            <p className='mt-[3px] font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate'>
              Raised of {ethers.utils.formatEther(target.toString())}
            </p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>
              {remainDays}
            </h4>
            <p className='mt-[3px] font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate'>
              Days Left
            </p>
          </div>
        </div>

        <div className='flex items-center mt-[20px] gap-[12px]'>
          <div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]'>
            <img
              src={thirdweb}
              alt='user'
              className='w-1/2 h-1/2 object-contain'
            />
          </div>
          <p className='flex-1 font-normal text-[12px] text-[#808191] truncate'>
            <span className='text-[#b2b3bd]'>{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
