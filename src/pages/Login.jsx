import React, {useState, useContext} from 'react'
import { Button, useToast, Flex,VStack, Heading, Text} from '@chakra-ui/react'
import * as Yup from 'yup';
import {Formik} from "formik";
import {CheckboxSingleControl}  from "formik-chakra-ui";
import TextField from '../forms/TextField'
import AuthContext from '../auth/AuthContext';
import {useNavigate} from 'react-router-dom'

export default function Login(){

    const navigate = useNavigate();
    const toast = useToast()
    const[loadingCreate, setLoadingCreate] = useState(false)
    const {loginUser} = useContext(AuthContext)

    return(
        <Flex w='100%' minH='100vh' direction='column' >

            <Flex height='8vh' w='100%' p='1%' align='center'>
                <Flex w='50%' justify='start' ml='3%'>
                    <Flex><Heading size='md' >another</Heading><Heading size='md' color={'blue'}>tool</Heading></Flex>
                </Flex>
                <Flex w='50%' justify='end' gap='10' align='center' mr='3%' >
                    <Text fontWeight='bold' >¿Aún no tienes cuenta?</Text>
                    <Button bg='blue' color='white' 
                    onClick={() => navigate('/klndr_front/register')}
                    >Regístrate</Button>
                </Flex>
            </Flex>


            <Flex justify='center' align='center' w='100%'>
                <Flex py='5%'  w='20%' direction='column' align='center' gap='5'>
                    <Flex><Heading size='lg' >another</Heading><Heading size='lg' color={'blue'}>tool</Heading></Flex>
                    <Flex bg='white' w='100%' rounded='xl' direction='column' align='center'  gap='6' py='12%'>
                        <Heading size='md'> ¡Hola de nuevo! </Heading>
                        <Formik
                        initialValues = {{
                            username: "",
                            password: "",
                            record: false
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
                        <Flex direction={'column'} as="form" w='80%' justify='space-around' align='center' gap='4'>
                        <TextField name="username" placeholder="Usuario" size='sm' />
                        <TextField  name="password" placeholder="Contraseña" size='sm' />
                        <CheckboxSingleControl name="record"> Recuérdame </CheckboxSingleControl>
    
                        <Button mt='8' bgColor='blue' color='white' size='md' onClick={formik.handleSubmit} isLoading={loadingCreate}  loadingText='Guardando'>
                            Iniciar Sesión </Button> 
                        </Flex>
                            )}
                        </Formik>
                    </Flex>
                    <Flex w='100%' justify='space-between' >
                        <Text fontSize='xs'  onClick={() => navigate('/klndr_front/register')}>
                            Registrarse
                        </Text>
                        <Text fontSize='xs'>
                            He olvidado mi contraseña
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )

}