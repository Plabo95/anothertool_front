import React, {useState, useEffect} from 'react'
import {Flex, Heading, Text} from '@chakra-ui/react'
import {Stat,StatLabel,StatNumber,StatHelpText,StatArrow,StatGroup, CircularProgress, CircularProgressLabel, Box} from '@chakra-ui/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
    labels: ['ML', 'Integral', 'MP', 'Completa',],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5,],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };

function Analytics(){
    const [analytics, setAnalytics] = useState()


    const fetchAnalytics = async () => {
        console.log('fetchAnalytics')
        const response = await fetch("https://plabo.pythonanywhere.com/api/analytics")
        setAnalytics(await response.json())
        }

    useEffect(() => {
        fetchAnalytics();
        },[])

    return(    
        <Flex w="100%" p={5} direction="column" align="center" >
            <Heading py='10' > ¿Como va el taller? </Heading>
            {analytics&&
            <>
            <Flex align='center' justify='space-between' w='60%' gap='6' >
            <CircularProgress size='120px' value={67} color='orange.400' thickness='12px' >
                <CircularProgressLabel>67%</CircularProgressLabel>
            </CircularProgress>
            <Text fontWeight={'bold'}> Diagnósticos acertados </Text>
            <StatGroup w="100%" align="center" justify="center"> 
                <Stat m="5" p="3" border='1px' borderColor='gray.300' borderRadius="lg" >
                    <StatLabel>Clientes totales</StatLabel>
                    <StatNumber>{analytics.total_clients}</StatNumber>
                </Stat>
                <Stat   m="5" p="3"  border='1px' borderColor='gray.300' borderRadius="lg">
                    <StatLabel>Citas totales</StatLabel>
                    <StatNumber>{analytics.total_dates}</StatNumber>
                </Stat>
            </StatGroup>
            </Flex>
            
            <Flex align='center' justify='space-between' w='60%' gap='6'>
             <StatGroup w="100%" align='center'> 

                <Stat m="5" p="3" border='1px'  borderColor='gray.300' borderRadius="lg">
                    <StatLabel>Ganancias totales</StatLabel>
                    <StatNumber>{analytics.total_gains} € </StatNumber>
                    <StatHelpText>
                        <StatArrow type='increase' />
                        23.36%
                    </StatHelpText>
                </Stat>

                <Stat m="5" p="3" border='1px' borderColor='gray.300' borderRadius="lg">
                    <StatLabel>Ganancias/cita</StatLabel>
                    <StatNumber>{analytics.avg_gains} €</StatNumber> 
                    <StatHelpText>
                        <StatArrow type='increase' />
                        5.46%
                    </StatHelpText>
                </Stat>  
                <Box w="300">
                    <Doughnut data={data} />
                </Box> 
            </StatGroup>
            </Flex>

            <Flex>



            </Flex>

            </>}
        </Flex>
        
    );
}

export default Analytics;