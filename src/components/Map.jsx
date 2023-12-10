import React from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function Map() {
    const [params, setParams] = useSearchParams();
    const navigate =useNavigate()
    const lat = params.get('lat')
    const lng = params.get('lng')
    return <div className={styles.mapContainer} onClick={()=>navigate('form')}>
       {lat} 
        ---------
        {lng}
        </div>;
}
