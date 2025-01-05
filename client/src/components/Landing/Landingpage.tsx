import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Stack,
  Container,
  SimpleGrid,
  Image,
  useColorModeValue,
  Icon,
  Avatar,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const MotionImage = motion(Image);
import { Link, Link as RouterLink } from 'react-router-dom';
import Phone from "../../assets/phone.jpg";
import innovativeSolutions from "../../assets/Intergrity.jpg"
import userFriendlyInterface from "../../assets/userfriendy.jpg"
import scalable from "../../assets/scalable.jpg"
import perfume from "../../assets/perfume.jpg"
import { FaExchangeAlt, FaUniversity, FaShieldAlt, FaAmazon, FaAlipay } from 'react-icons/fa';

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box>
  
      <Flex
        as="nav"
        bg={isScrolled ? 'gray.200' : 'white'}
        color={useColorModeValue('gray.800', 'white')}
        px={{ base: 4, md: 8 }}
        py={4}
        justify="space-between"
        align="center"
        boxShadow={isScrolled ? 'lg' : 'base'}
        position="fixed"
        top="0"
        width="100%"
        zIndex="1000"
        transition="background-color 0.3s ease, box-shadow 0.3s ease"
      >
        <Heading size="lg" fontWeight="bold" color="blue.600">
         BM
        </Heading>
        <Stack direction="row" spacing={6} align="center">
          <Button  
            as="a"
            href="#benefits"
            variant="link" 
            display={{ base: 'none', md: 'inline-block' }}
          >
            Benefits
          </Button>
          <Button colorScheme="blue" rounded="full" px={6} as={RouterLink} to="/Signup">
            Register
          </Button>
        </Stack>
      </Flex>

   
      <MotionBox
      bg={useColorModeValue('gray.50', 'gray.900')}
      py={16}
      px={4}
      textAlign="center"
      position="relative"
      mt={{ base: '40px', md: '65px' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
    >
      <Container maxW="container.xl">
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
          <MotionBox
            flex="1"
            textAlign={{ base: 'center', md: 'left' }}
            mb={{ base: 10, md: 0 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MotionHeading
              as="h1"
              size="2xl"
              fontWeight="bold"
              mb={6}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Let’s grow your business <Text as="span" color="blue.600">globally</Text>
            </MotionHeading>
            <MotionText
              fontSize="lg"
              mb={6}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              NLN Business helps make your business more simple and organized.
            </MotionText>
            <Stack
              direction="row"
              spacing={4}
              justify={{ base: 'center', md: 'flex-start' }}
              align="center"
            >
              <MotionButton
                colorScheme="blue"
                rounded="full"
                px={6}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                as={Link}
                  to="/Signup"
              >
                Get Started
              </MotionButton>
             
            </Stack>
          </MotionBox>

          <MotionBox
            flex="1"
            mt={{ base: 10, md: 0 }}
            position="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MotionImage
              src={Phone}
              alt="Dashboard preview"
              borderRadius="lg"
              boxShadow="2xl"
              width={{ base: '100%', md: '80%', lg: '97%' }}
              maxWidth="600px"
              mx="auto"
              transition="transform 0.3s ease-out"
              _hover={{ transform: 'scale(1.05)' }}
            />
          </MotionBox>
        </Flex>
      </Container>
    </MotionBox>


      <Box py={16} bg={useColorModeValue('white', 'gray.800')} textAlign="center">
        <Container maxW="container.xl">
          <Heading size="lg" mb={10} color="blue.600">
            Why Choose Us
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            We provide innovative solutions that help you grow your business globally. Our platform is user-friendly, reliable, and scalable.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Box bg="white" p={6} borderRadius="md" boxShadow="xl" _hover={{ transform: 'translateY(-10px)', boxShadow: '2xl' }} transition="transform 0.3s, box-shadow 0.3s">
              <Image src={innovativeSolutions} alt="Innovative Solutions" borderRadius="md" mb={4} />
              <Heading size="md" mb={4} color="blue.600">Innovative Solutions</Heading>
              <Text color="gray.600">Our tools are built with the latest technologies to ensure your business stays ahead of the curve.</Text>
            </Box>

            <Box bg="white" p={6} borderRadius="md" boxShadow="xl" _hover={{ transform: 'translateY(-10px)', boxShadow: '2xl' }} transition="transform 0.3s, box-shadow 0.3s">
              <Image src={userFriendlyInterface} alt="User-Friendly Interface" borderRadius="md" mb={4} />
              <Heading size="md" mb={4} color="blue.600">User-Friendly Interface</Heading>
              <Text color="gray.600">We believe in simplicity. Our platform is designed to be intuitive, so you can focus on what matters.</Text>
            </Box>

            <Box bg="white" p={6} borderRadius="md" boxShadow="xl" _hover={{ transform: 'translateY(-10px)', boxShadow: '2xl' }} transition="transform 0.3s, box-shadow 0.3s">
              <Image src={scalable} alt="Scalable" borderRadius="md" mb={4} />
              <Heading size="md" mb={4} color="blue.600">Scalable</Heading>
              <Text color="gray.600">Our services grow with your business, providing the flexibility to adapt to your evolving needs.</Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

 
      <Box py={16} bg="gray.50" textAlign="center" id='benefits'>
        <Container maxW="container.xl">
          <Heading size="lg" mb={6} color="gray.800">
            Experience that grows with your scale.
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={10}>
            Design a financial operating system that works for your business and streamlines cash flow management.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Box
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="lg"
              transition="transform 0.3s"
              _hover={{ transform: 'translateY(-10px)', boxShadow: '2xl' }}
            >
              <Icon as={FaExchangeAlt} w={10} h={10} color="blue.500" mb={4} />
              <Heading size="md" mb={2} color="gray.800">
                Free Transfers
              </Heading>
              <Text color="gray.600">
                Create a financial experience and automate repeat purchases by scheduling recurring payments.
              </Text>
            </Box>

            <Box
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="lg"
              transition="transform 0.3s"
              _hover={{ transform: 'translateY(-10px)', boxShadow: '2xl' }}
            >
              <Icon as={FaUniversity} w={10} h={10} color="blue.500" mb={4} />
              <Heading size="md" mb={2} color="gray.800">
                Bank-Grade Security
              </Heading>
              <Text color="gray.600">
                Your privacy is our priority. Our platform employs top-tier encryption and security practices.
              </Text>
            </Box>

            <Box
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="lg"
              transition="transform 0.3s"
              _hover={{ transform: 'translateY(-10px)', boxShadow: '2xl' }}
            >
              <Icon as={FaShieldAlt} w={10} h={10} color="blue.500" mb={4} />
              <Heading size="md" mb={2} color="gray.800">
                Guaranteed Protection
              </Heading>
              <Text color="gray.600">
                We keep your data secure while enabling seamless transactions with businesses around the world.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>


      <Box py={16} textAlign="center" bg={useColorModeValue('white', 'gray.800')}>
      <Container maxW="container.xl">
        <Heading size="lg" mb={6} color="blue.600">
          Meet Our Team
        </Heading>
        <Text fontSize="lg" mb={6} color="gray.600">
          Our talented team of professionals is dedicated to your success.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <MotionFlex
            direction="column"
            align="center"
            justify="center"
            gap={4}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Avatar size="xl" name="Mark Johnson" src={perfume} mb={4} />
            <Heading size="md" color="blue.600">Mark Johnson</Heading>
            <Text color="gray.600">CEO</Text>
          </MotionFlex>

          <MotionFlex
            direction="column"
            align="center"
            justify="center"
            gap={4}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Avatar size="xl" name="Sarah Adams" src={innovativeSolutions} mb={4} />
            <Heading size="md" color="blue.600">Sarah Adams</Heading>
            <Text color="gray.600">Lead Developer</Text>
          </MotionFlex>

          <MotionFlex
            direction="column"
            align="center"
            justify="center"
            gap={4}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Avatar size="xl" name="Derek L." src={userFriendlyInterface} mb={4} />
            <Heading size="md" color="blue.600">Derek L.</Heading>
            <Text color="gray.600">CTO</Text>
          </MotionFlex>
        </SimpleGrid>
      </Container>
    </Box>

    <Box py={6} bg="gray.100" mt={0} overflow="hidden">
      <Container maxW="container.xl">
        <Heading size="lg" mb={8} color="gray.800" textAlign="center">
          Our Partners
        </Heading>

        <MotionSimpleGrid
          columns={{ base: 2, md: 4 }}
          gap={8}
          overflowX="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 25 }}
        >
   
          <MotionBox
            mx="auto"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="60px"
              height="60px"
            >
              <path fill="#4285F4" d="M24 9.5c3.9 0 7.3 1.5 9.8 3.9l7.4-7.4C36.3 2.4 30.6 0 24 0 14.6 0 6.6 5.6 2.7 13.7l8.7 6.8c1.7-5 6.5-8.5 12.6-8.5z" />
              <path fill="#34A853" d="M46.6 24.3c0-1.5-.1-3-.4-4.4H24v8.4h12.7c-.5 2.8-1.9 5.2-3.8 7.1l7.3 5.7C44.8 36.2 46.6 30.7 46.6 24.3z" />
              <path fill="#FBBC05" d="M11.4 29.4c-1-2.8-1-5.9 0-8.6l-8.7-6.8C.9 17.3 0 20.6 0 24c0 3.4.9 6.7 2.6 9.7l8.8-6.8z" />
              <path fill="#EA4335" d="M24 48c6.5 0 12-2.1 16.1-5.8l-7.3-5.7c-2.1 1.4-4.8 2.3-8.8 2.3-6.1 0-10.9-3.5-12.7-8.5l-8.7 6.8C6.6 42.4 14.6 48 24 48z" />
            </svg>
          </MotionBox>


          <MotionBox
            mx="auto"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon as={FaAlipay} boxSize="60px" color="#00A1E9" />
          </MotionBox>
         <MotionBox
            mx="auto"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon as={FaAmazon} boxSize="60px" color="#FF9900" />
          </MotionBox>

          <MotionBox
            mx="auto"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={perfume}
              alt="Melat Perfume"
              maxH="60px"
              mx="auto"
              borderRadius="full"
              boxShadow="lg"
              transition="transform 0.3s ease-in-out"
            />
          </MotionBox>
        </MotionSimpleGrid>
      </Container>
    </Box>

      <Box bg="blue.600" py={8} color="white">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }} textAlign={{ base: 'center', md: 'left' }}>
            <Text>&copy; 2024 Finance. All rights reserved.</Text>
            <Stack direction="row" spacing={6} mt={{ base: 4, md: 0 }}>
              <Text as="a" href="/privacy" _hover={{ textDecoration: 'underline' }}>
                Privacy Policy
              </Text>
              <Text as="a" href="/terms" _hover={{ textDecoration: 'underline' }}>
                Terms of Service
              </Text>
              <Text as="a" href="/contact" _hover={{ textDecoration: 'underline' }}>
                Contact Us
              </Text>
            </Stack>
          </Flex>
        </Container>
      </Box>

    </Box>
  );
};

export default LandingPage;
