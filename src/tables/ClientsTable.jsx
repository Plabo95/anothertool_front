import React, {useState} from 'react'
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button,useToast,IconButton, Flex, Text} from '@chakra-ui/react'

import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure, Switch} from '@chakra-ui/react'
import ClientForm from '../forms/ClientForm'
import SvgEdit from  './../dist/Edit'
import PopoverDelete from '../components/PopoverDelete'

function ClientsTable({clientlist}){


    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[fClients, setFClients] = useState(clientlist)
    const[clients, setClients] = useState(clientlist)
    const[sClient, setSClient] = useState()

    const[filter, setFilter] = useState(true)
    //Clients
    const deleteClient = async (e) => {
        const response = await fetch('https://plabo.pythonanywhere.com/api/deleteclient/' + e, {method: 'DELETE'})
        const rstatus = response.status
        if(rstatus >= 200 && rstatus<300){
            toast({
              title: 'Cliente borrado',
              status: 'success',
              duration: 6000,
              isClosable: true,
            })
        setClients(clients.filter(item => item.id!==e))
        }
        else{
            toast({
                title: 'Error al borrar ',
                description: "Código de error"+ rstatus +' intentalo mas tarde' ,
                status: 'error',
                duration: 6000,
                isClosable: true,
                })
            }
    }
    function handleEdit(e){
        setSClient(e)
        onOpen()
    }
    function handleCreate(){
        setSClient()
        onOpen()
    }
    function handleFilter(){
        setFilter(!filter)
        if(filter){ setFClients(clients.filter(item => item.moroso===true)) }
        else{setFClients(clients)}
    }
    return(
        <>
        <Flex justify={'space-around'}>
        <Button colorScheme='orange' type="button" onClick={()=>handleCreate()}>Crear</Button>
        <Text>Morosos <Switch size='lg' onChange={()=>handleFilter()} /> </Text> 
        </Flex>
        <Flex w="100%">
        <TableContainer mt='5' borderRadius='lg' w="100%">
        <Table variant='simple' size='md'>
            <Thead bg='#E9E9E9'>
                <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Car</Th>
                <Th>Phone</Th>
                <Th>Moroso</Th>
                <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {fClients.map(client=>
                    <Tr key={client.id}>
                        <Td>{client.id}</Td>
                        <Td>{client.name}</Td>
                        <Td>{client.car}</Td>
                        <Td>{client.telf}</Td>
                        <Td>{JSON.stringify(client.moroso)}</Td>
                        <Td>
                            <IconButton mr={3} size='xs' background="none" icon={<SvgEdit/>}  onClick={()=> handleEdit(client)} ></IconButton>  
                            <PopoverDelete onDelete={deleteClient} id={client.id} />
                        </Td>    
                    </Tr>
                )}
            </Tbody>
        </Table>
        </TableContainer>
        </Flex>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{sClient? 'Editar Cliente': 'Crear Cliente' }</DrawerHeader>                
            <ClientForm onClose={onClose} client={sClient} clients={fClients} setClients={setFClients}/>
            </DrawerContent>
        </Drawer>                    
     
      </>
    );
}

export default ClientsTable;