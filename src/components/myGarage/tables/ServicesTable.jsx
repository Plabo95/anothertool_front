import { useState } from 'react';
import {useToast, Flex, Button, Text} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure} from '@chakra-ui/react'
import {Table} from "react-chakra-pagination";
//comps
import ClientForm from '../forms/ClientForm';
//icons
import {BsTrash} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'
//api
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllServices, deleteService } from '../../../api/servicesApi';
//auth
import { useAuthHeader } from 'react-auth-kit';


export default function ServicesTable(){

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [page, setPage] = useState(1);
    const [service, setService] = useState()
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()


    const {data, isLoading} = useQuery({
        queryKey: ['services'],
        queryFn: () => getAllServices(authHeader()),
    })

    const {isLoading:ld, mutate} = useMutation(
        ["deleteService"],
        deleteService,
        {
        onSuccess: () => {
            toast({title: 'Borrado con exito!',status:"success"})
            QueryClient.invalidateQueries(["services"]);
            QueryClient.refetchQueries("services", {force:true})
            onClose()
        },
        onError : (error)=>{
            toast({title: error.message, description: error.code ,status:"error"})
        }
        }
    );

    // Formatter for each user
    const tableData = data?.map((service) => ({
        name: service.name,
        color: service.color,
        duration: service.estimed_hours,
        baseprice: service.baseprice,
        action: (
        <Flex gap='1em' key={service.id}>
            <Button onClick={() => {setService(service);  onOpen()}}>
                <AiOutlineEdit size='20px' color='blue'/>
            </Button>
            <Button
            isLoading={ld} 
            onClick={() => mutate({slug:service.id, token:authHeader() })   }>
                <BsTrash size='20px' color='red'/>
            </Button>
        </Flex>
        )
    }));
  
    // Accessor to get a data in user object
    const tableColumns = [
      {
        Header: "Nombre",
        accessor: "name"
      },
      {
        Header: "Color",
        accessor: "color"
      },
      {
        Header: "Tiempo estimado",
        accessor: "duration"
      },
      {
        Header: "Precio estimado",
        accessor: "baseprice"
      },
      {
        Header: "",
        accessor: "action"
      }
    ];
    console.log(data)
    return(
        <>
        <Flex justify='end'>
            <Button variant='primary' 
            onClick = {()=>{setService(); onOpen() } }
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
            <DrawerHeader>{service?'Editar':'Crear'} Cliente</DrawerHeader>                
            <ClientForm service={service} onClose={onClose} />
            </DrawerContent>
        </Drawer>  
        </>
    )
}

