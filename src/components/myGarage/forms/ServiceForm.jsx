import { useState } from 'react';
import { Button, useToast, Flex,VStack, Input, FormLabel, Square, 
        NumberInput, NumberDecrementStepper, NumberIncrementStepper, 
        NumberInputField, NumberInputStepper
} from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'
import { TwitterPicker } from 'react-color';

//forms validation
import * as Yup from 'yup';
import {Formik} from "formik";
import TextField from '../../forms/TextField'
import NumberField from '../../forms/NumberField';
//auth
import {useAuthHeader} from 'react-auth-kit'
//api
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateService } from '../../../api/servicesApi';

export default function ServiceForm({onClose, service}){
    
    const toast = useToast()
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()

    const[color, setColor] = useState('')

    const {isLoading, mutate, error} = useMutation(
        ["createService"],
        createUpdateService,
        {
        onSuccess: () => {
            toast({title: 'Creado con exito!',status:"success"})
            QueryClient.invalidateQueries(["services"]);
            QueryClient.refetchQueries("services", {force:true})
            onClose()
        },
        onError : (error)=>{
            toast({title: error.message, description: error.code ,status:"error"})
        }
        }
    );
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
        onSubmit={(values) => {
            var payload = {}
            if (service) {
                payload = {
                    data: values,
                    slug: service.id,
                    token: authHeader()
                }
            }
            else{
                payload = {
                    data: values,
                    token: authHeader()
                }
            }
            //console.log(payload)
            mutate(payload);
            }}
        >   
        {formik => (
        <>
        <DrawerBody>  
            <VStack as="form">
                <TextField label="Nombre" name="name" />
                <NumberInput label="Precio" name="price" defaultValue={15} min={10} max={20}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Flex mb='3' justify='start' align='center' gap='3' >
                <FormLabel my='3'> Color  </FormLabel>
                <Square size='20px' bg={color} rounded="md"/>
                </Flex>
                <TwitterPicker
                    onChangeComplete={(e) => setColor(e.hex)}
                    width={240}
                    triangle={'hide'}
                />
                <Input type="number" name="estimed_hours" label="Hours" />
                <Input type="number" name="estimed_mins" label="Mins" />
            </VStack>
            </DrawerBody>

            <DrawerFooter>
            <Flex  justify="right" columnGap="3" my='3'>
                <Button variant='ghost' colorScheme='red' size='sm'  onClick={onClose} >Cancel</Button>
                <Button variant='primary' size='sm' onClick={formik.handleSubmit} isLoading={isLoading}>  Guardar </Button>
            </Flex>  
            </DrawerFooter>
            </>
                )}
            </Formik>
    )
}

