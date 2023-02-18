import {Flex, Text, Heading, Button} from '@chakra-ui/react'
import {useDisclosure, Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from '@chakra-ui/react'
import moment from 'moment';
//comps
import Navbar from "../../components/navbar/Navbar";
import OrderForm from '../../components/myGarage/forms/OrderForm';
import PendingOrderCardlist from '../../components/orders/pending/PendingOrderCardlist';
import StartedOrderCardList from '../../components/orders/started/StartedOrderCardList';
import CompletedOrderCardList from '../../components/orders/completed/CompletedOrderCardList';

export default function Orders(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Flex w='100%'>
                <Navbar/>
                <Flex p='2em' w='100%' direction='column' bg='lightgrey' >
                    <Flex  ml='3%' my='2vh' align='center' gap='4em' >
                        <Heading as='h1'>{moment().format('ll')} </Heading>
                        <Button variant='primary' onClick={()=>onOpen()} >+ Orden de trabajo</Button>
                    </Flex>

                    <Flex  w='100%' justify='space-evenly' align='top'>
                        {/* Section pending orders */}    
                        <PendingOrderCardlist/>

                        {/* Section en curso */}
                        <Flex w='30%' direction='column'  align='center' bg='white' rounded='xl' px='2em'>
                            <Text mt='1.5em' mb='0.5em' alignSelf='start'>En curso (2)</Text>
                            <StartedOrderCardList/>
                        </Flex>
                        {/* Section en curso */}
                        <Flex w='30%' direction='column'  align='center' bg='white' rounded='xl' px='2em'>
                            <Text mt='1.5em'  mb='0.5em' alignSelf='start'>Completados (14)</Text>
                            <CompletedOrderCardList/>
                        </Flex>
                    </Flex>
                </Flex>

            </Flex>
            <Drawer
            size='lg'
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Crear Orden</DrawerHeader>                
                    <OrderForm  onClose={onClose} />
                </DrawerContent>
            </Drawer>
        </>
    )
}
