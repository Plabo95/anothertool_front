import {Routes,Route,} from "react-router-dom";
import { useState, useEffect } from "react";

//pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Logged/Dashboard";
import MyGarage from "./pages/Logged/MyGarage";
import Orders from "./pages/Logged/Orders";
import Workshop from "./pages/Logged/Workshop";

//auth
import { RequireAuth } from "react-auth-kit";

export default function App() {
  
    const [device, setDevice] = useState(getWindowSize());

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
            if(innerWidth<1024){
                return 'm'
            };
            if(innerWidth>1023){
                return 'd'
            };
        }
    useEffect(() => {
        function handleWindowResize() {
        setDevice(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
        window.removeEventListener('resize', handleWindowResize);
        };
    })

    return (
        <Routes>
            <Route index path='/' element={<Landing  device={device} />} />
            <Route  path='/login' element={<Login  device={device} />} />
            <Route  path='/register' element={<Register  device={device} />} />

            {/* Protected */}
            <Route path={'/dashboard'} element={
                <RequireAuth loginPath={'/login'}>
                    <Dashboard  device={device} />
                </RequireAuth>
            }/>
            <Route path={'/ordenes'} element={
                <RequireAuth loginPath={'/login'}>
                    <Orders  device={device} />
                </RequireAuth>
            }/>
            <Route path={'/datos'} element={
                <RequireAuth loginPath={'/login'}>
                    <MyGarage  device={device} />
                </RequireAuth>
            }/>
            <Route path={'/taller'} element={
                <RequireAuth loginPath={'/login'}>
                    <Workshop  device={device} />
                </RequireAuth>
            }/>
        </Routes>
    )
}

