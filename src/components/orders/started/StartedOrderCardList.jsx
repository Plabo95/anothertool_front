import {Flex, Text} from '@chakra-ui/react'
import { useState } from 'react';
//comps
import StartedOrderCard from './StartedOrderCard';
import OrderListFilter from '../OrderListFilter';
//api
import useAuthQuery from '../../../myHooks/useAuthQuery';
import { getAllOrders } from '../../../api/ordersApi';
//auth
import { useAuthHeader } from "react-auth-kit";

export default function PendingOrderCardList () {
    const [period, setPeriod] = useState('month')
    const authHeader = useAuthHeader()
    const {data:startedorders} = useAuthQuery({
        queryKey: ['startedorders',period],
        queryFn: () => getAllOrders({filter:'started&period='+period, auth: authHeader()}),
    })
    var ordersCount = startedorders?.length

    return(
        <Flex w='30%' direction='column'  align='center' bg='white' rounded='xl' px='1em'>
            <Flex align='center' justify='space-between'w='100%' mt='1.5em'  mb='1em' >
                <Text alignSelf='start'
                fontSize='20px'
                >En curso ({ordersCount})</Text>
                <OrderListFilter period={period} setPeriod={setPeriod} />
            </Flex>
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