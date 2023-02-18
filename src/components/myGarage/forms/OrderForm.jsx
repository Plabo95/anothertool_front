import { Button, useToast, Flex,VStack, Text} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'
import moment from 'moment';
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
import { getAllCars } from '../../../api/carsApi';

export default function OrderForm({onClose, order}){
    
    const toast = useToast()
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()

    const {data:options} = useQuery({
        queryKey: ['orderOptions'],
        queryFn: () => getOrderOptions(authHeader()),
    })
    const {data:cars} = useQuery({
        queryKey: ['cars'],
        queryFn: () => getAllCars(authHeader()),
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
        date_in: order? moment(order.date_in).format("YYYY-MM-DD HH:MM"):'',
        date_out: order? moment(order.date_out).format("YYYY-MM-DD HH:MM"):'',
        client_desc: order? order.desc:'',
        diagnostic: order? order.diagnostic:'',
        status :  order? order.status:'pending',
        car : order? order.car.id:'',
    }
    const validationSchema = Yup.object({
        date_in: Yup.string().required('Obligatorio asignar fecha de entrada'),
        car: Yup.number().required('Debes asociarlo a un coche'), 
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
                <Flex w='100%' justify='space-between' >
                    <InputField label="Fecha entrada" name="date_in" type='datetime-local' />
                    {error && 
                        <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.date_in} </Text>
                    }
                    <InputField label="Fecha salida" name="date_out" type='datetime-local' />
                    {error && 
                        <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.date_out} </Text>
                    }
                </Flex>

                <InputField label="Descripción cliente" name="client_desc" type='textarea' />
                <SelectField label="Coche" name="car" choices={cars}/>
                {error && 
                    <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.car} </Text>
                }
                {formik.errors?.car && 
                    <Text color='red' fontSize='14px' fontWeight='bold'> {formik.errors.car} </Text>
                }
                {/* Si no hay order el status se pone por defecto en pending */}
                {order&& 
                    <> 
                    <OptionsSelectField label="Estado" name="status" choices={options?.actions?.POST?.status?.choices} />
                    {error && 
                        <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.status} </Text>
                    }
                    </>
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

