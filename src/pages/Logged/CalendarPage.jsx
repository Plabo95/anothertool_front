import {Flex, Text, Button} from '@chakra-ui/react'
//comps
import Navbar from "../../components/navbar/Navbar";
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
                    <Button variant='primary'>+ Nueva</Button>
                </Flex>

            </Flex>

        </Flex>
    )
}
