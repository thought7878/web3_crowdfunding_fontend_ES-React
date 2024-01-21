import React from 'react';

const FormField = ({
  labelName,
  placeholder,
  inputType,
  value,
  handleChange,
  isTextArea,
}) => {
  return (
    <label className='flex flex-col w-full flex-1'>
      {labelName && (
        <span className='font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]'>
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className='py-[15px] px-[15px] sm:px-[25px] sm:min-w-[300px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px]'
        ></textarea>
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step='0.1'
          placeholder={placeholder}
          className='py-[15px] px-[15px] sm:px-[25px] sm:min-w-[300px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px]'
        />
      )}
    </label>
  );
};

export default FormField;
