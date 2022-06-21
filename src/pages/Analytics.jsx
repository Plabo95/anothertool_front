import React, {useState, useEffect, useContext} from 'react'
import {Center,Container,Button,Box,Flex, Heading, Text, Divider, Circle} from '@chakra-ui/react'
import {Stat,StatLabel,StatNumber,StatHelpText,StatArrow,StatGroup} from '@chakra-ui/react'
import AuthContext from '../auth/AuthContext';
import {base_url} from '../environment/global';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import useApi from '../hooks/useApi';
import analyticsApi from '../api/analyticsApi';

//Components
import Statbox from '../components/Analytics/Statbox';
import { transform } from 'framer-motion';

function Analytics(){

    const {user, authTokens} = useContext(AuthContext)

    const [analytics, setAnalytics] = useState()
    const [data, setData] = useState({})
    const [graphicLine, setGraphicLine] = useState({name: 'citas', color: '#8884d8'})

    const [period, setPeriod] = useState('month')
    const [iniPeriodDay, setIniPeriodDay] = useState()
    const [iniPeriodWeek, setIniPeriodWeek] = useState({})
    const [iniPeriodMonth, setIniPeriodMonth] = useState({})
    const [iniPeriodYear, setIniPeriodYear] = useState()
    const [periodDay, setPeriodDay] = useState()
    const [periodWeek, setPeriodWeek] = useState({})
    const [periodMonth, setPeriodMonth] = useState({})
    const [periodYear, setPeriodYear] = useState()

    const getAnalyticsApi = useApi(analyticsApi.getWeekAnalytics);

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const monthNombres = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];

    const optionsPeriodMonthM = [
        {val: 1, label: 'Enero'},
        {val: 2, label: 'Febrero'},
        {val: 3, label: 'Marzo'},
        {val: 4, label: 'Abril'},
        {val: 5, label: 'Mayo'},
        {val: 6, label: 'Junio'},
        {val: 7, label: 'Julio'},
        {val: 8, label: 'Agosto'},
        {val: 9, label: 'Septiembre'},
        {val: 10, label: 'Octubre'},
        {val: 11, label: 'Noviembre'},
        {val: 12, label: 'Diciembre'},
    ]

    const iniDateParams = () => {
        const today = new Date();
        setPeriodDay(today)
        const monday = getMondayOfCurrentWeek();
        let mondayNextWeek = new Date(monday);
        mondayNextWeek.setDate(monday.getDate() + 7); 
        setPeriodWeek({
            iniDay: monday.getDate(), 
            iniMonth: monday.getMonth() + 1,
            iniYear: monday.getFullYear(),
            endDay: mondayNextWeek.getDate(), 
            endMonth: mondayNextWeek.getMonth() + 1,
            endYear: mondayNextWeek.getFullYear()
        })
        setIniPeriodWeek({
            iniDay: monday.getDate(), 
            iniMonth: monday.getMonth() + 1,
            iniYear: monday.getFullYear(),
            endDay: mondayNextWeek.getDate(), 
            endMonth: mondayNextWeek.getMonth() + 1,
            endYear: mondayNextWeek.getFullYear()
        })
        //setPeriodMonth({month: monthNames[today.getMonth()], year: today.getFullYear()})
        let dateNextMonth;
        today.getMonth() === 11
            ?   dateNextMonth = new Date(today.getFullYear() + 1, 0, 1)
            :   dateNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        setPeriodMonth({
            iniDay: '01', 
            iniMonth: today.getMonth() + 1,
            iniYear: today.getFullYear(),
            endDay: '01', 
            endMonth: dateNextMonth.getMonth() + 1,
            endYear: dateNextMonth.getFullYear()
        })
        setIniPeriodMonth({
            iniDay: '01', 
            iniMonth: today.getMonth() + 1,
            iniYear: today.getFullYear(),
            endDay: '01', 
            endMonth: dateNextMonth.getMonth() + 1,
            endYear: dateNextMonth.getFullYear()
        })
        setPeriodYear(today.getFullYear())
        setIniPeriodYear(today.getFullYear())
    }

    const getMondayOfCurrentWeek = () => {
        const today = new Date();
        const first = today.getDate() - today.getDay() + 1;
      
        const monday = new Date(today.setDate(first));
        return monday;
    }

    const ChangePeriodMonthM = ({ target }) => {
        let newPeriodMonth = JSON.parse(JSON.stringify(periodMonth));
        newPeriodMonth.iniMonth = Number(target.value)
        setPeriodMonth(newPeriodMonth)
        console.log(newPeriodMonth,periodMonth)

    }

    
    const handlePeriod = (period) => {
        let start_date;
        let end_date;
        const periods = {
            'day': ()=>{},
            'week': ()=>{
                setPeriodWeek(iniPeriodWeek)
                start_date = `${iniPeriodWeek.iniYear}-${iniPeriodWeek.iniMonth}-${iniPeriodWeek.iniDay}`
                end_date = `${iniPeriodWeek.endYear}-${iniPeriodWeek.endMonth}-${iniPeriodWeek.endDay}`
            },
            'month': ()=>{},
            'year': ()=>{}
        };
        (periods[period])()
        setPeriod(period)
        getDatos(start_date, end_date)
        console.log('handlePeriod',periodWeek)
    }

    const nextPrevPeriod = async (nextPrev) => {
        console.log('periodWeek fin: ',periodWeek)
        let start_date;
        let end_date;
        const nextPeriod = {
            'day': ()=>{},
            'week': ()=>{
                const date = new Date(`${periodWeek.endYear}-${periodWeek.endMonth}-${periodWeek.endDay}`);
                date.setDate(date.getDate() + 7);
                start_date = `${periodWeek.endYear}-${periodWeek.endMonth}-${periodWeek.endDay}`
                end_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                setPeriodWeek({
                    iniDay: start_date.split('-')[2], 
                    iniMonth: start_date.split('-')[1],
                    iniYear: start_date.split('-')[0],
                    endDay: end_date.split('-')[2], 
                    endMonth: end_date.split('-')[1],
                    endYear: end_date.split('-')[0]
                })
            },
            'month': ()=>{},
            'year': ()=>{}
        }
        const prevPeriod = {
            'day': ()=>{},
            'week': ()=>{
                const actualDate = new Date(`${periodWeek.iniYear}-${periodWeek.iniMonth}-${periodWeek.iniDay}`);
                let date = new Date();
                date.setDate(actualDate.getDate() - 7); 
                start_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                end_date = `${periodWeek.iniYear}-${periodWeek.iniMonth}-${periodWeek.iniDay}`
                setPeriodWeek({
                    iniDay: start_date.split('-')[2], 
                    iniMonth: start_date.split('-')[1],
                    iniYear: start_date.split('-')[0],
                    endDay: end_date.split('-')[2], 
                    endMonth: end_date.split('-')[1],
                    endYear: end_date.split('-')[0]
                })
            },
            'month': ()=>{},
            'year': ()=>{}
        }
        nextPrev === 'next'
            ?   await (nextPeriod[period])()
            :   await (prevPeriod[period])()
        await getDatos(start_date, end_date)
        console.log('periodWeek fin: ',periodWeek)
    }

    const fetchAnalytics = async () => {
        const response = await fetch(base_url+'analytics/'+user.user_id)
        setAnalytics(await response.json())
    }

        // const data = [
        //     {
        //       name: 'Enero',
        //       uv: 4000,
        //       pv: 2400,
        //       amt: 2400,
        //     },
        //     {
        //       name: 'Febrero',
        //       uv: 3000,
        //       pv: 1398,
        //       amt: 2210,
        //     },
        //     {
        //       name: 'Marzo',
        //       uv: 2000,
        //       pv: 9800,
        //       amt: 2290,
        //     },
        //     {
        //       name: 'Abril',
        //       uv: 2780,
        //       pv: 3908,
        //       amt: 2000,
        //     },
        //     {
        //       name: 'Mayo',
        //       uv: 1890,
        //       pv: 4800,
        //       amt: 2181,
        //     },
        //     {
        //       name: 'Junio',
        //       uv: 2390,
        //       pv: 3800,
        //       amt: 2500,
        //     },
        //     {
        //       name: 'Julio',
        //       uv: 3490,
        //       pv: 4300,
        //       amt: 2100,
        //     },
        //   ];

          const data2 = [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
          ];
          const COLORS = ['tomato', '#81e5d9', '#805ad4'];

    const getDatos = async (start_date, end_date) => {
        const {data, error} = await getAnalyticsApi.request(user, authTokens, {start_date, end_date})
        error 
            ? console.log(error)
            : setAnalytics(data)
        setData(data.day)
        console.log(data)
    }

    useEffect(() => {
        // fetchAnalytics();
        iniDateParams();
        getDatos();
        console.log('useEffect')
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
                                <Button bg='white' onClick={()=>{nextPrevPeriod('prev')}}>&lt;</Button>
                                {period === 'day' &&
                                    <Center>
                                        <Text className='analytics-select period-day'
                                        >{`${periodDay.getDate()}-${monthNombres[periodDay.getMonth()]}`}</Text>
                                    </Center>
                                }
                                {period === 'week' &&
                                    <Center>
                                        <Text className='analytics-select period-week'
                                        >{`${periodWeek.iniDay}-${monthNombres[periodWeek.iniMonth-1].substr(0,3)} ${periodWeek.endDay}-${monthNombres[periodWeek.endMonth-1].substr(0,3)}`}</Text>
                                    </Center>
                                }
                                {period === 'month' &&
                                    <>
                                    <select className='analytics-select period-month'
                                        value={periodMonth.iniMonth}
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
                                <Button bg='white' onClick={()=>{nextPrevPeriod('next')}}>&gt;</Button>
                            </Flex>
                            <Flex w='60%' justify='space-around' bg='white' boxShadow='lg' rounded='xl' m={4} mb={2}>
                                <Button bg='white' className={period === 'day' ? 'period active' : 'period'}
                                    onClick={()=>{handlePeriod('day')}}>Dia</Button>
                                <Button bg='white' className={period === 'week' ? 'period active' : 'period'}
                                    onClick={()=>{handlePeriod('week')}}>Semana</Button>
                                <Button bg='white' className={period === 'month' ? 'period active' : 'period'}
                                    onClick={()=>{handlePeriod('month')}}>Mes</Button>
                                <Button bg='white' className={period === 'year' ? 'period active' : 'period'}
                                    onClick={()=>{handlePeriod('year')}}>Año</Button>
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
                                    <Flex direction='column'>
                                        {graphicLine.name === 'ganancias'
                                            ?   <Button bg='#8884d8' color='white' _hover={{bg: 'white', color: '#001234'}} onClick={()=>{setGraphicLine({name:'citas', color:'#8884d8'})}}>Citas</Button>
                                            :   <Button bg='#82ca9d' _hover={{bg: 'white', color: '#001234'}} onClick={()=>{setGraphicLine({name:'ganancias', color:'#82ca9d'})}}>Ganancias</Button>
                                        }
                                    </Flex>
                                </Flex>
                                <Flex  direction='column'>
                                    <LineChart
                                        width={500}
                                        height={270}
                                        data={data}
                                        margin={{
                                            top: 5,
                                            right: 10,
                                            left: 20,
                                            bottom: 5,
                                    }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey={graphicLine.name} stroke={graphicLine.color} activeDot={{ r: 8 }} />
                                        {/* <Line type="monotone" dataKey="gains" stroke="#82ca9d" /> */}
                                    </LineChart>
                                </Flex>
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
                        <Statbox title='Clientes' data={analytics.total.total_clients} />
                        <Statbox title='Citas ' data={analytics.total.total_events} />
                        <Statbox title='Ganancias ' data={analytics.total.total_gains} />
                        <Statbox title='Ganancias / cita ' data={analytics.total.avg_gains} />
                    </Flex>
                }
            </Flex>
        </Container >
        
    );
}

export default Analytics;