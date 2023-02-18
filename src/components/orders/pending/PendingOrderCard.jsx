import { Flex, Text,Button } from "@chakra-ui/react" 
import {useDisclosure, Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from '@chakra-ui/react'
import moment from "moment"
//comps
import OrderForm from '../../myGarage/forms/OrderForm'
//icons
//auth
import {useAuthHeader} from 'react-auth-kit'
//api
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateOrder } from "../../../api/ordersApi"

export default function PendingOrderCard({order}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()

    const {isLoading, mutate, error} = useMutation(
        ["updateorder"],
        createUpdateOrder,
        {
        onSuccess: () => {
            QueryClient.invalidateQueries(["started"]);
            QueryClient.refetchQueries("started", {force:true})
            QueryClient.invalidateQueries(["completed"]);
            QueryClient.refetchQueries("completed", {force:true})
            onClose()
        },
        onError : (error)=>{
            console.log(error)
        }
        }
    );
    const setStarted = () => {
        const payload = {
            data: {
                status: 'started',
                date_in:moment().format()
            },
            slug: order.id,
            token: authHeader()
        }
        mutate(payload)
    }

    return(
        <>
            <Flex direction='column' w='100%' my='0.5em' boxShadow='2px 2px 2px 1px #F4F4F9'  
            gap='1em' rounded='xl' justify='center' align='center' p='1em'>
                <Flex w='100%' justify='space-between' >
                    {/* Info column */}
                    <Flex direction='column' gap='1em' >
                        <Flex direction='column' gap='0.5em' >
                            <Text fontSize='12px'> Cliente </Text>
                            <Text fontWeight='bold'> {order.car.client_name} </Text>
                        </Flex>
                        <Flex direction='column' gap='0.5em' >
                            <Text fontSize='12px'>Coche </Text>
                            <Text fontWeight='bold'> {order.car.brand} {order.car.model} </Text>
                        </Flex>
                        <Flex direction='column' gap='0.5em' >
                            <Text fontSize='12px'>Creada</Text>
                            <Text fontWeight='bold'> {moment(order.created_at).format('h:mm Do MMM')} </Text>
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
                    <Button variant='primary' size='xs' onClick={() => {onOpen()}} >VER</Button>
                    <Button variant='primary' size='xs' onClick={() => {onOpen()}} >PRESUPUESTO</Button>
                    <Button colorScheme='green' size='xs' onClick={() => setStarted()} >EMPEZAR</Button>
                </Flex>
            </Flex>
            <Drawer
            size='lg'
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{order?'Editar':'Crear'} Orden</DrawerHeader>                
                    <OrderForm order={order} onClose={onClose} />
                </DrawerContent>
            </Drawer>
        </>
    )
}