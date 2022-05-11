import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import { ChakraProvider, extendTheme,} from '@chakra-ui/react'

/* Styles */
import './index.css'

const customTheme = {
  colors:{
    brand: {
      100: "#0258FF",
      orange: "#FF7C02",
      900: "#F0F0F0",
  },
}
}
  
  const theme = extendTheme({ customTheme })

  const rootElement = document.getElementById('root');
  const root = createRoot(rootElement);

    root.render(
    <ChakraProvider theme={theme}>
      <App/>
    </ChakraProvider>,
    );

