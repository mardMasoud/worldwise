import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();
const initialStatse = {
    error: "",
    cities: [],
    currentCity: {},
    isLoading: false,
};
function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };
        case "cities/loaded":
            return { ...state, isLoading: false, cities: action.payload };
        case "cities/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };
        case "cities/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
            };
        case "city/loaded":
            return { ...state, isLoading: false, currentCity: action.payload };
        case "rejected":
            return { ...state, isLoading: false, error: action.payload };
        default:
            throw new Error("Unknown action type");
    }
}
function CitiesProvider({ children }) {
    // const [cities, setCities] = useState([]);
    // const [currentCity, setCurrentCity] = useState({});
    // const [isLoading, setIsLoading] = useState(false);
    const [{ error, cities, isLoading, currentCity }, dispach] = useReducer(reducer, initialStatse);
    useEffect(function () {
        async function fetchCities() {
            try {
                dispach({ type: "loading" });
                const res = await fetch("http://localhost:8000/cities");
                const data = await res.json();
                dispach({ type: "cities/loaded", payload: data });
            } catch {
                dispach({ type: "reject", payload: "There was an error loading data..." });
            }
        }
        fetchCities();
    }, []);
    async function getcity(id) {
        if (Number(id) === currentCity.id) return;
        dispach({ type: "loading" });
        try {
            const res = await fetch(`http://localhost:8000/cities/${id}`);
            const data = await res.json();
            console.log(data);
            dispach({ type: "city/loaded", payload: data });
        } catch {
            dispach({ type: "reject", payload: "There was an error loading data..." });
        }
    }
    async function createCity(newCity) {
        try {
            dispach({ type: "loading" });
            const res = await fetch(`http://localhost:8000/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);
            dispach({ type: "cities/created", payload: data });
        } catch {
            dispach({ type: "reject", payload: "There was an error loading data..." });
        }
    }
    async function deleteCity(id) {
        try {
            dispach({ type: "loading" });
            await fetch(`http://localhost:8000/cities/${id}`, {
                method: "DELETE",
            });
            dispach({ type: "cities/deleted", payload: id });
        } catch {
            dispach({ type: "reject", payload: "There was an error loading data..." });
        }
    }
    return (
        <CitiesContext.Provider
            value={{
                deleteCity,
                cities,

                createCity,
                isLoading,

                currentCity,
                getcity,
            }}
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
