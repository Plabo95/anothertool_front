import React, {useState, useContext} from 'react'
import { Button, useToast, Flex,VStack} from '@chakra-ui/react'
import * as Yup from 'yup';
import {Formik} from "formik";
import TextField from '../forms/TextField'
import AuthContext from '../auth/AuthContext';

export default function Login(){

    const toast = useToast()
    const[loadingCreate, setLoadingCreate] = useState(false)
    const {loginUser} = useContext(AuthContext)

    return(
        <Flex w='100%'>
        <Formik
        initialValues = {{
            username: "",
            password: "",
            }
        }
        validationSchema = {Yup.object({
            username: Yup.string().required("Nombre es obligatorio"),
            password: Yup.string().required("Coche es obligatorio"),
        })}
        onSubmit= {(values, actions) => {
            //alert(JSON.stringify(values))
            loginUser(values)                 //es la funcion de login que esta en authcontext
            actions.resetForm()
        }}
        >
        {formik => (
        <Flex direction={'column'} w='100%' justify='space-around' align='center' >
        <VStack as="form" >
            <TextField label="Usuario" name="username" />
            <TextField label="Password" name="password" />
        </VStack>      
        <Flex justify="right" columnGap="3" mt='3'>
            <Button variant='ghost' colorScheme='red' size='sm' >Cancelar</Button>
            <Button colorScheme='orange' size='sm' onClick={formik.handleSubmit} isLoading={loadingCreate}  loadingText='Guardando'>  Guardar </Button>
        </Flex>  
        </Flex>
            )}
        </Formik>
        </Flex>
    )

}