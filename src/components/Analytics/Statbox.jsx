import React from "react"
import { Flex, Text,Heading, Stat, StatHelpText, StatArrow} from '@chakra-ui/react'

export default function Statbox({title, dataTotal, dataComparations}){


    return(
        <Flex direction='column' w='200px' gap='2em' p='2em' bg='white' justify='center' align='center' rounded='xl'boxShadow='lg'>  
            <Stat>
                <Text>{title}</Text>
                <Heading>{dataTotal}</Heading>

                <StatHelpText>
                    {dataComparations > 0
                        ?   <StatArrow type='increase' />
                        :   <StatArrow type='decrease' />
                    }
                    {dataComparations}%
                </StatHelpText>
            </Stat>
        </Flex>
    )
}
