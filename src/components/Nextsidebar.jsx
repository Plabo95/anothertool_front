import React, {useState, useEffect} from 'react'
import moment from 'moment';
import {Box, Text, Checkbox, Square, Flex, Heading} from '@chakra-ui/react'

function Nextsidebar({datelist}){
    const [nextDates, setNextDates] = useState([])

    useEffect(() => {
        fetchNextDates();
        },[datelist])

    const fetchNextDates = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/nextdates")
        setNextDates(await response.json())
        }

    return(
        <>
        <Box my='5'>
            <Heading size='lg' my='5' >Para hoy: </Heading>
            {nextDates.map(event=>
            <Flex key={event.id}>
                <Box p='3' my='6' width="280px" boxShadow='xl' borderColor="gray.300" rounded="lg" >
                    <Flex my='5 'align='center' justify='space-between' gap={3}>
                    <Square size='18px' bg={event.service.color} rounded="md"/>  
                    <Text fontSize='xl' >{event.client.car} {event.client.name} </Text>
                    <Text fontSize='xl'> {moment(event.start).format("hh:mm")} </Text>
                    </Flex>              
                    <Text fontSize='sm' mt={1}> {event.service.name} </Text>
                </Box>
                <Checkbox colorScheme='gray' ml={4} />
            </Flex>
            )}
        </Box>  
        </>
    )
}
export default Nextsidebar;
