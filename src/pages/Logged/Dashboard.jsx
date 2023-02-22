import {Flex, Text} from '@chakra-ui/react'
//comps
import Navbar from "../../components/navbar/Navbar";
import LatestOrderCardList from '../../components/orders/latest/LatestOrderCardList';
import OrdersChart from '../../components/dashboard/OrdersChart';

export default function Dashboard(){

    return (
        <Flex w='100%'  bg='lightgrey'>
            <Navbar/>
            <Flex p='2em' w='100%' gap='2em'>
                {/* Section proximos orders */}
                <LatestOrderCardList/>
                <Flex w='60%' maxH='50vh' bg='white' rounded='xl' px='0.5em' py='2em' direction='column' gap='1em' align='center'>
                    <Text>Ordenes por día (este mes)</Text>
                    <OrdersChart/>
                </Flex>    
            </Flex>

        </Flex>
    )
}
