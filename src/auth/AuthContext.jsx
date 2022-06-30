import {createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import {base_url} from '../environment/global';
import {useToast} from '@chakra-ui/react'

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

    //nos dice si el authcontext esta listo para ser cargado
    const [loading,setLoading] = useState(false)  
    const [isLogged,setIsLogged] = useState(false)  
    const toast = useToast()

    const loginUser = async(e) => {
        const response = await fetch(base_url+'token',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.username,
                'password': e.password,
            })
            })
            if(response.ok) {
                const data = await response.json();
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens',JSON.stringify(data))    //cache?
                navigate('/calendar');
            }
            else if(response.statusText === 'Unauthorized'){
                toast({
                    title: 'Cuenta Inactiva',
                    description: "Tu cuenta aún está inactiva, nos pondremos en contacto contigo pronto" ,
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                    })
            }
            else{
                toast({
                    title: 'Error de login ',
                    description: "Código de error "+ response.statusText +' intentalo mas tarde' ,
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                    })
            }
            return (response.statusText)
    }

    const logoutUser = (ini = true) => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        if (ini) navigate('/');
    } 

    const updateToken = async() => {
        if(localStorage.getItem('authTokens')) {
            const localAuthToken = await JSON.parse(localStorage.getItem('authTokens'))
            const response = await fetch(base_url+'token/refresh',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'refresh': localAuthToken.refresh })
            })
            if(response.ok){
                setIsLogged(true)
                const data = await response.json();
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))    //cache?
                console.log('Token obtenido',data)
            }
            if(!response.ok){
                console.log('Error refreshing token, loggin out...')
                setIsLogged(false)
                logoutUser()
            }
            //al terminar de refrescar el token quito loading
            if(loading){
                setLoading(false)
            }
        }else {
            console.log('No hay token en localStorage')
        }          
        
    }
    const contextData = {
        user: user,
        authTokens: authTokens,
        isLogged: isLogged,
        loginUser: loginUser,
        logoutUser: logoutUser,
        updateToken: updateToken
    }
    //refresh token cada 4 mins antes de que caduque en 5
    //tambien es importante que obtenga el refresh cada vez que recarga pagina
    useEffect(()=>{ 
        if(loading){
            updateToken()
        }
        const interval = setInterval(() => {
            if(authTokens){
                //console.log('hay authtokens', authTokens)
                updateToken()
            }
        }, 240000)
        return ()=> clearInterval(interval)
    },[authTokens])
    
    return(
        <AuthContext.Provider value={contextData} >
            {loading? null: children}
        </AuthContext.Provider>
    )
}