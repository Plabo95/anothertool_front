import { Button, useToast, Flex,VStack, Text, Select, FormControl} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'
//forms validation
import * as Yup from 'yup';
import {Formik} from "formik";
import TextField from '../../forms/TextField'
import SelectField from '../../forms/SelectField';
//auth
import {useAuthHeader} from 'react-auth-kit'
//api
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createUpdateCar } from '../../../api/carsApi';
import { getAllClients } from '../../../api/clientsApi';

export default function CarForm({onClose, car}){
    
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
        <Formik
        initialValues= {initialValues}
        validationSchema = {validationSchema}
        onSubmit={(values)=>submit(values)}
        >
        {formik => (
        <>
        <DrawerBody>        
            <VStack as="form" >
                <TextField label="Matrícula" name="plate" />
                {error && 
                    <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.plate} </Text>
                }
                <TextField label="Marca" name="brand" />
                {error && 
                    <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.brand} </Text>
                }
                <TextField label="Modelo" name="model" />
                {error && 
                    <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.model} </Text>
                }
                <SelectField label="Cliente" name="client" choices={clients} />
            </VStack>     
        </DrawerBody>
        <DrawerFooter>
          <Flex justify="right" columnGap="3" mt='3'>
              <Button variant='ghost' colorScheme='red' size='sm' onClick={onClose}>Cancelar</Button>
              <Button size='sm' 
              variant ='primary-s'
              isDisabled={JSON.stringify(formik.errors) !== '{}' | JSON.stringify(formik.touched) == '{}'}
              onClick={formik.handleSubmit} isLoading={isLoading} >  Guardar </Button>
          </Flex>  
        </DrawerFooter>
        </>
            )}
        </Formik>
    )
}
