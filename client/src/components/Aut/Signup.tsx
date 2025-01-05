import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Heading,
  Text,
  Checkbox,
  useToast,
  Container,
  Flex,
  Link,
  Image,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import FinanceImage from '../../assets/Finance.jpg';
import { FaGoogle, FaApple } from 'react-icons/fa';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if ( !firstName || !lastName || !email || !password || !confirmPassword) {
      toast({
        title: 'Sign Up Failed',
        description: 'Please fill in all fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

   

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      toast({
        title: 'Invalid Name',
        description: 'First name and Last name should only contain letters.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 8 characters long.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Password and Confirm Password do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', {
        firstName,
        lastName,
        email,
        password,
      });


      toast({
        title: 'Sign Up Successful',
        description: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });

      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast({
        title: 'Sign Up Failed',
        description: error.response?.data?.message || 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  return (
    <Flex h="100vh" bg="white" flexDirection={{ base: 'column', md: 'row' }}>
      <Box flex="1" bg="white" color="black" display="flex" alignItems="center" justifyContent="center" position="relative">
        <Box textAlign="center" w={{ base: '100%', md: '90%' }} h={{ base: '40vh', md: '90%' }}>
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
      <Box flex="1" bg="white" color="black" display="flex" alignItems="center" justifyContent="center">
        <Container maxW="md" py={{ base: 6, md: 12 }} px={{ base: 4, md: 8 }}>
          <Heading mb={6} textAlign="center" fontSize={{ base: '2xl', md: '3xl' }}>
            Create an account
          </Heading>
          <form onSubmit={handleSignUp}>
            <Stack spacing={4}>
          

              <Flex gap={4} flexDirection={{ base: 'column', md: 'row' }}>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Flex>

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

              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>

              <Checkbox isRequired colorScheme="blue">
                I agree to the <Link href="#" color="blue.500">Terms & Conditions</Link>
              </Checkbox>

              <Button type="submit" colorScheme="blue" size="lg" width="full">
                Create account
              </Button>

              <Text textAlign="center" mt={4}>
                Already have an account? <Link href="/login" color="blue.500">Log in</Link>
              </Text>
            </Stack>
          </form>

          <Flex mt={6} justifyContent="center" gap={4}>
            <Button variant="outline" colorScheme="blue" leftIcon={<FaGoogle />} _hover={{ bg: 'blue.50' }}>
              Google
            </Button>
            <Button variant="outline" colorScheme="blue" leftIcon={<FaApple />} _hover={{ bg: 'blue.50' }}>
              Apple
            </Button>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
};

export default Signup;
