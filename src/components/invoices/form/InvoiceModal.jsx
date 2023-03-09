import { useState } from 'react';
import {useToast, Text,Flex,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton,} from '@chakra-ui/react'
import moment from 'moment';
//comps
import InvoiceItemRow from './InvoiceItemRow';
//forms validation
import * as Yup from 'yup';
import {Formik, FieldArray} from "formik";
import SelectField from '../../forms/SelectField';
import InputField from '../../forms/InputField';
//api
import {useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllClients } from '../../../api/clientsApi';
import { getInvoiceOptions, createUpdateInvoice } from '../../../api/invoicesApi';
//auth
import {useAuthHeader} from 'react-auth-kit'

export default function InvoiceModal({order, isOpen, onClose}){

    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()
    const toast = useToast()

    const [subtotal, setSubtotal] = useState(0)
    const [taxes, setTaxes] = useState(0)
    const [total, setTotal] = useState(0)

    const {isLoading, mutate, error} = useMutation(
        ["createInvoice"],
        createUpdateInvoice,
        {
        onSuccess: () => {
            toast({title: 'Coche creado con exito!',status:"success"})
            QueryClient.invalidateQueries(["invoices"]);
            QueryClient.refetchQueries("invoices", {force:true})
            onClose()
        },
        onError : (error)=>{
            toast({title: error.message, description: error.code ,status:"error"})
        }
        }
    )
    const {data:clients} = useQuery({
        queryKey: ['clients'],
        queryFn: () => getAllClients(authHeader()),
    })

    const {data:options} = useQuery({
        queryKey: ['invoiceOptions'],
        queryFn: () => getInvoiceOptions(authHeader()),
    })
    const initialValues = {
        date: moment().format("YYYY-MM-DD HH:MM"),
        client: order?.car.client,
        item: [
            {
            concept: '',
            description: '',
            price: 0,
            quantity: 0,
            }
        ], 
    }
    const validationSchema = Yup.object({
        client : Yup.number().required()
    })

    const submit = (values) => {
        console.log(values)
        const payload = {
            data: values,
            token: authHeader()
        }
        mutate(payload)
    }
    const calculateTotals = (items) => {
        setSubtotal(items.reduce((prev,curr) => prev + curr.price * curr.quantity , 0 ))
        setTaxes ((items.reduce((prev,curr) => {
            if(curr.tax=='ten'){
                return (prev + curr.price * curr.quantity * 0.1)
            }
            else if(curr.tax=='twenty'){
                return prev + curr.price * curr.quantity * 0.21
            }
            else return 0
        } 
        , 0 )).toFixed(2)
        )
        setTotal(subtotal+ taxes)
    }
    return(
        <Modal isOpen={isOpen} onClose={onClose} size='6xl' >
            <ModalOverlay />
                <ModalContent  bg='lightgrey'>
                <ModalHeader>Crear factura</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Formik
                    initialValues= {initialValues}
                    validationSchema = {validationSchema}
                    onSubmit={(values)=>submit(values)}
                    >
                        {formik => (
                        calculateTotals(formik.values.item),
                        <Flex direction='column' gap = '1em'>
                            {/* Basic data section */}
                            <Flex gap='1em' bg='white' p='0.5em' rounded='sm'>
                                <Flex direction='column' >
                                    <SelectField label="Cliente" name="client" choices={clients} />
                                    {clients.length===0 &&
                                    <Flex mt='1em' align='center' gap='1em'>
                                        <Text fontSize='14px' color='red' >Aún no hay clientes</Text>
                                        <Button size='sm' variant='primary' >+ Crea uno</Button>
                                    </Flex>
                                    }
                                </Flex>
                                <Flex >
                                    <InputField name='date' label='Fecha' type='datetime-local'/>
                                </Flex>
                                <Flex>
                                    <InputField name='expiring_date' label='Expira' type='datetime-local'/>
                                </Flex>
                                <Flex>
                                    <InputField name='invoice_number' label='Nº Factura' />
                                </Flex>
                            </Flex>
                            

                            <FieldArray name='item'
                            render = {arrayHelpers => (
                                <>
                                <Flex justify='space-between' align='center'>
                                    <Text fontSize='16px' >Items</Text>
                                    <Button variant='primary' onClick={() => arrayHelpers.push({quantity: 0, price: 0})}>
                                    Add +
                                    </Button>
                                </Flex>
                                {formik.values.item && formik.values.item.length > 0 ? (
                                    formik.values.item.map((item, index) => (
                                    <>
                                    <InvoiceItemRow formik={formik}
                                        index={index} 
                                        taxes = {options?.actions?.POST?.item?.child?.children?.tax.choices}
                                        arrayHelpers={arrayHelpers} />
                                    </>
                                    ))
                                ) : (
                                  <Button onClick={() => arrayHelpers.push('')}>
                                    Add item
                                  </Button>
                                )}
                              </>
                            )} 
                            />
                            <Flex align='center' justify='space-evenly' gap='1em'>
                                <Text>Subtotal: {subtotal} </Text>
                                <Text>IVA: {taxes} </Text> 
                                <Text>Total: {total} </Text>  
                                <Button variant='primary' maxW='30%' onClick={formik.handleSubmit}>Guardar</Button>   
                            </Flex>
                        </Flex>
                        )}
                    </Formik>

                </ModalBody>
            </ModalContent>
      </Modal>

    )
}