import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
export default function CountryList({ cities }) {
    const countries =[]
    countries = cities.reduce((acc,cur)=>acc===cur)
    return (
        <div className={styles.countryList}>
            {countries.map((country) => (
                
                <CountryItem country={country} />
            ))}
        </div>
    );
}
