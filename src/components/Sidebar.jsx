import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
export default function Sidbar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <p>List of cities</p>
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getUTCFullYear()} by WorldWise Inc.
                </p>
            </footer>
        </div>
    );
}
