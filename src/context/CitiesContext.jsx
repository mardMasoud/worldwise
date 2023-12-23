import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [currentCity, setCurrentCity] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch("http://localhost:8000/cities");
                const data = await res.json();
                setCities(data);
            } catch {
                alert("There was an error loading...");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);
    async function getcity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:8000/cities/${id}`);
            const data = await res.json();
            console.log(data);
            setCurrentCity(data);
        } catch {
            alert("There was an error loading...");
        } finally {
            setIsLoading(false);
        }
    }
    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:8000/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);
            setCities((cities) => [...cities, data]);
        } catch {
            alert("There was an error loading...");
        } finally {
            setIsLoading(false);
        }
    }
    async function deleteCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:8000/cities/${id}`, {
                method: "DELETE",
               
            });
          
           
            setCities((cities) => cities.filter(city=>city.id!==id));
        } catch {
            alert("There was an error loading...");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{ deleteCity,cities,setCities, createCity, isLoading, setIsLoading, currentCity, getcity }}
        >
            {children}
        </CitiesContext.Provider>
    );
}
function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("CitiesContext was  used outside the CitiesProvider");
    return context;
}
export { CitiesProvider, useCities };
