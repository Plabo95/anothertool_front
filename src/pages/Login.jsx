import React, {useState, useContext} from 'react'
import { Button, useToast, Flex,VStack, Heading, Text} from '@chakra-ui/react'
import * as Yup from 'yup';
import {Formik} from "formik";
import {CheckboxSingleControl}  from "formik-chakra-ui";
import TextField from '../forms/TextField'
import AuthContext from '../auth/AuthContext';
import {useNavigate} from 'react-router-dom'

import bg from '../assets/login_bg.png'

export default function Login(){

    const navigate = useNavigate();
    const toast = useToast()
    const[loadingCreate, setLoadingCreate] = useState(false)
    const {loginUser} = useContext(AuthContext)

    return(
        <Flex w='100%' height='100vh' direction='column' backgroundImage={bg}>
            <Flex height='8vh' w='100%' p='1%' align='center' justifyContent='space-between'>
                <Flex justify='start' ml='3%'>
                    <Flex onClick={() => navigate('/klndr_front/')} cursor='pointer'>
                        <Heading size='md' >another</Heading><Heading size='md' color={'blue'}>tool</Heading>
                    </Flex>
                </Flex>
                <Flex justify='end' gap='10' align='center' mr='3%' ml='3%'>
                    <Text fontWeight='bold' >¿Aún no tienes cuenta?</Text>
                    <Button bg='blue' color='white' size='sm'
                    onClick={() => navigate('/klndr_front/register')}
                    >Regístrate</Button>
                </Flex>
            </Flex>


            <Flex height='92vh' justify='center' align='center' w='100%'>
                <Flex py='5%'  w={['80%','75%','400px','400px']} direction='column' align='center' gap='5'>
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
                            setLoadingCreate(true)
                            //alert(JSON.stringify(values))
                            loginUser(values)
                            setLoadingCreate(false)                 //es la funcion de login que esta en authcontext
                            actions.resetForm()
                        }}
                        >
                        {formik => (
                        <Flex direction={'column'} as="form" w='80%' justify='space-around' align='center' gap='3'>
                        <TextField name="username" placeholder="Usuario"  />
                        <TextField type="password" name="password" placeholder="Contraseña" />
                        <CheckboxSingleControl name="record"> Recuérdame </CheckboxSingleControl>
    
                        <Button mt='8' variant='primary-md' onClick={formik.handleSubmit} isLoading={loadingCreate}  loadingText='Iniciando...'>
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