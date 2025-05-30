import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';

function Login() {
  const navigate = useNavigate()
  const [login, setLogin] = useState(
    {
      email: "",
      password: ""
    }
  )

  function handlechange(e) {
    console.log(login);
    setLogin({ ...login, [e.target.name]: e.target.value })
  }


  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signIn", login);
      localStorage.setItem("token", response.data.token1);
      localStorage.setItem("user", JSON.stringify(response.data.user))
      console.log(response);

      alert("login successful")
      navigate("/Dashboard")
    } catch (error) {
      console.log("login failed", error);
      alert("login failed")
    }
  }


  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handlesubmit}>
        <h2>Login</h2>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input id="email" onChange={handlechange} name='email' value={login.email} type="email" className={styles.inputField} required />

        <label htmlFor="password" className={styles.label}>Password</label>
        <input id="password" onChange={handlechange} name='password' value={login.password} type="password" className={styles.inputField} required />

        <button type="submit" className={styles.submitButton}>Login</button>
        <Link to={"/"} className='btn btn-primary'>Back</Link>
        <p className={styles.registerPrompt}>
          Don&apos;t have an account? <a href='/register' className={styles.registerLink}>Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;