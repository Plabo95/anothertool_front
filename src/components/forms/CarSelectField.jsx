import {FormControl,FormErrorMessage, FormLabel} from '@chakra-ui/react'
import {Field, useField} from "formik";
import {
    AsyncCreatableSelect,
    AsyncSelect,
    CreatableSelect,
    Select,
  } from "chakra-react-select";
//Factorizacion del input de texto en los formularios
export default function CarSelectField({label, ...props}) {

    var options =props.choices?.map(choice=>(
        {
            label: choice.plate,
            value: 2,
            variant: "outline", // The option variant overrides the global
        })
    )
    //hook de formik para obtener el field data y los errors y touched de cada field
    const [field, meta] = useField(props) 
    console.log(field, meta)
    return(
        <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel> {label} </FormLabel>
            <Field
            as={Select}
            placeholder='Selecciona uno'
            tagVariant="solid"
            options={options}
            selectedOptionStyle="check"
            value={
                options
                  ? options.find((option) => option.value === field.value)
                  : ""
              }
              onChange={(option) =>
                field.setFieldValue(field.name, option.value)
              }
            >
            </Field>
            <FormErrorMessage>  formik error {meta.error} </FormErrorMessage>
            <FormErrorMessage> http error {props.error} </FormErrorMessage>
        </FormControl>
    )
}