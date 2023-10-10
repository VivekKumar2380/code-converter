import React from 'react';
import { ChakraProvider, CSSReset, extendTheme, Box, Container, useColorMode } from '@chakra-ui/react';
import CodeConverter from './Components/CodeConverter';

const App = () => {
  const { colorMode } = useColorMode();

  // Customize the Chakra UI theme to support dark and light modes
  const theme = extendTheme({
    config: {
      initialColorMode: colorMode,
      useSystemColorMode: false,
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Container maxW="container.lg" py={8}>
        <Box mb={8}>
          <CodeConverter />
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default App;
