import moment from 'moment';
import {momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState} from 'react'
import {Flex} from '@chakra-ui/react'

/* Components */
import CalendarComp from "./pages/Calendar";
import Navbar from "./components/Navbar/Navbar";
import Analytics from './pages/Analytics';
import Garage from './pages/Garage';

import {BrowserRouter, Routes, Route} from "react-router-dom";

require('moment/locale/es.js')
const localizer=momentLocalizer(moment)


function App() {

  const [myEvents, setEvents] = useState([])
  const[services, setServices] = useState([])
  const[clients, setClients] = useState([])

  const fetchServices = async () => {
    const response = await fetch("https://plabo.pythonanywhere.com/api/services")
    setServices(await response.json())
    }

  const fetchEvents = async () => {
    const response = await fetch("https://plabo.pythonanywhere.com/api/dates")
    setEvents(await response.json())
    }
    
  const fetchClients = async () => {
    const response = await fetch("https://plabo.pythonanywhere.com/api/clients")
    setClients(await response.json())
    }

  useEffect(() => {
      fetchEvents();
      fetchClients();
      fetchServices();
      },[])

    return (
        <Flex>
         <BrowserRouter>
          <Navbar/>  
          <Routes>       
            <Route exact path="klndr_front/" element={<CalendarComp localizer={localizer}  getEvents={fetchEvents} eventlist={myEvents} clientlist={clients} getClients={fetchClients} servicelist={services}  getServices={fetchServices}/>} />
            <Route path="klndr_front/analytics" element={<Analytics/>} />
            <Route path="klndr_front/garage" element={<Garage eventlist={myEvents} getEvents={fetchEvents} clientlist={clients} getClients={fetchClients} servicelist={services} getServices={fetchServices}/>} />
          </Routes>
        </BrowserRouter>
        </Flex>
    );
}
export default App;