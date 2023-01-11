import React from "react";
import {useNavigate} from 'react-router-dom'
import { Flex , Button, Text, Image} from "@chakra-ui/react";

//images
import imgLogo from '../../img/logos/logo_navbar.png'

export default function NavLoginRegister() {

    const navigate = useNavigate();

    return(

        <Flex  w='100%' py='1.5em' align='center' justify='center'>
            <Flex w='40%' justify='start'>
                <Image src={imgLogo} onClick={() => navigate('/')} cursor='pointer' />
            </Flex>
            <Flex  w='40%' justify='end' gap='10' align='center'>
                <Text fontWeight='bold' >¿Ya tienes una cuenta?</Text>
                <Button variant="primary-s" size='sm'
                onClick={() => navigate('/login')}
                >Iniciar Sesión</Button>
            </Flex>
        </Flex>
    )
}