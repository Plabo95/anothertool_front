import {Field, useField} from "formik";
import {NumberInput, NumberDecrementStepper, NumberIncrementStepper, 
NumberInputField, NumberInputStepper, Flex
} from '@chakra-ui/react'

//Factorizacion del input de texto en los formularios
export default function NumberField({label, ...props}) {

    //hook de formik para obtener el field data y los errors y touched de cada field
    const [field, meta] = useField(props) 

    return(
        <Flex direction='column'>
            {label}
            <NumberInput >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </Flex>
    )
}