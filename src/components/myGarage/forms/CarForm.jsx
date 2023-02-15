import { useState } from 'react';
import { Button, useToast, Flex,VStack, Input, FormLabel, Square, } from '@chakra-ui/react'
import {DrawerBody,DrawerFooter} from '@chakra-ui/react'

//forms validation
import * as Yup from 'yup';
import {Formik} from "formik";
import TextField from '../../forms/TextField'
import NumberField from '../../forms/NumberField';
//auth
import {useAuthHeader} from 'react-auth-kit'
//api
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateCar } from '../../../api/carsApi';

export default function CarForm({onClose, service}){
    
    const toast = useToast()
    const authHeader = useAuthHeader()
    const QueryClient = useQueryClient()

    const {isLoading, mutate, error} = useMutation(
        ["createCar"],
        createUpdateCar,
        {
        onSuccess: () => {
            toast({title: 'Coche creado con exito!',status:"success"})
            QueryClient.invalidateQueries(["cars"]);
            QueryClient.refetchQueries("cars", {force:true})
            onClose()
        },
        onError : (error)=>{
            toast({title: error.message, description: error.code ,status:"error"})
        }
        }
    );
    const initialValues = {
        plate: car? service.plate : '' ,
        brand: car? service.brand: '',
        model: car? service.model: '',  
        client: car? service.client: ''
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
               <NumberField label='Precio' />
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

