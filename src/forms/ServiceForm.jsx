import React, {useState, useEffect, useContext} from 'react'
import { TwitterPicker } from 'react-color';
import {Button,  Flex, ButtonGroup,FormLabel,VStack, useToast, Square} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'
import * as Yup from 'yup';
import {Formik} from "formik";
import TextField from './TextField';
import {NumberInputControl} from "formik-chakra-ui";
import AuthContext from '../auth/AuthContext';
import useApi from '../hooks/useApi';
import servicesApi from '../api/servicesApi';

function ServiceForm({onClose, service, updateTable}){  
    //Solo inicializo estado si estoy editando un servicio service?
    const[color, setColor] = useState()
    const toast = useToast()
    const[loadingCreate, setLoadingCreate] = useState(false)
    const {user, authTokens} = useContext(AuthContext)      
    const createServiceApi = useApi(servicesApi.createService);
 
    useEffect(() => {
        if(service){setColor(service.color)}
        else  {setColor()}
        }, [service]);

    function closeDrawer(){
        setLoadingCreate(false)
        onClose()
    }

    const handleSubmit = async (values) => {    
        setLoadingCreate(true)
        const serviceToCreate ={
            'name': values.name,
            'baseprice': values.price,
            'color': color,
            'estimed_hours': values.estimed_hours,
            'estimed_mins': values.estimed_mins,
            'user': user.user_id,
        } 
        const {error} = await createServiceApi.request(service, serviceToCreate, user, authTokens)
        if(error){
            toast({
                title: 'Error al guardar ',
                description: "Código de error"+ error +' intentalo mas tarde' ,
                status: 'error',
                duration: 6000,
                isClosable: true,
                })
        }
        else{
            updateTable()
            toast({
                title: 'Servicio guardado',
                status: 'success',
                duration: 6000,
                isClosable: true,
                }) 
        }
        closeDrawer()
    }
    
    const initialValues = {
        name: service? service.name : '' ,
        price: service? service.baseprice: '',
        estimed_hours: service? service.estimed_hours: '',  
        estimed_mins: service? service.estimed_mins: ''
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Nombre es obligatorio"),
        price: Yup.number().required("Precio es obligatorio"),
        estimed_hours: Yup.number().required("Horas es obligatorio").max(23),
        estimed_mins: Yup.number().required("Mins es obligatorio").max(59),
    })

    return(
        <Formik
        initialValues= {initialValues}
        validationSchema = {validationSchema}
        onSubmit= {(values, actions) => {
            //console.log(JSON.stringify(values, null, 2))
            handleSubmit(values)
            actions.resetForm()
        }}
        >   
        {formik => (
        <>
        <DrawerBody>  
            <VStack as="form">
                <TextField label="Nombre" name="name" />
                <NumberInputControl label="Precio" name="price" />

                <Flex mb='3' justify='start' align='center' gap='3' >
                <FormLabel my='3'> Color  </FormLabel>
                <Square size='20px' bg={color} rounded="md"/>
                </Flex>
                <TwitterPicker
                    onChangeComplete={(e) => setColor(e.hex)}
                    width={240}
                    triangle={'hide'}
                />
                <NumberInputControl name="estimed_hours" label="Hours" />
                <NumberInputControl name="estimed_mins" label="Mins" />
            </VStack>
            </DrawerBody>

            <DrawerFooter>
            <ButtonGroup  justify="right" columnGap="3" my='3'>
                <Button variant='ghost' colorScheme='red' size='sm'  onClick={onClose} >Cancel</Button>
                <Button colorScheme='orange' size='sm' onClick={formik.handleSubmit} isLoading={loadingCreate} loadingText='Guardando'>  Guardar </Button>
            </ButtonGroup>  
            </DrawerFooter>
            </>
                )}
            </Formik>
    )
}

export default ServiceForm;
