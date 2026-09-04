import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  useColorModeValue,
  Progress,
  VStack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Expense } from '../../types';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '../../constants/categoryColors';
import { useCurrency } from '../../context/CurrencyContext';

interface CategoryBreakdownProps {
  expenses: Expense[];
}

interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

const CategoryBreakdown = ({ expenses }: CategoryBreakdownProps) => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const bgColor = useColorModeValue('white', 'gray.800');
  const { formatCurrency } = useCurrency();
  
  useEffect(() => {
    if (expenses.length === 0) {
      setCategoryData([]);
      return;
    }
    
    // Calculate totals by category
    const categoryMap = expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);
    
    // Calculate total amount
    const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    
    // Transform into array with percentages
    const data = Object.entries(categoryMap)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: (amount / totalAmount) * 100,
        color: (CATEGORY_COLORS[name] || DEFAULT_CATEGORY_COLOR).text,
      }))
      .sort((a, b) => b.amount - a.amount);
    
    setCategoryData(data);
  }, [expenses]);
  
  if (expenses.length === 0) {
    return (
      <Card
        bg={bgColor}
        height="100%"
        variant="outline"
        borderColor="gray.100"
      >
        <CardHeader pb={0}>
          <Heading size="md">Category Breakdown</Heading>
        </CardHeader>
        <CardBody>
          <Text color="gray.500">No expense data available</Text>
        </CardBody>
      </Card>
    );
  }
  
  return (
    <Card
      bg={bgColor}
      height="100%"
      variant="outline"
      borderColor="gray.100"
    >
      <CardHeader pb={0}>
        <Heading size="md">Category Breakdown</Heading>
      </CardHeader>
      <CardBody>
      
      <VStack spacing={4} align="stretch">
        {categoryData.map((category) => (
          <Box key={category.name}>
            <Grid templateColumns="1fr auto auto" gap={2} mb={1}>
              <GridItem>
                <Text fontSize="sm" fontWeight="semibold">{category.name}</Text>
              </GridItem>
              <GridItem>
                <Text fontSize="sm" fontWeight="bold" color={category.color}>
                  {formatCurrency(category.amount)}
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="xs" color="gray.500">
                  {category.percentage.toFixed(1)}%
                </Text>
              </GridItem>
            </Grid>
            <Progress
              value={category.percentage}
              size="sm"
              borderRadius="full"
              sx={{
                '& > div': {
                  background: category.color,
                },
              }}
            />
          </Box>
        ))}
      </VStack>
      </CardBody>
    </Card>
  );
};

export default CategoryBreakdown;