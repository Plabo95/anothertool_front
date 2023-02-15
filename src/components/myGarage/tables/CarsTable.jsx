import { useState } from 'react';
import {useToast, Flex, Button, Text} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure} from '@chakra-ui/react'
import {Table} from "react-chakra-pagination";
//comps
import CarForm from '../forms/CarForm';
//icons
import {BsTrash} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'
//api
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllCars, deleteCar } from '../../../api/carsApi';
//auth
import { useAuthHeader } from 'react-auth-kit';


export default function ServicesTable(){

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [page, setPage] = useState(1);
    const [car, setCar] = useState()
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()


    const {data, isLoading} = useQuery({
        queryKey: ['cars'],
        queryFn: () => getAllCars(authHeader()),
    })

    const {isLoading:ld, mutate} = useMutation(
        ["deleteCar"],
        deleteCar,
        {
        onSuccess: () => {
            toast({title: 'Borrado con exito!',status:"success"})
            QueryClient.invalidateQueries(["cars"]);
            QueryClient.refetchQueries("cars", {force:true})
            onClose()
        },
        onError : (error)=>{
            toast({title: error.message, description: error.code ,status:"error"})
        }
        }
    );

    // Formatter for each user
    const tableData = data?.map((car) => ({
        plate: car.plate,
        brand: car.brand,
        model: car.model,
        client: car.client_name,
        action: (
        <Flex gap='1em' key={car.id}>
            <Button onClick={() => {setCar(car);  onOpen()}}>
                <AiOutlineEdit size='20px' color='blue'/>
            </Button>
            <Button
            isLoading={ld} 
            onClick={() => mutate({slug:car.id, token:authHeader() })   }>
                <BsTrash size='20px' color='red'/>
            </Button>
        </Flex>
        )
    }));
  
    // Accessor to get a data in user object
    const tableColumns = [
      {
        Header: "Matrícula",
        accessor: "plate"
      },
      {
        Header: "Marca",
        accessor: "brand"
      },
      {
        Header: "Modelo",
        accessor: "model"
      },
      {
        Header: "Cliente",
        accessor: "client"
      },
      {
        Header: "",
        accessor: "action"
      }
    ];
    return(
        <>
        <Flex justify='end'>
            <Button variant='primary' 
            onClick = {()=>{setCar(); onOpen() } }
            >Crear</Button>
        </Flex>
        {data&&
            <Table
            // Fallback component when list is empty
            colorScheme={'brand'}
            emptyData={{
                    text: "Nobody is registered here."
            }}
            totalRegisters={data?.length}
            page={page}
            // Listen change page event and control the current page using state
            onPageChange={(page) => setPage(page)}
            columns={tableColumns}
            data={tableData}
            />
        }
        
        {isLoading&&
            <Text>
                Cargando...
            </Text>
        }
        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{car?'Editar':'Crear'} Coche</DrawerHeader>                
            <CarForm car={car} onClose={onClose} />
            </DrawerContent>
        </Drawer>  
        </>
    )
}

