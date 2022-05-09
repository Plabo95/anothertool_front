import {FormControl,FormErrorMessage,NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormLabel} from '@chakra-ui/react'
import {Field, useField} from "formik";

//Factorizacion del input de texto en los formularios
export default function IntField({label, ...props}) {

    
    <Flex mb='3' justify='start' align='center' gap='3' >
    <FormLabel my='3'> Color  </FormLabel>
    <Square size='20px' bg={color} rounded="md"/>
    </Flex>
    <TwitterPicker
        onChangeComplete={onChangeColour}
        width={240}
        triangle={'hide'}
    />


    //hook de formik para obtener el field data y los errors y touched de cada field
    const [field, meta] = useField(props) 

    return(
        <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel> {label} </FormLabel>
            <Field
            as={<NumberInput maxW={20} step={1} min={0} max={23}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>         
            </NumberInput>}
            {...field} //aqui van los props de onblur, on change
            {...props} //props que pasamos como placeholder etc
            />
            <FormErrorMessage> {meta.error} </FormErrorMessage>
        </FormControl>
    )
}