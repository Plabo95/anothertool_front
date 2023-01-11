import {Flex, Heading, Text, Button, Image} from '@chakra-ui/react'
import ReactTypingEffect from 'react-typing-effect';
import { useNavigate } from 'react-router-dom';
//images
import gradient from '../img/landing/gradient.jpg'
import img1 from '../img/landing/img1.png'
import img2 from '../img/landing/img2.png'
import img3 from '../img/landing/img3.png'
import img4 from '../img/landing/img4.png'
import img5 from '../img/landing/img5.png'
import img6 from '../img/landing/img6.png'
import tick from '../img/landing/tick.png'
//components
import NavbarLanding from '../components/landing/NavLanding';
import Footer from '../components/Footer';

export default function Landing(){

    const navigate = useNavigate()

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
            <Flex w='80%' direction='column' gap='5em' align='center' justify='center' minH='90vh' >
                <Flex maxW='60%' direction='column' align='center' gap='2em'>
                    <Heading fontSize='40px'>anothertool, tu otra herramienta online</Heading>      
                    <Text fontSize='22px' align='center'>Calendario, seguimiento de trabajos, historial de cliente,s gestión de citas, tareas y servicios
                        estadísticas... 
                    </Text>
                </Flex>
                <Flex>
                    <Image src={img6}/> 
                </Flex>      
            </Flex>

            {/* FOOTER */}
            <Footer/>

        </Flex>
    )
}