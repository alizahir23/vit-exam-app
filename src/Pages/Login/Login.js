import React, { useState, useContext, useEffect } from 'react'
import styles from './login.module.css'
import { initiateLogin } from '../../Utilities/LoginUser'
import UserContext from '../../Utilities/UserContext'
import { Redirect } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { setUser } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)


    // INPUT HANDLERS

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    //LOGIN USER

    const LoginUser = async (e) => {
        e.preventDefault()

        const result = await initiateLogin(email, password)

        if (result.status_code == 200) {
            console.log(result.status_code)
            setUser(email)
            localStorage.setItem("user", email)
            setRedirect(true)
            window.location.reload()
        } else {
            console.log(result)
            setEmail("")
            setPassword("")
            setError("Could not find the user")
        }

    }
    useEffect(() => {
        const errorTimeout = setTimeout(() => {
            setError("")
        }, 5000);
        return () => {
            clearTimeout(errorTimeout)
        }
    }, [error])

    return (
        <div className={styles.container}>
            {redirect && <Redirect to='/Home' />}
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>Login</h1>
                    <h2>Welcome to the Exam Portal</h2>
                </div>
                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <h5>Email</h5>
                        <input value={email} onChange={onEmailChange} type="email" />
                    </div>
                    <div className={styles.input}>
                        <h5>Password</h5>
                        <input value={password} onChange={onPasswordChange} type="password" />
                    </div>

                </div>

                <button onClick={(e) => LoginUser(e)} disabled={(email === "" || password === "") ? true : false}>Login</button>
                {(error !== "") &&
                    <p className={styles.error}>{error}</p>
                }
            </div>
        </div>
    )
}

export default Login
