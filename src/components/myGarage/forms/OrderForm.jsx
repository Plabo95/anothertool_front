import { Button, useToast, Flex,VStack, Text} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'

//forms validation
import * as Yup from 'yup';
import {Formik} from "formik";
import InputField from '../../forms/InputField'
import SelectField from '../../forms/SelectField'
import OptionsSelectField from '../../forms/OptionsSelectField';
//auth
import {useAuthHeader} from 'react-auth-kit'
//api
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createUpdateOrder, getOrderOptions } from '../../../api/ordersApi';
import { getAllClients } from '../../../api/clientsApi';

export default function OrderForm({onClose, order}){
    
    const toast = useToast()
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()

    const {data:options} = useQuery({
        queryKey: ['orderOptions'],
        queryFn: () => getOrderOptions(authHeader()),
    })
    const {data:clients} = useQuery({
        queryKey: ['clients'],
        queryFn: () => getAllClients(authHeader()),
    })
    const {isLoading, mutate, error} = useMutation(
        ["createOrder"],
        createUpdateOrder,
        {
        onSuccess: () => {
            toast({title: 'Creado con exito!',status:"success"})
            QueryClient.invalidateQueries(["orders"]);
            QueryClient.refetchQueries("orders", {force:true})
            onClose()
        },
        onError : (error)=>{
            toast({title: error.message, description: error.code ,status:"error"})
        }
        }
    );    
    const initialValues = {
        date_in: order? order.date_in:'',
        date_out: order? order.date_out:'',
        client_desc: order? order.desc:'',
        diagnostic: order? order.diagnostic:'',
        state :  order? order.state:'',
        client : order? order.client:'',
    }
    const validationSchema = Yup.object({
        date_in: Yup.string().required('Obligatorio asignar fecha de entrada'),
        client: Yup.string().required('Debes asociarlo a un cliente'), 
    })

    const submit = (values) => {
        var payload = {}
        if (order) {
            payload = {
                data: values,
                slug: order.id,
                token: authHeader()
            }
        }
        else{
            payload = {
                data: values,
                token: authHeader()
            }
        }
        mutate(payload);
    }

    return(
        <Formik
        initialValues= {initialValues}
        validationSchema = {validationSchema}
        onSubmit={(values)=>submit(values)}
        >
        {formik => (
        <>
        <DrawerBody>        
            <VStack as="form" >
                <InputField label="Fecha entrada" name="date_in" type='datetime-local' />
                {error && 
                    <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.date_in} </Text>
                }
                <InputField label="Fecha salida" name="date_out" type='datetime-local' />
                {error && 
                    <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.date_out} </Text>
                }
                <InputField label="Descripción cliente" name="client_desc" type='textarea' />
                <SelectField label="Cliente" name="client" choices={clients} />
                {error && 
                    <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.state} </Text>
                }
                <OptionsSelectField label="Estado" name="state" choices={options?.actions?.POST?.state?.choices} />
                {error && 
                    <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.phone} </Text>
                }
                {error && 
                    <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.email} </Text>
                }
            </VStack>     
        </DrawerBody>
        <DrawerFooter>
          <Flex justify="right" columnGap="3" mt='3'>
              <Button variant='ghost' colorScheme='red' size='sm' onClick={onClose}>Cancelar</Button>
              <Button size='sm' 
              variant ='primary-s'
              isDisabled={JSON.stringify(formik.errors) !== '{}' | JSON.stringify(formik.touched) === '{}'}
              onClick={formik.handleSubmit} isLoading={isLoading} >  Guardar </Button>
          </Flex>  
        </DrawerFooter>
        </>
            )}
        </Formik>
    )
}

