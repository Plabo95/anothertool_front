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
    console.log(completedorders)
    return(
        <>
        {completedorders
            ?
                <Flex direction='column'>
                    {completedorders?.map((order) => (
                        <CompletedOrderCard key={order.id} order={order} />
                    ))}
                </Flex>
            :
                <Text> Todavía no hay órdenes</Text>
            }
        </>
    )
}