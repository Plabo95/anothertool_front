import { Flex, Text, Button} from "@chakra-ui/react" 
import {useDisclosure } from '@chakra-ui/react'
import moment from "moment"
//comps
import OrderForm from '../../myGarage/forms/OrderForm'
import OrderStatusView from "../OrderStatusView"
//icons

export default function LatestOrderCard({order}){
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
          <Flex direction='column' w='100%' my='0.5em' boxShadow='2px 2px 2px 1px #F4F4F9'  
            gap='1em' rounded='xl' justify='center' align='center' p='1em' bg='whiteAlpha'>
                <Flex w='100%' justify='space-between' >
                    {/* Info column */}
                    <Flex direction='column' gap='0.5em' >
                        <Text fontSize='12px'>Coche </Text>
                        <Text fontWeight='bold'> {order.car.brand} {order.car.model} </Text>
                    </Flex>
                    <Flex direction='column' gap='1em' >
                        <Flex direction='column' gap='0.5em' >
                            <Text fontSize='12px'> Matrícla </Text>
                            <Text fontWeight='bold'> {order.car.plate} </Text>
                        </Flex>
                    </Flex>
                </Flex>
                {/* Action section */}
                <Flex w='100%' justify='end' gap='0.5em' mt='0.5em' align='center'>
                    <OrderStatusView status={order.status} />
                    <Button variant='primary' size='xs' onClick={() => {onOpen()}} >Ver</Button>
                </Flex>
            </Flex>  
            <OrderForm  isOpen={isOpen} order={order} onClose={onClose} />
        </>
    )
}