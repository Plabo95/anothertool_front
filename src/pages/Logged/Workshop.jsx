import {Flex, Text, Heading} from '@chakra-ui/react'
//comps
import Navbar from "../../components/navbar/Navbar";
//api
import { useQuery } from '@tanstack/react-query';
import { getWorkshop } from '../../api/workshopApi';
//auth
import { useAuthHeader } from 'react-auth-kit';

export default function Workshop(){

    const authHeader = useAuthHeader()

    const {data, isLoading} = useQuery({
        queryKey: ['workshop'],
        queryFn: () => getWorkshop(authHeader()),
    })
    return (
        <Flex w='100%'  bg='lightgrey'>
            <Navbar/>
            <Flex p='2em' w='100%' justify='space-evenly'>
                {data && 
                <Flex direction='column' gap='0.5em'>
                    <Heading as='h1' mb='0.5em'> {data[0]?.name} </Heading>
                    <Text>{data[0]?.email}</Text>
                    <Text>{data[0]?.phone}</Text>
                    <Text>{data[0]?.address}</Text>                      
                </Flex>
                }
                <Flex direction='column' gap='0.5em'>
                    <Heading as='h2' mb='0.5em'> Trabajadores</Heading>
                    <Text>Ramiro Fernandez</Text>
                    <Text>Pinaculo de marchilo</Text>                    
                </Flex>
            </Flex>
        </Flex>
    )
}