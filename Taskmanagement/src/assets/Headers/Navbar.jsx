import React from 'react'
import styles from '../Headers/Navbar.module.css'
function Navbar() {
    return (
        <>
            <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
                <div className="container-fluid">
                    <a className={`navbar-brand ${styles.navbarBrand}`} href="#">Task Management</a>
                    <button className={`navbar-toggler ${styles.navbarToggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className={`navbar-toggler-icon ${styles.navbarTogglerIcon}`}></span>
                    </button>
                    <div className={`collapse navbar-collapse ${styles.navbarCollapse}`} id="navbarNav">
                        <ul className={`navbar-nav  ${styles.navbarNav}`}>
                            <li className={`nav-item ${styles.navItem}`}>
                                <a className={`nav-link ${styles.navLink}`} aria-current="page" href="#">Login</a>
                            </li>
                            <li className={`nav-item ${styles.navItem}`}>
                                <a className={`nav-link ${styles.navLink}`} href="#">Register</a>
                            </li>
                            <li className={`nav-item ${styles.navItem}`}>
                                <a className={`nav-link ${styles.navLink}`} href="#">Dashboard</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar