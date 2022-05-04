import React, {useEffect, useState} from 'react'
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button,Flex,IconButton} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure} from '@chakra-ui/react'
import ClientForm from '../forms/ClientForm'
import SvgEdit from  './../dist/Edit'
import PopoverDelete from '../components/PopoverDelete'

function ClientsTable({clientlist}){

    const { isOpen, onOpen, onClose } = useDisclosure()
    const[clients, setClients] = useState(clientlist)
    const[ sClient, setSClient] = useState()

    //Clients
    const deleteClient = async (e) => {
        fetch('http://127.0.0.1:8000/api/deleteclient/' + e, {method: 'DELETE'})
        .then(setClients(clients.filter(item => item.id!==e)))
        }

    function handleEdit(e){
        setSClient(e)
        onOpen()
    }
    function handleCreate(){
        setSClient()
        onOpen()
    }

    return(
        <>
        <Button colorScheme='orange' type="button" onClick={()=>handleCreate()}>Crear</Button>
      
        <TableContainer mt='5' borderRadius='lg'>
        <Table variant='simple' size='md'>
            <Thead bg='#E9E9E9'>
                <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Car</Th>
                <Th>Phone</Th>
                <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {clients.map(client=>
                    <Tr key={client.id}>
                        <Td>{client.id}</Td>
                        <Td>{client.name}</Td>
                        <Td>{client.car}</Td>
                        <Td>{client.telf}</Td>
                        <Td>
                            <IconButton mr={3} size='xs' background="none" icon={<SvgEdit/>}  onClick={()=> handleEdit(client)} ></IconButton>  
                            <PopoverDelete onDelete={deleteClient} id={client.id} />
                        </Td>    
                    </Tr>
                )}
            </Tbody>
        </Table>
        </TableContainer>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{sClient? 'Editar Cliente': 'Crear Cliente' }</DrawerHeader>                
            <ClientForm onClose={onClose} client={sClient}/>
            </DrawerContent>
        </Drawer>                    
     
      </>
    );
}

export default ClientsTable;