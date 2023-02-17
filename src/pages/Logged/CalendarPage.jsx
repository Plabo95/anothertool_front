import {Flex, Text} from '@chakra-ui/react'

//comps
import Navbar from "../../components/navbar/Navbar";
import OrderPreview from '../../components/orders/OrderPreview';
//api
import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from '../../api/ordersApi';
//auth
import { useAuthHeader } from "react-auth-kit";

export default function CalendarPage(){

    const authHeader = useAuthHeader()

    const {data:orders, isLoading} = useQuery({
        queryKey: ['orders'],
        queryFn: () => getAllOrders(authHeader()),
    })
    return (
        <Flex w='100%'>
            <Navbar/>
            <Flex p='2em' w='100%'>
                {orders&&
                    <Flex maxW='40%' direction='column'>
                        {orders?.map((order) => (
                            <OrderPreview order={order} />
                        ))}
                    </Flex>
                }
            </Flex>

        </Flex>
    )
}
