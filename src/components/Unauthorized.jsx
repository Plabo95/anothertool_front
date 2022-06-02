import React, {useState, useRef} from 'react'
import { Flex, Popover, Text, Heading, PopoverTrigger,PopoverContent, PopoverHeader, PopoverBody,PopoverFooter,PopoverArrow,PopoverCloseButton, useDisclosure, ButtonGroup} from '@chakra-ui/react'

export const Unauthorized = ({site}) => {
  return (
    <Flex py='5%'  w={['80%','65%','500px','500px']} direction='column' align='center' gap='5'>
        <Flex><Heading size='lg' >another</Heading><Heading size='lg' color={'blue'}>tool</Heading></Flex>
        <Flex bg='white' w='100%' rounded='xl' direction='column' align='center'  gap='3' py='30px' px='25px' boxShadow='lg'>
            { site === 'login'
                ?   <UnauthorizedLogin/>
                :   <UnauthorizedRegister/>    
            }
        </Flex>
    </Flex>
  )
}

const UnauthorizedLogin = () => {
    return(
        <>
            <Heading size='md'> ¡Su cuenta aun no ha sido activada! </Heading>
            <Text textAlign='center'>
                Nos pondremos en contacto lo antes posible, para activar su cuenta
            </Text>
            <Text textAlign='center'>
                Si no recibe un email en las próximas 24 horas, póngase en contacto a traves de nuestro email:
            </Text>
            <Text textAlign='center' color='blue'>
                hola@anothertool.com
            </Text>
        </>
    )
}

const UnauthorizedRegister = () => {
    return(
        <>
            <Heading size='md'> ¡Gracias por confiar en nosotros! </Heading>
            <Text textAlign='center'>
                Nos pondremos en contacto lo antes posible, para activar su cuenta
            </Text>
            <Text textAlign='center'>
                Si no recibe un email en las próximas 24 horas, póngase en contacto a traves de nuestro email:
            </Text>
            <Text textAlign='center' color='blue'>
                hola@anothertool.com
            </Text>
        </>
    )
}
