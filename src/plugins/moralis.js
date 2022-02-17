import Moralis from 'moralis/dist/moralis.min.js';

Moralis.start({
  serverUrl: import.meta.env.VITE_APP_MORALIS_SERVER_URL,
  appId: import.meta.env.VITE_APP_MORALIS_APP_ID,
});

export default Moralis;
