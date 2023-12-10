import React from "react";
import styles from "./Button.module.css";
export default function Button({ onclick, type, children }) {
    return (
        <button onClick={onclick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    );
}
