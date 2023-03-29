import { Button, useToast, Flex,VStack, Text, Drawer,DrawerHeader,DrawerOverlay,
    DrawerContent,DrawerCloseButton,DrawerBody,DrawerFooter, useDisclosure} from '@chakra-ui/react'
//comps
import ClientForm from './ClientForm'
//forms validation
import * as Yup from 'yup';
import {Formik} from "formik";
import InputField from '../../forms/InputField'
import SelectField from '../../forms/SelectField';
//auth
import {useAuthHeader} from 'react-auth-kit'
//api
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createUpdateCar } from '../../../api/carsApi';
import { getAllClients } from '../../../api/clientsApi';

export default function CarForm({onClose,isOpen, car}){
    
    const { isOpen:isOpenClient, onOpen:onOpenClient, onClose:onCloseClient } = useDisclosure()
    const toast = useToast()
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()

    const {data:clients} = useQuery({
        queryKey: ['clients'],
        queryFn: () => getAllClients(authHeader()),
    })

    const {isLoading, mutate, error} = useMutation(
        ["createCar"],
        createUpdateCar,
        {
        onSuccess: () => {
            toast({title: 'Coche creado con exito!',status:"success"})
            QueryClient.invalidateQueries(["cars"]);
            QueryClient.refetchQueries("cars", {force:true})
            onClose()
        },
        onError : (error)=>{
            toast({title: error.message, description: error.code ,status:"error"})
        }
        }
    )
    
    const initialValues = {
        plate: car? car.plate : '' ,
        brand: car? car.brand: '',
        model: car? car.model: '',
        client: car? car.client: '',  
    }
    const validationSchema = Yup.object({
        plate: Yup.string().required("La matrícula es obligatoria").min(7,'Demasiado corta').max(10,'Demasiado larga'),
        brand: Yup.string(), 
        model: Yup.string(),
        client: Yup.string().required("Debes asociarlo a un cliente"),
    })

    const submit = (values) => {
        var payload = {}
        if (car) {
            payload = {
                data: values,
                slug: car.id,
                token: authHeader()
            }
        }
        else{
            payload = {
                data: values,
                token: authHeader()
            }
        }
        //console.log(payload)
        mutate(payload);
    }
    return(
        <>
            <ClientForm  isOpen={isOpenClient} onClose={onCloseClient} />
            <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{car?'Editar':'Crear'} Coche</DrawerHeader>    
                <Formik
                initialValues= {initialValues}
                validationSchema = {validationSchema}
                onSubmit={(values)=>submit(values)}
                >
                {formik => (
                <>
                <DrawerBody>        
                    <VStack as="form" >
                        <InputField  label="Matrícula" name="plate" error={error?.response?.data?.plate} />
                        <InputField label="Marca" name="brand" error={error?.response?.data?.brand} />
                        <InputField label="Modelo" name="model" error={error?.response?.data?.model}/>
                        <SelectField label="Cliente" name="client" choices={clients} error={error?.response?.data?.clients} />
                        {clients?.length===0 &&
                            <Flex mt='1em' align='center' gap='1em'>
                                <Text fontSize='14px' color='red' >Aún no hay clientes</Text>
                                <Button size='sm' variant='primary' onClick={()=>onOpenClient()} >+ Crea uno</Button>
                            </Flex>
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
            </DrawerContent>
        </Drawer>
    </>      
    )
}
