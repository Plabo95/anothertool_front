import { Flex, Button } from "@chakra-ui/react"


export default function  OrderListFilter({period, setPeriod}){

    return(
        <Flex>
            <Button variant='filter' isActive={period==='day'}
                onClick={()=>setPeriod('day')}
                >Hoy
            </Button>
            <Button variant='filter' isActive={period==='week'}
            onClick={()=>setPeriod('week')}
                >Semana
            </Button>
            <Button variant='filter' isActive={period==='month'}
                onClick={()=>setPeriod('month')}
                >Mes
            </Button>
        </Flex>
    )
}