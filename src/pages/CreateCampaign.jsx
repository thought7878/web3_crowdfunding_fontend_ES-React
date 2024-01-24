import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { money } from '../../public/assets';
import { Button, FormField } from '../components';
import { checkIfImage } from '../utils';
import { Loader } from '../components';
import { useStateContext } from '../context';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && <Loader />}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-bold sm:text-[25px] text-[18px] leading-[38px]'>
          Start a Campaign
        </h1>
      </div>
      <form
        action=''
        onSubmit={handleSubmit}
        className='w-full mt-[65px] flex flex-col gap-[30px]'
      >
        <div className='flex flex-col gap-[40px]'>
          <FormField
            labelName='Your Name *'
            placeholder='andi'
            inputType='text'
            value={form.name}
            handleChange={(e) => {
              handleFormFieldChange('name', e);
            }}
          />
          <FormField
            labelName='Campaign Title'
            placeholder='Write a title'
            inputType='text'
            value={form.title}
            handleChange={(e) => {
              handleFormFieldChange('title', e);
            }}
          />
          <FormField
            labelName='Story *'
            placeholder='Write your story'
            isTextArea
            value={form.description}
            handleChange={(e) => {
              handleFormFieldChange('description', e);
            }}
          />
          <div className='w-full flex items-center bg-[#8c6dfd] p-4 rounded-[10px]'>
            <img
              src={money}
              className='w-[40px] h-[40px] object-contain'
              alt='money'
            />
            <h4 className='font-bold text-[18px] ml-[20px]'>
              You will get 100% of the raised amount
            </h4>
          </div>
          <FormField
            labelName='Goal *'
            placeholder='ETH 0.5'
            inputType='text'
            value={form.target}
            handleChange={(e) => {
              handleFormFieldChange('target', e);
            }}
          />
          <FormField
            labelName='End Date'
            placeholder='Jan/01/2024'
            inputType='date'
            value={form.deadline}
            handleChange={(e) => {
              handleFormFieldChange('deadline', e);
            }}
          />
          <FormField
            labelName='Campaign Image'
            placeholder='Place image URL of your campaign'
            inputType='url'
            value={form.image}
            handleChange={(e) => {
              handleFormFieldChange('image', e);
            }}
          />
          <div className='flex justify-center items-center mt-[40px]'>
            <Button
              btnType={'submit'}
              styles='bg-[#8c6dfd] w-full'
              title={'Submit'}
              // onClick={(e) => {
              //   handleSubmit();
              // }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
