import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useToast,
  Container,
  InputGroup,
  InputRightElement,
  Flex,
  Link,
  Image,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import FinanceImage from '../../assets/Login.jpg';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
  
      console.log('Full Response:', response);
      console.log('Response Data:', response.data);
  
      if (response.data && response.data.token && response.data.refreshToken && response.data.user) {
       
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        
        setUserName(response.data.user.firstName || 'User');

        toast({
          title: 'Login Successful',
          description: 'You have logged in successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate('/Dashboard'); 
        }, 2000);
      } else {
        throw new Error('Invalid response format from server. Missing token.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      const errorMessage = error.response?.data?.message || error.message;
      toast({
        title: 'Login Failed',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.firstName) {
          setUserName(user.firstName);
        } else {
          setUserName('User'); 
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem('user'); 
        setUserName('User'); 
      }
    } else {
      setUserName('User'); 
    }
  }, []);

  return (
    <Flex
      h="100vh"
      bg="white"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="center"
      p={{ base: 4, md: 0 }}
    >
      <Box
        order={{ base: 0, md: 1 }}
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={{ base: 4, md: 8 }}
      >
        <Box
          textAlign="center"
          w={{ base: '100%', md: '96%' }} h={{ base: '40vh', md: '90%' }}
          maxH="700px" 
        >
          <Image
            src={FinanceImage}
            alt="Finance Background"
            objectFit="cover"
            borderRadius="md"
            boxShadow="lg"
            w="100%"
            h="100%"
          />
        </Box>
      </Box>

      <Box
        flex="1"
        color="black"
        display="flex"
        alignItems="center"
        justifyContent="center"
        order={{ base: 1, md: 0 }}
      >
        <Container maxW="md" py={{ base: 9, md: 12 }} px={{ base: 8, md: 12 }}>
          <Heading mb={6} textAlign="center" fontSize={{ base: '2xl', md: '3xl' }}>
            Login to Your Account
          </Heading>
          <form onSubmit={handleLogin}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button type="submit" colorScheme="blue" size="lg" width="full">
                Log In
              </Button>

              <Text textAlign="center" mt={4}>
                Don't have an account?{' '}
                <Link href="/SignUp" color="blue.500">
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </form>
        </Container>
      </Box>
    </Flex>
  );
};

export default Login;
