import { useEffect } from "react";
import { useState } from "react";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCountries(data);
            })
    }, [])
    
    return (
        <div className="grid grid-cols-3 gap-5 m-10">
            {
                countries.map((country) => (
                    <div key={country.cca3} className="border">
                        <h3>{country.name.common}</h3>
                        <img src={`${country.flags.png}`} className="w-60 h-48"/>
                    </div>
                    
                ))
            }
        </div>
    )
}

export default Countries