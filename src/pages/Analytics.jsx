import React, {useState, useEffect, useContext} from 'react'
import {Flex, Heading, Text, Divider, Circle} from '@chakra-ui/react'
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
            { name: 'Group D', value: 200 },
          ];
          const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    useEffect(() => {
        fetchAnalytics();
        },[])

    return(
        <Flex w="100%" p={5} direction="column" align="center" minH={'100vh'} >

            <Heading py='10' > ¿Como va el taller? </Heading>

            <Flex w='80%' gap='4em'>
                <Flex bg='white' direction='column' boxShadow='md' rounded='xl' >
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
                        width={500}
                        height={300}
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
                    <Flex  p='2em' align='center'>
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

                <Flex boxShadow='md' rounded='xl' bg='white' direction='column'>
                <Flex ml='2em' mt='2em'>
                        <Text > Citas / Servicio</Text>
                    </Flex>
                <PieChart width={400} height={400}>
                    <Pie
                    data={data2}
                    cx={200}
                    cy={200}
                    innerRadius={70}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    >
                    {data2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                </PieChart>
                <Divider/>
                    <Flex  p='2em'>
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
                
            </Flex>

            {analytics&&
            <>
            <Flex w='80%' justify='space-evenly' mt='2em'>
                <Statbox title='Clientes' data={analytics.total_clients} />
                <Statbox title='Citas ' data={analytics.total_events} />
                <Statbox title='Ganancias ' data={analytics.total_gains} />
                <Statbox title='Ganancias / cita ' data={analytics.avg_gains} />
            </Flex>
            </>}
        </Flex>
        
    );
}

export default Analytics;