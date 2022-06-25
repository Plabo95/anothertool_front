import React, {useState, useContext, useEffect} from 'react'
import { Button, useToast, Flex,VStack} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'
import * as Yup from 'yup';
import {Formik} from "formik";
import TextField from './TextField';
import {SelectControl} from "formik-chakra-ui";
import AuthContext from '../auth/AuthContext';

//api
import useApi from '../hooks/useApi';
import carsApi from '../api/carsApi';
import clientsApi from '../api/clientsApi';

export default function CarForm({onClose, car, cars, setCars, updateTable}){
    
    const toast = useToast()
    const[loadingCreate, setLoadingCreate] = useState(false)
    const {user, authTokens} = useContext(AuthContext)      
    const createCarApi = useApi(carsApi.createCar);
    const getAllClientsApi = useApi(clientsApi.getAllClients)

    const[clients,setClients] = useState([])

    function closeDrawer(){
        setLoadingCreate(false)
        onClose()
    }

    const handleSubmit = async (values) => {    
        setLoadingCreate(true)
        const carToCreate ={
            'idplate': values.idplate,
            'brand': values.brand,
            'model': values.model,
            'client': values.client,
            'user': user.user_id,
        }
        const {error} = await createCarApi.request(car, carToCreate, user, authTokens)
        console.log(error)
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
                title: 'Cliente guardado',
                status: 'success',
                duration: 6000,
                isClosable: true,
                }) 
        }
        closeDrawer()
    }
    const getClients = async () => {
        const {data, error} = await getAllClientsApi.request(user,authTokens);
        error? console.log('Error fetching...', error) 
            : setClients(data)
    }
    useEffect(() => {   
        getClients()
    },[]) 

    return(
        <Formik
        initialValues= {{idplate: car? car.idplate : '' ,brand: car? car.brand: '',model: car? car.model: '',client: car? car.client: ''}}
        validationSchema = {Yup.object({
            idplate: Yup.string().required("Matrícula obligatoria"),
        })}
        onSubmit= {(values, actions) => {
            //alert(JSON.stringify(values))
            handleSubmit(values)
            actions.resetForm()
        }}
        >
        {formik => {
            //formik.isInitialValid = false;
            return(
                <>
                <DrawerBody>        
                    <VStack as="form" gap='1em'>
                        <TextField label="Matrícula" name="idplate" />
                        <TextField label="Marca" name="brand" />
                        <TextField label="Modelo" name="model" />
                        <SelectControl name="client"
                        selectProps={{ placeholder: "Selecciona un cliente",}}>
                            {clients.map((client)=>{
                                return (
                                <option key={client.id} value= {client.id} >
                                    {client.name}
                                </option>
                                )
                            })
                            }
                        </SelectControl>
                    </VStack>      
                </DrawerBody>
                <DrawerFooter>
                <Flex justify="right" columnGap="3" mt='3'>
                    <Button variant='danger-ghost' size='sm' onClick={onClose}>Cancelar</Button>
                    <Button variant='primary' size='sm' onClick={formik.handleSubmit} isLoading={loadingCreate} loadingText='Guardando'>  Guardar </Button>
                </Flex>  
                </DrawerFooter>
                </>
        )}}
        </Formik>
    )
}
