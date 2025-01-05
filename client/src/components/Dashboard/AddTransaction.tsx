import React, { useState } from 'react';
import { Box, Input, FormLabel, FormControl, Button, Stack, Text, Select } from '@chakra-ui/react';

interface AddTransactionProps {
  onAddTransaction: (transaction: Transaction) => void;
}

interface Transaction {
  description: string;
  amount: number;
  date: string;
  category: string;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ onAddTransaction }) => {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => {
      const updatedForm = { ...prevForm, [name]: value };
      console.log(updatedForm); 
      return updatedForm;
    });
  };
  

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { description, amount, date, category } = form;
  
    if (!description || !amount || !date || !category) {
      setError('All fields are required and category must be selected.');
      return;
    }
  
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setError('Amount must be a valid positive number.');
      return;
    }
  
    
    const newTransaction = { description, category, amount: amountNumber, date };
    onAddTransaction(newTransaction);

    setForm({
      description: '',
      amount: '',
      date: '',
      category: '',
    });
    setError('');
  };
  

  return (
    <Box p={6} borderRadius="md" shadow="lg" bg="white">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Add Transaction
      </Text>
      {error && <Text color="red.500" mb={4}>{error}</Text>}
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={4}>
          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </FormControl>

          <FormControl id="category" isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="food">Food</option>
              <option value="drink">Drink</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>

          <FormControl id="amount" isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </FormControl>

          <FormControl id="date" isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </FormControl>

          <Button colorScheme="teal" type="submit" mt={4}>
            Add Transaction
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddTransaction;
