import {FormControl,FormErrorMessage,Input, FormLabel} from '@chakra-ui/react'
import {Field, useField} from "formik";
import {NumberInput, NumberDecrementStepper, NumberIncrementStepper, 
NumberInputField, NumberInputStepper
} from '@chakra-ui/react'

//Factorizacion del input de texto en los formularios
export default function NumberField({label, ...props}) {

    //hook de formik para obtener el field data y los errors y touched de cada field
    const [field, meta] = useField(props) 

    return(
        <FormControl isInvalid={meta.error && meta.touched}>

                <NumberInputField />



            <FormErrorMessage> {meta.error} </FormErrorMessage>
        </FormControl>
    )
}