import { Badge } from '@chakra-ui/react'

export default function InvoiceStatusBadge({status}){
    var color =''
    if (status === 'Pendiente'){
        color='orange'
    }
    if (status === 'Pagada'){
        color='green'
    }
    if (status === 'Caducada'){
        color='red'
    }
    return(
        <Badge colorScheme={color} variant='solid' p='0.4em' rounde='xl'>
            {status}
        </Badge>
    )
}