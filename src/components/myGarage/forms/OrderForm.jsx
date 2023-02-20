import { Button, useToast, Flex, Text} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter,Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton, useDisclosure} from '@chakra-ui/react'
import moment from 'moment';
//comps
import CarForm from './CarForm'
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

export default function OrderForm({isOpen, onClose, order}){
    
    const { isOpen:isOpenCar, onOpen:onOpenCar, onClose:onCloseCar } = useDisclosure()
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
        <>
            <CarForm isOpen={isOpenCar} onClose={onCloseCar} />
            <Drawer
            size='lg'
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{order?'Editar':'Crear'} orden de trabajo</DrawerHeader> 
                    <Formik
                    initialValues= {initialValues}
                    validationSchema = {validationSchema}
                    onSubmit={(values)=>submit(values)}
                    >
                    {formik => (
                    <>
                    <DrawerBody>        
                        <Flex direction='column' as="form" gap='1em' >
                            <Flex align='end'>
                                <SelectField maxW='60%' label="Coche" name="car" choices={cars} error={error?.response.data?.car} />
                                <Button variant='primary' onClick={()=>onOpenCar()} >+ Crea uno</Button>
                            </Flex>
                            {cars.length===0 &&
                                <Flex mt='1em' align='center' gap='1em'>
                                    <Text fontSize='14px' color='red' >Aún no hay coches</Text>
                                    
                                </Flex>
                            }
                            <Flex w='100%' justify='space-between' >
                                <InputField label="Fecha entrada" name="date_in" type='datetime-local' maxW='220px' error={error?.response.data?.date_in} />
                                <InputField label="Fecha salida" name="date_out" type='datetime-local' maxW='220px' error={error?.response.data?.date_out} />
                            </Flex>
                            <InputField label="Descripción cliente" name="client_desc" type='textarea' />
                            {/* Si no hay order el status se pone por defecto en pending */}
                            {order&& 
                                <OptionsSelectField label="Estado" name="status" choices={options?.actions?.POST?.status?.choices} error={error?.response.data?.status}/>         
                            }
                        </Flex>     
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
                </DrawerContent>
            </Drawer>
        </>
    )
}

