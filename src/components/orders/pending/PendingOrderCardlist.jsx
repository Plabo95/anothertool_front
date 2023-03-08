import {Flex, Text} from '@chakra-ui/react'
import { useState } from 'react';
//comps
import PendingOrderCard from './PendingOrderCard';
import OrderListFilter from '../OrderListFilter';
//api
import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from '../../../api/ordersApi';
//auth
import { useAuthHeader } from "react-auth-kit";

export default function PendingOrderCardlist () {
    const [period, setPeriod] = useState('month')
    const authHeader = useAuthHeader()
    const {data:pendingorders} = useQuery({
        queryKey: ['pendingorders',period],
        queryFn: () => getAllOrders({filter:'pending&period='+period, auth: authHeader()}),
    })
    var ordersCount = pendingorders?.length
    return(
        <Flex w='30%' direction='column'  align='center' bg='white' rounded='xl' px='1em'>
            <Flex align='center' justify='space-between'w='100%' mt='1.5em'  mb='1em' >
                <Text alignSelf='start'
                fontSize='20px'
                >Pendientes ({ordersCount})</Text>
                <OrderListFilter period={period} setPeriod={setPeriod} />
            </Flex>

            {ordersCount !== 0
                ?
                    <Flex direction='column' minW='90%' 
                    sx={{ flexGrow: 2, overflowY: "auto", height: '75vh' }}>
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