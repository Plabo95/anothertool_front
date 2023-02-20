import {Flex, Text} from '@chakra-ui/react'
//comps
import PendingOrderCard from './PendingOrderCard';
//api
import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from '../../../api/ordersApi';
//auth
import { useAuthHeader } from "react-auth-kit";

export default function PendingOrderCardlist () {
    
    const authHeader = useAuthHeader()
    const {data:pendingorders} = useQuery({
        queryKey: ['pendingorders'],
        queryFn: () => getAllOrders({filter:'pending', auth: authHeader()}),
    })

    return(
        <Flex w='30%' direction='column'  align='center' bg='white' rounded='xl' px='1em'>
            <Text mt='1.5em'  mb='0.5em' alignSelf='start'
            fontSize='20px'
            >Pendientes (2)</Text>
            {pendingorders?.length !== 0
                ?
                    <Flex direction='column' minW='85%' >
                        {pendingorders?.map((order) => (
                            <PendingOrderCard key={order.id} order={order} />
                        ))}
                    </Flex>
                :
                    <Text> Todavía no hay órdenes</Text>
                }
        </Flex>
    )
}