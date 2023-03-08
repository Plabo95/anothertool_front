import {Text,Flex,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,} from '@chakra-ui/react'
import moment from 'moment';
//comps
import InvoiceItemRow from './InvoiceItemRow';
//forms validation
import * as Yup from 'yup';
import {Formik, Field, FieldArray} from "formik";
import SelectField from '../../forms/SelectField';
import InputField from '../../forms/InputField';
//api
import {useQuery } from '@tanstack/react-query';
import { getAllClients } from '../../../api/clientsApi';
//auth
import {useAuthHeader} from 'react-auth-kit'

export default function InvoiceModal({order, isOpen, onClose}){

    const authHeader = useAuthHeader()

    const {data:clients} = useQuery({
        queryKey: ['clients'],
        queryFn: () => getAllClients(authHeader()),
    })

    const initialValues = {
        date: moment().format("YYYY-MM-DD HH:MM"),
        client: order?.car.client,
        item: [
            {
            concept: '',
            price: '',
            }
        ], 
    }
    const validationSchema = Yup.object({
        client : Yup.string().required()
    })

    const submit = (values) => {
        console.log(values)
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
                                    <Button variant='primary' onClick={() => arrayHelpers.push('')}>
                                    Add +
                                    </Button>
                                </Flex>
                                {formik.values.item && formik.values.item.length > 0 ? (
                                    formik.values.item.map((item, index) => (
                                    <>
                                    <InvoiceItemRow formik={formik} index={index}  arrayHelpers={arrayHelpers} />
                                    </>
                                    ))
                                ) : (
                                  <Button type="button" onClick={() => arrayHelpers.push('')}>
                                    {/* show this when user has removed all friends from the list */}
                                    Add a friend
                                  </Button>
                                )}
                              </>
                            )} 
                            />

                            <Button variant='primary' maxW='30%' onClick={formik.handleSubmit}>Guardar</Button>
                        </Flex>
                        )}
                    </Formik>

                </ModalBody>
            </ModalContent>
      </Modal>

    )
}