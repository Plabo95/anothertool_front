import { useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react"
//forms
import InputField from '../../forms/InputField';
import OptionsSelectField from "../../forms/OptionsSelectField";

export default function InvoiceItemRow({formik, index, arrayHelpers, taxes}){
    const[total, setTotal] = useState(0)
    
    useEffect(() => {
        if (formik.values.item[index].tax === 'ten' ){
            setTotal((formik.values.item[index].price * formik.values.item[index].quantity * 1.1).toFixed(2) )
        }
        else if (formik.values.item[index].tax === 'twenty' ){
            setTotal((formik.values.item[index].price * formik.values.item[index].quantity * 1.21).toFixed(2))
        }
        else {
            setTotal(formik.values.item[index].price * formik.values.item[index].quantity)
        }
    }, [formik.values.item[index]]);
    return(
        <Flex direction='column' gap='1em' bg='white' p='0.5em' rounded='sm'>
            <Flex align='end' gap='0.5em'>
                <Flex >
                    <InputField name={`item.${index}.concept`} label='Concepto' type='text'/>
                </Flex>
                <Flex >
                    <InputField name={`item.${index}.description`} label='Descripción' type='text'/>
                </Flex>
                <Flex >
                    <InputField name={`item.${index}.quantity`} label='Cantidad' type='number'/>
                </Flex>
                <Flex >
                    <InputField name={`item.${index}.price`} label='Precio' type='number'/>
                </Flex>
                <Flex >
                    <OptionsSelectField name={`item.${index}.tax`} label='Impuestos' choices={taxes} />
                </Flex>
                <Flex direction='column' gap='1.5em' >
                    <Text>Total</Text>
                    <Text> {total} </Text>
                </Flex>
                <Button
                variant='danger'
                size=  'xs'
                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                >
                    -
                </Button>
            </Flex>
        </Flex>
    )
}