import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {Text} from '@chakra-ui/react'
//api
import { useQuery} from '@tanstack/react-query';
import { getOrderStats } from '../../api/statsApi';
//auth
import { useAuthHeader } from 'react-auth-kit';

export default function OrdersChart(){
    const authHeader = useAuthHeader()

    const {data, isLoading} = useQuery({
        queryKey: ['orderstats'],
        queryFn: () => getOrderStats({auth: authHeader()}),
    })
    const data2 = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
    if (data){
    return(
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
            width={500}
            height={400}
            data = {data}
            >
            <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0258FF" stopOpacity={0.8}/>
                <stop offset="90%" stopColor="#0258FF" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" strokeWidth={3} dataKey="created_count" stroke="#0258FF" fillOpacity={1} fill="url(#blueGradient)" />
            </AreaChart>
        </ResponsiveContainer>
    )
    }
    if(isLoading){
        return(
            <Text>
                Loading...
            </Text>
        )
    }
}