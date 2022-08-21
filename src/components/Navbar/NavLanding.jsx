import React, {useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import {Flex, Button, Image, Link} from '@chakra-ui/react'

//images
import imgLogo from '../../assets/logo_navbar.png'


export default function NavbarLanding(){

    const navigate = useNavigate();

    const [color, setColor] = useState('white')

    const changeBg = () => {
        if (window.scrollY >= 150) {
          setColor('white')
        } else {
          setColor('transparent')
        }
    }
    useEffect(() => {
        changeBg()
        // adding the event when scroll change Logo
        window.addEventListener("scroll", changeBg)
      })

    return(
        <Flex bg={color} w='100%' py='1.5em' align='center' justify='center' position='fixed' zIndex={3}>
            <Flex w='40%' justify='start'>
                <Image src={imgLogo} onClick={() => navigate('/')} cursor='pointer' />
            </Flex>
            <Flex w='40%' justify='end' gap='10' align='center' >
                <Link color='blue' fontWeight='bold'
                onClick={() => navigate('prices')}
                >Precios</Link>
                <Link color='blue' fontWeight='bold'
                onClick={() => navigate('login')}
                >Iniciar sesión</Link>
                <Button variant='primary-s'  
                onClick={() => navigate('register')}
                >Pruébalo gratis</Button>
            </Flex>
        </Flex>
    )
}


