
import styles from "./AppLayout.module.css";
import Sidbar from "../components/Sidebar";
import Map from "../components/Map";
export default function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidbar />
            <Map />
        </div>
    );
}
