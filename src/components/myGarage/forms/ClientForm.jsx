import { Button, useToast, Flex,VStack} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'

//forms validation
import * as Yup from 'yup';
import {Formik} from "formik";
import TextField from '../../forms/TextField'

//api
import { useMutation } from '@tanstack/react-query';
import { createClient } from '../../../api/clientsApi';

export default function ClientForm({onClose, client}){
    
    const toast = useToast()

    const {isLoading, mutate} = useMutation(
        ["createClient"],
        createClient,
        {
        onSuccess: (data) => {
            toast({title: 'Creado con exito!',status:"success"})
            console.log(data)
        },
        onError : (error)=>{
            toast({title: error.message, description: error.response?.data.message ,status:"error"})
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
            console.log(values)
            mutate(values);
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
              <Button colorScheme='orange' color='orange' size='sm' onClick={formik.handleSubmit} loadingText='Guardando'>  Guardar </Button>
          </Flex>  
        </DrawerFooter>
        </>
            )}
        </Formik>
    )
}

