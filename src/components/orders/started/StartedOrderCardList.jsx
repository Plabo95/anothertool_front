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
    var ordersCount = startedorders?.length

    return(
        <Flex w='30%' direction='column'  align='center' bg='white' rounded='xl' px='1em'>
            <Text mt='1.5em'  mb='0.5em' alignSelf='start'
            fontSize='20px'
            >En curso ({ordersCount})</Text>
            {ordersCount !== 0
                ?
                    <Flex direction='column' minW='90%'
                    sx={{ flexGrow: 2, overflowY: "auto", height: '75vh' }}
                    >
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