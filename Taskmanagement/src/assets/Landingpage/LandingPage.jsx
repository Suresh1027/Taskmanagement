import React from 'react';
import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <>
            <div className={styles.landingPage}>
                <header className={styles.landingHeader}>
                    <h1>Welcome to Task Management</h1>
                    <p>Organize your tasks efficiently and boost your productivity.</p>
                    <Link to={"/Login"} className={styles.getStartedBtn}>Get Started</Link>
                </header>
                <section className={styles.features}>
                    <div className={styles.feature}>
                        <h2>Plan</h2>
                        <p>Create and organize your tasks effortlessly.</p>
                    </div>
                    <div className={styles.feature}>
                        <h2>Track</h2>
                        <p>Monitor your progress and stay on top of deadlines.</p>
                    </div>
                    <div className={styles.feature}>
                        <h2>Collaborate</h2>
                        <p>Work with your team and achieve goals together.</p>
                    </div>
                </section>
            </div>
        </>
    );
}

export default LandingPage;