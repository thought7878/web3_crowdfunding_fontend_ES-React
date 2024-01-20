import React from 'react';

const Button = ({ btnType, title, onClick, styles }) => {
  return (
    <button
      type={btnType}
      onClick={onClick}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
    >
      {title}
    </button>
  );
};

export default Button;
