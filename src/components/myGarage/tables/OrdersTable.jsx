import { useState } from 'react';
import {useToast, Flex, Button, Text} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure} from '@chakra-ui/react'
import {Table} from "react-chakra-pagination";
//comps
import OrderForm from '../forms/OrderForm';
//icons
import {BsTrash} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'
//api
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllOrders, deleteOrder } from '../../../api/ordersApi';
//auth
import { useAuthHeader } from 'react-auth-kit';


export default function OrdersTable(){

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState()
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()


    const {data, isLoading} = useQuery({
        queryKey: ['orders'],
        queryFn: () => getAllOrders(authHeader()),
    })

    const {isLoading:ld, mutate} = useMutation(
        ["deleteOrder"],
        deleteOrder,
        {
        onSuccess: () => {
            toast({title: 'Borrado con exito!',status:"success"})
            QueryClient.invalidateQueries(["orders"]);
            QueryClient.refetchQueries("orders", {force:true})
            onClose()
        },
        onError : (error)=>{
            toast({title: error.message, description: error.code ,status:"error"})
        }
        }
    );

    // Formatter for each user
    const tableData = data?.map((order) => ({
        date_in: order.date_in,
        date_out: order.date_out,
        client_desc: order.client_desc,
        diagnostic: order.diagnostic,
        state : order.state,
        client : order.client,
        action: (
        <Flex gap='1em' key={order.id}>
            <Button onClick={() => {setOrder(order);  onOpen()}}>
                <AiOutlineEdit size='20px' color='blue'/>
            </Button>
            <Button
            isLoading={ld} 
            onClick={() => mutate({slug:order.id, token:authHeader() })   }>
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
            onClick = {()=>{setOrder(); onOpen() } }
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
            <DrawerHeader>{order?'Editar':'Crear'} Orden</DrawerHeader>                
            <OrderForm order={order} onClose={onClose} />
            </DrawerContent>
        </Drawer>  
        </>
    )
}
