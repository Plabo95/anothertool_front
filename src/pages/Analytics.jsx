import React, {useState, useEffect, useContext} from 'react'
import {Box,Flex, Heading, Text, Divider, Circle} from '@chakra-ui/react'
import {Stat,StatLabel,StatNumber,StatHelpText,StatArrow,StatGroup} from '@chakra-ui/react'
import AuthContext from '../auth/AuthContext';
import {base_url} from '../environment/global';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';

//Components
import Statbox from '../components/Analytics/Statbox';

function Analytics(){

    const {user, authTokens} = useContext(AuthContext)
    const [analytics, setAnalytics] = useState()

    const fetchAnalytics = async () => {
        const response = await fetch(base_url+'analytics/'+user.user_id+'/')
        setAnalytics(await response.json())
        }

        const data = [
            {
              name: 'Enero',
              uv: 4000,
              pv: 2400,
              amt: 2400,
            },
            {
              name: 'Febrero',
              uv: 3000,
              pv: 1398,
              amt: 2210,
            },
            {
              name: 'Marzo',
              uv: 2000,
              pv: 9800,
              amt: 2290,
            },
            {
              name: 'Abril',
              uv: 2780,
              pv: 3908,
              amt: 2000,
            },
            {
              name: 'Mayo',
              uv: 1890,
              pv: 4800,
              amt: 2181,
            },
            {
              name: 'Junio',
              uv: 2390,
              pv: 3800,
              amt: 2500,
            },
            {
              name: 'Julio',
              uv: 3490,
              pv: 4300,
              amt: 2100,
            },
          ];

          const data2 = [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
          ];
          const COLORS = ['tomato', '#81e5d9', '#805ad4'];

    useEffect(() => {
        fetchAnalytics();
    },[])

    return(
        <Flex w="100%" p={5} direction='column' minH={'100vh'} >
            <Flex w="100%" justify='center'>
                <Heading w='100%' py='10' textAlign='center' > ¿Como va el taller? </Heading>
            </Flex>

            <Flex justify='center' direction={['column','column','column','column','row','row']}>

                <Flex bg='white' direction='column' boxShadow='lg' rounded='xl' m={4} >
                    <Flex ml='2em' mt='2em'>
                        <Text > Ganancias</Text>
                    </Flex>
                    <Flex p='2em' gap='4em'>
                        <Flex direction='column' gap='8'>
                            <Flex direction={'column'}>
                                <Heading>659€</Heading>
                                <Text>Este mes</Text>
                            </Flex>
                            <Flex direction={'column'}>
                                <Heading>40</Heading>
                                <Text>Citas este mes</Text>
                            </Flex>
                        </Flex>

                        <LineChart
                        width={450}
                        height={200}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </Flex>
                    <Divider/>
                    <Flex  p='1em' align='center'>
                        <Flex gap='0.5em'>
                            <Circle bg='tomato' w='40px' h='40px'/>
                            <Flex direction='column'>
                                <Text>Lavados</Text>
                                <Text>40€</Text>
                            </Flex>
                        </Flex> 
                        <Flex gap='0.5em' ml='2em' >
                            <Circle bg='teal.200' w='40px' h='40px'/>
                            <Flex direction='column'>
                                <Text>M.Ligera</Text>
                                <Text>140€</Text>
                            </Flex>
                        </Flex>
                        <Flex gap='0.5em' ml='2em' >
                            <Circle bg='purple.500' w='40px' h='40px'/>
                            <Flex direction='column'>
                                <Text>M.Pesada</Text>
                                <Text>500€</Text>
                            </Flex>
                        </Flex>                         
                    </Flex>
                </Flex>

                <Flex boxShadow='lg' rounded='xl' bg='white' direction='column' m={4} justify='space-between'>
                    <Flex m='1.5em'>
                        <Text > Citas / Servicio</Text>
                    </Flex>
                    <Flex w='100%' justify='center' align='center' >
                        <PieChart width={200} height={200}>
                            <Pie
                            data={data2}
                            cx={95}
                            cy={95}
                            innerRadius={50}
                            outerRadius={90}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            >
                            {data2.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                        </PieChart>
                    </Flex>
                    <Flex  p='1.5em' justify='center'>
                        {data2.map((entry, index) => (
                            <Flex gap='0.5em'>
                                <Circle bg={COLORS[index % COLORS.length]} w='40px' h='40px'/>
                                <Flex alignItems='center' mr={2}>
                                    <Text>10%</Text>
                                </Flex>
                            </Flex>
                        ))}                       
                    </Flex>
                </Flex>

            </Flex>

            {analytics &&
                <Flex w='100%' justify='center'>
                    <Flex w='90%' justify='space-between' mt='2em'>
                        <Statbox title='Clientes' data={analytics.total_clients} />
                        <Statbox title='Citas ' data={analytics.total_events} />
                        <Statbox title='Ganancias ' data={analytics.total_gains} />
                        <Statbox title='Ganancias / cita ' data={analytics.avg_gains} />
                    </Flex>
                </Flex>
            }
        </Flex>
        
    );
}

export default Analytics;