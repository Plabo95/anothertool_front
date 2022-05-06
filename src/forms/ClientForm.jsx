import React, {useState, useEffect} from 'react'
import { Button, useToast, Flex, FormControl,FormErrorMessage,VStack,Input, FormLabel} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'
import * as Yup from 'yup';
import {Field, Formik, useFormik} from "formik";
import TextField from './TextField';

function ClientForm({onClose, clients, client, setClients}){
    
    const toast = useToast()
    const[loadingDelete, setLoadingDelete] = useState(false)
    const[loadingCreate, setLoadingCreate] = useState(false)
      
    function closeDrawer(){
        setLoadingDelete(false)
        setLoadingCreate(false)
        onClose()
    }
    
    const handleSubmit = async(values) => {
    setLoadingCreate(true)
        const clientToCreate ={
                'name': values.name,
                'car': values.car,
                'telf': values.telf,
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
        if(client){ //Solo si esta editando
        setClients(clients.filter(item => item.id!==client.id)) } //creo una lista con todos menos el editado
        setClients((clients) => [...clients, newdata])
        closeDrawer()
        }
        else{
            toast({
                title: 'Error al guardar ',
                description: "Código de error"+ rstatus +' intentalo mas tarde' ,
                status: 'error',
                duration: 6000,
                isClosable: true,
                })
                closeDrawer()
            }
    }
    return(
        <Formik
        initialValues= {{name: client? client.name : '' ,car: client? client.car: '',telf: client? client.telf: ''}}
        validationSchema = {Yup.object({
            name: Yup.string().required("Nombre es obligatorio"),
            car: Yup.string().required("Coche es obligatorio"),
            telf: Yup.string().required("Coche es obligatorio")
            .min(9, "Debe ser de 9 dígitos")
            .max(9, "Debe se de 9 dígitos"),
        })}
        onSubmit= {(values, actions) => {
            handleSubmit(values)
            actions.resetForm()
        }}
        >
        {formik => (
        <>
        <DrawerBody>        
            <VStack>
                <TextField label="Nombre" name="name" />
                <TextField label="Coche" name="car" />
                <TextField label="Teléfono" name="telf" />
            </VStack>      
        </DrawerBody>
        <DrawerFooter>
          <Flex justify="right" columnGap="3" mt='3'>
              <Button variant='ghost' colorScheme='red' size='sm' onClick={onClose}>Cancelar</Button>
              <Button colorScheme='orange' size='sm' onClick={formik.handleSubmit} isLoading={loadingCreate} loadingText='Guardando'>  Guardar </Button>
          </Flex>  
        </DrawerFooter>
        </>
            )}
        </Formik>
    )
}
export default ClientForm;
