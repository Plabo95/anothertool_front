import React, {useState, useRef} from 'react'
import {Popover,PopoverTrigger,PopoverContent, PopoverHeader, PopoverBody,PopoverFooter,PopoverArrow,PopoverCloseButton, useDisclosure, ButtonGroup} from '@chakra-ui/react'
import {Button} from '@chakra-ui/react'

export default function PopoverDelete({onDelete, id}){

<<<<<<< HEAD
    const initialFocusRef = useRef()
    const {isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
        <Popover onClose={onClose}  initialFocusRef={initialFocusRef}>
=======
    const initialFocusRef = React.useRef()
    const {isOpen, onOpen, onClose, onCancel } = useDisclosure()

    return(
        <>
        <Popover onClose={onClose} initialFocusRef={initialFocusRef}>
        {({ onClose }) => (
            <>
>>>>>>> 24b4c681aecc4ee3c1b2f6d29e6ac30809c7c357
            <PopoverTrigger>
                <Button colorScheme='red' size='xs' type="button">X</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>Seguro que quieres borrarlo?</PopoverBody>
                <PopoverFooter border='0' d='flex' alignItems='center' justifyContent='flex-end' pb={4}>
                <ButtonGroup>
                <Button variant='outline' size='sm' colorScheme='orange' onClick={onClose} > Cancelar </Button>
                <Button variant='ghost' size='sm' colorScheme='red' ref={initialFocusRef} onClick={() => onDelete(id)}>
                Sí
                </Button>
                </ButtonGroup>                        
                </PopoverFooter>
            </PopoverContent>
            </>
            )}
        </Popover>
        </>
    )
}