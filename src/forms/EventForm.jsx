import React, { useEffect, useState } from 'react'
import {DrawerBody, DrawerFooter, DrawerHeader,DrawerCloseButton, useToast} from '@chakra-ui/react'
import {Button,Input, InputGroup, InputLeftElement, Text, Textarea, Stack, Flex, Square, FormControl, FormHelperText, FormErrorMessage} from '@chakra-ui/react'
import moment from 'moment';
import SvgTime from  '../dist/Time'
import {Select,} from "chakra-react-select";
import PopoverClientForm from './PopoverClientForm'

export default function EventForm({is_creating, onSave, onClose, handleClose, event, events, setEvents, servicelist, clientlist}) {

  const[title, setTitle] = useState()
  const[service, setService] = useState()
  const[client, setClient] = useState()
  const[price, setPrice] = useState()
  const[note, setNote] = useState()

  const[clients, setClients] = useState(clientlist)
  const toast = useToast()
  const[loadingDelete, setLoadingDelete] = useState(false)
  const[loadingCreate, setLoadingCreate] = useState(false)

  useEffect(() => {
    if(event !== undefined){
        setTitle(event.title)
        setService(event.service)
        setClient(event.client)
        setPrice(event.extraprice)
        setNote(event.note)
    }
    else{
    setTitle()
    setClient()
    setPrice()
    setNote()
    }
    }, [event]);

  function closeDrawer(){
    setLoadingDelete(false)
    setLoadingCreate(false)
    onClose()
  }
  const createDate = async (e) => {
    setLoadingCreate(true)
    e.preventDefault()
    const eventToCreate ={
            'start': moment(event.start),
            'end': moment(event.end),
            'client': client,
            'extraprice': price,
            'service': service,
            'note': note,
            'title': title,
    }
    const response = await fetch('https://plabo.pythonanywhere.com/api/createdate',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventToCreate)
        })
    const rstatus = response.status
    if(rstatus >= 200 && rstatus<300){
      toast({
        title: 'Evento guardado',
        status: 'success',
        duration: 6000,
        isClosable: true,
      }) 
    const data = await response.json();
    onSave()  //deleteo previsualizacion
    if(!is_creating){       
    setEvents(events.filter(item => item.id!==event.id))} //deleteo el que he modificado para updatearlo
    setEvents((events) => [...events, data]);
    closeDrawer()
    }
    else{
      toast({
        title: 'Error al guardar ',
        description: "Código de error"+ rstatus +' intentalo mas tarde' ,
        status: 'error',
        duration: 6000,
        isClosable: true,
        })
        closeDrawer()
      }
  }
      
  const deleteDate = async (e) => {
    setLoadingDelete(true)
    e.preventDefault()
    const response = await fetch('https://plabo.pythonanywhere.com/api/deletedate/' + event.id, {method: 'DELETE'})
    const rstatus = response.status
    if(rstatus >= 200 && rstatus<300){
      toast({
        title: 'Evento borrado',
        status: 'success',
        duration: 6000,
        isClosable: true,
      })
      setEvents(events.filter(item => item.id!==event.id));
      closeDrawer()
      }
    else{
      toast({
        title: 'Error al borrar ',
        description: "Código de error"+ rstatus +' intentalo mas tarde' ,
        status: 'error',
        duration: 6000,
        isClosable: true,
        })
        closeDrawer()
      }
    }
    // Event duration calculator
  function duration(){
    const d = moment.duration(moment(event.end).diff(moment(event.start)))
    const formated = (d.get('hours') + 'h ' + d.get('minutes') + 'min')
    return (<p>{formated}</p>)
  }
  function getClientName(id){
    try {
      return(clients.filter(item => item.id===id)[0].name)
    } catch (error) {
      console.log(error)
      return('Except en getclientename')
    }
  }
  function getServiceName(id){
    try {
      return(servicelist.filter(item => item.id===id)[0].name)
    } catch (error) {
      return('Except en getservicename')
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
    <>
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
      <Select onChange={e => setService(e.value)} noOptionsMessage={()=>'No hay servicios'}  maxMenuHeight={120} placeholder={'Servicio'} defaultInputValue={!is_creating? getServiceName(event.service)  : ''} options={services} />
      {!isServiceError ? (
        <FormHelperText>
          Elige un servicio
        </FormHelperText>
      ) : (
        <FormErrorMessage>El servicio es obligatorio</FormErrorMessage>
      )}
      </FormControl> 

      <FormControl isInvalid={isClientError}>
      <Select onChange={e => setClient(e.value)} noOptionsMessage={()=>'No hay clientes'}  maxMenuHeight={120} placeholder={'Cliente'} defaultInputValue={!is_creating? getClientName(client)  : ''} options={m_clients} />
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
        <Flex align='center' justify='start' gap={3}> <SvgTime/>  <Text>{duration()}</Text> </Flex>                 
        <Text> IN  {moment(event.start).format("DD/MM/YYYY, hh:mm")} </Text>
        <Text> OUT {moment(event.end).format("DD/MM/YYYY hh:mm")}</Text>
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
          {!is_creating?
              <>
                <Button variant='ghost' colorScheme='red' size='sm' isLoading={loadingDelete} isDisabled={submitAvailable} loadingText='Borrando' onClick={deleteDate} >Eliminar</Button>
                <Button colorScheme='orange' size='sm' onClick={createDate} isLoading={loadingCreate} loadingText='Guardando'>  Guardar </Button>
              </>: 
              <>
              <Button variant='ghost' colorScheme='red' size='sm'  onClick={handleClose} >Cancel</Button>
              <Button colorScheme='orange' size='sm' onClick={createDate} isLoading={loadingCreate} isDisabled={submitAvailable} loadingText='Guardando'>  Crear </Button>
              </>}
        </Flex> 
        </DrawerFooter>   
      </>
    )
}
