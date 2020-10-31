import React, { useState, useContext, useEffect } from 'react'
import styles from './login.module.css'
import { initiateLogin, initiateProfessorLogin } from '../../Utilities/LoginUser'
import UserContext from '../../Utilities/UserContext'
import { Redirect } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { setUser } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const [isProfessor, setIsProfessor] = useState(false)
    const [registrationNumber, setRegistrationNumber] = useState("")


    // INPUT HANDLERS

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const onRegistrationNumberChange = (e) => {
        setRegistrationNumber(e.target.value)
    }

    //LOGIN USER

    const LoginUser = async (e) => {
        e.preventDefault()

        let result
        if (isProfessor) {
            result = await initiateProfessorLogin(registrationNumber)
        } else {
            result = await initiateLogin(email, password)
        }


        if (result.status_code == 200 || result.status == "success") {
            if (isProfessor) {
                console.log(result.status)
                setUser(registrationNumber)
                localStorage.setItem("user", registrationNumber)
                localStorage.setItem("role", "professor")
            } else {
                console.log(result.status_code)
                setUser(email)
                localStorage.setItem("user", email)
                localStorage.setItem("role", "student")
            }
            setRedirect(true)
            window.location.reload()
        } else {
            console.log(result)
            setEmail("")
            setPassword("")
            setRegistrationNumber("")
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
                {!isProfessor ?

                    <div className={styles.inputs}>
                        <div className={styles.input}>
                            <h5>Email</h5>
                            <input value={email} onChange={onEmailChange} type="email" />
                        </div>
                        <div className={styles.input}>
                            <h5>Password</h5>
                            <input value={password} onChange={onPasswordChange} type="password" />
                        </div>

                        <a onClick={() => setIsProfessor(true)}>Login as Professor</a>
                    </div> :
                    <div className={styles.inputs}>
                        <div className={styles.input}>
                            <h5>Registration Number</h5>
                            <input value={registrationNumber} onChange={onRegistrationNumberChange} type="email" />
                        </div>


                        <a onClick={() => setIsProfessor(false)}>Login as Student</a>
                    </div>

                }
                {!isProfessor ?
                    <button button onClick={(e) => LoginUser(e)} disabled={(email === "" || password === "") ? true : false}>Login</button >
                    :
                    <button onClick={(e) => LoginUser(e)} disabled={(registrationNumber === "") ? true : false}>Login</button>

                }
                {(error !== "") &&
                    <p className={styles.error}>{error}</p>
                }
            </div>
        </div >
    )
}

export default Login
