import React, {useContext, useState, useEffect} from 'react'
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button,Flex, IconButton} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure} from '@chakra-ui/react'
import {InputGroup, Input, InputLeftAddon} from '@chakra-ui/react'
import EventFormCrud from '../forms/EventFormCrud'
import moment from 'moment';
import {FiSearch,} from 'react-icons/fi';
import SvgEdit from  './../dist/Edit'
import PopoverDelete from '../components/PopoverDelete'
import eventsApi from '../api/eventsApi'
import servicesApi from '../api/servicesApi'
import clientsApi from '../api/clientsApi'
import useApi from '../hooks/useApi'
import AuthContext from '../auth/AuthContext'

function EventsTable(){

    const {user, authTokens} = useContext(AuthContext)
    
    const getEventsApi = useApi(eventsApi.getAllEvents);
    const deleteEventApi = useApi(eventsApi.deleteEvent);
    const getClientsApi = useApi(clientsApi.getAllClients);
    const getServicesApi = useApi(servicesApi.getAllServices);

    const {isOpen, onOpen, onClose } = useDisclosure()
    const[events, setEvents] = useState([])
    const[event, setEvent] = useState()               //selected service (when edditing)

    useEffect(() => { 
        getEventsApi.request(user,authTokens)  
        getServicesApi.request(user,authTokens)   
        getClientsApi.request(user,authTokens) 
    },[])
    
    function handleEdit(e){
        setEvent(e)
        onOpen()
    }
    function handleCreate(){
        setEvent()
        onOpen()
    }
    function handleDelete(e){
        console.log('borrar',e)
        deleteEventApi.request(e,user,authTokens)
    }

    function handleFilter(e){
        var filter = e.target.value.toLowerCase() 
        setEvents(getEventsApi.data?.filter(item => getClientName(item.client).toLowerCase().includes(filter)))   
    }
    function getClientName(id){
        try {
            return(getClientsApi.data?.filter(item => item.id===id)[0].name)
        } catch (error) {
            console.log(error)
            return('No able to get') 
        }
      }
    function getServiceName(id){
        try {
            return(getServicesApi.data?.filter(item => item.id===id)[0].name)
        } catch (error) {
            console.log(error)
            return('No able to get') 
        }
      }
    function getTotalPrice(id){
        try {
            const base = parseFloat(getServicesApi.data?.filter(item => item.id!==id)[0].baseprice, 10)
            const extra = parseFloat(id.extraprice, 10)
            const total =base+extra
            return(total)
        } catch (error) {
            console.log(error)
            return('No price') 
      }
    }

    return(
        <>
        <Flex>
        <InputGroup rounded={'md'} bg="white" w="200px" >
            <InputLeftAddon children={<FiSearch/>} />
            <Input type='text' placeholder='Filtra por cliente' onChange={(e) => handleFilter(e)} />
        </InputGroup>
        </Flex>
        <Flex w="100%"  >    
            <TableContainer mt='5' borderRadius='lg' w="100%" bg="white">
                <Table variant='simple' size='md'>
                <Thead>
                    <Tr>
                    <Th>#</Th>
                    <Th>Título</Th>
                    <Th>Día</Th>
                    <Th>Cliente</Th>
                    <Th>Servicio</Th>
                    <Th>Cobrado (€)</Th>
                    <Th>Paid</Th>
                    <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {getEventsApi.data?.map(date=>
                        <Tr key={date.id}>
                            <Td>{date.id}</Td>
                            <Td>{date.title}</Td>
                            <Td>{moment(date.start).format("DD/MM/YYYY, hh:mm")}</Td>
                            <Td>{getClientName(date.client)}</Td>
                            <Td>{getServiceName(date.service)}</Td>
                            <Td textAlign={'center'}> 
                                {getTotalPrice(date)}
                            </Td>
                            <Td> {JSON.stringify(date.paid)} </Td>
                            <Td>
                                <IconButton mr={3} size='xs' background="none" icon={<SvgEdit/>} onClick={() => handleEdit(date)} ></IconButton> 
                                <PopoverDelete onDelete={handleDelete} id={date.id} />
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
                <DrawerHeader>{event? 'Editar Cita': 'Crear cita' }</DrawerHeader>
                <EventFormCrud onClose={onClose} event={event} events={events} setEvents={setEvents} servicelist={getServicesApi.data} clientlist={getClientsApi.data} />
                </DrawerContent>
            </Drawer>                    
      </Flex>
      </>
    );
}

export default EventsTable;