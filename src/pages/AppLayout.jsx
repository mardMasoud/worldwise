import styles from "./AppLayout.module.css";
import Sidbar from "../components/Sidebar";
import Map from "../components/Map";
import { Outlet } from "react-router-dom";
export default function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidbar/>
           
           
         
            
           
            <Map />
          
        </div>
    );
}
