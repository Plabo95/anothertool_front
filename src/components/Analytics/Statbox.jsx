import React from "react"
import { Flex, Text,Heading, Stat, StatHelpText, StatArrow} from '@chakra-ui/react'

export default function Statbox({title, data}){


    return(
    <Flex direction='column' minW='10em' gap='2em' p='2em' bg='white' justify='center' align='center' rounded='xl'boxShadow={'md'}>  
    <Stat>
        <Text>{title}</Text>
        <Heading>{data}</Heading>

        <StatHelpText>
            <StatArrow type='increase' />
            5.46%
        </StatHelpText>
    </Stat>
    </Flex>
    )
}
