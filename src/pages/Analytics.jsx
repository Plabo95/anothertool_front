import React, {useState, useEffect, useContext} from 'react'
import {Center,Container,Button,Box,Flex, Heading, Text, Divider, Circle, Wrap, WrapItem} from '@chakra-ui/react'
import {Stat,StatLabel,StatNumber,StatHelpText,StatArrow,StatGroup} from '@chakra-ui/react'
import AuthContext from '../auth/AuthContext';
import {base_url} from '../environment/global';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import useApi from '../hooks/useApi';
import analyticsApi from '../api/analyticsApi';
import servicesApi from '../api/servicesApi';

//Components
import Statbox from '../components/Analytics/Statbox';
import { transform } from 'framer-motion';

function Analytics(){

    const {user, authTokens} = useContext(AuthContext)

    const [analytics, setAnalytics] = useState()
    const [data, setData] = useState({})
    const [graphicLine, setGraphicLine] = useState({name: 'citas', color: '#8884d8'})

    const[services, setServices] = useState([])
    const[citasService, setCitasService] = useState([])
    const[gainsService, setGainsService] = useState([])
    const[servicesColors, setServicesColors] = useState([])

    const [period, setPeriod] = useState('month')
    const [iniPeriodDay, setIniPeriodDay] = useState()
    const [iniPeriodWeek, setIniPeriodWeek] = useState({})
    const [iniPeriodMonth, setIniPeriodMonth] = useState({})
    const [iniPeriodYear, setIniPeriodYear] = useState()
    const [periodDay, setPeriodDay] = useState()
    const [periodWeek, setPeriodWeek] = useState({})
    const [periodMonth, setPeriodMonth] = useState({})
    const [periodYear, setPeriodYear] = useState()

    const [optionsPeriodMonthY, setOptionsPeriodMonthY] = useState([])

    const getAnalyticsApi = useApi(analyticsApi.getWeekAnalytics);

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const monthNombres = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];
    const optionsPeriodMonthYear = [
        {val: 2022, label: '2022'},
        {val: 2022, label: '2022'},
        {val: 2022, label: '2022'},
        {val: 2022, label: '2022'},
        {val: 2022, label: '2022'},
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

    const iniOptions = () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        let i = 0;
        for (const Y of optionsPeriodMonthYear){
            Y.val = currentYear - i;
            Y.label = (currentYear - i).toString();
            i++;
        }
        console.log('options',optionsPeriodMonthY) 
        setOptionsPeriodMonthY(optionsPeriodMonthYear)
    }

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
        getDatos(`${today.getFullYear()}-${today.getMonth() + 1}-${1}`,`${dateNextMonth.getFullYear()}-${dateNextMonth.getMonth() + 1}-${1}`, 'month');
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
        const iniDate = new Date(`${periodMonth.iniYear}-${Number(target.value)}-${1}`);
        const endDate = new Date(`${periodMonth.iniYear}-${Number(target.value)}-${1}`);
        endDate.setMonth(endDate.getMonth() + 1);
        setPeriodMonth({
            iniDay: '01', 
            iniMonth: iniDate.getMonth() + 1,
            iniYear: iniDate.getFullYear(),
            endDay: '01', 
            endMonth: endDate.getMonth() + 1,
            endYear: endDate.getFullYear()
        })
        const star_date = `${iniDate.getFullYear()}-${iniDate.getMonth() + 1}-${1}`;
        const end_date = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${1}`;
        getDatos(star_date, end_date, 'month');
    }

    const ChangePeriodMonthY = ({ target }) => {
        const iniDate = new Date(`${Number(target.value)}-${periodMonth.iniMonth}-${1}`);
        const endDate = new Date(`${Number(target.value)}-${periodMonth.iniMonth}-${1}`);
        endDate.setMonth(endDate.getMonth() + 1);
        setPeriodMonth({
            iniDay: '01', 
            iniMonth: periodMonth.iniMonth,
            iniYear: iniDate.getFullYear(),
            endDay: '01', 
            endMonth: endDate.getMonth() + 1,
            endYear: endDate.getFullYear()
        })
        const star_date = `${iniDate.getFullYear()}-${periodMonth.iniMonth}-${1}`;
        const end_date = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${1}`;
        getDatos(star_date, end_date, 'month');
    }

    
    const handlePeriod = async (period) => {
        let start_date;
        let end_date;
        const periods = {
            'day': ()=>{},
            'week': ()=>{
                setPeriodWeek(iniPeriodWeek)
                start_date = `${iniPeriodWeek.iniYear}-${iniPeriodWeek.iniMonth}-${iniPeriodWeek.iniDay}`
                end_date = `${iniPeriodWeek.endYear}-${iniPeriodWeek.endMonth}-${iniPeriodWeek.endDay}`
            },
            'month': ()=>{
                setPeriodMonth(iniPeriodMonth)
                start_date = `${iniPeriodMonth.iniYear}-${iniPeriodMonth.iniMonth}-${iniPeriodMonth.iniDay}`
                end_date = `${iniPeriodMonth.endYear}-${iniPeriodMonth.endMonth}-${iniPeriodMonth.endDay}`
            },
            'year': ()=>{
                setPeriodYear(iniPeriodYear)
                start_date = `${iniPeriodYear}-1-1`
                end_date = `${iniPeriodYear + 1}-1-1`
            }
        };
        await (periods[period])()
        setPeriod(period)
        await getDatos(start_date, end_date, period)
    }

    const nextPrevPeriod = async (nextPrev) => {
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
            'month': ()=>{
                const date = new Date(`${periodMonth.endYear}-${periodMonth.endMonth}-${1}`);
                date.setMonth(date.getMonth() + 1);
                console.log('next month', date)
                start_date = `${periodMonth.endYear}-${periodMonth.endMonth}-${1}`
                end_date = `${date.getFullYear()}-${date.getMonth() + 1}-${1}`
                console.log('month', start_date, end_date)
                setPeriodMonth({
                    iniDay: '01', 
                    iniMonth: start_date.split('-')[1],
                    iniYear: start_date.split('-')[0],
                    endDay: '01', 
                    endMonth: end_date.split('-')[1],
                    endYear: end_date.split('-')[0]
                })
            },
            'year': ()=>{
                const year = periodYear + 1;
                setPeriodYear(periodYear + 1)
                start_date = `${year}-1-1`
                end_date = `${year + 1}-1-1`
            }
        }
        const prevPeriod = {
            'day': ()=>{},
            'week': ()=>{
                const date = new Date(`${periodWeek.iniYear}-${periodWeek.iniMonth}-${periodWeek.iniDay}`);
                date.setDate(date.getDate() - 7); 
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
            'month': ()=>{
                const date = new Date(`${periodMonth.iniYear}-${periodMonth.iniMonth}-${1}`);
                date.setMonth(date.getMonth() - 1); 
                start_date = `${date.getFullYear()}-${date.getMonth() + 1}-${1}`
                end_date = `${periodMonth.iniYear}-${periodMonth.iniMonth}-${1}`
                setPeriodMonth({
                    iniDay: '01', 
                    iniMonth: start_date.split('-')[1],
                    iniYear: start_date.split('-')[0],
                    endDay: '01', 
                    endMonth: end_date.split('-')[1],
                    endYear: end_date.split('-')[0]
                })
            },
            'year': ()=>{
                const year = periodYear - 1;
                setPeriodYear(periodYear - 1)
                start_date = `${year}-1-1`
                end_date = `${year + 1}-1-1`
            }
        }
        nextPrev === 'next'
            ?   await (nextPeriod[period])()
            :   await (prevPeriod[period])()
        await getDatos(start_date, end_date, period)
    }

    const data2 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
    ];
    const COLORS = ['tomato', '#81e5d9', '#805ad4'];

    const getDataServices = async (analyticsData) => {
        
        const colors = analyticsData.eps.map(serv => {
            return serv.color
        })
        setServicesColors(colors)
        
        const citasPerService = analyticsData.eps.map(serv => {
            return {name: serv.name, value: serv.count}
        })
        setCitasService(citasPerService)

        const gainsPerService = analyticsData.eps.map(serv => {
            return {name: serv.name, value: serv.gains}
        })
        setGainsService(gainsPerService)
    }

    const getDatos = async (start_date, end_date, period) => {
        const daterange = {start_date, end_date} 
        // const daterange = {start_date:'2022-1-1', end_date:'2023-1-1', period: 'year'} 
        const {data, error} = await getAnalyticsApi.request(user, authTokens, {period, ...daterange})
        error 
            ? console.log(error)
            : setAnalytics(data)
        setData(data.period)
        console.log('Datooooos',data)
        getDataServices(data)
    }

    useEffect(() => {
        iniDateParams();
        iniOptions();
    },[])

    return(
        <Container maxW='1250px'>
            <Flex w="100%" p={5} direction='column' minH={'100vh'} >
                <Flex justify='start'>
                    <Heading pt='1' m={4} textAlign='center' > ¿Como va el taller? </Heading>
                </Flex>

                <Flex justify='center' gap='6' direction={['column','column','column','column','row','row']}>
                    <Flex width='100%' direction='column' h='100%'>
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
                                    <select id="analytics-select-year" className='analytics-select period-month'
                                        value={periodMonth.iniYear}
                                        onChange={ChangePeriodMonthY}
                                    >
                                        {optionsPeriodMonthY.map(({ val, label }, index) => <option value={val} >{label}</option>)}
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
                            {/* <Flex ml='2em' mt='15px'>
                                <Text fontWeight='800' fontSize='17px'> Ganancias</Text>
                            </Flex> */}
                            <Flex p='2em' py='1em' justify='space-between'>
                                <Flex direction='column' gap='8'>
                                    {/* <Flex direction={'column'}>
                                        <Heading>659€</Heading>
                                        <Text>Este mes</Text>
                                    </Flex>
                                    <Flex direction={'column'}>
                                        <Heading>40</Heading>
                                        <Text>Citas este mes</Text>
                                    </Flex> */}
                                    {/* <Flex direction='column'>
                                        {graphicLine.name === 'ganancias'
                                            ?   <Button bg='#8884d8' color='white' _hover={{bg: 'white', color: '#001234'}} onClick={()=>{setGraphicLine({name:'citas', color:'#8884d8'})}}>Citas</Button>
                                            :   <Button bg='#82ca9d' _hover={{bg: 'white', color: '#001234'}} onClick={()=>{setGraphicLine({name:'ganancias', color:'#82ca9d'})}}>Ganancias</Button>
                                        }
                                    </Flex> */}
                                    <Flex direction='column'>
                                        <Button m='2' mt='3' onClick={()=>{setGraphicLine({name:'citas', color:'#8884d8'})}}
                                            bg={graphicLine.name === 'citas' ? '#8884d8' : 'none'}
                                            color={graphicLine.name === 'citas' ? 'white' : '#8884d8'}
                                            _hover={{bg: '#8884d8', color: '#001234'}}>
                                                Citas
                                        </Button>
                                        <Button m='2' onClick={()=>{setGraphicLine({name:'ganancias', color:'#82ca9d'})}}
                                            bg={graphicLine.name === 'ganancias' ? '#82ca9d' : 'none'}
                                            color={graphicLine.name === 'ganancias' ? '#001234' : '#82ca9d'}
                                            _hover={{bg: '#82ca9d', color: 'white'}}>
                                            Ganancias
                                        </Button> 
                                    </Flex>
                                </Flex>
                                <Flex  direction='column' mt='3'>
                                    <LineChart
                                        width={570}
                                        height={280}
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
                            <Wrap  p='1.5em' justify='start'>
                                {graphicLine.name === 'citas'
                                    ?   citasService.map((entry, index) => (
                                            <WrapItem gap='0.5em'>
                                                <Circle bg={servicesColors[index % servicesColors.length]} w='40px' h='40px'/>
                                                <Flex direction='column' alignItems='start' mr={2} h='100%'>
                                                    <Text>{entry.name}</Text>
                                                    <Text>{entry.value} Citas</Text>
                                                </Flex>
                                            </WrapItem>
                                        ))
                                    :   gainsService.map((entry, index) => (
                                        <WrapItem gap='0.5em'>
                                            <Circle bg={servicesColors[index % servicesColors.length]} w='40px' h='40px'/>
                                            <Flex direction='column' alignItems='start' mr={2} h='100%'>
                                                <Text>{entry.name}</Text>
                                                <Text>{entry.value}€</Text>
                                            </Flex>
                                        </WrapItem>
                                    ))    
                                } 
                            </Wrap>
                        </Flex>
                    </Flex>
                                
                    <Flex boxShadow='lg' m={4} mt={[4,4,4,4,'80px','80px']} w={'500px'} rounded='xl' bg='white' direction='column' justify='space-between' h='100%'>
                        <Flex m='1.5em'>
                            {graphicLine.name === 'citas' 
                                ?   <Text>Citas / Servicio</Text>
                                :   <Text>Ganancias / Servicio</Text>
                            }
                        </Flex>
                        <Flex w='100%' justify='center' align='center' >
                            <PieChart width={200} height={200}>
                                <Pie
                                data={graphicLine.name === 'citas' 
                                        ?   citasService
                                        :   gainsService
                                }
                                cx={95}
                                cy={95}
                                innerRadius={50}
                                outerRadius={90}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                >
                                {graphicLine.name === 'citas' 
                                    ?   citasService.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={servicesColors[index % servicesColors.length]} />
                                        ))
                                    :   gainsService.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={servicesColors[index % servicesColors.length]} />
                                        ))
                                }
                                </Pie>
                            </PieChart>
                        </Flex>
                        <Wrap  p='1.5em' justify='center'>
                            {graphicLine.name === 'citas'
                                ?   citasService.map((entry, index) => (
                                        <WrapItem gap='0.5em' w='80px'>
                                            <Circle bg={servicesColors[index % servicesColors.length]} w='40px' h='40px'/>
                                            <Flex alignItems='center' mr={2} h='100%'>
                                                <Text>{Math.round(100*entry.value/analytics.total.total_events)}%</Text>
                                            </Flex>
                                        </WrapItem>
                                    ))
                                :   gainsService.map((entry, index) => (
                                    <WrapItem gap='0.5em' w='80px'>
                                        <Circle bg={servicesColors[index % servicesColors.length]} w='40px' h='40px'/>
                                        <Flex alignItems='center' mr={2} h='100%'>
                                            <Text>{Math.round(100*entry.value/analytics.total.total_gains)}%</Text>
                                        </Flex>
                                    </WrapItem>
                                ))    
                            }                       
                        </Wrap>
                    </Flex>

                </Flex>

                {analytics &&
                    <Flex m={4} justify='space-between'>
                        <Statbox title='Clientes' dataTotal={analytics.total.total_clients} dataComparations={analytics.comparations.total_clients} />
                        <Statbox title='Citas ' dataTotal={analytics.total.total_events} dataComparations={analytics.comparations.total_events} />
                        <Statbox title='Ganancias ' dataTotal={analytics.total.total_gains} dataComparations={analytics.comparations.total_gains} />
                        <Statbox title='Ganancias / cita ' dataTotal={analytics.total.avg_gains} dataComparations={analytics.comparations.avg_gains} />
                    </Flex>
                }
            </Flex>
        </Container >
        
    );
}

export default Analytics;