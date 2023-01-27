import { useState } from 'react';
import {useToast, Flex, Button, Avatar, Text} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure, Switch} from '@chakra-ui/react'
import {Table} from "react-chakra-pagination";
//comps
import ClientForm from '../forms/ClientForm';
//icons
import {BsTrash} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'
//api
import { useQuery } from '@tanstack/react-query';
import { getAllClients } from '../../../api/clientsApi';
//auth
import { useAuthHeader } from 'react-auth-kit';


export default function ClientsTable(){

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [page, setPage] = useState(1);
    const [client, setClient] = useState()
    const authHeader = useAuthHeader()
    
    const {data, isLoading} = useQuery({
        queryKey: ['clients'],
        queryFn: () => getAllClients(authHeader()),
    })

    // Formatter for each user
    const tableData = data?.map((client) => ({
        key: client.id,
        name: client.name,
        phone: client.telf,
        moroso: client.moroso?'Si':'No',
        action: (
        <Flex gap='1em'>
            <Button onClick={() => {setClient(client);  onOpen()}}>
                <AiOutlineEdit size='20px' color='blue'/>
            </Button>
            <Button onClick={() => console.log("remove user!")}>
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
        Header: "Teléfono",
        accessor: "phone"
      },
      {
        Header: "Moroso",
        accessor: "moroso"
      },
      {
        Header: "",
        accessor: "action"
      }
    ];
    return(
        <>
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
            <DrawerHeader>Crear Cliente</DrawerHeader>                
            <ClientForm client={client} onClose={onClose} />
            </DrawerContent>
        </Drawer>  
        </>
    )
}

