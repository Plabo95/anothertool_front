import {Flex, Heading, Text, Button, Box, Image} from '@chakra-ui/react'
import AuthContext from '../auth/AuthContext'
import ReactTypingEffect from 'react-typing-effect';
import {useNavigate} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

//images
import gradient from '../assets/landing/gradient.jpg'
import imgLogo from '../assets/logo_navbar.png'
import img1 from '../assets/landing/img1.png'
import img2 from '../assets/landing/img2.png'
import img3 from '../assets/landing/img3.png'
import img4 from '../assets/landing/img4.png'
import img5 from '../assets/landing/img5.png'
import img6 from '../assets/landing/img6.png'
import tick from '../assets/landing/tick.png'

//icons
import {AiOutlineCalendar, AiOutlineUnorderedList} from 'react-icons/ai';
import {MdOutlinePeopleAlt} from 'react-icons/md';
import {VscGraph} from 'react-icons/vsc';
import {FiTool} from 'react-icons/fi';
import {RiBookletLine} from 'react-icons/ri';

//components
import NavbarLanding from '../components/Navbar/NavLanding';

export default function Landing(){

    const {user, authTokens, logoutUser} = useContext(AuthContext)
    const icon_box = '120px'
    const navigate = useNavigate();

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }

    useEffect(() => {
        console.log(getWindowDimensions())
        if(user){
            var now=Date.now();
            console.log(user.exp - now)
            if(user.exp - now > 0){
                //console.log('Aun hay tiempo')
                navigate('calendar')
            }
            else{
                //console.log('no time, login out..')
                logoutUser()
            }            
        }
      },[])


    return(
        <Flex direction='column' w='100%' bgImage={gradient} align='center'>

            <NavbarLanding/>

            {/* Pantalla 1 */}
            <Flex w='80%' justify='center' gap='5%' my='8vh' align='center' minH='82vh'>
                <Flex direction='column' gap='1em' maxW='35%' >
                    <Flex>
                        <Heading variant='h1'>another</Heading>
                        <Heading variant='h1' color={'orange'}>                    
                        <ReactTypingEffect
                            text={["day", "project", "car", "person"]}
                            speed={100}
                            eraseDelay={1500}
                            typingDelay={1500}
                        />
                        </Heading>
                    </Flex>
                    
                    <Flex><Heading variant='h1'>another</Heading><Heading variant='h1' color={'blue'}>tool</Heading></Flex>

                    <Text mt='1em' fontSize='22px' >Administra tu taller online de manera muy intuitiva y sencilla</Text>
                    <Button mt='1em' variant='primary-s' w='45%' 
                        onClick={() => navigate('register')}
                        >Pruébalo gratis
                    </Button>
                </Flex>
                <Flex>
                    <Image  src={img1}/>
                </Flex>    
            </Flex>
            {/* PANTALLA  2 */}
            <Flex w='80%' minH='75vh'>
                <Flex direction='column' align='center'>
                    <Heading variant='h2' justifyContent='center' >Un software eficiente y organizado</Heading>
                    <Image src={img2}/>        
                    <Text maxW='40%' fontSize='22px' textAlign='center' mt='3%' >
                        No pierdas más el tiempo con programas liosos, llenos de pestañas con funciones inservibles.
                        anothertool quiere facilitarte el trabajo con un diseño intuitivo y actual.
                    </Text>
                    <Button mt='1em' variant='primary-s' 
                        onClick={() => navigate('register')}
                        >Conoce anothertool
                    </Button> 
                </Flex> 
            </Flex>

            {/* PANTALLA 3 */}
            <Flex w='80%' align='center' gap='5%' justify='center' minH='75vh'>
                <Flex direction='column' maxW='40%' gap='2em'>
                    <Heading variant='h2'>
                        Personalizado a medida para tu negocio
                    </Heading>
                    <Text fontSize='22px'>
                    Estamos muy comprometidos con el mundo del taller, estando al día de las necesidades 
                    de nuestros clientes, actualizándonos día a día. 
                    </Text>
                    <Button mt='1em' variant='primary-s' w='40%'
                        onClick={() => navigate('register')}
                        >Pruébalo gratis
                    </Button>
                </Flex>
                <Flex>
                    <Image  src={img3}/>
                </Flex>    
            </Flex>

            {/* PANTALLA 4 */}
            <Flex w='80%' align='center' gap='5%' justify='center' minH='75vh'>
                <Flex>
                    <Image  src={img4}/>
                </Flex> 
                <Flex direction='column' maxW='40%' gap='2em'>
                    <Flex align='center' gap='1em'>
                        <Image  src={tick}/>
                        <Text fontSize='22px'>Prioriza la experiencia del usuario</Text>
                    </Flex>
                    <Flex align='center' gap='1em'>
                        <Image  src={tick}/>
                        <Text fontSize='22px'>Fácil e intuitivo</Text>
                    </Flex>
                    <Flex align='center' gap='1em'>
                        <Image  src={tick}/>
                        <Text fontSize='22px'>Todo en una plataforma online</Text>
                    </Flex>
                    <Flex align='center' gap='1em'>
                        <Image  src={tick}/>
                        <Text fontSize='22px'>Controla tu taller desde cualquier lugar</Text>
                    </Flex>
                </Flex>   
            </Flex>

            {/* PANTALLA 5 */}
            <Flex w='80%' align='center' gap='5%' justify='center' minH='75vh'>
                <Flex direction='column' maxW='30%' gap='2em'>
                    <Heading variant='h2'>
                        Lleva un seguimiento de tu taller
                    </Heading>
                    <Text fontSize='22px'>
                    Controlola tu inventario y estate al día de tus ingresos 
                    y del funcionamiento de tu taller, para elevar tu negocio
                    </Text>
                    <Button mt='1em' variant='primary-s' w='40%'
                        onClick={() => navigate('register')}
                        >Pruébalo gratis
                    </Button>
                </Flex>
                <Flex>
                    <Image  src={img5}/>
                </Flex>    
            </Flex>

            {/* PANTALLA 6 */}
            <Flex w='80%' direction='column' gap='10%' align='center' justify='center' minH='90vh' >
                <Flex maxW='60%' direction='column' align='center' gap='2em'>
                    <Heading fontSize='40px'>anothertool, tu otra herramienta online</Heading>      
                    <Text fontSize='22px' align='center'>Calendario, seguimiento de trabajos, historial de cliente,s gestión de citas, tareas y servicios
                        estadísticas... 
                    </Text>
                </Flex>
                <Flex direction={['column','column','column','row','row']} gap='10'>
                    <Flex gap='10'>
                        <Flex bg='white' w={icon_box} h={icon_box} rounded='xl' align='center' justify= 'center'>
                            <AiOutlineCalendar className='svg-blue' size='50%' />
                        </Flex>
                        <Flex bg='white' w={icon_box} h={icon_box} rounded='xl' align='center' justify= 'center'>
                            <AiOutlineUnorderedList className='svg-orange' size='50%' />
                        </Flex>
                        <Flex bg='white' w={icon_box} h={icon_box} rounded='xl' align='center' justify= 'center'>
                            <MdOutlinePeopleAlt className='svg-darkblue' size='50%' />
                        </Flex>
                    </Flex>
                    <Flex gap='10'>
                        <Flex bg='white' w={icon_box} h={icon_box} rounded='xl' align='center' justify= 'center'>
                            <RiBookletLine className='svg-blue' size='50%' />
                        </Flex>
                        <Flex bg='white' w={icon_box} h={icon_box} rounded='xl' align='center' justify= 'center'>
                            <VscGraph className='svg-orange' size='50%' />
                        </Flex>
                        <Flex bg='white' w={icon_box} h={icon_box} rounded='xl' align='center' justify= 'center'>
                            <FiTool size='50%' className='svg-darkblue'/>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            {/* FOOTER */}
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

        </Flex>
    )
}