import { Flex, Text } from "@chakra-ui/react" 
//comps
import OrderStatusView from "./OrderStatusView"

export default function OrderPreview({order}){

    return(
        <Flex direction='column' gap='1em' p='1em' border='1px solid black' rounded='xl' justify='center' align='center'>
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
            <Flex w='100%' justify='end'>
                <OrderStatusView status={order.status} />
            </Flex>
        </Flex>
    )
}