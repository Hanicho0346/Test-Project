import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { FaHome, FaChartBar,  FaBars, FaPlus } from "react-icons/fa";
import AddTransaction from "./AddTransaction";
import Deposite from "./Deposite"; 
interface Transaction {
  id: string;
  amount: number;
  description: string;

}

interface SidebarProps {
  onAddTransaction: (newTransaction: Transaction) => void;
  onDeposit: (balance: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onAddTransaction, onDeposit }) => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const [isDeposite, setIsDeposite] = useState(false); 

  const handleDeposit = (balance: number) => {
    console.log(`Balance: ${balance}`);
    onDeposit(balance); 
  };

  return (
    <>
      <Box
        bg="gray.900"
        color="white"
        w={{ base: "full", md: "250px" }}
        minHeight="100vh"
        p="4"
        display={{ base: "none", md: "block" }}
      >
        <Text fontSize="xl" mb="8">
          Dashboard
        </Text>
        <VStack spacing="4" align="flex-start">
          <Button leftIcon={<FaHome />} variant="ghost" justifyContent="flex-start" w="full">
            Home
          </Button>
          <Button
            leftIcon={<FaChartBar />}
            variant="ghost"
            justifyContent="flex-start"
            w="full"
            onClick={() => setIsDeposite(!isDeposite)} 
          >
           Deposite
          </Button>
          <Button  variant="ghost" 
          justifyContent="flex-start" 
          w="full"
              leftIcon={<FaPlus />} 
              onClick={() => setShowAddTransaction(!showAddTransaction)}>
            Add Transaction
          </Button>
        </VStack>

        <Modal isOpen={showAddTransaction} onClose={() => setShowAddTransaction(false)} >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <AddTransaction onAddTransaction={onAddTransaction} />
            </ModalBody>
          </ModalContent>
        </Modal>
    
        <Modal isOpen={isDeposite} onClose={() => setIsDeposite(false)} >
          <ModalContent>
            <ModalBody>
            <Deposite onDeposit={handleDeposit} />
            </ModalBody>
          </ModalContent>
        </Modal>
      
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Text fontSize="xl">Dashboard</Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing="4" align="flex-start">
              <Button leftIcon={<FaHome />} variant="ghost" justifyContent="flex-start" w="full">
                Home
              </Button>
              <Button
                leftIcon={<FaChartBar />}
                variant="ghost"
                justifyContent="flex-start"
                w="full"
                onClick={() => setIsDeposite(!isDeposite)}
              >
              Deposite
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                w="full" 
                leftIcon={<FaPlus />} 
                onClick={() => setShowAddTransaction(!showAddTransaction)}>
                Add Transaction
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <IconButton
        aria-label="Open Sidebar"
        icon={<FaBars  size={30} />}
        display={{ base: "block", md: "none" }}
        onClick={onOpen}
        position="absolute"
        alignItems="center"
        top="2"
        left="0.5"
  bg="whiteAlpha.900"
  color="gray.600"
  boxShadow="md"
      />
    </>
  );
};

export default Sidebar;
