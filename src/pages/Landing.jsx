import {Flex, Heading, Text, Button} from '@chakra-ui/react'


export default function Landing(){

    const p_franja = '5%'
    const h_franja = '75vh'

    return(
        <Flex direction='column' w='100%'>
            <Flex height='8vh' w='100%' >
                <h2>ESTO ES NAVBAR</h2>
            </Flex>
            <Flex height={h_franja} w='100%' border={'1px'} p={p_franja} > 
                <Flex direction='column' w='50%' gap='5' align='start' >
                    <Flex><Heading>another</Heading><Heading color={'orange'}>day</Heading></Flex>
                    <Flex><Heading>another</Heading><Heading color={'blue'}>tool</Heading></Flex>
                    <Text>Software de gestión para tu taller mecánico</Text>
                    <Text>Administra tu taller online de manera muy intuitiva y sencilla</Text>
                    <Button size='lg' w='30%' >Pruébalo gratis</Button>
                </Flex>   
            </Flex>
            <Flex height={h_franja} w='100%'  border={'1px'} direction='column' align='center' p={p_franja}>
                <Heading>Un software eficiente y organizado</Heading>      
                <Text>No pierdas más el tiempo con programas liosos, llenos de pestañas con funciones inservibles.
                    anothertool quiere facilitarte el trabajo con un diseño intuitivo y actual.
                </Text>
            </Flex>
            <Flex height={h_franja} w='100%'  border={'1px'} direction='column' p={p_franja} align='center' >
                <Flex w='50%'>

                </Flex>
                <Flex w='50%' direction='column' gap='3'>
                    <Flex>
                        <Text>Prioriza la experiencia del usuario</Text>
                    </Flex>
                    <Flex>
                        <Text>Fácil e intuitivo</Text>
                    </Flex>
                    <Flex>
                        <Text>Loremipsum loremipsum</Text>
                    </Flex>
                    <Flex>
                        <Text>Singelmery singelflery</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}