import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './home.module.css'

const Home = () => {


    return (
        <div className={styles.container}>
            <div className={styles['dropdowns']}>
                <div className={styles.dropdown}>
                    <h5>Select semester:</h5>
                    <select >
                        <option value="1">1</option>
                    </select>
                </div>
                <div className={styles.dropdown}>
                    <h5>Select course:</h5>
                    <select >
                        <option value="1">dummy_course_1</option>
                    </select>
                </div>
                <div className={styles.dropdown}>
                    <h5>Select exam:</h5>
                    <select >
                        <option value="1">dummy_exam_1</option>
                    </select>
                </div>
                <div className={styles.dropdown}>
                    <h5>Select faculty:</h5>
                    <select >
                        <option value="1">dummy_faculty_1</option>
                        <option value="2">dummy_faculty_1</option>
                    </select>
                </div>
            </div>
            <Link to={{
                pathname: '/Test',
                state: {
                    selectedOptions: {
                        "semester": 1,
                        "course": "dummy_course_1",
                        "faculty": "dummy_faculty_1",
                        "exam": "dummy_exam_1"
                    }

                }
            }}><button className={styles.submit}>Submit</button></Link >
        </div >
    )
}

export default Home
