import React, {useState, useEffect, useContext} from 'react'
import moment from 'moment';
import {Box, Text, Checkbox, Square, Flex, Heading, useToast} from '@chakra-ui/react'
import AuthContext from '../auth/AuthContext';
import useApi from '../hooks/useApi';
import eventsApi from '../api/eventsApi';
import ScaleFadeExEvent from './Calendar/ScaleFadeExEvent'

function Nextsidebar({nextEvents, setEvents, events, updateEvents, updateNextEvents,}){
    
    const {user, authTokens} = useContext(AuthContext)
    
    const deleteEventApi = useApi(eventsApi.deleteEvent);

    const toast = useToast()

    const handleDelete = async (e) =>{
        console.log('deleting event: ', e)
        const {error} = await deleteEventApi.request(e.id, user, authTokens)
        if(!error){
            toast({
                title: 'Evento borrado',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
            const newEvents = events.filter((item) => item.id !== e.id);
            setEvents(newEvents)
            updateEvents()
            updateNextEvents()
        }   
        else{
            console.log('error es:', error)
            toast({
                title: 'Error al borrar ',
                description: "Código de error"+ error +' intentalo mas tarde' ,
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }    
    }

    return(
        <Box my='5'>
            <Heading size='lg' my='5' minW='150px' >Para hoy </Heading>
            {nextEvents.length === 0
                ?   <Text>¡Aún no tienes ninguna cita asignada para hoy!</Text>
                :   nextEvents.map(e=>
                        <ScaleFadeExEvent key={e.id} handleDelete={handleDelete} e={e} ></ScaleFadeExEvent>
                    )
            }
        </Box>  
    )
}
export default Nextsidebar;
