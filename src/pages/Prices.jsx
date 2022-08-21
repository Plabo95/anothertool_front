import {Flex, Heading, Text, Button, Box, Image} from '@chakra-ui/react'
import AuthContext from '../auth/AuthContext'

import {useNavigate} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

//images
import gradient from '../assets/landing/gradient.jpg'

//logos
import tick from '../assets/landing/tick.png'

//components
import NavbarLanding from '../components/Navbar/NavLanding'
import Footer from '../components/Footer'

export default function Prices(){

    const {user, authTokens, logoutUser} = useContext(AuthContext)
    const navigate = useNavigate();

    return(
        <Flex direction='column' w='100%' minH='100vh' bgImage={gradient} align='center' >
            <NavbarLanding/>

            <Flex w='80%' direction='column' mt='20vh' justify='center' align='center' gap='3vh'  pb='20vh'>

                {/* Título y dias gratis */}
                <Heading fontSize='40px' justifyContent='center' >
                    Tu herramienta más útil, al mejor precio
                </Heading>

                <Flex bg='white' p='1em' rounded='xl'>
                    <Heading fontSize='30px' justifyContent='center' color='#42C74F'>
                        30 primeros días GRATIS
                    </Heading>
                </Flex>

                {/* Precio y features*/}
                <Flex direction='column' bg='white' px='4em' py='2em' rounded='lg' gap='1em'>
                    <Flex align='center' gap='0.5em' mb='1em'>
                        <Text>después</Text>
                        <Heading>44€</Heading>
                        <Text>/mes</Text>
                    </Flex>
                    <Flex align='center' gap='1em'>
                        <Image boxSize='20px' src={tick} />
                        <Text>Calendario de citas</Text>
                    </Flex>
                    <Flex align='center' gap='1em'>
                        <Image boxSize='20px' src={tick} />
                        <Text>Gestión de clientes</Text>
                    </Flex>
                    <Flex align='center' gap='1em'>
                        <Image boxSize='20px' src={tick} />
                        <Text>Gestión de servicios</Text>
                    </Flex>
                    <Flex align='center' gap='1em'>
                        <Image boxSize='20px' src={tick} />
                        <Text>Inventario de productos</Text>
                    </Flex>
                    <Flex align='center' gap='1em'>
                        <Image boxSize='20px' src={tick} />
                        <Text>Control de personal</Text>
                    </Flex>
                    <Flex align='center' gap='1em'>
                        <Image boxSize='20px' src={tick} />
                        <Text>Análisis y estadísticas</Text>
                    </Flex>
                </Flex>

                {/* CTA */}
                <Button mt='1em' variant='primary-s' w='200px'
                        onClick={() => navigate('/register')}
                        >Pruébalo gratis
                </Button>

            </Flex>
            <Footer/>
        </Flex>
    )
}