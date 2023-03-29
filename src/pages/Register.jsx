import { useState } from 'react';
import { Button, useToast, Flex, Text,Heading} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
//img
import bg from '../img/login-register/register_bg.jpg'
//Components
import NavLoginRegister from '../components/loginRegister/NavLoginRegister';
import InputField from '../components/forms/InputField'
//forms
import * as Yup from 'yup';
import {Formik} from "formik";
//api
import { register } from '../api/authApi';
import { useMutation } from "@tanstack/react-query"


export default function Register(){

    const toast = useToast()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const {isLoading, mutate} = useMutation(
        ["register"],
        register,
        {
        onSuccess: (data) => {
            toast({title: 'Registro exitoso!',status:"success"})
            navigate('/login')
        },
        onError : (error)=>{
            setError(error.response.data)
            toast({title: error.message, description: error.response.data.email ,status:"error"})
        }
        }
    );

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
                            password: "",
                            password2: "",
                        }
                        }
                        validationSchema = {Yup.object({
                            email: Yup.string().email('Formato de email inválido').required("Email es obligatorio"),
                            password: Yup.string().min(8, 'Contraseña demasiado corta - mínimo 8 caracteres')
                                        .matches(/[a-zA-Z]/, 'Solo puede contener letras del abecedario'),
                            password2: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
                            terms: Yup.boolean().equals([true],'Debes aceptar los términos')
                        })}
                        onSubmit= {(values, actions) => {
                            values = {'email': values['email'], 'password':values['password']}
                            mutate(values)
                        }}
                        >
                        {formik => (
                        <Flex  onKeyDown={(e)=> {if(e.key === "Enter"){formik.handleSubmit()}}} as="form" direction={'column'} justify='space-around' gap='3'>
                            <InputField placeholder="Correo electrónico" name="email" />
                            {error.email&&
                            <Text color='red' fontSize='xs' >{error.email}</Text>
                            }
                            <InputField placeholder="Contraseña" name="password" type="password" />
                            <Flex direction={'column'} align='start'  >
                                <Text color='gray' fontSize='xs' fontWeight='hairline'>Debe tener al menos 8 caracteres</Text>
                                <Text color='gray' fontSize='xs' fontWeight='hairline'>No puede ser similar a tu otra información personal</Text>
                                <Text color='gray' fontSize='xs' fontWeight='hairline'>No puede ser enteramente numérica</Text>
                            </Flex>
                            <InputField placeholder="Repite Contraseña" name="password2" type="password" />
                            <Button variant="primary-s" size='md' mt='8' w='50%' alignSelf='center'
                            isDisabled={JSON.stringify(formik.errors) !== '{}' }
                            onClick={formik.handleSubmit} isLoading={isLoading}  loadingText='Iniciando...'>
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