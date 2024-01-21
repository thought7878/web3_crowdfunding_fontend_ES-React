import { ConnectWallet } from '@thirdweb-dev/react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';

export default function App() {
  return (
    <div className='relative text-white  sm:-8 p-4 bg-[#13131a] min-h-screen flex'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/campaign-details/:id' element={<CampaignDetails />} />
          <Route path='/create-campaign' element={<CreateCampaign />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
