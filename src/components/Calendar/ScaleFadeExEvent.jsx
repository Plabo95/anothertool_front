import React, {useState, useEffect, useContext} from 'react'
import {Collapse,ScaleFade, Button, Box, Text, Checkbox, Square, Flex, Heading, useToast, useDisclosure} from '@chakra-ui/react'
import moment from 'moment';
import ModalDatosEvent from './ModalDatosEvent'

function ScaleFadeExEvent({handleUpdate, e, handleToDoDone}) {
    //const { isOpen, onToggle } = useDisclosure({defaultIsOpen: true})
    const [ isOpen1, setIsOpen ] = useState(true)
    const [ isOpen2, setIsOpen2 ] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const change = () => {
        setTimeout(()=>{
            setIsOpen(false);
            setTimeout(()=>{
                setIsOpen2(false);
                setTimeout(()=>{
                    handleToDoDone()
                    handleUpdate(e);
                },200)
            },200)
        },200)
    } 

    useEffect(() => {
        setIsOpen(true);
        setIsOpen2(true);
    },[])
  
    return (
        <>
        <ModalDatosEvent isOpen={isOpen} onClose={onClose} e={e}></ModalDatosEvent>
        <Collapse in={isOpen2} animateOpacity>
            <ScaleFade initialScale={0.9} in={isOpen1}>
                <Flex key={e.id} className={'evento-' + e.id}>
                    <Box opacity={e.done ? '0.5' : '1'} cursor='pointer' _hover={{bg: e.service.color}} p='3' bg='white' my='2' width="280px" boxShadow='lg' borderColor="gray.300" rounded="lg" onClick={()=>{onOpen()}}>
                        <Flex my='5 'align='center' justify='space-between' gap={3}>
                        <Square size='18px' bg={e.service.color} rounded="md"/>  
                        <Text fontSize='xl'>
                            { e.title 
                                ?   e.title
                                :   e.service.name
                            }
                        </Text>
                        <Text fontSize='xl'> {moment(e.start).format("hh:mm")} </Text>
                        </Flex>              
                        <Text fontSize='sm' mt={1}> {e.service.name} </Text>
                        <Text fontSize='sm' mt={1}> {e.service.name} </Text>
                    </Box>
                    <Flex align='center'>
                        <Box>
                            <Checkbox bg='white' opacity={e.done ? '0.5' : '1'} _checked={{bg:'blue', borderColor:'blue', color:'white'}} isChecked={e.done} 
                            ml={4} onChange={change} boxShadow='lg'/>
                        </Box>
                    </Flex>
                </Flex>
            </ScaleFade>
        </Collapse >
        </>
    )
}
export default ScaleFadeExEvent