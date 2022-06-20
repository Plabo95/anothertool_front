import React, {useState, useEffect, useContext} from 'react'
import {Center,Container,Button,Box,Flex, Heading, Text, Divider, Circle} from '@chakra-ui/react'
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
    const [period, setPeriod] = useState('month')
    const [periodDay, setPeriodDay] = useState()
    const [periodWeek, setPeriodWeek] = useState({})
    const [periodMonth, setPeriodMonth] = useState({})
    const [periodYear, setPeriodYear] = useState()

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const monthNombres = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];

    const optionsPeriodMonthM = [
        {val: 'January',label: 'Enero'},
        {val: 'February',label: 'Febrero'},
        {val: 'March',label: 'Marzo'},
        {val: 'April',label: 'Abril'},
        {val: 'May',label: 'Mayo'},
        {val: 'June',label: 'Junio'},
        {val: 'July',label: 'Julio'},
        {val: 'August',label: 'Agosto'},
        {val: 'September',label: 'Septiembre'},
        {val: 'October',label: 'Octubre'},
        {val: 'November',label: 'Noviembre'},
        {val: 'December',label: 'Diciembre'},
    ]

    const iniDateParams = () => {
        const today = new Date();
        setPeriodDay(today)
        const monday = getMondayOfCurrentWeek();
        let mondayNextWeek = new Date(monday);
        console.log('1:',mondayNextWeek)
        mondayNextWeek.setDate(monday.getDate() + 7); 
        console.log('2:',mondayNextWeek)
        setPeriodWeek({
            iniDay: monday.getDate(), 
            iniMonth: monthNombres[monday.getMonth()].substr(0,3),
            endDay: mondayNextWeek.getDate(), 
            endMonth: monthNombres[mondayNextWeek.getMonth()].substr(0,3)
        })
        setPeriodMonth({month: monthNames[today.getMonth()], year: today.getFullYear()})
        setPeriodYear(today.getFullYear())
    }

    const getMondayOfCurrentWeek = () => {
        const today = new Date();
        const first = today.getDate() - today.getDay() + 1;
      
        const monday = new Date(today.setDate(first));
        return monday;
    }

    const ChangePeriodMonthM = ({ target }) => {
        setPeriodMonth({month: target.value, year: periodMonth.year})
        console.log(periodMonth)

    }

    const fetchAnalytics = async () => {
        const response = await fetch(base_url+'analytics/'+user.user_id)
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
        iniDateParams();
    },[])

    return(
        <Container maxW='1250px'>
            <Flex w="100%" p={5} direction='column' minH={'100vh'} >
                <Flex justify='start'>
                    <Heading pt='1' m={4} textAlign='center' > ¿Como va el taller? </Heading>
                </Flex>

                <Flex justify='center' gap='6' direction={['column','column','column','column','row','row']}>
                    <Flex width='100%' direction='column'>
                        <Flex justify='space-between'>
                            <Flex W='30%' bg='white' boxShadow='lg' rounded='xl' m={4} mb={2} >
                                <Button bg='white'>&lt;</Button>
                                {period === 'day' &&
                                    <Center>
                                        <Text className='analytics-select period-day'
                                        >{`${periodDay.getDate()}-${monthNombres[periodDay.getMonth()]}`}</Text>
                                    </Center>
                                }
                                {period === 'week' &&
                                    <Center>
                                        <Text className='analytics-select period-week'
                                        >{`${periodWeek.iniDay}-${periodWeek.iniMonth} ${periodWeek.endDay}-${periodWeek.endMonth}`}</Text>
                                    </Center>
                                }
                                {period === 'month' &&
                                    <>
                                    <select className='analytics-select period-month'
                                        value={periodMonth.month}
                                        onChange={ChangePeriodMonthM}
                                        >
                                        {optionsPeriodMonthM.map(({ val, label }, index) => <option value={val} >{label}</option>)}
                                    </select>
                                    <select id="analytics-select-year" className='analytics-select period-month'>
                                        <option value="2022" selected>2022</option>
                                    </select>
                                    </>
                                }
                                {period === 'year' &&
                                    <>
                                    <select className='analytics-select period-year'>
                                        <option value="2022" selected>{periodYear}</option>
                                    </select>
                                    </>
                                }
                                <Button bg='white'>&gt;</Button>
                            </Flex>
                            <Flex w='60%' justify='space-around' bg='white' boxShadow='lg' rounded='xl' m={4} mb={2}>
                                <Button bg='white' className={period === 'day' ? 'period active' : 'period'}
                                    onClick={()=>{setPeriod('day')}}>Dia</Button>
                                <Button bg='white' className={period === 'week' ? 'period active' : 'period'}
                                    onClick={()=>{setPeriod('week')}}>Semana</Button>
                                <Button bg='white' className={period === 'month' ? 'period active' : 'period'}
                                    onClick={()=>{setPeriod('month')}}>Mes</Button>
                                <Button bg='white' className={period === 'year' ? 'period active' : 'period'}
                                    onClick={()=>{setPeriod('year')}}>Año</Button>
                            </Flex>
                        </Flex>
                        
                        <Flex  bg='white' direction='column' boxShadow='lg' rounded='xl' m={4}>
                            <Flex ml='2em' mt='15px'>
                                <Text fontWeight='800' fontSize='17px'> Ganancias</Text>
                            </Flex>
                            <Flex p='2em' py='1em' justify='space-between'>
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
                                height={250}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 10,
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
                    </Flex>

                    <Flex boxShadow='lg' m={4} mt={[4,4,4,4,'80px','80px']} rounded='xl' bg='white' direction='column' justify='space-between'>
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
                    <Flex m={4} justify='space-between'>
                        <Statbox title='Clientes' data={analytics.total_clients} />
                        <Statbox title='Citas ' data={analytics.total_events} />
                        <Statbox title='Ganancias ' data={analytics.total_gains} />
                        <Statbox title='Ganancias / cita ' data={analytics.avg_gains} />
                    </Flex>
                }
            </Flex>
        </Container >
        
    );
}

export default Analytics;