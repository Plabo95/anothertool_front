import axios from 'axios'
import {createRefresh} from 'react-auth-kit'

const refreshApi = createRefresh({
    interval: 19,   // Refreshs the token in every 19 minutes
    refreshApiCallback: async (
    {  
        authToken,
        authTokenExpireAt,
        refreshToken,
        refreshTokenExpiresAt,
        authUserState
    }) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user/refresh-token', 
            {'refresh': refreshToken}, {
            headers: {'Authorization': `Bearer ${authToken}`}}
            )
            return {
                isSuccess: true,
                newAuthToken: response.data.token,
                //newAuthTokenExpireIn: 10,
                //newRefreshTokenExpiresIn: 1
            }
        }
        catch(error){
            console.error(error)
            return {
            isSuccess: false
            } 
        }    
        }
})

export default refreshApi