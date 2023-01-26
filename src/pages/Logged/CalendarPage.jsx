import {Flex, Text} from '@chakra-ui/react'

//React big calendar
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

//comps
import Navbar from "../../components/navbar/Navbar";
//api
import { useQuery } from "@tanstack/react-query"
import { getAllEvents } from "../../api/eventsApi"
//auth
import { useAuthHeader } from "react-auth-kit";

export default function CalendarPage(){

    const localizer = momentLocalizer(moment);
    const authHeader = useAuthHeader()
    const {data, isLoading} = useQuery({
        queryKey: ['events'],
        queryFn: () => getAllEvents(authHeader()),
    })


    return (
        <Flex w='100%'>
            <Navbar/>
            {isLoading &&
                <Text>
                    Cargando...
                </Text>
            }
            {data && 
                <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={data}
                style={{ height: "100vh", width: "100%" }}
                />
            }
        </Flex>
    )
}
