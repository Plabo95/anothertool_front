import { Flex, Text, Button} from "@chakra-ui/react" 
import {useDisclosure } from '@chakra-ui/react'
import moment from "moment"
//comps
import OrderForm from '../../myGarage/forms/OrderForm'
//icons

export default function StartedOrderCard({order}){
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
          <Flex direction='column' w='100%' my='0.5em' boxShadow='2px 2px 2px 1px #F4F4F9'  
            gap='1em' rounded='xl' justify='center' align='center' p='1em' bg='yellow.100'>
                <Flex w='100%' justify='space-between' >
                    {/* Info column */}
                    <Flex direction='column' gap='1em' >
                        <Flex direction='column' gap='0.5em' >
                            <Text fontSize='12px'>Coche </Text>
                            <Text fontWeight='bold'> {order.car.brand} {order.car.model} </Text>
                        </Flex>
                        <Flex direction='column' gap='0.5em' >
                            <Text fontSize='12px'>Fecha de salida</Text>
                            <Flex>
                                <Text fontWeight='bold'> 
                                    {moment(order.date_out).format('Do MMM')} 
                                </Text>
                                <Text > 
                                    ({moment(order.date_out).fromNow()})
                                </Text>
                            </Flex>
                            <Flex direction='column' gap='0.5em' >
                                <Text fontSize='12px'>Tiempo de servicio </Text>
                                <Text fontWeight='bold'> 2días 4horas </Text>
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
                </Flex>
            </Flex>  
            <OrderForm  isOpen={isOpen} order={order} onClose={onClose} />
        </>
    )
}