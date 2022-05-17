import moment from 'moment';
import {momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React from 'react'
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

require('moment/locale/es.js')
const localizer=momentLocalizer(moment)

function App() {

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
                  <Garage/>
                </PrivateRoute>
                }/>
              <Route path="klndr_front/analytics" element={
                <PrivateRoute>
                  <Analytics/>
                </PrivateRoute>
              }/>
              <Route path="klndr_front/" element={
                <PrivateRoute>
                  <CalendarComp localizer={localizer}/>
                </PrivateRoute>
              }/>
             
          </Routes>
          </AuthProvider> 
        </BrowserRouter>
        
        </Flex>
    );
}
export default App;