import React, { useContext, createContext } from 'react';
import {
  useAddress,
  useContract,
  useConnect,
  useContractWrite,
  useContractRead,
  metamaskWallet,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

export const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // const connect = useMetamask();
  const connect = useConnect();
  const walletConfig = metamaskWallet();
  const address = useAddress();
  const { contract } = useContract(
    '0x307455Cae3d7c1c4FA8b97ed2031580Beb177CE5'
  );
  const { mutateAsync: createCampaign, isLoading } = useContractWrite(
    contract,
    'createCampaign'
  );

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });
      console.info('contract call successs', data);
    } catch (error) {
      console.error('contract call failure', err);
    }
  };

  const getCampaigns = async () => {
    // console.log('contract', contract);
    // return useContractRead(contract, 'getCampaigns');
    return await (contract && contract.call('getCampaigns'));
  };
  const getUserCampaigns = async () => {
    const campaigns = await (contract && contract.call('getCampaigns'));
    const filteredCampaigns = campaigns.filter((campaign) => {
      return campaign.owner === address;
    });
    return filteredCampaigns;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        walletConfig,
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
