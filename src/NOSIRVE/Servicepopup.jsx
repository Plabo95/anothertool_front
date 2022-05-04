import React, {useState, useEffect} from 'react'
import { TwitterPicker } from 'react-color';
import {Box, Heading, Button, CloseButton, Flex, FormControl,FormLabel,FormErrorMessage,FormHelperText,Input, InputGroup, InputLeftAddon} from '@chakra-ui/react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'


function Servicepopup({open, onClose, service, isEditing, services, setServices}){
    
    //Solo inicializo estado si estoy editando un servicio service?
    const[name, setName] = useState()
    const[price, setPrice] = useState()
    const[colour, setColour] = useState()
    const[durationMins, setDurationMins] = useState()
    const[durationHours, setDurationHours] = useState()

    useEffect(() => {
        if(service){
            setName(service.name)
            setPrice(service.baseprice)
            setColour(service.colour)
            setDurationMins(service.estimed_mins)
            setDurationHours(service.estimed_hours)
        }
        else{
        setName()
        setPrice()
        setColour()
        setDurationMins()
        setDurationHours()}
    }, [service]);


    const onChangeName = (e) => {
        setName(e.target.value)
      };

    const onChangePrice = (e) => {
        setPrice(e.target.value)
      };

    const onChangeColour = (e) => {
        setColour(e.hex)
      };

    const onChangeDurationMins = (e) => {
        setDurationMins(e.target.value)
      };
    const onChangeDurationHours = (e) => {
        setDurationHours(e.target.value)
      };
      
      
    const handleSubmit = async(e) => {
    e.preventDefault()
        const serviceToCreate ={
                'name': name,
                'baseprice': price,
                'colour': colour,
                'estimed_hours': durationHours,
                'estimed_mins': durationMins
        }
        const response = await fetch('http://127.0.0.1:8000/api/createservice',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serviceToCreate)
            })
        //console.log(await response.json())
        const newdata= await response.json()
        setServices((services) => [...services, newdata])
        onClose()
    }

    const  handleUpdate = async(e) => {
        e.preventDefault()
        const serviceToUpdate ={
            'name': name,
            'baseprice': price,
            'colour': colour,
            'estimed_hours': durationHours,
            'estimed_mins': durationMins
    }

    const response = await fetch('http://127.0.0.1:8000/api/updateservice/'+service.id+'/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceToUpdate)
        })
        const newdata= await response.json()
        setServices(services.filter(item => item.id!==service.id)) //creo una lista con todos menos el editado
        setServices((services) => [...services, newdata]) //añado el editado a la lista
        onClose()
    }


    if(!open) return null
    return(
        <>
        <Box>
            <Flex p='3' justifyContent="space-between" align='center' >
                <Heading size='lg' > Servicio {isEditing? service.id: 'Nuevo' } </Heading>
                <CloseButton type="button" onClick={onClose}></CloseButton>
            </Flex>
            <Box p='3'>    
            <FormControl>
                <FormLabel> Nombre </FormLabel>                   
                <Input my='3' onChange={onChangeName} placeholder={isEditing? service.name : ' '}/>
                <FormLabel> Precio </FormLabel>
                <Input my='3' onChange={onChangePrice} placeholder={isEditing? service.baseprice: ' '}/>
                <FormLabel my='3'> Color </FormLabel>
                <TwitterPicker
                    onChangeComplete={onChangeColour}
                    width={240}
                    triangle={'hide'}
                />
                <FormLabel my='3'> Tiempo estimado </FormLabel>
                <Flex justifyContent="space-between" align='center' my='3'>
                    <NumberInput onChange={onChangeDurationHours} maxW={20} step={1} min={0} max={23}  defaultValue={isEditing? service.estimed_hours : '0' }>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>         
                    </NumberInput>
                    <p>H</p>
                    <NumberInput onChange={onChangeDurationMins} maxW={20} step={5} min={0} max={59} defaultValue={isEditing? service.estimed_mins : '0' }>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <p>m</p>            
                </Flex>
                <Flex  justify="right" columnGap="3" my='3'>
                    <Button variant='ghost' colorScheme='red' size='sm'  onClick={onClose} >Cancel</Button>
                    {isEditing? 
                        <Button colorScheme='orange' size='sm' onClick={handleUpdate} >  Guardar </Button>: 
                        <Button colorScheme='orange' size='sm' onClick={handleSubmit} >  Guardar </Button>}
                </Flex>  
            </FormControl>
            </Box>     
        </Box>  
        </>
    )
}

export default Servicepopup;
