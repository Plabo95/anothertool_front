import { Badge } from '@chakra-ui/react'

export default function OrderStatusView({status}){

    var color =''
    if (status === 'pending'){
        color='orange'
    }
    if (status === 'finished'){
        color='green'
    }

    return(
        <Badge colorScheme={color} >
            {status}
        </Badge>
    )
}