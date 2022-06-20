import React, { useEffect } from 'react'
import {Modal, ModalContent, ModalCloseButton, ModalHeader, ModalBody, Text, ModalFooter, Button, ModalOverlay,
    UnorderedList, ListItem, Flex} from '@chakra-ui/react'

function ModalDatosEvent({isOpen, onClose, e}) {

    useEffect(()=>{
        console.log('Modal2', e)
    },[])

    return (
        <Modal isCentered isOpen={isOpen} onClose={()=>{onClose()}}>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent>
            <ModalHeader>{   e.title
                                ?   e.title
                                :   e.client.car
                        }
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text fontWeight='800'>Servicio</Text>
                <UnorderedList>
                    <ListItem><Flex><Text fontWeight='500'>Tipo: &nbsp;</Text><Text as='em'>{e.service.name}</Text></Flex></ListItem>
                    <ListItem><Flex><Text fontWeight='500'>Precio: &nbsp;</Text><Text as='em'>{Number(e.service.baseprice) + Number(e.extraprice)} $</Text></Flex></ListItem>
                    <ListItem><Flex><Text fontWeight='500'>Tiempo estimado: &nbsp;</Text><Text as='em'>{`${e.service.estimed_hours}H ${e.service.estimed_mins}min`}</Text></Flex></ListItem>
                </UnorderedList>
                <Text fontWeight='800'>Cliente</Text>
                <UnorderedList>
                    <ListItem><Flex><Text fontWeight='500'>Nombre: &nbsp;</Text><Text as='em'>{e.client.name}</Text></Flex></ListItem>
                    <ListItem><Flex><Text fontWeight='500'>Coche: &nbsp;</Text><Text as='em'>{e.client.car}</Text></Flex></ListItem>
                    <ListItem><Flex><Text fontWeight='500'>Telefono: &nbsp;</Text><Text as='em'>{e.client.telf}</Text></Flex></ListItem>
                </UnorderedList>
            </ModalBody>
            <ModalFooter>
                <Button variant='danger-ghost' onClick={()=>{onClose()}}>Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalDatosEvent