import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, Grid, Stack, Heading, Spinner } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { format } from 'date-fns';
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  date: string;
}

const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [withdraw, setWithdraw] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  const getToken = () => localStorage.getItem('authToken');
  
  const getUserIdFromToken = (): string | null => {
    const token = getToken();
    if (!token) return null;
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken?.userId || null;
    } catch {
      return null;
    }
  };

  const verifyToken = (): boolean => {
    const token = getToken();
    if (!token) return false;
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        console.error('No user ID found');
        setError('User not authenticated or token missing.');
        setIsLoading(false);
        return;
      }
  
      const token = getToken();
      const config = { headers: { Authorization: `Bearer ${token}` } };
  
      try {
        const [transactionsResponse, balanceResponse] = await Promise.all([
          axios.get(`http://localhost:3000/api/user/${userId}/transactions`, config),
          axios.get(`http://localhost:3000/api/Ubalance/${userId}/balance`, config),
        ]);
  
        setTransactions(transactionsResponse.data);
        setBalance(balanceResponse.data.balance || 0);
        setWithdraw(balanceResponse.data.withdraw);
       
  
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  
  
  
useEffect(()=>{
  const handleWithdrawal = async (withdrawAmount: number) => {
    const userId = getUserIdFromToken();
    if (!userId || withdrawAmount <= 0) return;
  
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };
  
    try {
      const response = await axios.put(
        `http://localhost:3000/api/Ubalance/${userId}/balance`,
        { totalWithdraw: withdrawAmount },
        config
      );
      console.log('Withdraw Response:', response.data);
      setBalance(response.data.updatedBalance);
      setWithdraw(response.data.updatedWithdraw);
    } catch (error: any) {
      setError('Error during withdrawal: ' + (error.response?.data?.message || error.message));
    }
  };
  
  handleWithdrawal(withdraw);
},[withdraw,balance])
   
  

 

  const handleAddTransaction = async (transactionDetails: any) => {
    const userId = getUserIdFromToken();
    if (!userId || !transactionDetails || balance <= 0) return;

    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    try {
      const newTransaction = { ...transactionDetails, id: Date.now().toString(), date: new Date().toISOString() };
      setTransactions([newTransaction, ...transactions]);
        setWithdraw((prevWithdraw) => prevWithdraw + transactionDetails.amount);
        setBalance((prevBalance) => prevBalance - transactionDetails.amount);
       
      const response = await axios.post(
        `http://localhost:3000/api/user/${userId}/transactions`,
        transactionDetails,
        config
      );
console.log(response.data);
    } catch (error: any) {
      setError('Error adding transaction: ' + (error.response?.data?.error ));
    }
  };

  const handleDeposit = async (newBalance: number) => {
    const userId = getUserIdFromToken();
    if (!userId || newBalance <= 0) return;
  
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };
  
    try {
      const response = await axios.post(
        `http://localhost:3000/api/Ubalance/${userId}/balance`,
        { balance: newBalance },
        config
      );
      setBalance(response.data.updatedBalance || 0);
    } catch (error: any) {
      setError('Error updating balance: ' + (error.response?.data?.message || error.message));
    }
  };
  

  useEffect(() => {
    const authenticated = verifyToken();
    setIsAuthenticated(authenticated);
    setIsCheckingAuth(false);
  }, []);



  if (isCheckingAuth) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bg="gray.100">
        <Spinner size="lg" />
        <Text ml={4} fontSize="xl" color="gray.500">
          Verifying authentication...
        </Text>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bg="gray.100">
        <Spinner size="lg" />
        <Text ml={4} fontSize="xl" color="gray.500">
          Loading...
        </Text>
      </Box>
    );
  }

  return (
    <Box display="flex" minHeight="100vh" bg="gray.50">
      <Sidebar onDeposit={handleDeposit} onAddTransaction={handleAddTransaction} />
      <Box flex="1" overflowY="auto" p={1}>
        <Navbar />

        {error && (
          <Box p={4} bg="red.100" borderRadius="md" mb={4}>
            <Text color="red.600">{error}</Text>
          </Box>
        )}

        <Grid templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={6} mb={6}>
          <Box p={4} bg="blue.50" shadow="sm" borderRadius="md" textAlign="center" _hover={{ bg: 'blue.100' }}>
            <Text fontSize="md" color="blue.600">Current Balance</Text>
            <Text fontSize="xl" fontWeight="bold" color="blue.700">${balance}</Text>
          </Box>

          <Box p={4} bg="red.50" shadow="sm" borderRadius="md" textAlign="center" _hover={{ bg: 'red.100' }}>
            <Text fontSize="md" color="red.600">Withdrawn</Text>
            <Text fontSize="xl" fontWeight="bold" color="red.700">${withdraw}</Text>
          </Box>
        </Grid>

        <Box bg="white" p={6} shadow="lg" borderRadius="lg">
          <Heading as="h2" size="md" mb={4} color="gray.800">
            Recent Transactions
          </Heading>
          <Stack spacing={4}>
            {transactions.map((transaction) => (
              <Box
                key={transaction.id}
                p={4}
                bg="gray.50"
                rounded="lg"
                borderWidth="1px"
                borderColor="gray.200"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                _hover={{ bg: 'gray.100', cursor: 'pointer' }}
              >
                <Box>
                  <Text fontWeight="bold" color="gray.700">{transaction.description}</Text>
                  <Text fontSize="sm" color="gray.500"> {format(new Date(transaction.date), 'MM/dd/yy')}</Text>
                </Box>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color={transaction.type === 'deposit' ? 'green.500' : 'red.500'}
                >
                  ${transaction.amount}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
