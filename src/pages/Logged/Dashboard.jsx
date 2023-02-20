import {Flex, Text, Button} from '@chakra-ui/react'
//comps
import Navbar from "../../components/navbar/Navbar";
import LatestOrderCardList from '../../components/orders/latest/LatestOrderCardList';


export default function Dashboard(){

    return (
        <Flex w='100%'>
            <Navbar/>
            <Flex p='2em' w='100%'>
                {/* Section proximos orders */}
                <LatestOrderCardList/>

            </Flex>

        </Flex>
    )
}
