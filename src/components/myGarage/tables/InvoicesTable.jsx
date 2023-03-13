import { useMemo, useState } from 'react';
import {useToast, useDisclosure, Flex, Button, Text, Badge} from '@chakra-ui/react'
import {Table} from "react-chakra-pagination";
import moment from 'moment';
//comps
import InvoiceStatusBadge from '../../invoices/InvoiceStatusBadge';
//icons
import {BsTrash} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'
//api
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllInvoices } from "../../../api/invoicesApi";
//auth
import { useAuthHeader } from 'react-auth-kit';

export default function InvoicesTable(){
    
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [page, setPage] = useState(1);
    const authHeader = useAuthHeader()

    const {data: invoices, isLoading} = useQuery({
        queryKey: ['invoices'],
        queryFn: () => getAllInvoices(authHeader()),
    })
    const tableData = useMemo( 
        () => (
            invoices?.map((invoice) => ({
                number: invoice.invoice_number,
                date: moment(invoice.date).format('L'),
                expiring: invoice.expiring_date?
                    moment(invoice.expiring_date).format('L')
                    :'Sin Fecha',
                status: <InvoiceStatusBadge status={invoice.status} />,
                action: (
                <Flex gap='1em' key={invoice.id}>
                    <Button>
                        <AiOutlineEdit size='20px' color='blue'/>
                    </Button>
                    <Button>
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
        </>  
    )
}