import { useEffect, createContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export default  AuthContext


export const AuthProvider = ({children}) => {
    
    let [user, setUser] = useState(null)
    let [authTokens, setAuthTokens] = useState(null)

    let loginUser = async(e) => {
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
                console.log(data)
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
            }
            else{
                console.log('error de login')
            }
    }

    let contextData = {
        user:user,
        loginUser: loginUser
    }
    
    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>

    )
}