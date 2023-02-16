import {FormControl,FormErrorMessage, Select, FormLabel} from '@chakra-ui/react'
import {Field, useField} from "formik";

//Select field cuando es un choice y tengo que obtener las posibles opciones de las OPTIONS
export default function OptionsSelectField({label, ...props}) {
    //hook de formik para obtener el field data y los errors y touched de cada field
    const [field, meta] = useField(props) 
    return(
        <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel> {label} </FormLabel>
            <Field
            as={Select}
            {...field} //aqui van los props de onblur, on change
            {...props} //props que pasamos como placeholder etc
            >
                {props.choices?.map(choice=>
                    <option key={choice.value} value={choice.value}> {choice.display_name} </option>
                )}
            </Field>
            <FormErrorMessage> {meta.error} </FormErrorMessage>
        </FormControl>
    )
}