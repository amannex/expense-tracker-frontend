import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Text,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import { PlusIcon } from 'lucide-react';
import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import ExpenseSummary from '../components/dashboard/ExpenseSummary';
import CategoryBreakdown from '../components/dashboard/CategoryBreakdown';
import ExpenseList from '../components/expenses/ExpenseList';
import { expenseService } from '../services/api';
import { Expense } from '../types';
import dayjs from 'dayjs';
import { CURRENCIES, useCurrency } from '../context/CurrencyContext';

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const { currency, setCurrency } = useCurrency();
  
  const gridColumns = useBreakpointValue({ base: 1, md: 3 });
  
  useEffect(() => {
    fetchExpenses();
  }, []);
  
  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      // Get all expenses
      const response = await expenseService.getAll();
      const allExpenses = response.data;
      setExpenses(allExpenses);
      
      // Get recent expenses (last 5)
      setRecentExpenses(allExpenses.slice(0, 5));
    } catch (error: any) {
      console.error('Error fetching expenses:', error);
      toast({
        title: 'Error fetching expenses',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      await expenseService.delete(id);
      // Refresh expenses after deletion
      fetchExpenses();
    } catch (error: any) {
      toast({
        title: 'Error deleting expense',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Calculate monthly expenses (current month)
  const currentDate = dayjs();
  const startOfMonth = currentDate.startOf('month').format('YYYY-MM-DD');
  const endOfMonth = currentDate.endOf('month').format('YYYY-MM-DD');
  
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = dayjs(expense.date);
    return expenseDate.isAfter(startOfMonth) && expenseDate.isBefore(endOfMonth);
  });
  
  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Box>
          <Text
            color="brand.600"
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="0.08em"
            textTransform="uppercase"
            mb={0}
            lineHeight="1.2"
          >
            Welcome back
          </Text>
          <Heading as="h1" size="xl" mt={1} lineHeight="1.1">
            Dashboard
          </Heading>
        </Box>
        <HStack spacing={3}>
          <Menu placement="bottom-end">
            <MenuButton
              as={Button}
              size="md"
              width={{ base: '100px', md: '125px' }}
              borderRadius="lg"
              bg="white"
              variant="outline"
              rightIcon={<ChevronDownIcon />}
              aria-label="Select currency"
            >
              {CURRENCIES.find((option) => option.code === currency)?.symbol} {currency}
            </MenuButton>
            <MenuList zIndex={10}>
              {CURRENCIES.map((option) => (
                <MenuItem
                  key={option.code}
                  icon={option.code === currency ? <CheckIcon /> : undefined}
                  onClick={() => setCurrency(option.code)}
                >
                  {option.symbol} {option.code}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Button
            as={Link}
            to="/expenses/add"
            leftIcon={<PlusIcon size={18} />}
            colorScheme="brand"
          >
            Add Expense
          </Button>
        </HStack>
      </HStack>
      
      <ExpenseSummary expenses={monthlyExpenses} period="month" />
      
      <Grid
        templateColumns={{ base: '1fr', lg: '3fr 1fr' }}
        gap={6}
        mb={6}
      >
        <GridItem>
          <Card bg="white" variant="outline" borderColor="gray.100" minH="252px">
            <CardHeader pb={1}>
              <Heading size="md">Recent Expenses</Heading>
            </CardHeader>
            <CardBody pt={4}>
            <ExpenseList
              expenses={recentExpenses}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
            {recentExpenses.length > 0 && (
              <Box mt={4} textAlign="center">
                <Button
                  as={Link}
                  to="/expenses"
                  variant="outline"
                  colorScheme="brand"
                  size="sm"
                >
                  View All Expenses
                </Button>
              </Box>
            )}
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem>
          <CategoryBreakdown expenses={monthlyExpenses} />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;