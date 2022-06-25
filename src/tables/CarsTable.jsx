import React, {useState, useContext, useEffect,} from 'react'
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button,useToast,IconButton, Flex,} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure,} from '@chakra-ui/react'
import SvgEdit from  './../dist/Edit'

//Components
import PopoverDelete from '../components/PopoverDelete'
import CarForm from '../forms/CarForm'

//api
import carsApi from '../api/carsApi'
import useApi from '../hooks/useApi'
import AuthContext from '../auth/AuthContext'

export default function CarsTable(){

    const {user, authTokens} = useContext(AuthContext)
    const getAllCarsApi = useApi(carsApi.getAllCars);
    const deleteCarApi = useApi(carsApi.deleteCar);

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[cars, setCars] = useState([])
    const[car, setCar] = useState()
    const[creating, setCreating] = useState(false)

    const updateTable = async () => {
        const {data, error} = await getAllCarsApi.request(user,authTokens);
        error? console.log('Error fetching...', error) 
            : setCars(data)
    }

    //Clients
    const handleDelete = async (e) =>{
        const {error} = await deleteCarApi.request(e, user, authTokens)
        if(!error){
            toast({
                title: 'Coche borrado',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
            updateTable()
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
    function handleEdit(e){
        setCar(e)
        setCreating(false)
        onOpen()
    }
    function handleCreate(){
        setCar()
        setCreating(true)
        onOpen()
    }
    useEffect(() => {   
        updateTable()
    },[]) 

    return(
        <>
        <Flex justify={'space-between'}>
            <Button variant='primary-out-s' onClick={()=>handleCreate()}>+ Añadir Coche</Button>
        </Flex>
        <Flex w="100%">
        <TableContainer mt='5' borderRadius='lg' w="100%" bg='white' boxShadow='lg'>
        <Table variant='simple' size='md'>
            <Thead>
                <Tr>
                <Th>Matrícula</Th>
                <Th>Marca</Th>
                <Th>Modelo</Th>
                <Th>Cliente</Th>
                <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {cars.map(car=> {
                return(
                    <Tr key={car.idplate}>
                        <Td>{car.idplate}</Td>
                        <Td>{car.brand}</Td>
                        <Td>{car.model}</Td>
                        <Td>{car.client? car.client: 'No asignado'}</Td>
                        <Td>
                            <IconButton mr={3} size='xs' background="none" icon={<SvgEdit/>}  onClick={()=> handleEdit(car)} ></IconButton>  
                            <PopoverDelete onDelete={handleDelete} id={car.idplate} />
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
            <DrawerHeader>{car? 'Editar Coche': 'Crear Coche' }</DrawerHeader> 
                <CarForm  is_creating={creating} onClose={onClose} car={car} cars={cars} setCars={setCars} updateTable={updateTable}/>               
            </DrawerContent>
        </Drawer>                    
     
      </>
    );
}
