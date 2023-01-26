import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button,useToast,IconButton, Flex, Text} from '@chakra-ui/react'

import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure, Switch} from '@chakra-ui/react'
import ClientForm from '../forms/ClientForm'
import SvgEdit from  './../dist/Edit'
import PopoverDelete from '../components/PopoverDelete'

function ClientsTable(){

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
        <Flex justify={'space-between'} align='end'>
            <Flex p='6' gap='4' direction={'column'} shadow='md' borderRadius={'xl'} align={'center'} bg='white'>
                <Text>Morosos</Text>
                <Flex gap='4' align='center'>
                    <Text> {morosos} </Text>
                    <Switch size='sm' colorScheme='green' ref={switchElement} onChange={()=>handleFilter()} />
                </Flex>
            </Flex>
            <Button variant='primary' onClick={()=>handleCreate()}>+ Añadir cliente</Button>
        </Flex>
        <Flex w="100%">
        <TableContainer mt='5' borderRadius='lg' w="100%" bg='white' boxShadow='lg'>
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
                {fClients.map(client=> {
                return(
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
                )})}
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