import { useState } from 'react';
import {useToast, useDisclosure, Flex, Button, Text} from '@chakra-ui/react'
import {Table} from "react-chakra-pagination";
//comps
import ClientForm from '../forms/ClientForm';
//icons
import {BsTrash} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'
//api
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllClients, deleteClient } from '../../../api/clientsApi';
//auth
import { useAuthHeader } from 'react-auth-kit';


export default function ClientsTable(){

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [page, setPage] = useState(1);
    const [client, setClient] = useState()
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()


    const {data, isLoading} = useQuery({
        queryKey: ['clients'],
        queryFn: () => getAllClients(authHeader()),
    })

    const {isLoading:ld, mutate} = useMutation(
        ["deleteClient"],
        deleteClient,
        {
        onSuccess: () => {
            toast({title: 'Borrado con exito!',status:"success"})
            QueryClient.invalidateQueries(["clients"]);
            QueryClient.refetchQueries("clients", {force:true})
            onClose()
        },
        onError : (error)=>{
            toast({title: error.message, description: error.code ,status:"error"})
        }
        }
    );

    // Formatter for each user
    const tableData = data?.map((client) => ({
        name: client.name,
        phone: client.phone,
        email: client.email,
        moroso: client.moroso?'Si':'No',
        action: (
        <Flex gap='1em' key={client.id}>
            <Button onClick={() => {setClient(client);  onOpen()}}>
                <AiOutlineEdit size='20px' color='blue'/>
            </Button>
            <Button
            isLoading={ld} 
            onClick={() => mutate({slug:client.id, token:authHeader() })   }>
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
        Header: "Email",
        accessor: "email"
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
        <Flex justify='end'>
            <Button variant='primary' 
            onClick = {()=>{setClient(); onOpen() } }
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
        <ClientForm client={client} onClose={onClose} isOpen={isOpen} />
        </>
    )
}

