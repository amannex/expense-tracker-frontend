import { Box, Stack, Text, Icon, Flex, useColorModeValue } from '@chakra-ui/react';
import { 
  PieChartIcon,
  ListIcon, 
  PlusCircleIcon,
  WalletIcon,
} from 'lucide-react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: any;
  children: React.ReactNode;
  to: string;
}

const SidebarItem = ({ icon, children, to }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Box
      as={RouterLink}
      to={to}
      w="full"
      borderRadius="md"
      bg={isActive ? 'brand.500' : 'transparent'}
      color={isActive ? 'white' : 'gray.600'}
      _hover={{
        bg: isActive ? 'brand.600' : 'gray.100',
        color: isActive ? 'white' : 'gray.800',
      }}
      transition="all 0.2s"
    >
      <Flex align="center" p={3}>
        <Icon as={icon} boxSize={5} mr={3} />
        <Text fontWeight="medium">{children}</Text>
      </Flex>
    </Box>
  );
};

const Sidebar = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      top="60px"
      h="calc(100vh - 60px)"
      overflowY="auto"
      display={{ base: 'none', md: 'block' }}
      px={4}
      py={6}
    >
      <Box
        bg="gray.900"
        color="white"
        borderRadius="2xl"
        p={4}
        mb={8}
        boxShadow="0 12px 24px rgba(15, 23, 42, 0.12)"
      >
        <Flex align="center" gap={3}>
          <Flex
            align="center"
            justify="center"
            boxSize={10}
            borderRadius="xl"
            bg="brand.500"
          >
            <Icon as={WalletIcon} boxSize={5} />
          </Flex>
          <Box>
            <Text fontSize="sm" fontWeight="bold">Expense Tracker</Text>
            <Text fontSize="xs" color="gray.400">Stay in control</Text>
          </Box>
        </Flex>
      </Box>
      <Box>
        <Text
          px={3}
          mb={3}
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="wider"
          textTransform="uppercase"
          color="gray.400"
        >
          Overview
        </Text>
        <Stack spacing={2}>
          <SidebarItem icon={PieChartIcon} to="/">
            Dashboard
          </SidebarItem>
          <SidebarItem icon={ListIcon} to="/expenses">
            Expenses
          </SidebarItem>
          <SidebarItem icon={PlusCircleIcon} to="/expenses/add">
            Add Expense
          </SidebarItem>
        </Stack>
      </Box>
    </Box>
  );
};

export default Sidebar;