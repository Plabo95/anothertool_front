import { Button, useToast, Flex,VStack, Text} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'

//forms validation
import * as Yup from 'yup';
import {Formik} from "formik";
import TextField from '../../forms/TextField'
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
            toast({title: error.message, description: error.code ,status:"error"})
        }
        }
    );


    return(
        <Formik
        initialValues= {{name: client? client.name : '' ,car: client? client.car: '',telf: client? client.telf: '',moroso: client? client.moroso: false }}
        validationSchema = {Yup.object({
            name: Yup.string().required("Nombre es obligatorio"),
            //car: Yup.string().required("Coche es obligatorio"),
            telf: Yup.string().required("Coche es obligatorio")
            .min(9, "Debe ser de 9 dígitos")
            .max(9, "Debe se de 9 dígitos"),
        })}
        onSubmit={(values) => {
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
            }}
        >
        {formik => (
        <>
        <DrawerBody>        
            <VStack as="form" >
                <TextField label="Nombre" name="name" />
                <TextField label="Coche" name="car" />
                <TextField label="Teléfono" name="telf" />
            </VStack>     
        </DrawerBody>
        <DrawerFooter>
          <Flex justify="right" columnGap="3" mt='3'>
              <Button variant='ghost' colorScheme='red' size='sm' onClick={onClose}>Cancelar</Button>
              <Button size='sm' 
              variant ='primary-s'
              onClick={formik.handleSubmit} isLoading={isLoading} >  Guardar </Button>
          </Flex>  
        </DrawerFooter>
        </>
            )}
        </Formik>
    )
}

