import {Flex, Text} from '@chakra-ui/react'
import { useState } from 'react';
//comps
import StartedOrderCard from './StartedOrderCard';
import OrderListFilter from '../OrderListFilter';
//api
import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from '../../../api/ordersApi';
//auth
import { useAuthHeader } from "react-auth-kit";

export default function PendingOrderCardList () {
    const [period, setPeriod] = useState('month')
    const authHeader = useAuthHeader()
    const {data:startedorders} = useQuery({
        queryKey: ['startedorders',period],
        queryFn: () => getAllOrders({filter:'started&period='+period, auth: authHeader()}),
    })
    var ordersCount = startedorders?.length

    return(
        <Flex w='30%' direction='column'  align='center' bg='white' rounded='xl' px='1em'>
            <Text mt='1.5em'  mb='0.5em' alignSelf='start'
            fontSize='20px'
            >En curso ({ordersCount})</Text>
            <OrderListFilter period={period} setPeriod={setPeriod} />
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