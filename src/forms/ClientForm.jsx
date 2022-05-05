import React, {useState, useEffect} from 'react'
import { Button, useToast, Flex, FormControl,FormErrorMessage,FormHelperText,Input} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'

function ClientForm({onClose, clients, client, setClients}){
    
    //Solo inicializo estado si estoy editando un servicio service?
    const[name, setName] = useState()
    const[car, setCar] = useState()
    const[telf, setTelf] = useState()

    const toast = useToast()
    const[loadingDelete, setLoadingDelete] = useState(false)
    const[loadingCreate, setLoadingCreate] = useState(false)

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
        
    function closeDrawer(){
        setLoadingDelete(false)
        setLoadingCreate(false)
        onClose()
    }
    
    const handleSubmit = async(e) => {
    setLoadingCreate(true)
    e.preventDefault()
        const clientToCreate ={
                'name': name,
                'car': car,
                'telf': telf,
        }
    const response = await fetch('https://plabo.pythonanywhere.com/api/createclient',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientToCreate)
        })
    const rstatus = response.status
    if(rstatus >= 200 && rstatus<300){
        toast({
        title: 'Cliente guardado',
        status: 'success',
        duration: 6000,
        isClosable: true,
        }) 
        const newdata= await response.json()
        setClients((clients) => [...clients, newdata])
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
        e.preventDefault()
        const clientToUpdate ={
            'name': name,
            'car': car,
            'telf': telf,
    }
    const response = await fetch('https://plabo.pythonanywhere.com/api/updateclient/'+client.id+'/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientToUpdate)
        })
        const rstatus = response.status
        if(rstatus >= 200 && rstatus<300){
            toast({
            title: 'Cliente guardado',
            status: 'success',
            duration: 6000,
            isClosable: true,
            }) 
        const newdata= await response.json()
        setClients(clients.filter(item => item.id!==client.id)) //creo una lista con todos menos el editado
        setClients((clients) => [...clients, newdata]) //añado el editado a la lista
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
                <label> Nombre </label>
                <Input onChange={onChangeName} placeholder={client? client.name : ' ' }/>
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
              <Button colorScheme='orange' size='sm' onClick={handleUpdate} isLoading={loadingCreate} loadingText='Guardando'>  Update </Button>: 
              <Button colorScheme='orange' size='sm' onClick={handleSubmit} isLoading={loadingCreate} loadingText='Guardando'>  Create </Button>}
          </Flex>  
        </DrawerFooter>
        </>
    )
}

export default ClientForm;
