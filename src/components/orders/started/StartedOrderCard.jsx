import { Flex, Text, Button} from "@chakra-ui/react" 
import {useDisclosure} from '@chakra-ui/react'
import moment from "moment"
//comps
import OrderForm from '../../myGarage/forms/OrderForm'
//icons
//auth
import {useAuthHeader} from 'react-auth-kit'
//api
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateOrder } from "../../../api/ordersApi"

export default function StartedOrderCard({order}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()

    const {isLoading, mutate, error} = useMutation(
        ["updateorder"],
        createUpdateOrder,
        {
        onSuccess: () => {
            QueryClient.invalidateQueries(["pendingorders"]);
            QueryClient.refetchQueries("pendingorders", {force:true})
            QueryClient.invalidateQueries(["startedorders"]);
            QueryClient.refetchQueries("startedorders", {force:true})
            onClose()
        },
        onError : (error)=>{
            console.log(error)
        }
        }
    );
    const setCompleted = () => {
        const payload = {
            data: {
                status: 'completed',
                date_out:moment().format()
            },
            slug: order.id,
            token: authHeader()
        }
        mutate(payload)
    }
    return(
        <>
          <Flex direction='column' w='100%' my='0.5em' boxShadow='2px 2px 2px 1px #F4F4F9'  
            gap='1em' rounded='xl' justify='center' align='center' p='1em' bg='purple.100'>
                <Flex w='100%' justify='space-between' >
                    {/* Info column */}
                    <Flex direction='column' gap='1em' >
                        <Flex direction='column' gap='0.5em' >
                            <Text fontSize='12px'>Coche </Text>
                            <Text fontWeight='bold'> {order.car.brand} {order.car.model} </Text>
                        </Flex>
                        <Flex direction='column' gap='0.5em' >
                            <Text fontSize='12px'>Fecha de entrada</Text>
                            <Flex>
                                <Text fontWeight='bold'> 
                                    {moment(order.date_in).format('Do MMM')} 
                                </Text>
                                <Text > 
                                    ({moment(order.date_in).fromNow()})
                                </Text>
                            </Flex>

                        </Flex>
                    </Flex>
                    <Flex direction='column' gap='1em' >
                        <Flex direction='column' gap='0.5em' >
                            <Text fontSize='12px'> Matrícla </Text>
                            <Text fontWeight='bold'> {order.car.plate} </Text>
                        </Flex>
                    </Flex>
                </Flex>
                {/* Action section */}
                <Flex w='100%' justify='end' gap='0.5em' mt='0.5em'>
                    <Button variant='primary' size='xs' onClick={() => {onOpen()}} >Ver</Button>
                    <Button variant='primary' size='xs' onClick={() => {onOpen()}} >Factura</Button>
                    <Button colorScheme='green' size='xs' onClick={() => {setCompleted()}}>Finalizar</Button>
                </Flex>
            </Flex>  
            <OrderForm isOpen={isOpen} order={order} onClose={onClose} />
        </>
    )
}