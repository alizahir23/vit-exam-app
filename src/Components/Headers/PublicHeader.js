import React, { useContext } from 'react'
import styles from './publicHeader.module.css'
import logo from './icons/vit-logo.svg'
import UserContext from '../../Utilities/UserContext'


const PublicHeader = () => {


    return (
        <div className={styles.main}>
            <img src={logo} />
        </div>
    )
}

export default PublicHeader
