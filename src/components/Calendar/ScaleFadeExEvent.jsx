import React, {useState, useEffect, useContext} from 'react'
import {Collapse,ScaleFade, Button, Box, Text, Checkbox, Square, Flex, Heading, useToast, useDisclosure} from '@chakra-ui/react'
import moment from 'moment';

function ScaleFadeExEvent({handleDelete, e}) {
    //const { isOpen, onToggle } = useDisclosure({defaultIsOpen: true})
    const [ isOpen, setIsOpen ] = useState(true)
    const [ isOpen2, setIsOpen2 ] = useState(true)

    const change = () => {
        handleDelete(e);
        setIsOpen(false);
        setTimeout(()=>{setIsOpen2(false);},200)
    } 

    useEffect(() => {
        setIsOpen(true);
        setIsOpen2(true);
    },[])
  
    return (
      <Collapse in={isOpen2} animateOpacity>
        <ScaleFade initialScale={0.9} in={isOpen}>
            <Flex key={e.id} className={'evento-' + e.id}>
                <Box p='3' bg='white' my='6' width="280px" boxShadow='lg' borderColor="gray.300" rounded="lg" >
                    <Flex my='5 'align='center' justify='space-between' gap={3}>
                    <Square size='18px' bg={e.service.color} rounded="md"/>  
                    <Text fontSize='xl' >{e.client.car} </Text>
                    <Text fontSize='xl'> {moment(e.start).format("hh:mm")} </Text>
                    </Flex>              
                    <Text fontSize='sm' mt={1}> {e.service.name} </Text>
                </Box>
                <Checkbox colorScheme='grey' ml={4} onChange={change}/>
            </Flex>
        </ScaleFade>
      </Collapse >
    )
}
export default ScaleFadeExEvent