import axios from 'axios'
import {useAuthHeader, createRefresh} from 'react-auth-kit'

//api 
import { refresh } from './authApi'
import { useMutation } from "@tanstack/react-query"
import jwt_decode from "jwt-decode";

const refreshApi = createRefresh({
  interval: 1,   // Refreshs the token in every 10 minutes
  refreshApiCallback: async (
    {   // arguments
      authToken,
      authTokenExpireAt,
      refreshToken,
      refreshTokenExpiresAt,
      authUserState
    }) => {
        const {isLoading, mutate, error} = useMutation(
            ["refresh"],
            refresh,
            {
            onSuccess: (token) => {
                var decoded = jwt_decode(token.access);
                //console.log(decoded);
                return {
                    isSuccess: true,
                    newAuthToken: token.access,
                    newAuthTokenExpireIn: 3600,
                    newRefreshTokenExpiresIn: 1
                  }
            },
            onError : (error)=>{
                console.error(error)
                return {
                  isSuccess: false
                }            
            }
            }
        );  
  }
})

export default refreshApi