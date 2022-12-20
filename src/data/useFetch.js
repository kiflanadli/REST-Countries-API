import { useState, useEffect } from "react";

const useCountryFetch = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []) 

    return data;
}

export {useCountryFetch};