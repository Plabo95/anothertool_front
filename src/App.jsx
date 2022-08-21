import moment from 'moment';
import {momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useContext, useState } from 'react'
import {Box, Flex} from '@chakra-ui/react'

// Auth Components
import CalendarComp from "./pages/Calendar";
import Navbar from "./components/Navbar/Navbar";
import Analytics from './pages/Analytics';
import Garage from './pages/Garage';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';

//Non Auth Components
import Landing from './pages/Landing';
import Prices from './pages/Prices';

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute';
import {AuthProvider} from './auth/AuthContext'
import AuthContext from './auth/AuthContext'

require('moment/locale/es.js')
const localizer=momentLocalizer(moment)

function App() {

  const contextData = useContext(AuthContext)
  const {user, logoutUser, isLogged} = useContext(AuthContext)
  const getIsLogged = async () => {
    await contextData?.updateToken()
  }

  useEffect(()=>{
    getIsLogged()
    console.log('getIsLogged')
    console.log('ini isLogged',isLogged)
  },[])

  useEffect(()=>{
    console.log('isLogged',isLogged)
  },[isLogged])

  return (
    <>
      {/* <RefreshToken setIsLogged={setIsLogged} isLogged={isLogged}/> */}
      <Flex w='100%'>
          <Navbar/>
        <Routes>
            <Route index element={isLogged ? <Navigate to="/calendar" replace /> : <Landing/>} />
            <Route path='/' index element={isLogged ? <Navigate to="/calendar" replace /> : <Landing/>} />
            <Route path='/prices' index element={isLogged ? <Navigate to="/calendar" replace /> : <Prices/>} />  
            <Route path='/register' element={isLogged ? <Navigate to="/calendar" replace /> : <Register/>} /> 
            <Route path='/login' element={isLogged ? <Navigate to="/calendar" replace /> : <Login/>} />   

            <Route element={<PrivateRoute/> && <AdminRoute/>}>
              <Route path="/adminpanel" element={<AdminPanel/>}/>
            </Route>

            <Route element={<PrivateRoute/>}>
              <Route path="/calendar" element={<CalendarComp localizer={localizer}/>}/>
              <Route path="/garage" element={<Garage/>}/>
              <Route path="/analytics" element={<Analytics/>}/>
            </Route>

            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Flex>
    </>
  );
}

// const RefreshToken = (setIsLogged, isLogged) => {
//   const contextData = useContext(AuthContext)
//   const {user} = useContext(AuthContext)
//   const getIsLogged = async () => {
//     await contextData?.updateToken()
//     if (user !== null && user.user_id !== null && user.user_id !== undefined){
//       setIsLogged(true)
//     }else{
//       setIsLogged(true)
//     }
//   }

//   useEffect(()=>{
//     getIsLogged()
//     console.log('getIsLogged')
//   },[])

//   useEffect(()=>{
//     getIsLogged()
//   },[user])
// };

export default App;