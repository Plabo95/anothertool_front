import { Flex, Text, useDisclosure, Button } from "@chakra-ui/react" 
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from '@chakra-ui/react'
//comps
import OrderForm from '../../myGarage/forms/OrderForm'
//icons


export default function PendingOrderCard({order}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
            <Flex w='100%' direction='column' my='0.5em' gap='1em' p='1em' rounded='xl' justify='center' align='center'>
                <Flex w='100%'  justify='space-between'>
                    <Text fontWeight='bold' >
                        {order.car.plate}
                    </Text>
                    <Text>
                        {order.car.client_name}
                    </Text>
                </Flex>
                <Text alignSelf='start'>
                    {order.car.brand} {order.car.model}
                </Text>

                <Flex w='100%' justify='end' align='center'  >
                    <Button variant='primary' size='xs' onClick={() => {onOpen()}} >PRESUPUESTO</Button>
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