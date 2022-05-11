import React, {useState} from 'react'
import { Button, useToast, Flex,VStack} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'
import * as Yup from 'yup';
import {Formik} from "formik";
import TextField from '../forms/TextField'
import {SwitchControl} from "formik-chakra-ui";

export default function Register(){

    const toast = useToast()
    const[loadingCreate, setLoadingCreate] = useState(false)

    const handleSubmit = async(values) => {
        setLoadingCreate(true)
            const userToRegister ={
                    'email': values.email,
                    'username': values.username,
                    'password': values.password,
                    'password2': values.password2,
            }
        const response = await fetch('http://127.0.0.1:8000/api/register/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userToRegister)
            })
        const rstatus = response.status
        if(rstatus >= 200 && rstatus<300){
            toast({
            title: 'Registro exitoso',
            status: 'success',
            duration: 6000,
            isClosable: true,
            })
            setLoadingCreate(false) 
            }
            else{
                toast({
                    title: 'Error al guardar ',
                    description: "Código de error"+ rstatus +' intentalo mas tarde' ,
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                    })
                setLoadingCreate(false)
                }
        }


    return(
        <Flex w='100%'>
        <Formik
        initialValues = {{
            email: "",
            username: "",
            password: "",
            password2: "",
        }
    }
        validationSchema = {Yup.object({
            email: Yup.string().required("Nombre es obligatorio"),
            username: Yup.string().required("Nombre es obligatorio"),
            password: Yup.string().required("Coche es obligatorio"),
            password2: Yup.string().required("Coche es obligatorio"),
        })}
        onSubmit= {(values, actions) => {
            alert(JSON.stringify(values))
            handleSubmit(values)
            actions.resetForm()
        }}
        >
        {formik => (
        <Flex direction={'column'} w='100%' justify='space-around' align='center' >
        <VStack as="form" >
            <TextField label="Email" name="email" />
            <TextField label="Usuario" name="username" />
            <TextField label="Password" name="password" />
            <TextField label="Password2" name="password2" />
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