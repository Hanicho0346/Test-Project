import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Box, Button, Avatar, Text, Flex } from '@chakra-ui/react';

const Navbar: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(localStorage.getItem('profileImage'));
  const [userName, setUserName] = useState<string>('User'); 
  const fileInputRef = useRef<HTMLInputElement>(null);
 const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedProfileImage = localStorage.getItem('profileImage');
  
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);  
        setUserName(user.firstName || 'User'); 
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        localStorage.setItem('profileImage', imageData);
        setProfileImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem("authToken");
    localStorage.removeItem('transactions');
    localStorage.removeItem('balance');
    localStorage.removeItem('totalWithdrawan')
    localStorage.removeItem('profileImage');
    localStorage.removeItem('recentTransactions')
    setIsAuthenticated(false);
    window.location.href = '/Landingpage'; 
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  return (
    <Box 
      as="nav" 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      p={4} 
      marginTop={0}
      marginBottom={30}
      bg="white" 
      boxShadow="md"
    >
       <Text fontSize="lg" fontWeight="bold" w={{ base: 'none', md: 'block' }}>
        Hello {userName}
      </Text>

      <Flex alignItems="center" gap={4}>
        <Box onClick={handleIconClick} cursor="pointer">
          {profileImage ? (
            <Avatar size="sm" src={profileImage} />
          ) : (
            <FaUserCircle className="text-3xl text-gray-600" />
          )}
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="bold">{userName}</Text>
          <Text fontSize="xs" color="gray.500">User</Text>
        </Box>

        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleImageChange} 
        />

        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
