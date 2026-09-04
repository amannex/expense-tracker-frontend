import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  useColorModeValue, 
  Flex,
  Icon,
  Text,
  Progress,
} from '@chakra-ui/react';
import { Banknote, TrendingUp, Calendar, Receipt } from 'lucide-react';
import { Expense } from '../../types';

interface ExpenseSummaryProps {
  expenses: Expense[];
  period?: 'day' | 'week' | 'month';
}

const DEFAULT_MONTHLY_BUDGET = 2000;

const ExpenseSummary = ({ expenses, period = 'month' }: ExpenseSummaryProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const featuredBg = useColorModeValue('brand.600', 'brand.800');
  const iconBg1 = useColorModeValue('brand.50', 'brand.900');
  const iconBg2 = useColorModeValue('green.50', 'green.900');
  const iconBg3 = useColorModeValue('purple.50', 'purple.900');
  const iconBg4 = useColorModeValue('orange.50', 'orange.900');
  
  // Calculate total expenses
  const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  
  // Find most expensive category
  const categoryMap = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);
  
  const mostExpensiveCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0] || ['None', 0];
  
  // Calculate average expense
  const averageExpense = expenses.length > 0 ? totalAmount / expenses.length : 0;
  const budgetRemaining = Math.max(DEFAULT_MONTHLY_BUDGET - totalAmount, 0);
  const budgetProgress = Math.min((totalAmount / DEFAULT_MONTHLY_BUDGET) * 100, 100);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  let periodText = '';
  switch (period) {
    case 'day':
      periodText = 'Today';
      break;
    case 'week':
      periodText = 'This Week';
      break;
    case 'month':
      periodText = 'This Month';
      break;
  }
  
  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '1.35fr 1fr 1fr' }}
      templateRows={{ base: 'auto', lg: '1fr 1fr' }}
      gap={4}
      mb={6}
    >
      <GridItem rowSpan={{ base: 1, lg: 2 }}>
        <Card
          h="100%"
          minH={{ base: '190px', lg: '224px' }}
          bg={featuredBg}
          color="white"
          overflow="hidden"
          position="relative"
          transition="all 0.2s"
          _hover={{ transform: 'translateY(-3px)', boxShadow: 'xl' }}
        >
          <CardBody p={{ base: 6, md: 8 }} display="flex" flexDirection="column" justifyContent="space-between">
            <Flex justify="space-between" align="flex-start">
              <Text fontSize="sm" fontWeight="semibold" color="whiteAlpha.800">
                Total Expenses
              </Text>
              <Flex
                w="3rem"
                h="3rem"
                align="center"
                justify="center"
                rounded="xl"
                bg="whiteAlpha.200"
              >
                <Icon as={Banknote} boxSize={5} />
              </Flex>
            </Flex>
            <Stat mt={8}>
              <StatNumber fontSize={{ base: '4xl', md: '5xl' }} letterSpacing="tight">
                {formatCurrency(totalAmount)}
              </StatNumber>
              <StatHelpText color="whiteAlpha.800" mb={0}>{periodText}</StatHelpText>
            </Stat>
          </CardBody>
          <Flex
            position="absolute"
            right="-35px"
            bottom="-45px"
            boxSize="150px"
            rounded="full"
            border="1px solid"
            borderColor="whiteAlpha.200"
          />
        </Card>
      </GridItem>

      <Card bg={bgColor} variant="outline" borderColor="gray.100" transition="all 0.2s" _hover={{ transform: 'translateY(-3px)', boxShadow: 'lg' }}>
        <CardBody p={5}>
          <Flex justify="space-between" align="flex-start">
            <Stat>
              <StatLabel color="gray.500">Average Expense</StatLabel>
              <StatNumber fontSize="2xl">{formatCurrency(averageExpense)}</StatNumber>
              <StatHelpText>Per Transaction</StatHelpText>
            </Stat>
            <Flex w="2.75rem" h="2.75rem" align="center" justify="center" rounded="xl" bg={iconBg2} color="green.500">
              <Icon as={TrendingUp} boxSize={5} />
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      <Card bg={bgColor} variant="outline" borderColor="gray.100" transition="all 0.2s" _hover={{ transform: 'translateY(-3px)', boxShadow: 'lg' }}>
        <CardBody p={5}>
          <Flex justify="space-between" align="flex-start">
            <Stat>
              <StatLabel color="gray.500">Highest Category</StatLabel>
              <StatNumber fontSize="2xl">{mostExpensiveCategory[0]}</StatNumber>
              <StatHelpText>{formatCurrency(mostExpensiveCategory[1])}</StatHelpText>
            </Stat>
            <Flex w="2.75rem" h="2.75rem" align="center" justify="center" rounded="xl" bg={iconBg3} color="purple.500">
              <Icon as={Receipt} boxSize={5} />
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      <GridItem>
        <Card bg={bgColor} variant="outline" borderColor="gray.100" h="100%" transition="all 0.2s" _hover={{ transform: 'translateY(-3px)', boxShadow: 'lg' }}>
          <CardBody p={5}>
            <Flex justify="space-between" align="flex-start">
              <Stat>
                <StatLabel color="gray.500">Total Transactions</StatLabel>
                <StatNumber fontSize="2xl">{expenses.length}</StatNumber>
                <StatHelpText>{periodText}</StatHelpText>
              </Stat>
              <Flex w="2.75rem" h="2.75rem" align="center" justify="center" rounded="xl" bg={iconBg4} color="orange.500">
                <Icon as={Calendar} boxSize={5} />
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem>
        <Card bg={bgColor} variant="outline" borderColor="gray.100" h="100%" transition="all 0.2s" _hover={{ transform: 'translateY(-3px)', boxShadow: 'lg' }}>
          <CardBody p={5}>
            <Flex justify="space-between" align="flex-start" mb={5}>
              <Text fontSize="sm" fontWeight="semibold" color="gray.500">
                Monthly Budget
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="brand.600">
                {formatCurrency(DEFAULT_MONTHLY_BUDGET)}
              </Text>
            </Flex>
            <Flex align="baseline" gap={2} mb={3}>
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                {formatCurrency(budgetRemaining)}
              </Text>
              <Text fontSize="sm" color="gray.500">remaining</Text>
            </Flex>
            <Progress
              value={budgetProgress}
              colorScheme={budgetProgress >= 90 ? 'orange' : 'brand'}
              size="sm"
              borderRadius="full"
              mb={2}
            />
            <Flex justify="space-between">
              <Text fontSize="xs" color="gray.500">
                {formatCurrency(totalAmount)} used
              </Text>
              <Text fontSize="xs" fontWeight="semibold" color={budgetProgress >= 90 ? 'orange.500' : 'brand.600'}>
                {Math.round(budgetProgress)}%
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>

    </Grid>
  );
};

export default ExpenseSummary;