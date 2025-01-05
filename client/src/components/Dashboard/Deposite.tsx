import React, { useState } from 'react';
import { Box, Heading, Stack, Text, Input, Button, Flex, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface AddDepositProps {
  onDeposit: (balance: number) => void;
}

const Deposit: React.FC<AddDepositProps> = ({ onDeposit }) => {
  const [inputBalance, setInputBalance] = useState<number>(0); 
  const [error, setError] = useState<string>('');
  const [onClose, setOnClose] = useState<boolean>(false);

  const handleAddBalance = () => {
    if (inputBalance <= 0 || isNaN(inputBalance)) {
      alert("Balance must be a positive number.");
      return;
    }
    setError('');
    onDeposit(inputBalance);
  };

  const handleOnClose = () => {
    setOnClose(true);
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputBalance(Number(e.target.value));
  };

  if (onClose) return null;

  return (
    <Flex
      justify="center"
      align="center"
      height="100vh"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.3)"
      p={4}
    >
      <Box 
        p={{ base: 4, sm: 6 }} 
        borderRadius="md" 
        shadow="lg" 
        bg="white" 
        width="full" 
        maxW={{ base: '100%', sm: '400px' }} 
      >
        <Flex justify="flex-end">
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            onClick={handleOnClose}
            variant="link"
            size="lg"
            color="gray.600"
          />
        </Flex>

        <Heading as="h3" size="sm" mb={3} color="gray.800" fontSize={{ base: 'lg', sm: 'xl' }}>
          Balance 
        </Heading>

        {error && <Text color="red.500" mb={4}>{error}</Text>}

        <Stack spacing={4}>
          <Box>
            <Text mb={1} color="gray.600" fontSize={{ base: 'sm', sm: 'md' }}>Balance</Text>
            <Input
              type="number"
              value={inputBalance}
              onChange={handleBalanceChange}
              placeholder="Enter balance"
              size="sm"
              bg="gray.50"
              _hover={{ bg: 'gray.100' }}
              borderColor="gray.300"
              aria-label="Enter balance"
              color={'black'}
              fontSize={{ base: 'sm', sm: 'md' }} 
            />
          </Box>

          <Button
            colorScheme="teal"
            onClick={handleAddBalance}
            width="full"
            size="sm"
            _hover={{ bg: 'teal.600' }}
            fontSize={{ base: 'sm', sm: 'md' }} 
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Deposit;
