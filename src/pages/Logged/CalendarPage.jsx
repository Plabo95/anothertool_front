import {Flex, Text} from '@chakra-ui/react'

//comps
import Navbar from "../../components/navbar/Navbar";
import OrderCard from '../../components/orders/OrderCard';
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
                {/* Section proximos orders */}
                <Flex maxW='40%' direction='column'  align='center' bg='white' rounded='xl' px='2em'>
                    <Text fontSize='22px' fontWeight='bold' mt='2em' mb='1em' alignSelf='start' >Órdenes de trabajo</Text>
                    {orders&&
                        <Flex direction='column'>
                            {orders?.map((order) => (
                                <OrderCard order={order} />
                            ))}
                        </Flex>
                    }
                </Flex>

            </Flex>

        </Flex>
    )
}
