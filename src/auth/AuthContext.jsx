import {createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";

const AuthContext = createContext()

export default  AuthContext

export const AuthProvider = ({children}) => {
    
    const navigate = useNavigate();       //es un redirect

    let [user, setUser] = useState(()=> localStorage.getItem('authTokens')          
    ?jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)
    :null, [])
    let [authTokens, setAuthTokens] = useState(()=>  localStorage.getItem('authTokens')          
    ?JSON.parse(localStorage.getItem('authTokens'))
    :null, [])
    const [loading,setLoading] = useState(true)     //loggin in loading

    const loginUser = async(e) => {
        const response = await fetch('http://127.0.0.1:8000/api/token/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.username,
                'password': e.password,
            })
            })
            const rstatus = response.status
            if(rstatus >= 200 && rstatus<300){
                const data = await response.json();
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens',JSON.stringify(data))    //cache?
                navigate('klndr_front/');
            }
            else{
                console.log('error de login')
            }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('klndr_front/login')
    } 

    const updateToken = async() => {
        console.log('refreshing token')
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': authTokens.refresh })
            })
            const rstatus = response.status
            if(rstatus >= 200 && rstatus<300){
                const data = await response.json();
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))    //cache?
                console.log('user refreshed', user)
                }
            else{
                console.log('error de refresh token')
                logoutUser()
            }
    }
    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }
    //refresh token cada 4 mins antes de que caduque en 5
    useEffect(()=>{ 
        const interval = setInterval(() => {
            if(authTokens){
                updateToken()
            }
        }, 240000)
        return ()=> clearInterval(interval)
    },[authTokens, loading])
    
    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}