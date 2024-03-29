import {FormControl,FormErrorMessage, Select,FormLabel} from '@chakra-ui/react'
import {Field, useField} from "formik";
//Factorizacion del input de texto en los formularios
export default function SelectField({label, ...props}) {
    //hook de formik para obtener el field data y los errors y touched de cada field
    const [field, meta] = useField(props) 
    return(
        <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel> {label} </FormLabel>
            <Field
            as={Select}
            placeholder='Selecciona uno'
            {...field} //aqui van los props de onblur, on change
            {...props} //props que pasamos como placeholder etc
            >
                {props.choices?.map(choice=>
                    <option key={choice.id} value={choice.id}> {choice.plate} {choice.name} </option>
                )}
                {props.choices.length===0&&
                    <option>No hay opciones disponibles</option>
                }
            </Field>
            <FormErrorMessage>  formik error {meta.error} </FormErrorMessage>
            <FormErrorMessage> http error {props.error} </FormErrorMessage>
        </FormControl>
    )
}