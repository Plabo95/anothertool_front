import React, {useEffect, useState} from 'react'
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button,Flex, IconButton} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure} from '@chakra-ui/react'
import {InputGroup, Input, InputLeftAddon} from '@chakra-ui/react'
import EventFormCrud from '../forms/EventFormCrud'
import moment from 'moment';
import {FiSearch,} from 'react-icons/fi';
import SvgEdit from  './../dist/Edit'
import PopoverDelete from '../components/PopoverDelete'

function EventsTable({datelist, servicelist, clientlist}){

    const {isOpen, onOpen, onClose } = useDisclosure()
    const[events, setEvents] = useState(datelist)
    const[Fevents, setFevents] = useState(datelist)
    const[event, setEvent] = useState()               //selected service (when edditing)
    
    const deleteDate = async (e) => {      
        fetch('https://plabo.pythonanywhere.com/api/deletedate/' +e, {method: 'DELETE'})
        setEvents(events.filter(item => item.id!==e))
    }  
    function handleEdit(e){
        setEvent(e)
        onOpen()
    }
    function handleCreate(){
        setEvent()
        onOpen()
    }
    function handleFilter(e){
        var filter = e.target.value.toLowerCase() 
        console.log(filter)
        setFevents(events.filter(item => getClientName(item.client).toLowerCase().includes(filter)))
        
    }
    function getClientName(id){
        return(clientlist.filter(item => item.id===id)[0].name)
      }
    function getServiceName(id){
        return(servicelist.filter(item => item.id===id)[0].name)
      }
    function getTotalPrice(id){
        const base = parseFloat(servicelist.filter(item => item.id!==id)[0].baseprice, 10)
        const extra = parseFloat(id.extraprice, 10)
        const total =base+extra
        return(total)
      }
    return(
        <>
        <Flex >
        <InputGroup w="200px" >
            <InputLeftAddon children={<FiSearch/>} />
            <Input type='text' placeholder='Filtra por cliente' onChange={(e) => handleFilter(e)} />
        </InputGroup>
        </Flex>
        <Flex w="100%">    
            <TableContainer mt='5' borderRadius='lg' w="100%">
                <Table variant='simple' size='md'>
                <Thead bg='#E9E9E9'>
                    <Tr>
                    <Th>Id</Th>
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
                    {Fevents.map(date=>
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
                                <PopoverDelete onDelete={deleteDate} id={date.id} />
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
                <EventFormCrud onClose={onClose} event={event} events={Fevents} setEvents={setFevents} servicelist={servicelist} clientlist={clientlist} />
                </DrawerContent>
            </Drawer>                    
      </Flex>
      </>
    );
}

export default EventsTable;