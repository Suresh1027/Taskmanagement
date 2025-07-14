import React from 'react'
import styles from '../Headers/Navbar.module.css'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <>
            <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
                <div className="container-fluid">
                    <Link className={`navbar-brand ${styles.navbarBrand}`} to={"/"}>Task Management</Link>
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
                        <div>
                            <Link to={"/Login"} className='btn btn-primary'>GETSTART</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar