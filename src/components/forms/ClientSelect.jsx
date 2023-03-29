import { Flex, Text, Button } from '@chakra-ui/react';
//comps
import SelectField from './SelectField';
//auth
import {useAuthHeader} from 'react-auth-kit'
//api
import { useQuery } from '@tanstack/react-query';
import { getAllClients } from '../../api/clientsApi';


export default function ClientSelect () {

    const authHeader = useAuthHeader()
    const {data:clients} = useQuery({
        queryKey: ['clients'],
        queryFn: () => getAllClients(authHeader()),
    })

    return(
        <>
            <SelectField label="Cliente" name="client" choices={clients} />
            {clients.length===0 &&
                <Flex mt='1em' align='center' gap='1em'>
                    <Text fontSize='14px' color='red' >Aún no hay clientes</Text>
                    <Button size='sm' variant='primary' >+ Crea uno</Button>
                </Flex>
            }
        </>
    )
}