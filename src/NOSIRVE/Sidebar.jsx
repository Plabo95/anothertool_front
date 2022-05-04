import React, {useState} from 'react'
import moment from 'moment';
import {Box, Button,Input, Text, Textarea, Stack, Flex, Heading, Select, CloseButton} from '@chakra-ui/react'
import {FormControl, FormLabel, FormHelperText, FormErrormessage} from '@chakra-ui/react'


function Sidebar({open, is_selecting, is_creating, onCreate, onUpdate, onDelete, onCancel, event, services, ss, sc, clients}){
    
    function duration(){
        //console.log(event)
        const d = moment.duration(moment(event.end).diff(moment(event.start)))
        const formated = (d.get('hours') + 'h ' + d.get('minutes') + 'mins')
        return (<p>{formated}</p>)
    }
    if(!open) return null
    if(event) {
        if(is_selecting){
        const service = services.filter(item => item.id===event.service)[0].name;
        const client = clients.filter(item => item.id===event.client)[0].name;
    return(
    <>
        <Flex justifyContent="space-between" py='4' align="center">
            <Heading size="lg" >Cita {event.id} {event.service.name} </Heading>
            <CloseButton size="sm" onClick={onCancel}></CloseButton>
        </Flex>
        <Stack spacing={4}>
        <Input variant='flushed' placeholder='Título...' />
        <Select placeholder={service} onChange={e => ss(e.target.value)} >
            {services.map(service=>
                <option key={service.id} value={service.id}> {service.name} </option>
            )}
        </Select>
        <Select placeholder={client} onChange={e => sc(e.target.value)} >
            {clients.map(client=>
                <option key={client.id} value={client.id}> {client.name} </option>
            )}
        </Select>
        <Textarea variant='filled' placeholder='Notas' />  
        </Stack>
        <Heading size='md'>Duración {duration()} </Heading>              
        <Text> IN  {moment(event.start).format("DD/MM/YYYY, hh:mm")} </Text>
        <Text> OUT {moment(event.end).format("DD/MM/YYYY hh:mm")}</Text>            
        <Flex  justify="right" columnGap="3" mt='3'>
            <Button colorScheme='red' size='sm'  onClick={onDelete} >Delete</Button>
            <Button colorScheme='orange' size='sm'  onClick={onUpdate} >Guardar </Button>
        </Flex>  
        </>
    );
    }
    if(is_creating){
    return(
        <>            
        <FormControl>
            <Flex justifyContent="space-between" py='4' align="center">
                <Heading size="lg">Nueva cita </Heading>
                 <CloseButton onClick={onCancel}></CloseButton>
            </Flex>    
            <Select  placeholder="Servicio" onChange={e => ss(e.target.value)} >
                {services.map(service=>
                    <option key={service.id} value={service.id}> {service.name} </option>
                )}
            </Select>                               
            <Select placeholder="Cliente" onChange={e => sc(e.target.value)} >
                {clients.map(client=>
                    <option key={client.id} value={client.id}> {client.name} </option>
                )}       
            </Select>   
            <h6> Date in: {moment(event.start).format("DD/MM/YYYY, hh:mm")} </h6>
            <h6> Date out: {moment(event.end).format("DD/MM/YYYY hh:mm")}</h6>            
            <Flex  justify="right" columnGap="3" mt='3'>
                <Button variant='ghost' colorScheme='red' size='sm' onClick={onCancel} >Cancel</Button>
                <Button colorScheme='orange' size='sm'  onClick={onCreate} > Guardar </Button>
            </Flex>
            </FormControl>
            </>      
        );
    }
    }                       
}


export default Sidebar;

