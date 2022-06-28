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
    const updateEventApi = useApi(eventsApi.updateEvent);

    const [nextEventsToDo, setNextEventsToDo] = useState()
    const [nextEventsDone, setNextEventsDone] = useState()

    const toast = useToast()

    const iniNextEvents = () => {
        const toDo = nextEvents.filter(e => !e.done)
        setNextEventsToDo(toDo)
        const done = nextEvents.filter(e => e.done)
        setNextEventsDone(done)
    }

    const handleUpdate = async (e) =>{
        console.log('preUpdate event: ', e)
        const eventToUpdate = {
            'start': moment(e.start),
            'end': moment(e.end),
            'client': e.client.id,
            'extraprice': e.extraprice,
            'service': e.service.id,
            'note': e.note,
            'title': e.title,
            'user': e.user,
            'done': !e.done
        }
        console.log('event to update: ', eventToUpdate)
        const {error} = await updateEventApi.request(e.id, eventToUpdate, user, authTokens)
        if(!error){
            toast({
                title: 'Cita Finalizado',
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
                title: 'Error al finalizar cita',
                description: "Código de error"+ error +' intentalo mas tarde' ,
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }    
    }

    useEffect(() => {
        iniNextEvents()
    },[nextEventsToDo,nextEventsDone])

    return(
        <Box my='5'>
            <Heading size='lg' my='5' minW='150px' >Para hoy </Heading>
            {nextEvents.length === 0 &&
                <Text>¡Aún no tienes ninguna cita asignada para hoy!</Text>
            }
            {nextEventsToDo !== undefined &&
               nextEventsToDo?.map(e=>
                    <ScaleFadeExEvent key={e.id} handleUpdate={handleUpdate} handleToDoDone={iniNextEvents} e={e}></ScaleFadeExEvent>
                )
            }
            {nextEventsDone !== undefined &&
               nextEventsDone?.map(e=>
                    <ScaleFadeExEvent key={e.id} handleUpdate={handleUpdate} handleToDoDone={iniNextEvents} e={e}></ScaleFadeExEvent>
                )
            }
        </Box>  
    )
}
export default Nextsidebar;
