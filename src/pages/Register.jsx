import React, {useState} from 'react'
import { Button, useToast, Flex,VStack, Text,Heading} from '@chakra-ui/react'
import * as Yup from 'yup';
import {Formik} from "formik";
import TextField from '../forms/TextField'
import {SwitchControl} from "formik-chakra-ui";
import {useNavigate} from 'react-router-dom'
import {CheckboxSingleControl}  from "formik-chakra-ui";

import bg from '../assets/register_bg.png'

export default function Register(){

    const navigate = useNavigate();
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
        <Flex w='100%' minH='100vh' direction='column' backgroundImage={bg}>
            
            <Flex height='8vh' w='100%' p='1%' align='center'>
                <Flex w='50%' justify='start' ml='3%'>
                    <Flex onClick={() => navigate('/klndr_front/')} cursor='pointer' >
                        <Heading size='md' >another</Heading><Heading size='md' color={'blue'}>tool</Heading>
                    </Flex>
                </Flex>
                <Flex w='50%' justify='end' gap='10' align='center' mr='3%' >
                    <Text fontWeight='bold' >¿Ya tienes una cuenta?</Text>
                    <Button bg='blue' color='white' size='sm'
                    onClick={() => navigate('/klndr_front/login')}
                    >Iniciar Sesión</Button>
                </Flex>
            </Flex>

            <Flex justify='center' align='center' w='100%'>
                <Flex py='5%'  w='20%' direction='column' align='center' gap='5'>
                    <Flex><Heading size='lg' >another</Heading><Heading size='lg' color={'blue'}>tool</Heading></Flex>
                    <Flex bg='white' w='100%' rounded='xl' direction='column' align='center'  gap='3' py='12%'>
                        <Heading size='md'> ¡Bienvenido! </Heading>
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
                            //alert(JSON.stringify(values))
                            handleSubmit(values)
                            actions.resetForm()
                        }}
                        >
                        {formik => (
                        <Flex as="form" direction={'column'} w='80%' justify='space-around' align='center' gap='3'>
                            <TextField placeholder="Correo electrónico" name="email" />
                            <TextField placeholder="Usuario" name="username" />
                            <TextField placeholder="Contraseña" name="password" />
                            <TextField placeholder="Repite Contraseña" name="password2" />
                            <CheckboxSingleControl name="record">
                                <Text fontSize='xs' fontWeight='hairline'  >
                                Estoy de acuerdo con los términos del servicio y la política
                                de privacidad 
                                </Text>              
                            </CheckboxSingleControl>
                            <Button mt='8' bgColor='blue' color='white' size='md' onClick={formik.handleSubmit} isLoading={loadingCreate}  loadingText='Iniciando...'>
                            Registrarse </Button>  
                        </Flex>
                            )}
                        </Formik>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )

}