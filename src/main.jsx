import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/globals.css';
import { StateContextProvider } from './context';
import { Sepolia } from '@thirdweb-dev/chains';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'ethereum';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      // desiredChainId={ChainId.Goerli}
      // clientId={process.env.CLIENT_ID}
      clientId={import.meta.env.VITE_CLIENT_ID}
      activeChain={Sepolia}
    >
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
