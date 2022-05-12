import {useEffect, useState} from "react";


export default function useFetch (url) {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(true)
        fetch(url)
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

    return{data, loading}
}