import React from "react";
import {NavLink} from "react-router-dom";
import styles from "../styles/Header.module.css";
import logo from "../assets/note_13650723.png";

const Header = ({title}) => {
    return (
        <header className={styles.header}>
            <div className={styles.logoTitle}>
                <img src={logo} alt="Logo" className={styles.logo}/>
                <h1 className={styles.title}>{title}</h1>
            </div>
            <nav className={styles.nav}>
                <NavLink
                    to="/"
                    className={({isActive}) =>
                        isActive ? styles.active : styles.inactive
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className={({isActive}) =>
                        isActive ? styles.active : styles.inactive
                    }
                >
                    About
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;