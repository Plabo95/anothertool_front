import React, {useState, useRef} from 'react'
import {Flex,Popover,PopoverTrigger,PopoverContent, PopoverHeader, PopoverBody,PopoverFooter,PopoverArrow,PopoverCloseButton, useDisclosure, ButtonGroup, Box} from '@chakra-ui/react'
import {Button} from '@chakra-ui/react'

export default function PopoverDelete({onDelete, id}){

    const initialFocusRef = React.useRef()
    const {isOpen, onOpen, onClose, onCancel } = useDisclosure()

    return(
        <>
        <Popover onClose={onClose} initialFocusRef={initialFocusRef}>
        {({ onClose }) => (
            <>
            <PopoverTrigger>
                <Button colorScheme='red' size='xs' type="button">X</Button>
            </PopoverTrigger>
            <PopoverContent boxShadow='lg' rounded='15' w='300px' p='2'>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>¿Seguro que quieres borrarlo?</PopoverBody>
                <PopoverFooter border='0' d='flex' alignItems='center' justifyContent='center' pb={4}>
                    <ButtonGroup w='100%'>
                        <Flex w='100%' justify='space-evenly'>
                            <Button variant='outline' size='sm' w='90px' onClick={onClose} > Cancelar </Button>
                            <Button size='sm' fontWeight='400' colorScheme='red' w='90px' ref={initialFocusRef} onClick={() => onDelete(id)}>
                            Sí
                            </Button>
                        </Flex>
                    </ButtonGroup>                        
                </PopoverFooter>
            </PopoverContent>
            </>
            )}
        </Popover>
        </>
    )
}