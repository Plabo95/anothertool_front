import { Button, useToast, Flex,VStack, Text} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'

//forms validation
import * as Yup from 'yup';
import {Formik} from "formik";
import TextField from '../../forms/InputField'
//auth
import {useAuthHeader} from 'react-auth-kit'
//api
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateClient} from '../../../api/clientsApi';

export default function ClientForm({onClose, client}){
    
    const toast = useToast()
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()

    const {isLoading, mutate, error} = useMutation(
        ["createClient"],
        createUpdateClient,
        {
        onSuccess: () => {
            toast({title: 'Creado con exito!',status:"success"})
            QueryClient.invalidateQueries(["clients"]);
            QueryClient.refetchQueries("clients", {force:true})
            onClose()
        },
        onError : (error)=>{
            console.log(error)
            toast({title: error.message, description: error.code ,status:"error"})
        }
        }
    );
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    
    const initialValues = {
        name: client? client.name : '' ,
        phone: client? client.phone: '',
        email: client? client.email: '',  
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Nombre es obligatorio"),
        phone: Yup.string().matches(phoneRegExp, 'Teléfono no válido').min(9).required("Teléfono es obligatorio"), 
        email: Yup.string().email().required("Email es obligatorio"),
    })

    const submit = (values) => {
        var payload = {}
        if (client) {
            payload = {
                data: values,
                slug: client.id,
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
                <TextField label="Nombre" name="name" />
                <TextField label="Telefono" name="phone" />
                {error && 
                    <Text color='red' fontSize='14px' fontWeight='bold'> {error.response.data?.phone} </Text>
                }
                <TextField label="Email" name="email" />
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
              isDisabled={JSON.stringify(formik.errors) !== '{}' | JSON.stringify(formik.touched) == '{}'}
              onClick={formik.handleSubmit} isLoading={isLoading} >  Guardar </Button>
          </Flex>  
        </DrawerFooter>
        </>
            )}
        </Formik>
    )
}

