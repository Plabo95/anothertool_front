import React, {useState, useContext, useEffect} from 'react'
import { Button, Flex, Heading, Text} from '@chakra-ui/react'
import * as Yup from 'yup';
import {Formik} from "formik";
import {Unauthorized} from '../components/Unauthorized'
import {CheckboxSingleControl}  from "formik-chakra-ui";
import TextField from '../forms/TextField'
import AuthContext from '../auth/AuthContext';
import {useNavigate} from 'react-router-dom'

import bg from '../assets/login-register/login_bg.jpg'

//Components
import NavLoginRegister from '../components/Navbar/NavLoginRegister';

export default function Login(){

    const navigate = useNavigate();

    const [isLogged, setIsLogged] = useState(false)
    const [loadingCreate, setLoadingCreate] = useState(false)
    const [unauthorized, setUnauthorized] = useState(false)
    const {loginUser, logoutUser, user} = useContext(AuthContext)

    const getIsLogged = () => {
        //console.log('Login?: ', user)
        if (user !== null && user.user_id !== null && user.user_id !== undefined){
            return true
        }
        return false
    }

    const cerrarSesion = async () => {
        await logoutUser(false)
        setIsLogged(false)
    }

    useEffect(()=>{ 
        setIsLogged(getIsLogged)
    },[])

    return(
        <Flex w='100%' height='100vh' direction='column' 
            bgImage={bg}
            bgPos='50% 100%'
            bgAttachment='fixed'
            bgRepeat='no-repeat'
            bgSize='100%'>

            <NavLoginRegister/>

            <Flex justify='center' align='center' w='100%'>
            { unauthorized 
                ?   <Unauthorized site='login'/>
                :   <Flex py='5%'  w={['80%','75%','400px','400px']} direction='column' align='center' gap='5'>
                        <Flex><Heading size='lg' >another</Heading><Heading size='lg' color={'blue'}>tool</Heading></Flex>
                        {!isLogged && 
                            <Flex bg='white' w='100%' rounded='xl' direction='column' align='center'  gap='6' py='12%' boxShadow='lg'>
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
                                onSubmit= {async (values, actions) => {
                                    setLoadingCreate(true)
                                    //alert(JSON.stringify(values))
                                    const response = await loginUser(values)
                                    response === 'Unauthorized' ? setUnauthorized(true) : setUnauthorized(false)
                                    setLoadingCreate(false)                 //es la funcion de login que esta en authcontext
                                    actions.resetForm()                 
                                }}
                                >
                                {formik => (
                                <Flex direction={'column'} onKeyDown={(e)=> {if(e.key === "Enter"){formik.handleSubmit()}}} as="form" w='80%' justify='space-around' align='center' gap='3'>
                                <TextField name="username" placeholder="Usuario"  />
                                <TextField type="password" name="password" placeholder="Contraseña" />
                                <CheckboxSingleControl colorScheme='gray' name="record"> Recuérdame </CheckboxSingleControl>
                                <Button mt='8' variant='primary-s' size='md'
                                onClick={formik.handleSubmit} isLoading={loadingCreate}  loadingText='Iniciando...'>
                                    Iniciar Sesión </Button> 
                                </Flex>
                                    )}
                                </Formik>
                            </Flex>
                        }
                        {isLogged &&
                            <Flex bg='white' w='100%' rounded='xl' direction='column' align='center'  gap='6' py='12%' boxShadow='lg'>
                            <Heading size='md'> Ya existe una sesión iniciada </Heading>
                            <Button mt='8' variant='primary-out-s' size='md' onClick={cerrarSesion}>
                                    Cerrar Sesión </Button> 
                            </Flex>
                        }
                        <Flex w='100%' justify='space-between' >
                            <Text fontSize='xs' cursor="pointer"  onClick={() => navigate('/register')}>
                                Registrarse
                            </Text>
                            <Text fontSize='xs' cursor="pointer">
                                He olvidado mi contraseña
                            </Text>
                        </Flex>
                    </Flex>
            }
            </Flex>
        </Flex>
    )

}