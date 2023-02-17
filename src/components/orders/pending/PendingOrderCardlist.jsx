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
        <>
        {pendingorders
            ?
                <Flex direction='column'minW='90%' >
                    {pendingorders?.map((order) => (
                        <PendingOrderCard key={order.id} order={order} />
                    ))}
                </Flex>
            :
                <Text> Todavía no hay órdenes</Text>
            }
        </>
    )
}