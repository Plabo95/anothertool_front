import {Table as tablep,Thead,Tbody,Tr,Th,Td,TableContainer,useToast,Flex, IconButton} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure} from '@chakra-ui/react'
import {InputGroup, Input, InputLeftAddon} from '@chakra-ui/react'
import {Table} from "react-chakra-pagination";
import moment from 'moment';

//icons images
import {FiSearch} from 'react-icons/fi';


function EventsTable(){

    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <Flex direction='column' w='100%'>
            <InputGroup rounded={'md'} bg="white" w="200px" >
                <InputLeftAddon children={<FiSearch/>} />
                <Input type='text' placeholder='Filtra por cliente' />
            </InputGroup>
   
            <Flex bg='white' rounded='lg' boxShadow='lg' mt='1em'>
            </Flex>
            
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>'Crear cita' </DrawerHeader>
                {/* 
                <EventFormCrud onClose={onClose} event={event} events={events} setEvents={setEvents} servicelist={services} clientlist={clients} updateEvents={updateEvents}/>
                */}
                </DrawerContent>
            </Drawer>                    
        </Flex>
    );
}

export default EventsTable;