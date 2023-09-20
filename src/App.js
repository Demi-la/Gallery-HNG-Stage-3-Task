import React, { useEffect } from 'react';
import { ChakraProvider, Box, theme, CSSReset } from '@chakra-ui/react';
import Home from './components/Home';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <CSSReset />
        <Home />
      </Box>
    </ChakraProvider>
  );
}

export default App;
