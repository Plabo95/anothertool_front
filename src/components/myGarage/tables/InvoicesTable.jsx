import { useMemo, useState } from 'react';
import {useToast, useDisclosure, Flex, Button, Text, Badge} from '@chakra-ui/react'
import {Table} from "react-chakra-pagination";
import moment from 'moment';
//comps
import InvoiceStatusBadge from '../../invoices/InvoiceStatusBadge';
import InvoiceModal from '../../invoices/form/InvoiceModal'
//icons
import {BsTrash} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'
//api
import useAuthQuery from '../../../myHooks/useAuthQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllInvoices, deleteInvoice } from "../../../api/invoicesApi";
//auth
import { useAuthHeader } from 'react-auth-kit';

export default function InvoicesTable(){
    
    const toast = useToast()
    const [invoice, setInvoice] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [page, setPage] = useState(1);
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()

    const {data: invoices, isLoading} = useAuthQuery({
        queryKey: ['invoices'],
        queryFn: () => getAllInvoices(authHeader()),
    })

    const {isLoading:ld, mutate} = useMutation(
        ["deleteInvoice"],
        deleteInvoice,
        {
        onSuccess: () => {
            toast({title: 'Borrado con exito!',status:"success"})
            QueryClient.invalidateQueries(["invoices"]);
            QueryClient.refetchQueries("invoices", {force:true})
            onClose()
        },
        onError : (error)=>{
            toast({title: error.message, description: error.code ,status:"error"})
        }
        }
    );

    const tableData = useMemo( 
        () => (
            invoices?.map((invoice) => ({
                number: invoice.invoice_number,
                date: moment(invoice.date).format('L'),
                expiring: invoice.expiring_date?
                    moment(invoice.expiring_date).format('L')
                    :'Sin Fecha',
                taxes: invoice.taxes,
                total: invoice.total,
                status: <InvoiceStatusBadge status={invoice.status} />,
                action: (
                <Flex gap='1em' key={invoice.id}>
                    <Button onClick={() => {setInvoice(invoice);  onOpen()}}>
                        <AiOutlineEdit size='20px' color='blue'/>
                    </Button>
                    <Button isLoading={ld} 
                    onClick={() => mutate({slug:invoice.id, token:authHeader() })}
                    >
                        <BsTrash size='20px' color='red'/>
                    </Button>
                </Flex>
                )
            }))
        ),
        [invoices]
    )
    const tableColumns = useMemo(
        () => [
          {
            Header: 'Nº Factura',
            accessor: 'number', // accessor is the "key" in the data
          },
          {
            Header: 'Creada',
            accessor: 'date',
          },
          {
            Header: 'Expira',
            accessor: 'expiring',
          },
          {
            Header: 'IVA (€)',
            accessor: 'taxes',
          },
          {
            Header: 'Total (€)',
            accessor: 'total',
          },
          {
            Header: 'Estado',
            accessor: 'status',
          },
          {
            Header: '',
            accessor: 'action',
          },
        ],
        []
    )

    return(
        <>
        {invoices&&
            <Table
            // Fallback component when list is empty
            colorScheme={'brand'}
            emptyData={{
                    text: "Nobody is registered here."
            }}
            totalRegisters={invoices?.length}
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
        <InvoiceModal invoice={invoice} onClose={onClose} isOpen={isOpen} />
        </>  
    )
}