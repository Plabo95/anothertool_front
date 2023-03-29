import { useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react"
//forms
import InputField from '../../forms/InputField';
import OptionsSelectField from "../../forms/OptionsSelectField";

export default function InvoiceItemRow({formik, index, arrayHelpers, taxes}){
    const[total, setTotal] = useState(0)
    useEffect(() => {
        if (formik.values.items[index].tax === 'ten' ){
            setTotal((formik.values.items[index].price * formik.values.items[index].quantity * 1.1).toFixed(2) )
        }
        else if (formik.values.items[index].tax === 'twenty' ){
            setTotal((formik.values.items[index].price * formik.values.items[index].quantity * 1.21).toFixed(2))
        }
        else {
            setTotal(formik.values.items[index].price * formik.values.items[index].quantity)
        }
    }, [formik.values.items[index]]);
    return(
        <Flex align='start' gap='0.5em'> 
                <InputField name={`items.${index}.concept`} type='text'/>      
                <InputField name={`items.${index}.description`} type='text'/>   
                <InputField name={`items.${index}.quantity`} type='number'/>
                <InputField name={`items.${index}.price`} type='number'/>    
                <OptionsSelectField name={`items.${index}.tax`} choices={taxes} />      
                <Text mt='15px' fointSize='14px' fontWeight='bold' > {total} </Text>
            <Button
            mt='10px'
            variant='danger'
            size=  'xs'
            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
            >
                -
            </Button>
        </Flex>
    )
}