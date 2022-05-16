import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import { ChakraProvider, extendTheme,} from '@chakra-ui/react'

/* Styles */
import './index.css'

const customTheme = extendTheme({
  colors:{
    primary: "#0258FF", //light blue
    secondary: "#001234", //darkblue,
    highlight: "#FF7C02", //orange
    mygray: "#F0F0F0",
  },
})

  
  const myTheme = extendTheme({ customTheme })

  const rootElement = document.getElementById('root');
  const root = createRoot(rootElement);

    root.render(
    <ChakraProvider theme={myTheme}>
      <App/>
    </ChakraProvider>,
    );

