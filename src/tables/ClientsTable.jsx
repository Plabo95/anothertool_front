import React, {useState, useContext, useEffect} from 'react'
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button,useToast,IconButton, Flex, Text, Box} from '@chakra-ui/react'

import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure, Switch} from '@chakra-ui/react'
import ClientForm from '../forms/ClientForm'
import SvgEdit from  './../dist/Edit'
import PopoverDelete from '../components/PopoverDelete'
import clientsApi from '../api/clientsApi'
import useApi from '../hooks/useApi'
import AuthContext from '../auth/AuthContext'

function ClientsTable(){

    const {user, authTokens} = useContext(AuthContext)
    const getClientsApi = useApi(clientsApi.getAllClients);
    const deleteClientApi = useApi(clientsApi.deleteClient);

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[fClients, setFClients] = useState([])
    const[clients, setClients] = useState([])
    const[sClient, setSClient] = useState()
    const[creating, setCreating] = useState(false)

    const[filter, setFilter] = useState(true)

    //Clients
    const handleDelete = (e) =>{
        console.log('deleting client: ', e)
        deleteClientApi.request(e, user,authTokens)
        if(!deleteClientApi.error){
            toast({
                title: 'Cliente borrado',
                status: 'success',
                duration: 6000,
                isClosable: true,
              })
            setClients(clients.filter(item => item.id!==e))
            //updateTable()
        }   
        else{
            console.log('error es:', deleteClientApi.error)
            toast({
                title: 'Error al borrar ',
                description: "Código de error"+ deleteClientApi.error +' intentalo mas tarde' ,
                status: 'error',
                duration: 6000,
                isClosable: true,
                })
        }    
    }

    const updateTable = () => {
        console.log('updating table')
        getClientsApi.request(user,authTokens)
        console.log(getClientsApi)
        if(getClientsApi.error){
            console.log('Error fetching...', getClientsApi.error)
        }
        else{setClients(getClientsApi.data)}
        console.log(clients)      
    }

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
        setClients(getClientsApi.data.filter(item => item.id!==e))
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
        setCreating(false)
        onOpen()
    }
    function handleCreate(){
        setSClient()
        setCreating(true)
        onOpen()
    }
    function handleFilter(){
        setFilter(!filter)
        if(filter){ setFClients(getClientsApi.data?.filter(item => item.moroso===true)) }
        else{setFClients(getClientsApi.data)}      
    }

    const morosos = getClientsApi.data?.filter(item => item.moroso===true).length

    useEffect(() => {   
        console.log('calling use effect de clients')
        updateTable()
    },[])

    

    return(
        <>
        <Flex justify={'space-between'}>
            <Flex p='6' gap='4' direction={'column'} shadow='md' borderRadius={'xl'} alignItems={'center'} bg="white">
                <Text>Morosos</Text>
                <Flex gap='4' align={'center'}>
                    <Text> {morosos} </Text>
                    <Switch size='sm' onChange={()=>handleFilter()} />
                </Flex>
            </Flex>
            <Button colorScheme={'blue'} type="button" onClick={()=>handleCreate()}>+ Añadir cliente</Button>
        </Flex>
        <Flex w="100%">
        <TableContainer mt='5' borderRadius='lg' w="100%" bg='white' >
        <Table variant='simple' size='md'>
            <Thead>
                <Tr>
                <Th>#</Th>
                <Th>Name</Th>
                <Th>Car</Th>
                <Th>Phone</Th>
                <Th>Moroso</Th>
                <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {getClientsApi.data?.map(client=>
                    <Tr key={client.id}>
                        <Td>{client.id}</Td>
                        <Td>{client.name}</Td>
                        <Td>{client.car}</Td>
                        <Td>{client.telf}</Td>
                        <Td>{JSON.stringify(client.moroso)}</Td>
                        <Td>
                            <IconButton mr={3} size='xs' background="none" icon={<SvgEdit/>}  onClick={()=> handleEdit(client)} ></IconButton>  
                            <PopoverDelete onDelete={handleDelete} id={client.id} />
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
            <ClientForm is_creating={creating} onClose={onClose} client={sClient} clients={fClients} setClients={setFClients} updateTable={updateTable}/>
            </DrawerContent>
        </Drawer>                    
     
      </>
    );
}

export default ClientsTable;