import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from './assets/chakraThemes/customTheme';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

/* Styles */
import './index.css'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

  root.render(
  <ChakraProvider theme={customTheme}>
    <App/>
  </ChakraProvider>,
);

serviceWorkerRegistration.register();

