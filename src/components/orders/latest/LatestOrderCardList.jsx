import {Flex, Text} from '@chakra-ui/react'
//comps
import LatestOrderCard from './LatestOrderCard';
//api
import { useQuery } from "@tanstack/react-query"
import { getLatestOrders } from '../../../api/ordersApi';
//auth
import { useAuthHeader } from "react-auth-kit";

export default function LatestOrderCardList () {
    
    const authHeader = useAuthHeader()
    const {data:latestorders, isLoading} = useQuery({
        queryKey: ['latestorders'],
        queryFn: () => getLatestOrders({number:'5', auth: authHeader()}),
    })
    return(
        <Flex w='30%' direction='column'  align='center' bg='white' rounded='xl' px='1em'>
            <Text mt='1.5em'  mb='0.5em' alignSelf='start'
            fontSize='20px'
            >Últimas 5 órdenes</Text>
            {latestorders
                ?
                    <Flex direction='column' minW='90%' >
                        {latestorders?.map((order) => (
                            <LatestOrderCard key={order.id} order={order} />
                        ))}
                    </Flex>
                :
                    <Text> Todavía no hay órdenes</Text>
                }
        </Flex>
    )
}