import {Flex, Text, IconButton, Button} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';



export default function NavItem({icon, title, slash}){
    const navigate = useNavigate()
    return(
        <Button variant='darkblue' py='2em' onClick={()=> navigate(slash)}>
            <Flex direction='column' align='center' gap='0.5em'  w='100px' >
                <IconButton as={icon} bg='none' size='xs' color= 'whiteAlpha.800' />
                <Text fontSize='14px' color= 'whiteAlpha.800'> {title} </Text>
            </Flex>
        </Button>
    )
}
