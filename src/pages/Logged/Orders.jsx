import {Flex, Text, Heading} from '@chakra-ui/react'
//comps
import Navbar from "../../components/navbar/Navbar";
import PendingOrderCardlist from '../../components/orders/pending/PendingOrderCardlist';
import StartedOrderCardList from '../../components/orders/started/StartedOrderCardList';
import CompletedOrderCardList from '../../components/orders/completed/CompletedOrderCardList';

export default function Orders(){

    return (
        <Flex w='100%'>
            <Navbar/>
            <Flex p='2em' w='100%' direction='column'>
                <Heading as='h1' ml='3%' mt='2vh' mb='1vh' >hola</Heading>
                <Flex  w='100%' justify='space-evenly' align='top'>
                    {/* Section pending orders */}
                    <Flex w='30%' direction='column'  align='center' bg='white' rounded='xl' px='2em'>
                        <Text mt='1.5em'  mb='0.5em' alignSelf='start'>Pendientes (2)</Text>
                        <PendingOrderCardlist/>
                    </Flex>
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
    )
}
