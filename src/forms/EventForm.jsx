import React, { useEffect, useState, useContext, useRef } from 'react'
import {DrawerBody, DrawerFooter, DrawerHeader,DrawerCloseButton, useToast, InputLeftAddon} from '@chakra-ui/react'
import {Button,Box,Input, InputGroup, InputLeftElement, Text, Textarea, Stack, Flex, Square, FormControl, FormHelperText, FormErrorMessage} from '@chakra-ui/react'
import moment from 'moment';
import SvgTime from  '../dist/Time'
import {Select,} from "chakra-react-select";
import PopoverClientForm from './PopoverClientForm'
import eventsApi from '../api/eventsApi';
import AuthContext from '../auth/AuthContext';
import useApi from '../hooks/useApi';
import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/darkblue.css";
import "../assets/flatpickrThemes/darkblue.css";

export default function EventForm({is_creating, updateEvents, updateNextEvents, onClose, handleClose, event, events, setEvents, servicelist, clientlist}) {

  const {user, authTokens} = useContext(AuthContext)

  const[title, setTitle] = useState()
  const[service, setService] = useState()
  const[client, setClient] = useState()
  const[price, setPrice] = useState()
  const[note, setNote] = useState()
  const[duration, setDuration] = useState()
  const[dateFormatedEnd, setDateFormatedEnd] = useState('')
  const[dateFormatedStart, setDateFormatedStart] = useState('')

  const[clients, setClients] = useState(clientlist)
  const toast = useToast()
  const[loadingDelete, setLoadingDelete] = useState(false)
  const[loadingCreate, setLoadingCreate] = useState(false)

  const createEventApi = useApi(eventsApi.createEvent);
  const updateEventApi = useApi(eventsApi.updateEvent);
  const deleteEventApi = useApi(eventsApi.deleteEvent);

  useEffect(() => {
    console.log(event)
    if(event !== undefined){
        setTitle(event.title)
        setService(event.service)
        setClient(event.client)
        setPrice(event.extraprice)
        setNote(event.note)
        getDuration()
        formatDateStart()
        formatDateEnd()
    }
    else{
    setTitle()
    setClient()
    setPrice()
    setNote()
    }
    console.log('event Form',event)
  }, [event]);

  function closeDrawer(){
    setLoadingDelete(false)
    setLoadingCreate(false)
    onClose()
  }
  
  const handleSubmit = async (e) => {    
    setLoadingCreate(true)
    e.preventDefault()
    console.log('handl',event)
    const eventToCreate = {
      'start': moment(event.start),
      'end': moment(event.end),
      'client': client,
      'extraprice': price,
      'service': service,
      'note': note,
      'title': title,
      'user': user.user_id,
    }
    let error
    event.id === undefined
      ?   {error} = await createEventApi.request(eventToCreate, authTokens)
      :   {error} = await updateEventApi.request(event.id, eventToCreate, user, authTokens)
    
    if(error){
      toast({
        title: 'Error al guardar ',
        description: "Código de error"+ error +' intentalo mas tarde' ,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    }
    else{
      updateEvents()
      updateNextEvents()
      toast({
        title: 'Evento guardado',
        status: 'success',
        duration: 6000,
        isClosable: true,
      }) 
    }
    closeDrawer()
  }
  
  const handleDelete = async () =>{
    setLoadingDelete(true)
    const {error} = await deleteEventApi.request(event.id, user, authTokens)
    if(!error){
        toast({
            title: 'Evento borrado',
            status: 'success',
            duration: 6000,
            isClosable: true,
        })
        const newEvents = events.filter((item) => item.id !== event.id);
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
    closeDrawer()    
  }
    // Event duration calculator
  function getDuration(){
    const d = moment.duration(moment(event.end).diff(moment(event.start)))
    const formated = (d.get('hours') + 'h ' + d.get('minutes') + 'min')
    console.log('****::',d,formated,d.isValid())
    d.isValid()
      ? setDuration(formated)
      : setDuration('0h 0min')
  }
  function getClientName(id){
    try {
      return(clients.filter(item => item.id===id)[0]?.name)
    } catch (error) {
      console.log(error)
      return('Except en getclientename')
    }
  }
  function getServiceName(id){
    try {
      return(servicelist.filter(item => item.id===id)[0]?.name)
    } catch (error) {
      return('Except en getservicename')
    } 
  }

  const formatDateStart = () => {
    if(event.start !== '' && event.start !== undefined && event.start !== null){
      const date = new Date(event.start)
      const tzoffset = (new Date()).getTimezoneOffset() * 60000;
      const date2 = (new Date(date.getTime() - tzoffset)).toISOString().substring(0, 16)
      console.log('date-time',event.start,date,date2)
      setDateFormatedStart(date2)
    }
  }

  const formatDateEnd = () => {
    if(event.end !== '' && event.end !== undefined && event.end !== null){
      const date = new Date(event.end)
      const tzoffset = (new Date()).getTimezoneOffset() * 60000;
      const date2 = (new Date(date.getTime() - tzoffset)).toISOString().substring(0, 16)
      console.log('date-time',event.end,date,date2)
      setDateFormatedEnd(date2)
    }
  }

  //mapeo de clientes para que los lea el select list
  const m_clients = clients.map((client)=>{
    return {
      value: client.id,
      label: client.name,
    }
  })
  const services = servicelist.map((service)=>{
    return {
      value: service.id,
      label: <Flex align='center' gap={3} ><Square size='18px' bg={service.color} rounded="md"/> {service.name}</Flex> ,
    }
  })

  const isServiceError = service === undefined
  const isClientError = client === undefined
  const submitAvailable = isServiceError && isClientError
  return (
    <Box>
    <DrawerHeader> 
      <Flex px='3' justify='space-between' >
      <Text>{is_creating? 'Nueva Cita': 'Editar Cita'} </Text> 
      <DrawerCloseButton></DrawerCloseButton>
      </Flex>
    </DrawerHeader>
    <DrawerBody>
      <Stack spacing={4} w="100%" >   
      <Input  variant='flushed' onChange={e => setTitle(e.target.value)} placeholder={!is_creating? event.title  : 'Añadir título'}/> 

      <FormControl isInvalid={isServiceError}>      
      <Select onChange={e => setService(e.value)} noOptionsMessage={()=>'No hay servicios'}  maxMenuHeight={120} placeholder={!is_creating? event.service_name  : 'Servicio'}  options={services} />
      {!isServiceError ? (
        <FormHelperText>
          Elige un servicio
        </FormHelperText>
      ) : (
        <FormErrorMessage>El servicio es obligatorio</FormErrorMessage>
      )}
      </FormControl> 

      <FormControl isInvalid={isClientError}>
      <Select onChange={e => setClient(e.value)} noOptionsMessage={()=>'No hay clientes'}  maxMenuHeight={120} placeholder={!is_creating? event.client_name  : 'Cliente'} options={m_clients} />
      {!isClientError ? (
        <FormHelperText>
          Elige un cliente o crea uno rápido
        </FormHelperText>
      ) : (
        <FormErrorMessage>El cliente es obligatorio</FormErrorMessage>
      )}
      </FormControl> 
       
       
        {is_creating === true && 
          <PopoverClientForm setClients={setClients} setClient={setClient} />}    
        </Stack> 
        {event &&  
        <Flex direction='column' gap='2' my='6' >
        <Flex align='center' justify='start' gap={3}> <SvgTime/>  <Text>{duration}</Text> </Flex>
        <InputGroup>
          <InputLeftAddon children='IN:' />
          <Input type='datetime-local' value={dateFormatedStart}
              onChange={(newDate) => {
                const date = new Date(newDate.target.value)
                event.start = date
                setDateFormatedStart(newDate.target.value)
                getDuration()
              }}/> 
        </InputGroup>              
        <InputGroup>
          <InputLeftAddon children='OUT:' />
          <Input type='datetime-local' value={dateFormatedEnd}
              onChange={(newDate) => {
                const date = new Date(newDate.target.value)
                event.end = date
                setDateFormatedEnd(newDate.target.value)
                getDuration()
              }}/> 
        </InputGroup>              
        </Flex>  } 

        <Stack spacing={4}>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            color='gray.300'
            fontSize='1.2em'
            children='€'
          />
          <Input onChange={e => setPrice(e.target.value)} placeholder={!is_creating? event.extraprice: 'Precio extra?'} />
        </InputGroup>
        <Textarea height='140px' bg='gray.300' onChange={e => setNote(e.target.value)} variant='filled' placeholder={!is_creating? event.note: 'Notas'} /> 
        </Stack>
    </DrawerBody>
      <DrawerFooter>
        <Flex  justify="right" columnGap="3" my='3'>             
          {!is_creating
            ? <Button variant='danger-ghost' size='sm' isLoading={loadingDelete} isDisabled={submitAvailable} loadingText='Borrando' onClick={handleDelete} >Eliminar</Button>
            : <Button variant='danger-ghost' size='sm'  onClick={handleClose} >Cancelar</Button>
          }
            <Button variant='primary' size='sm' onClick={handleSubmit} isLoading={loadingCreate} isDisabled={submitAvailable} loadingText='Guardando'>  Crear </Button>
        </Flex> 
        </DrawerFooter>   
      </Box>
    )
}
