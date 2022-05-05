import React, {useState, useEffect} from 'react'
import { TwitterPicker } from 'react-color';
import {Button, Flex, FormControl,FormLabel,FormErrorMessage,Input, useToast, Square} from '@chakra-ui/react'
import {NumberInput, NumberInputField, NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'

function ServiceForm({onClose, service, services, setServices}){  
    //Solo inicializo estado si estoy editando un servicio service?
    const[name, setName] = useState()
    const[price, setPrice] = useState()
    const[color, setColour] = useState()
    const[durationMins, setDurationMins] = useState()
    const[durationHours, setDurationHours] = useState()

    const toast = useToast()
    const[loadingDelete, setLoadingDelete] = useState(false)
    const[loadingCreate, setLoadingCreate] = useState(false)

    useEffect(() => {
        if(service){
            setName(service.name)
            setPrice(service.baseprice)
            setColour(service.color)
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
        //console.log(e)
        setDurationMins(e)
      };
    const onChangeDurationHours = (e) => {
        setDurationHours(e)
      };    

    function closeDrawer(){
        setLoadingDelete(false)
        setLoadingCreate(false)
        onClose()
    }

    const handleSubmit = async(e) => {
    setLoadingCreate(true)
    e.preventDefault()
        const serviceToCreate ={
                'name': name,
                'baseprice': price,
                'color': color,
                'estimed_hours': durationHours,
                'estimed_mins': durationMins
        }
        const response = await fetch('https://plabo.pythonanywhere.com/api/createservice',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serviceToCreate)
            })
        const rstatus = response.status
        if(rstatus >= 200 && rstatus<300){
            toast({
            title: 'Servicio guardado',
            status: 'success',
            duration: 6000,
            isClosable: true,
            }) 
        const newdata= await response.json()
        setServices((services) => [...services, newdata])
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
    const  handleUpdate = async(e) => {
        setLoadingCreate(true)
        e.preventDefault()
        const serviceToUpdate ={
            'name': name,
            'baseprice': price,
            'color': color,
            'estimed_hours': durationHours,
            'estimed_mins': durationMins
    }
    const response = await fetch('https://plabo.pythonanywhere.com/api/updateservice/'+service.id+'/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceToUpdate)
        })
        const rstatus = response.status
        if(rstatus >= 200 && rstatus < 300){
          toast({
            title: 'Servicio guardado',
            status: 'success',
            duration: 6000,
            isClosable: true,
          }) 
        const newdata= await response.json()
        setServices(services.filter(item => item.id!==service.id)) //creo una lista con todos menos el editado
        setServices((services) => [...services, newdata]) //añado el editado a la lista
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
    return(
        <>
        <DrawerBody>    
        <FormControl>
            <FormLabel> Nombre </FormLabel>                   
            <Input my='3' onChange={onChangeName} placeholder={service? service.name : ' '}/>
            <FormLabel> Precio </FormLabel>
            <Input my='3' onChange={onChangePrice} placeholder={service? service.baseprice: ' '}/>
            <Flex mb='3' justify='start' align='center' gap='3' >
                <FormLabel my='3'> Color  </FormLabel>
                <Square size='20px' bg={color} rounded="md"/>
            </Flex>
            <TwitterPicker
                onChangeComplete={onChangeColour}
                width={240}
                triangle={'hide'}
            />
            <FormLabel my='3'> Tiempo estimado </FormLabel>
            <Flex justifyContent="space-between" align='center' my='3'>
                <NumberInput onChange={onChangeDurationHours} maxW={20} step={1} min={0} max={23}  defaultValue={service? service.estimed_hours : '0' }>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>         
                </NumberInput>
                <p>H</p>
                <NumberInput onChange={onChangeDurationMins} maxW={20} step={5} min={0} max={59} defaultValue={service? service.estimed_mins : '0' }>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <p>m</p>            
            </Flex>
            </FormControl>
            </DrawerBody> 

            <DrawerFooter>
            <Flex  justify="right" columnGap="3" my='3'>
                <Button variant='ghost' colorScheme='red' size='sm'  onClick={onClose} >Cancel</Button>
                {service? 
                    <Button colorScheme='orange' size='sm' onClick={handleUpdate} isLoading={loadingCreate} loadingText='Guardando' >  Guardar </Button>: 
                    <Button colorScheme='orange' size='sm' onClick={handleSubmit} isLoading={loadingCreate} loadingText='Guardando'>  Guardar </Button>}
            </Flex>  
            </DrawerFooter>    
        </>
    )
}

export default ServiceForm;
