import { useEffect, useState } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (request) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true)
        setTimeout(() => { 
            request()
            .then(response => setData(response.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
        }, 1000)
    }, [])
    return [data, loading, error]
}
