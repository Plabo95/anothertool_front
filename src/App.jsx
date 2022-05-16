import moment from 'moment';
import {momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState, useContext} from 'react'
import {Flex} from '@chakra-ui/react'

//Components
import CalendarComp from "./pages/Calendar";
import Navbar from "./components/Navbar/Navbar";
import Analytics from './pages/Analytics';
import Garage from './pages/Garage';
import Register from './pages/Register';
import Login from './pages/Login';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import PrivateRoute from './auth/PrivateRoute'
import {AuthProvider} from './auth/AuthContext'
import AuthContext from './auth/AuthContext'

require('moment/locale/es.js')
const localizer=momentLocalizer(moment)

function App() {

  const[services, setServices] = useState([])
  const[clients, setClients] = useState([])

  const fetchServices = async () => {
    fetch("https://plabo.pythonanywhere.com/api/services")
      .then(res => res.json())
      .then(result => {
        setServices(result)
    },
    (error) => {
      console.error("Error fetching services ", error)
    })
  }


  const fetchClients = async () => {
    fetch("https://plabo.pythonanywhere.com/api/clients")
    .then(res => res.json())
    .then(result => {
      setClients(result)
    },
    (error) => {
      console.error("Error fetching clients ", error)
    })
  }

  useEffect(() => {
      fetchClients();
      fetchServices();
      },[])

    return (
        <Flex>
         <BrowserRouter>
          <AuthProvider>
          <Navbar/>   
          <Routes>
            <Route path='klndr_front/register' element={<Register/>} /> 
            <Route path='klndr_front/login' element={<Login/>} /> 
            
              <Route path="klndr_front/garage" element={
                <PrivateRoute>
                  <Garage clientlist={clients} getClients={fetchClients} servicelist={services} getServices={fetchServices}/>
                </PrivateRoute>
                }/>
              <Route path="klndr_front/analytics" element={
                <PrivateRoute>
                  <Analytics/>
                </PrivateRoute>
              }/>
              <Route path="klndr_front/" element={
                <PrivateRoute>
                  <CalendarComp localizer={localizer} clientlist={clients} getClients={fetchClients} servicelist={services}  getServices={fetchServices} />
                </PrivateRoute>
              }/>
             
          </Routes>
          </AuthProvider> 
        </BrowserRouter>
        
        </Flex>
    );
}
export default App;