import React, {useState} from 'react'
import { Button, useToast, Flex, Text,Heading} from '@chakra-ui/react'
//img
import bg from '../img/login-register/register_bg.jpg'
//Components
import NavLoginRegister from '../components/loginRegister/NavLoginRegister';
import TextField from '../components/forms/TextField'
//forms
import * as Yup from 'yup';
import {Formik} from "formik";

export default function Register(){

    const toast = useToast()
    const[loadingCreate, setLoadingCreate] = useState(false)
    const[registered, setRegistered] = useState(false)

    return(
        <Flex w='100%' minH='100vh' direction='column' 
            backgroundImage={bg}
            bgPos='50% 100%'
            bgAttachment='fixed'
            bgRepeat='no-repeat'
            bgSize='100%'>

            <NavLoginRegister/>

            <Flex justify='center' align='center' w='100%'>
                <Flex py='5%'  w={['80%','65%','400px','400px']} direction='column' align='center' gap='5'>
                    <Flex><Heading size='lg' >another</Heading><Heading size='lg' color={'blue'}>tool</Heading></Flex>
                    <Flex bg='white' w='100%' rounded='xl' direction='column' align='center'  gap='3' py='12%' boxShadow='lg'>
                        <Heading size='md'> ¡Bienvenido! </Heading>
                        <Formik
                        initialValues = {{
                            email: "",
                            username: "",
                            password: "",
                            password2: "",
                            terms: false,
                        }
                        }
                        validationSchema = {Yup.object({
                            email: Yup.string().email('Formato de email inválido').required("Email es obligatorio"),
                            username: Yup.string().required("Usuario es obligatorio"),
                            password: Yup.string().min(8, 'Contraseña demasiado corta - mínimo 8 caracteres')
                                        .matches(/[a-zA-Z]/, 'Solo puede contener letras del abecedario'),
                            password2: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
                            terms: Yup.boolean().equals([true],'Debes aceptar los términos')
                        })}
                        onSubmit= {(values, actions) => {
                            //alert(JSON.stringify(values))
                            //handleSubmit(values)
                            actions.resetForm()
                        }}
                        >
                        {formik => (
                        <Flex  onKeyDown={(e)=> {if(e.key === "Enter"){formik.handleSubmit()}}} as="form" direction={'column'} w='80%' justify='space-around' align='center' gap='3'>
                            <TextField placeholder="Correo electrónico" name="email" />
                            <TextField placeholder="Usuario" name="username" />
                            <TextField placeholder="Contraseña" name="password" type="password" />
                            <Flex direction={'column'} align='start'  >
                                <Text color='gray' fontSize='xs' fontWeight='hairline'>Debe tener al menos 8 caracteres</Text>
                                <Text color='gray' fontSize='xs' fontWeight='hairline'>No puede ser similar a tu otra información personal</Text>
                                <Text color='gray' fontSize='xs' fontWeight='hairline'>No puede ser enteramente numérica</Text>
                            </Flex>
                            <TextField placeholder="Repite Contraseña" name="password2" type="password" />
                            <Button variant="primary-s" size='md' mt='8' onClick={formik.handleSubmit} isLoading={loadingCreate}  loadingText='Iniciando...'>
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