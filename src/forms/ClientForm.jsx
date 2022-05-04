import React, {useState, useEffect} from 'react'
import { TwitterPicker } from 'react-color';
import {Box, Heading, Button, CloseButton, Flex, FormControl,FormLabel,FormErrorMessage,FormHelperText,Input, InputGroup, InputLeftAddon} from '@chakra-ui/react'
import {NumberInput, NumberInputField, NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'

function ClientForm({onClose, clients, client, setClients}){
    
    //Solo inicializo estado si estoy editando un servicio service?
    const[name, setName] = useState()
    const[car, setCar] = useState()
    const[telf, setTelf] = useState()

    useEffect(() => {
        if(client){
            setName(client.name)
            setCar(client.car)
            setTelf(client.telf)
        }
        else{
            setName()
            setCar()
            setTelf() }
    }, [client]);

    const onChangeName = (e) => {
        setName(e.target.value) 
      };

    const onChangeCar = (e) => {
        setCar(e.target.value) 
      };

    const onChangeTelf = (e) => {
        //console.log(e.hex)
        setTelf(e.target.value)
      };
            
    const handleSubmit = async(e) => {
    e.preventDefault()
        const clientToCreate ={
                'name': name,
                'car': car,
                'telf': telf,
        }

        const response = await fetch('http://127.0.0.1:8000/api/createclient',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientToCreate)
            })
            console.log(response)
            //console.log(await response.json())
            const newdata= await response.json()
            setClients((clients) => [...clients, newdata])
            onClose()
    }

    const  handleUpdate = async(e) => {
        e.preventDefault()
        const clientToUpdate ={
            'name': name,
            'car': car,
            'telf': telf,
    }
    const response = await fetch('http://127.0.0.1:8000/api/updateclient/'+client.id+'/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientToUpdate)
        })
        console.log(clientToUpdate)
        const newdata= await response.json()
        setClients(clients.filter(item => item.id!==client.id)) //creo una lista con todos menos el editado
        setClients((clients) => [...clients, newdata]) //añado el editado a la lista
        onClose()
    }
    return(
        <>
        <DrawerBody> 
            <FormControl>
                <label> Nombre </label>
                <Input type="text" onChange={onChangeName} placeholder={client? client.name : ' ' }/>
                <label> Coche </label>
                <Input type="text" onChange={onChangeCar} placeholder={client? client.car: 'Lexus IS200'}/>
                <label> Teléfono </label>
                <Input type="text" onChange={onChangeTelf} placeholder={client? client.telf: ''}/>
            </FormControl>
        </DrawerBody>
        <DrawerFooter>
          <Flex justify="right" columnGap="3" mt='3'>
              <Button variant='ghost' colorScheme='red' size='sm' onClick={onClose}>Cancel</Button>
              {client? 
              <Button colorScheme='orange' size='sm' onClick={handleUpdate} >  Update </Button>: 
              <Button colorScheme='orange' size='sm' onClick={handleSubmit} >  Create </Button>}
          </Flex>  
        </DrawerFooter>
        </>
    )
}

export default ClientForm;
