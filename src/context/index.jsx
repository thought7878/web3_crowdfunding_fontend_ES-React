import React, { useContext, createContext } from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useConnect,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

export const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    '0x307455Cae3d7c1c4FA8b97ed2031580Beb177CE5'
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    'createCampaign'
  );

  const address = useAddress();
  // const connect = useMetamask();
  const connect = useConnect();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.log('success', data);
    } catch (error) {
      console.log('failed', error);
    }
  };

  return (
    <StateContext.Provider
      value={{ address, contract, createCampaign: publishCampaign }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
