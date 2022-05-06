import React, { useEffect, useState } from 'react'
import {DrawerBody, DrawerFooter, DrawerHeader,DrawerCloseButton, useToast} from '@chakra-ui/react'
import {Button,Input, InputGroup, InputLeftElement, Text, Textarea, Stack, Flex, Square} from '@chakra-ui/react'
import {FormControl} from '@chakra-ui/react'
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
    if(is_creating === false){
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

  const onChangePrice = (e) => {
      setPrice(e.target.value)
    };
  const onChangeNote = (e) => {
      setNote(e.target.value)
    };
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
  const updateDate = async (e) => {
    setLoadingCreate(true)
    e.preventDefault()
      const eventToUpdate ={
        'start': event.start,
        'end': event.end,
        'client': client,
        'extraprice': price,
        'service': service,
        'note': note,
        'title': title,
      }
    const response = await fetch('https://plabo.pythonanywhere.com/api/updatedate/'+event.id+'/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventToUpdate)
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
          setEvents(events.filter(item => item.id!==event.id)); //deleteo el que he modificado para updatearlo
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
console.log(client)
    // Event duration calculator
  function duration(){
    const d = moment.duration(moment(event.end).diff(moment(event.start)))
    const formated = (d.get('hours') + 'h ' + d.get('minutes') + 'min')
    return (<p>{formated}</p>)
  }
  function getClientName(id){
    return(clientlist.filter(item => item.id!==id)[0].name)
  }
  function getServiceName(id){
    return(servicelist.filter(item => item.id!==id)[0].name)
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

  return (
    <>
    <DrawerHeader> 
      <Flex px='3' justify='space-between' >
      <Text>{is_creating? 'Nueva Cita': 'Editar Cita'} </Text> 
      <DrawerCloseButton></DrawerCloseButton>
      </Flex>
    </DrawerHeader>
    <DrawerBody>

      <FormControl px='3' >
        <Stack spacing={4}>           
          <Input  variant='flushed' onChange={e => setTitle(e.target.value)} placeholder={!is_creating? event.title  : 'Añadir título'}/>
          <Select onChange={e => setService(e.value)} noOptionsMessage={()=>'No hay servicios'}  maxMenuHeight={120} placeholder={'Servicio'} defaultInputValue={!is_creating? getServiceName(event.service)  : ''} options={services} />
          <Select onChange={e => setClient(e.value)} noOptionsMessage={()=>'No hay clientes'}  maxMenuHeight={120} placeholder={'Cliente'} defaultInputValue={client? getClientName(client)  : ''} options={m_clients} />
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
            <Input onChange={onChangePrice} placeholder={!is_creating? event.extraprice: 'Precio extra?'} />
          </InputGroup>
          <Textarea height='140px' bg='gray.300' onChange={onChangeNote} variant='filled' placeholder={!is_creating? event.note: 'Notas'} /> 
          </Stack>
        </FormControl>
    </DrawerBody>
      <DrawerFooter>
        <Flex  justify="right" columnGap="3" my='3'>             
          {!is_creating?
              <>
                <Button variant='ghost' colorScheme='red' size='sm' isLoading={loadingDelete} loadingText='Borrando' onClick={deleteDate} >Eliminar</Button>
                <Button colorScheme='orange' size='sm' onClick={updateDate} isLoading={loadingCreate} loadingText='Guardando'>  Guardar </Button>
              </>: 
              <>
              <Button variant='ghost' colorScheme='red' size='sm'  onClick={handleClose} >Cancel</Button>
              <Button colorScheme='orange' size='sm' onClick={createDate} isLoading={loadingCreate} loadingText='Guardando'>  Crear </Button>
              </>}
        </Flex> 
        </DrawerFooter>   
      </>
    )
}
