import {Flex, Text, Button, useDisclosure} from '@chakra-ui/react'
//comps
import LatestOrderCard from './LatestOrderCard';
import OrderForm from '../../myGarage/forms/OrderForm';
//api
import { useQuery } from "@tanstack/react-query"
import { getLatestOrders } from '../../../api/ordersApi';
//auth
import { useAuthHeader } from "react-auth-kit";

export default function LatestOrderCardList () {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const authHeader = useAuthHeader()
    const {data:latestorders, isLoading} = useQuery({
        queryKey: ['latestorders'],
        queryFn: () => getLatestOrders({number:'5', auth: authHeader()}),
    })
    return(
        <Flex w='30%' direction='column'  align='center' bg='white' rounded='xl' px='1em'>         
            <Flex justify='space-between' align='center'>
                <Text mt='1.5em'  mb='0.5em' alignSelf='start'
                fontSize='20px'
                >Últimas 5 órdenes</Text>
                <Button variant='primary' onClick={()=>onOpen()} >+ Nueva</Button>
            </Flex>
            {latestorders?.length !== 0
                ?
                    <Flex direction='column' minW='90%' >
                        {latestorders?.map((order) => (
                            <LatestOrderCard key={order.id} order={order} />
                        ))}
                    </Flex>
                :
                    <Text color='black'> Todavía no hay órdenes</Text>
                }
            <OrderForm  isOpen={isOpen} onClose={onClose} />
        </Flex>
    )
}