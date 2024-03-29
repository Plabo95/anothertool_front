import React, {useContext, useState, useEffect} from 'react'
import {Table as tablep,Thead,Tbody,Tr,Th,Td,TableContainer,useToast,Flex, IconButton} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure} from '@chakra-ui/react'
import {InputGroup, Input, InputLeftAddon} from '@chakra-ui/react'
import {Table} from "react-chakra-pagination";
import moment from 'moment';

//components
import EventFormCrud from '../forms/EventFormCrud'
import PopoverDelete from '../components/PopoverDelete'

//icons images
import {FiSearch,} from 'react-icons/fi';
import SvgEdit from  './../dist/Edit'

//api
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

    const toast = useToast()
    const {isOpen, onOpen, onClose } = useDisclosure()
    const[eventsFilter, setEventsFilter] = useState([])
    const[events, setEvents] = useState([])
    const[event, setEvent] = useState()               //selected service (when edditing)
    const[services, setServices] = useState([])
    const[clients, setClients] = useState([])

    const updateEvents = async () => {
        const {data, error} = await getEventsApi.request(user,authTokens);
        error
            ?   console.log('Error fetching events...', error) 
            :   setEvents(data)
    }
    const updateClients = async () => {
        const {data, error} = await getClientsApi.request(user,authTokens);
        error
            ?   console.log('Error fetching clients...', error) 
            :   setClients(data)
    }
    const updateServices = async () => {
        const {data, error} = await getServicesApi.request(user,authTokens);
        error
            ?   console.log('Error fetching services...', error) 
            :   setServices(data)
    } 
    function handleEdit(e){
        setEvent(e)
        onOpen()
    }
    const handleDelete = async (e) =>{
        console.log('deleting event: ', e)
        const {error} = await deleteEventApi.request(e, user, authTokens)
        if(!error){
            toast({
                title: 'Evento borrado',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
            const newEvents = events.filter((item) => item.id !== e);
            setEvents(newEvents)
        }   
        else{
            console.log('error es:', error)
            toast({
                title: 'Error al borrar ',
                description: "Código de error"+ error +' intentalo mas tarde' ,
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }    
    }
    function handleFilter(e){
        var filter = e.target.value.toLowerCase() 
        setEventsFilter(events.filter(item => filterEvent(item, filter)))
    }

    const filterEvent = (e, filter) => {
        return e.client_name.toLowerCase().includes(filter)
                ||  e.service_name.toLowerCase().includes(filter)
                ||  getTotalPrice(e).toLowerCase().includes(filter)
                ||  String(e.id).toLowerCase().includes(filter)
                ||  String(e.title).toLowerCase().includes(filter)
                ||  String(moment(e.start).format("DD/MM/YYYY, hh:mm")).toLowerCase().includes(filter)
                    ?   true
                    :   false   
    }
    function getTotalPrice(id){
        try {
            const base = parseFloat(services.filter(item => item.id!==id)[0].baseprice, 10)
            const extra = parseFloat(id.extraprice, 10)
            const total =base+extra
            return(total.toString())
        } catch (error) {
            console.log(error)
            return('No price') 
      }
    }
    const tableColumns = [
        {
          Header: "#",
          accessor: "id"
        },
        {
          Header: "Título",
          accessor: "title"
        },
        {
          Header: "Día",
          accessor: "start"
        },
        {
          Header: "Cliente",
          accessor: "client"
        },
        {
            Header: "¿Pagado?",
            accessor: "paid"
        },
        {
            Header: "",
            accessor: "buttons"
        }
      ];

    useEffect(() => {
        updateEvents() 
        updateServices()
        updateClients() 
    },[])

    useEffect(() => {
        setEventsFilter(events) 
    },[events])

    const [page, setPage] = React.useState(1);

    const tableData = eventsFilter.map((date)=>({
        id: date.id,
        title: date.title,
        start: moment(date.start).format("DD/MM/YYYY, hh:mm"),
        client: date.client_name,
        service: date.client_name,
        paid: JSON.stringify(date.paid),
        buttons:(
        <Flex>
            <IconButton mr={3} size='xs' background="none" icon={<SvgEdit/>} onClick={() => handleEdit(date)} ></IconButton> 
            <PopoverDelete onDelete={handleDelete} id={date.id} />
        </Flex>),                 
    }));

    return(
        <Flex direction='column' w='100%'>
            <InputGroup rounded={'md'} bg="white" w="200px" >
                <InputLeftAddon children={<FiSearch/>} />
                <Input type='text' placeholder='Filtra por cliente' onChange={(e) => handleFilter(e)} />
            </InputGroup>
   
            <Flex bg='white' rounded='lg' boxShadow='lg' mt='1em'>
            <Table
                colorScheme="gray"
                // Fallback component when list is empty
                emptyData={{
                text: "Nobody is registered here."
                }}
                totalRegisters={eventsFilter.length}
                page={page}
                // Listen change page event and control the current page using state
                onPageChange={(page) => setPage(page)}
                columns={tableColumns}
                data={tableData}
            />
            </Flex>
            
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{event? 'Editar Cita': 'Crear cita' }</DrawerHeader>
                <EventFormCrud onClose={onClose} event={event} events={events} setEvents={setEvents} servicelist={services} clientlist={clients} updateEvents={updateEvents}/>
                </DrawerContent>
            </Drawer>                    
        </Flex>
    );
}

export default EventsTable;