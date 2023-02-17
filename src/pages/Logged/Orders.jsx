import {Flex, Text} from '@chakra-ui/react'
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

                <Flex  gap='1em' justify='space-evenly' align='center'>
                    {/* Section pending orders */}
                    <Flex maxW='40%' direction='column'  align='center' bg='white' rounded='xl' px='2em'>
                        <Text mt='1.5em'  mb='0.5em' alignSelf='start'>Pendientes (2)</Text>
                        <PendingOrderCardlist/>
                    </Flex>
                    {/* Section en curso */}
                    <Flex maxW='40%' direction='column'  align='center' bg='white' rounded='xl' px='2em'>
                        <Text mt='1.5em' mb='0.5em' alignSelf='start'>En curso (2)</Text>
                        <StartedOrderCardList/>
                    </Flex>
                    {/* Section en curso */}
                    <Flex maxW='40%' direction='column'  align='center' bg='white' rounded='xl' px='2em'>
                        <Text mt='1.5em'  mb='0.5em' alignSelf='start'>Completados (14)</Text>
                        <CompletedOrderCardList/>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}
