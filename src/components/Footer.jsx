import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

import imgLogo from '../img/logos/logo_navbar.png'

export default function Footer(){
    return(
        <Flex w='100%' direction='column' align='center' bg='#F0F0F0' py='2em'>
            <Flex w='80%' justify='space-around' mt='5em'>
                <Flex direction='column' maxW='20%' gap='1em'>
                    <Image src={imgLogo}/>
                    <Text fontSize='16px' >Software de gestión para tu taller mecánico</Text>
                </Flex>
                <Flex direction='column' maxW='20%' gap='1em'>
                    <Text fontSize='20px' >Empresa</Text>
                    <Text fontSize='16px' >Servicios</Text>
                    <Text fontSize='16px' >precios</Text>
                </Flex>
                <Flex direction='column' maxW='20%' gap='1em'>
                    <Text fontSize='20px' >Contacto</Text>
                    <Text fontSize='16px' >anothertool.app@gmail.com</Text>
                    <Text fontSize='16px' >precios</Text>
                </Flex>
            </Flex>
            <Flex w='80%'  justify='center' gap='4em' mt='3em' py='1em'>
                <Text fontSize='16px' >anothertool</Text>
                <Text fontSize='16px' >|</Text>
                <Text fontSize='16px' >Términos de uso</Text>
                <Text fontSize='16px' >|</Text>
                <Text fontSize='16px' >Política de privacidad</Text>
                <Text fontSize='16px' >|</Text>
                <Text fontSize='16px' >Seguridad</Text>
            </Flex>

        </Flex>
    )
}