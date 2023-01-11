import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

//chakra ui
import { ChakraProvider } from '@chakra-ui/react';
import { myTheme } from './myTheme';
//query client
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'
//auth
import { AuthProvider } from 'react-auth-kit'

/* Styles */
import './index.css'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <AuthProvider authType = {'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={false}> 
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ChakraProvider theme={myTheme}>
                    <App />
                </ChakraProvider>
            </BrowserRouter>
        </QueryClientProvider>
  </AuthProvider>
);
