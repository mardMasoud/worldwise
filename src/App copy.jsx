import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/Pagenotfound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
function App() {
    const [cities, setCities] = useState([]);
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
    return (
        <BrowserRouter>
            <Routes>
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Homepage />} />
                <Route path="app" element={<AppLayout />}>
                    <Route index element={<Navigate replace to='cities'/>} />
                    <Route
                        path="cities"
                        element={<CityList cities={cities} isLoading={isLoading} />}
                    />
                    <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>} />
                    <Route path='cities/:id' element={<City cities={cities}/>} />
                    <Route path='form' element={<Form/>}/>
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
