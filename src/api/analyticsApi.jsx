import {base_url} from '../environment/global';

const getWeekAnalytics= async (user, authTokens, period)=>{
    const data = await fetch(base_url+"analytics/"+user.user_id,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        },
        body: JSON.stringify(period)
    })  
    return data;    
}

export default {
    getWeekAnalytics,
}