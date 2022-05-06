import React, {useState, useEffect} from 'react'
import {Button, Flex, FormControl,FormErrorMessage,FormHelperText,Input, useDisclosure, useToast} from '@chakra-ui/react'
import {Popover,PopoverTrigger,PopoverContent, PopoverHeader, PopoverBody,PopoverFooter,PopoverArrow,PopoverCloseButton, ButtonGroup} from '@chakra-ui/react'

function PopoverClientForm({setClients, setClient}){
    
    const initialFocusRef = React.useRef()
    const [isOpen, setIsOpen] = React.useState(false)
    const open = () => setIsOpen(!isOpen)
    //Solo inicializo estado si estoy editando un servicio service?
    const[name, setName] = useState()
    const[car, setCar] = useState()
    const[telf, setTelf] = useState()

    const toast = useToast()
    const[loadingDelete, setLoadingDelete] = useState(false)
    const[loadingCreate, setLoadingCreate] = useState(false)

    const onChangeName = (e) => {
        setName(e.target.value) 
      };

    const onChangeCar = (e) => {
        setCar(e.target.value) 
      };
    const onChangeTelf = (e) => {
        //console.log(e.hex)
        setTelf(e.target.value)
      };
        
    function closePopover(){
        setLoadingDelete(false)
        setLoadingCreate(false)
        open()
    }
    
    const handleSubmit = async(e) => {
    setLoadingCreate(true)
    e.preventDefault()
        const clientToCreate ={
                'name': name,
                'car': car,
                'telf': telf,
        }
    const response = await fetch('https://plabo.pythonanywhere.com/api/createclient',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientToCreate)
        })
    const rstatus = response.status
    if(rstatus >= 200 && rstatus<300){
        toast({
        title: 'Cliente guardado',
        status: 'success',
        duration: 6000,
        isClosable: true,
        }) 
        const newdata= await response.json()
        setClients((clients) => [...clients, newdata])
        setClient(newdata.id)
        closePopover()
        }
        else{
            toast({
                title: 'Error al guardar ',
                description: "Código de error"+ rstatus +' intentalo mas tarde' ,
                status: 'error',
                duration: 6000,
                isClosable: true,
                })
                closePopover()
            }
    }

    return(
        <>
        <Popover 
        closeOnBlur={false}
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        >
        <PopoverTrigger>
            <Button width={'100px'} onClick={open} colorScheme='orange' size='sm' type="button">Crea Uno</Button>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
                    <PopoverBody>
                        <FormControl>
                            <label> Nombre </label>
                            <Input onChange={onChangeName} />
                            <label> Coche </label>
                            <Input type="text" onChange={onChangeCar} />
                            <label> Teléfono </label>
                            <Input type="text" onChange={onChangeTelf}/>
                        </FormControl>
                    </PopoverBody>
                <PopoverFooter border='0' d='flex' alignItems='center' justifyContent='flex-end' pb={4}>
                <ButtonGroup>
                    <Button variant='ghost' colorScheme='red' size='sm' onClick={closePopover}>Cancel</Button>
                    <Button colorScheme='orange' size='sm' onClick={handleSubmit} isLoading={loadingCreate} loadingText='Guardando'>  Crear </Button>
                </ButtonGroup>                        
                </PopoverFooter>
            </PopoverContent>
        </Popover>
        </>
    )
}

export default PopoverClientForm;