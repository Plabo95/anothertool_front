import React, {useState} from 'react'
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button,Flex, IconButton} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure, Square} from '@chakra-ui/react'
import ServiceForm from '../forms/ServiceForm'
import PopoverDelete from '../components/PopoverDelete'
import SvgEdit from  './../dist/Edit'


function ServicesTable({servicelist}){

    
    const {isOpen, onOpen, onClose } = useDisclosure()
    const[services, setServices] = useState(servicelist)
    const[sService, setSService] = useState()               //selected service (when edditing)

    const deleteService = async (e) => {      
        fetch('https://plabo.pythonanywhere.com/api/deleteservice/' +e, {method: 'DELETE'})
        .then(setServices(services.filter(item => item.id!==e)))
        }
    
    function handleEdit(e){
        setSService(e)
        onOpen()
    }
    function handleCreate(){
        setSService()
        onOpen()
    }

    return(
        <>
        <Button colorScheme='orange' type="button" onClick={() => handleCreate()}>Crear</Button>
        <Flex w="100%">    
            <TableContainer mt='5' borderRadius='lg'>
                <Table variant='simple'size='md'>
                <Thead bg='#E9E9E9'>
                    <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Estimed Time</Th>
                    <Th>Price (€)</Th>
                    <Th>Color</Th>
                    <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {services.map(service=>
                        <Tr key={service.id}>
                            <Td>{service.id}</Td>
                            <Td>{service.name}</Td>
                            <Td>{service.estimed_hours} h : {service.estimed_mins} m</Td>
                            <Td >{service.baseprice}</Td>
                            <Td><Square size='18px' bg={service.color} rounded="md"/></Td>
                            <Td>
                                <IconButton mr={3} size='xs' background="none" icon={<SvgEdit/>}  onClick={() => handleEdit(service)} ></IconButton> 
                                <PopoverDelete onDelete={deleteService} id={service.id} />
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
                <DrawerHeader>{sService? 'Editar Servicio': 'Crear Servicio' }</DrawerHeader>
                <ServiceForm onClose={onClose} service={sService} services={services} setServices={setServices} />
                </DrawerContent>
            </Drawer>                    
      </Flex>
      </>
    );
}

export default ServicesTable;