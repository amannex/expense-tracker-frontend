import { Outlet } from 'react-router-dom';
import { Box, Container, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <Flex direction="column" h="100vh" overflow="hidden" bg="#f6f8f7">
      <Navbar />
      <Flex flex="1" minH={0}>
        <Box w={{ base: 0, md: '250px' }} flexShrink={0} h="full">
          <Sidebar />
        </Box>
        <Box
          flex="1"
          minW={0}
          overflowY="auto"
          p={{ base: 4, md: 8 }}
          bg="#f6f8f7"
        >
          <Container maxW="container.xl" py={{ base: 2, md: 4 }}>
            <Outlet />
          </Container>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;