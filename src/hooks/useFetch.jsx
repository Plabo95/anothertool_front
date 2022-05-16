import {useEffect, useState, useContext} from "react";
import AuthContext from "../auth/AuthContext";


export default function useFetch (url) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {user, authTokens} = useContext(AuthContext)

    const doSomething = () => {}

    useEffect(() => {
        console.log('fetching data from hook', url)
        setLoading(true)
        fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ String(authTokens.access),
            },
        })
        .then(res => res.json())
        .then(result => {
          setData(result)
          setLoading(false)
        },
        (error) => {
            console.error("Error fetching services ", error)
            setLoading(false)
        })
    }, [url])

    return[{data, loading, error}, doSomething]
}