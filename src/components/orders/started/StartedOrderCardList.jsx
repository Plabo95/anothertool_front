import {Flex, Text} from '@chakra-ui/react'
//comps
import StartedOrderCard from './StartedOrderCard';
//api
import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from '../../../api/ordersApi';
//auth
import { useAuthHeader } from "react-auth-kit";

export default function PendingOrderCardList () {
    
    const authHeader = useAuthHeader()
    const {data:startedorders} = useQuery({
        queryKey: ['startedorders'],
        queryFn: () => getAllOrders({filter:'started', auth: authHeader()}),
    })

    return(
        <Flex w='30%' direction='column'  align='center' bg='white' rounded='xl' px='1em'>
            <Text mt='1.5em'  mb='0.5em' alignSelf='start'
            fontSize='20px'
            >En curso (2)</Text>
            {startedorders
                ?
                    <Flex direction='column' >
                        {startedorders?.map((order) => (
                            <StartedOrderCard key={order.id} order={order} />
                        ))}
                    </Flex>
                :
                    <Text> Todavía no hay órdenes</Text>
                }
        </Flex>
    )
}