import React from 'react';

const CountCard = ({ title, value }) => {
  return (
    <div className='flex flex-col items-center w-[150px]'>
      <h4 className='font-bold text-[30px] p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate'>
        {value}
      </h4>
      <p className='font-normal text-[16px] text-[#808191] bg-[#28282e] w-full px-3 py-2 rounded-b-[10px] text-center'>
        {title}
      </p>
    </div>
  );
};

export default CountCard;
