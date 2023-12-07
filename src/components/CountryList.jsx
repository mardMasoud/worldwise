import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
export default function CountryList({ cities }) {
    let countries = [];

    countries = cities.reduce((acc, cur) => {
        if (acc.some((_) => _.country === cur.country)) return acc;
       //if(acc.map(_=>_.country).includes(cur.country)) return acc ---By map and includes 
        else return [...acc, cur];
    }, []);
    console.log(countries);
    return (
        <div className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.id} />
            ))}
        </div>
    );
}
