// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { persistor, store } from './store';
// import { PersistGate } from 'redux-persist/integration/react';
// // import { GoogleOAuthProvider } from '@react-oauth/google';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// const callbackUrl = 'https://dev.hibiller.com/auth/callback/google/';

// root.render(
//   <React.StrictMode>
//     {/* <GoogleOAuthProvider callbackUrl={callbackUrl}  clientId='176349257307-8277n57npt2tie23pssv9t5g4snbnrdb.apps.googleusercontent.com' > */}
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <BrowserRouter>
//             <App />
//           </BrowserRouter>
//         </PersistGate>
//       </Provider>,
//       document.getElementById('root')
//     {/* </GoogleOAuthProvider> */}
//   </React.StrictMode>
// );

import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';

const root =createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
