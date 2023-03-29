import {Flex, useDisclosure, Heading, Button} from '@chakra-ui/react'
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
                        <StartedOrderCardList/>
                        {/* Section finalizadas */}
                        <CompletedOrderCardList/>
                    </Flex>
                </Flex>

            </Flex> 
            <OrderForm  isOpen={isOpen} onClose={onClose} />
        </>
    )
}
