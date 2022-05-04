import React, { useEffect, useState, useMemo } from 'react'
import {Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,DrawerContent,DrawerCloseButton, useDisclosure} from '@chakra-ui/react'
import {Box, Button,Input, InputGroup, InputLeftElement, Text, Textarea, Stack, Flex, Heading, Select, CloseButton} from '@chakra-ui/react'
import {FormControl} from '@chakra-ui/react'
import moment from 'moment';
import SvgTime from  '../dist/Time'

export default function EventForm({is_creating, onSave, onClose, handleClose, event, events, setEvents, servicelist, clientlist}) {

  const[title, setTitle] = useState()
  const[service, setService] = useState()
  const[client, setClient] = useState()
  const[price, setPrice] = useState()
  const[note, setNote] = useState()
  const[datein, setDatein] = useState(event.start)
  const[dateout, setDateout] = useState(event.end)

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
    

  const createDate = async (e) => {
    e.preventDefault()
    const eventToCreate ={
            'start': moment(datein),
            'end': moment(dateout),
            'client': client,
            'extraprice': price,
            'service': service,
            'note': note,
            'title': title,
    }
    const response = await fetch('http://127.0.0.1:8000/api/createdate',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventToCreate)
        })
    const data = await response.json();
    onSave()  //deleteo previsualizacion 
    setEvents((events) => [...events, data]);
          
}
  const updateDate = async (e) => {
    e.preventDefault()
      const eventToUpdate ={
        'start': datein,
        'end': dateout,
        'client': client,
        'extraprice': price,
        'service': service,
        'note': note,
        'title': title,
      }
    const response = await fetch('http://127.0.0.1:8000/api/updatedate/'+event.id+'/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventToUpdate)
        })
        const data = await response.json();
        setEvents(events.filter(item => item.id!==event.id)); //deleteo el que he modificado para updatearlo
        setEvents((events) => [...events, data]); 
        onClose()
    }
  const deleteDate = async (e) => {
    e.preventDefault()
    console.log('Deleting', event.id)
    fetch('http://127.0.0.1:8000/api/deletedate/' + event.id, {method: 'DELETE'})
    .then(setEvents(events.filter(item => item.id!==event.id)),
          onClose()
    )}

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
          <Select placeholder={!is_creating? getServiceName(event.service)  : 'Servicio'} onChange={e => setService(e.target.value)} >
            {servicelist.map(service=>
                <option key={service.id} value={service.id}> {service.name} </option>
            )}
          </Select>
          <Select placeholder={!is_creating? getClientName(event.client)  : 'Cliente'} onChange={e => setClient(e.target.value)} >
              {clientlist.map(client=>
                  <option key={client.id} value={client.id}> {client.name} </option>
              )}
          </Select> 
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
                <Button variant='ghost' colorScheme='red' size='sm'  onClick={deleteDate} >Eliminar</Button>
                <Button colorScheme='orange' size='sm' onClick={updateDate} >  Guardar </Button>
              </>: 
              <>
              <Button variant='ghost' colorScheme='red' size='sm'  onClick={handleClose} >Cancel</Button>
              <Button colorScheme='orange' size='sm' onClick={createDate} >  Crear </Button>
              </>}
        </Flex> 
        </DrawerFooter>   
      </>
    )
}
