import {Flex, Text} from '@chakra-ui/react'
//comps
import CompletedOrderCard from './CompletedOrderCard';
//api
import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from '../../../api/ordersApi';
//auth
import { useAuthHeader } from "react-auth-kit";

export default function CompletedOrderCardList () {
    
    const authHeader = useAuthHeader()
    const {data:completedorders} = useQuery({
        queryKey: ['completedorders'],
        queryFn: () => getAllOrders({filter:'completed', auth: authHeader()}),
    })
    return(
        <Flex w='30%' direction='column'  align='center' bg='white' rounded='xl' px='1em'>
            <Text mt='1.5em'  mb='0.5em' alignSelf='start'
            fontSize='20px'
            >Completadas (2)</Text>
            {completedorders.length !== 0
                ?
                    <Flex direction='column' minW='90%' >
                        {completedorders?.map((order) => (
                            <CompletedOrderCard key={order.id} order={order} />
                        ))}
                    </Flex>
                :
                    <Text> Todavía no hay órdenes</Text>
                }
        </Flex>
    )
}