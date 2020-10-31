import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

const Home = () => {

  const [role, setRole] = useState(null)
  const [students, setStudents] = useState([])

  useEffect(() => {

    const roleKey = localStorage.getItem("role")
    setRole(roleKey)

  }, [])

  useEffect(() => {
    if (role === "professor") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'manual'
      };

      fetch("https://vit-vellore.herokuapp.com/student/getStudents", requestOptions)
        .then(response => response.json())
        .then(result => {
          setStudents(result.students)
        })
        .catch(error => console.log('error', error));

    }
  }, [role])

  if (role == null) {
    return (
      <div className={styles.container}> loading</div>
    )
  }

  if (role == "student") {
    return (
      <div className={styles.container}>
        <div className={styles["dropdowns"]}>
          <div className={styles.dropdown}>
            <h5>Select semester:</h5>
            <select>
              <option value="1">1</option>
            </select>
          </div>
          <div className={styles.dropdown}>
            <h5>Select course:</h5>
            <select>
              <option value="DBMS">DBMS</option>
            </select>
          </div>
          <div className={styles.dropdown}>
            <h5>Select exam:</h5>
            <select>
              <option value="CAT-1">CAT-1</option>
            </select>
          </div>
          <div className={styles.dropdown}>
            <h5>Select faculty:</h5>
            <select>
              <option value="Vellengiri J">Vellengiri J</option>
            </select>
          </div>
        </div>
        <Link
          to={{
            pathname: "/Test",
            state: {
              selectedOptions: {
                semester: 1,
                course: "DBMS",
                faculty: "Vellengiri J",
                exam: "CAT-1",
              },
            },
          }}
        >
          <button className={styles.submit}>Submit</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>{students.map(student => {
        return (
          <div className={styles.studentCard}>
            <div><h1>{student.email}</h1>
              <p>{student.total_score}</p>
            </div>
            <Link
              to={{
                pathname: "/ViewTest",
                state: {
                  response: student.responses
                },
              }}
            >
              <button className={styles.submit}>View</button>
            </Link>
          </div>
        )
      })}</div>
    )
  }
};

export default Home;
