import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import { ChakraProvider, extendTheme,} from '@chakra-ui/react'

/* Styles */
import './index.css'

const customTheme = extendTheme({
  colors:{
    blue: "#0258FF", //light blue
    darkblue: "#001234", //darkblue,
    orange: "#FF7C02", //orange
    lightgray: "#F0F0F0",
    
  },
})

  const rootElement = document.getElementById('root');
  const root = createRoot(rootElement);

    root.render(
    <ChakraProvider theme={customTheme}>
      <App/>
    </ChakraProvider>,
    );

