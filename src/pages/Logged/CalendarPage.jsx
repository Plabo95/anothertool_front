import {Flex, Text} from '@chakra-ui/react'

//React big calendar
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

//comps
import Navbar from "../../components/navbar/Navbar";
//api
import { useQuery } from "@tanstack/react-query"

//auth
import { useAuthHeader } from "react-auth-kit";

export default function CalendarPage(){

    const localizer = momentLocalizer(moment);
    const authHeader = useAuthHeader()



    return (
        <Flex w='100%'>
            <Navbar/>

        </Flex>
    )
}
