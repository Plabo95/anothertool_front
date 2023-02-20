import { useState } from 'react';
import {useToast, Flex, Button, Text, useDisclosure} from '@chakra-ui/react'
import {Table} from "react-chakra-pagination";
import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
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
        date_in: moment(order.date_in).format('l'),
        date_out: moment(order.date_out).format('l'),
        state : order.status,
        car: order.car.plate,
        client : order.car.client_name,
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
        Header: "Fecha entrada",
        accessor: "date_in"
      },
      {
        Header: "Fecha salida",
        accessor: "date_out"
      },
      {
        Header: "Estado",
        accessor: "state"
      },
      {
        Header: "Coche",
        accessor: "car"
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
        <Flex direction='column'>
            <Flex justify='end'>
                <Button variant='primary' 
                onClick = {()=>{setOrder(); onOpen() } }
                >Crear</Button>
            </Flex>
            {data&&
                <Table
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
            <OrderForm  isOpen={isOpen} order={order} onClose={onClose} />
        </Flex>
    )
}

