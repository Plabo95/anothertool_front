import axios from 'axios'
import {useAuthHeader, createRefresh} from 'react-auth-kit'

const refreshToken = axios.create({
    baseURL: process.env.REACT_APP_API_URL +'user/refresh-token'
})

const refreshApi = createRefresh({
    interval: 1,   // Refreshs the token in every x minutes
    refreshApiCallback: (
    {
        authToken,
        authTokenExpireAt,
        refreshToken,
        refreshTokenExpiresAt,
        authUserState
    }) => {
    refreshToken.post('/',
        {
        refreshToken: refreshToken,
        oldAuthToken: authToken
        }
    ).then(({data})=>{
        return {
        isSuccess: true,  // For successful network request isSuccess is true
        newAuthToken: data.newAuthToken,
        newAuthTokenExpireIn: data.newAuthTokenExpireIn
        // You can also add new refresh token ad new user state
        }
    }).catch((e)=>{
        console.error(e)
        return{
        isSuccess:false // For unsuccessful network request isSuccess is false
        }
    })
    }
})

export default refreshApi