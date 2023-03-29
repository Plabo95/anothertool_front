import { Badge } from '@chakra-ui/react'

export default function OrderStatusView({status}){

    var color =''
    if (status === 'pending'){
        color='orange'
    }
    if (status === 'completed'){
        color='green'
    }
    if (status === 'started'){
        color='yellow'
    }
    return(
        <Badge colorScheme={color} variant='solid' p='0.4em' rounde='xl'>
            {status}
        </Badge>
    )
}