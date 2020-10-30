import React, { useContext, useState } from 'react'
import styles from './privateHeader.module.css'
import { useHistory } from "react-router-dom";
import billing from './icons/billing.svg'
import settings from './icons/settings.svg'
import profile_pic from './icons/profile_picture.jpg'
import UserContext from '../../Utilities/UserContext'
import { Redirect } from 'react-router-dom'
import logo from './icons/vit-logo.svg'


const PrivateHeader = () => {

    const { setUser } = useContext(UserContext)

    const history = useHistory()
    const handleLogout = () => {

        localStorage.removeItem("user")
        window.location.reload()
        history.replace('/')
    }

    const user = localStorage.getItem("user")

    return (
        <div className={styles.main}>

            <img src={logo} />

            {localStorage.getItem("user") &&

                <div className={styles.right}>
                    <h3><span>Welcome, </span></h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            }
        </div>
    )
}

export default PrivateHeader
