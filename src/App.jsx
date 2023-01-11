import {Routes,Route,} from "react-router-dom";
import { useState, useEffect } from "react";

//pages
import Home from "./pages/Home";

export default function App() {
  
{/* Responsiveness  */}
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
        <Route index path='/' element={<Home  device={device} />} />
    </Routes>
  )
}

