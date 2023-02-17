import { Flex, Text, useDisclosure } from "@chakra-ui/react" 
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from '@chakra-ui/react'
//comps
import OrderStatusView from "./OrderStatusView"
import OrderForm from '../myGarage/forms/OrderForm'
//icons
import {AiOutlineEye} from 'react-icons/ai'

export default function OrderCard({order}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
            <Flex direction='column' gap='1em' p='1em' bg='purple.200' rounded='xl' justify='center' align='center'>
                <Flex >
                    <Text mr='0.2em'>
                        {order.car.brand}
                    </Text>
                    <Text mr='2em'>
                        {order.car.model}
                    </Text>
                    <Text>
                        {order.car.plate}
                    </Text>
                </Flex>
                <Flex w='100%' justify='start'>
                    <Text mr='0.2em'>
                        {order.car.client_name}
                    </Text>
                </Flex>
                <Flex w='100%' justify='space-between' align='center'>
                    <AiOutlineEye size='25px' color='white' onClick={() => {onOpen()}} />
                    <OrderStatusView status={order.status} />
                </Flex>
            </Flex>
            <Drawer
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