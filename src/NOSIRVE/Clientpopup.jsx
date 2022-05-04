
                            <Td>{clientlist.filter(item => item.id===date.client)[0].name}</Td>
                            <Td>{servicelist.filter(item => item.id===date.service)[0].name}</Td>

<DrawerBody>
            <FormControl>
                  <Stack spacing={4}>           
                  <Input  ref={titleInput} my='3' variant='flushed' onChange={onChangeTitle} placeholder={selecting? selected.title : 'Título..'}/>
                  <Select placeholder='Servicio' onChange={e => setService(e.target.value)} >
                    {servicelist.map(service=>
                        <option key={service.id} value={service.id}> {service.name} </option>
                    )}
                  </Select>
                  <Select placeholder='Cliente' onChange={e => setClient(e.target.value)} >
                      {clientlist.map(client=>
                          <option key={client.id} value={client.id}> {client.name} </option>
                      )}
                  </Select> 
                  {selected &&  
                  <>           
                  <Heading size='md'>Duración {duration()} </Heading>                 
                  <Text> IN  {moment(selected.start).format("DD/MM/YYYY, hh:mm")} </Text>
                  <Text> OUT {moment(selected.end).format("DD/MM/YYYY hh:mm")}</Text>
                  </>  } 
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      color='gray.300'
                      fontSize='1.2em'
                      children='€'
                    />
                    <Input onChange={onChangePrice} placeholder={selecting? selected.extraprice: 'Precio extra?'} />
                  </InputGroup>
                  <Textarea onChange={onChangeNote} variant='filled' placeholder='Notas' /> 
                  </Stack> 
              </FormControl>
          </DrawerBody>
          <DrawerFooter>
                  <Flex  justify="right" columnGap="3" my='3'>             
                      {selecting?
                          <>
                            <Button colorScheme='red' size='sm'  onClick={deleteDate} >Delete</Button>
                            <Button colorScheme='orange' size='sm' onClick={updateDate} >  Guardar </Button>
                          </>: 
                          <>
                          <Button variant='ghost' colorScheme='red' size='sm'  onClick={handleCancel} >Cancel</Button>
                          <Button colorScheme='orange' size='sm' onClick={createDate} >  Crear </Button>
                          </>}
                  </Flex> 
                  </DrawerFooter>   




























import React, {useState, useEffect} from 'react'
import {Box, Button, CloseButton, Heading, Flex, FormControl,FormLabel,FormErrorMessage,FormHelperText,Input, InputGroup, useDisclosure} from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

function Clientpopup({open, clients, client, setClients, isEditing}){
    
    const { isOpen, onOpen, onClose } = useDisclosure()

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

    if(!open) return null
    return(
        <>

        <Box>
            <Flex p='3' justifyContent="space-between" align='center' >
                <Heading size='lg' > Cliente {isEditing? client.id: '' } </Heading>
                <CloseButton size='sm' onClick={onClose}></CloseButton>
            </Flex>
            <Box p='3'>    
            <FormControl>
                <label> Nombre </label>
                <Input type="text" onChange={onChangeName} placeholder={isEditing? client.name : ' ' }/>
                <label> Coche </label>
                <Input type="text" onChange={onChangeCar} placeholder={isEditing? client.car: 'Lexus IS200'}/>
                <label> Teléfono </label>
                <InputGroup>    
                    
                    <Input type="text" onChange={onChangeTelf} placeholder={isEditing? client.telf: ''}/>
                </InputGroup>
                <Flex justify="right" columnGap="3" mt='3'>
                    <Button variant='ghost' colorScheme='red' size='sm' onClick={onClose}>Cancel</Button>
                    {isEditing? 
                    <Button colorScheme='orange' size='sm' onClick={handleUpdate} >  Update </Button>: 
                    <Button colorScheme='orange' size='sm' onClick={handleSubmit} >  Create </Button>}
                </Flex>    
            </FormControl>
            </Box>
        </Box>
        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>  
        </>
    )
}

export default Clientpopup;
