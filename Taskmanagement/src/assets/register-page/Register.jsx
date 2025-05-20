import React, { useEffect, useState } from 'react';
import styles from './Register.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
    const [data, setData] = useState({
        fname: "",
        sname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (data.password !== data.confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const response = await axios.post('http://localhost:5000/auth/signUp', data);
            console.log("Successfully Registered", response);
            alert("Registration successful");
        } catch (error) {
            console.error("Error during registration", error);
            alert("User already exists or registration failed");
        }
    }

    return (
        <div className={styles.registerContainer}>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <h2>Register</h2>
                <label htmlFor="fname" className={styles.label}>First Name</label>
                <input id="fname" name="fname" value={data.fname} onChange={handleChange} type="text" className={styles.inputField} required />

                <label htmlFor="sname" className={styles.label}>Last Name</label>
                <input id="sname" name="sname" value={data.sname} onChange={handleChange} type="text" className={styles.inputField} required />

                <label htmlFor="email" className={styles.label}>Email</label>
                <input id="email" name="email" value={data.email} onChange={handleChange} type="email" className={styles.inputField} required />

                <label htmlFor="password" className={styles.label}>Password</label>
                <input id="password" name="password" value={data.password} onChange={handleChange} type="password" className={styles.inputField} required />

                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} type="password" className={styles.inputField} required />

                <button type="submit" className={styles.submitbutton} >Register</button>
                <Link to="/Login" className={styles.submitbutton}>Back</Link>
            </form>

        </div>
    );
}

export default Register;