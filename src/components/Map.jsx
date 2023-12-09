import React from "react";
import styles from "./Map.module.css";
import { useSearchParams } from "react-router-dom";
export default function Map() {
    const [params, setParams] = useSearchParams();
    const lat = params.get('lat')
    const lng = params.get('lng')
    return <div className={styles.mapContainer}>
       {lat} 
        ---------
        {lng}
        </div>;
}
