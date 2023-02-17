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
        <>
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
        </>
    )
}