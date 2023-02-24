import {Flex, Text} from '@chakra-ui/react'
//comps
import Navbar from "../../components/navbar/Navbar";

export default function Workshop(){

    return (
        <Flex w='100%'  bg='lightgrey'>
            <Navbar/>
            <Flex p='2em' w='100%' gap='2em'>
                <Text>mi taller</Text>
            </Flex>

        </Flex>
    )
}