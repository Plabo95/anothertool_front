import { Flex, Button } from "@chakra-ui/react"


export default function  OrderListFilter({period, setPeriod}){

    return(
        <Flex>
            <Button size='sm' variant='primary' 
            onClick={()=>setPeriod('day')}
            >Hoy</Button>
            <Button size='sm' variant='primary' 
            onClick={()=>setPeriod('week')}
            >Semana</Button>
            <Button size='sm' variant='primary' 
            onClick={()=>setPeriod('month')}
            >mes</Button>
        </Flex>
    )
}