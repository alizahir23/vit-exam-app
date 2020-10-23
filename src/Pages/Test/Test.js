import React, { useEffect, useState } from 'react'
import styles from './test.module.css'

const Test = (props) => {
    const [questionList, setquestionList] = useState()
    const [Submited, setSubmited] = useState(false)
    const [score, setScore] = useState(0)
    const [selectedQuestion, setSelectedQuestion] = useState(0)
    useEffect(() => {
        console.log(props.location.state)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(props.location.state.selectedOptions);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'manual'
        };

        fetch("https://vit-vellore.herokuapp.com/student/getQuestions/getAllQuestions", requestOptions)
            .then(response => response.json())
            .then(result => {
                setquestionList(result.questions)
                console.log(result)
            })
            .then(() => {
                questionList.map(question => {
                    question.selectedOption = ""
                    question.remark = ""
                    question.score = 0
                })
            })
            .catch(error => console.log('error', error));


    }, [])

    const submitResponse = () => {
        setSubmited(true)
        var totalScore = 0
        for (var i = 0; i < questionList.length; i++) {
            if (questionList[i].correct_option == questionList[i].selectedOption) {
                totalScore += 4
                questionList[i].score = 4
            } else {
                totalScore += 0
                questionList[i].score = 0
            }
        }
        setScore(totalScore)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": localStorage.getItem("user"),
            "responses": questionList
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'manual'
        };

        fetch("https://vit-vellore.herokuapp.com/student/storeResponses", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className={styles.container}>
            {Submited &&
                <div>
                    <h2>Response Submitted.</h2>
                    <p style={{ textAlign: 'center' }}>Your score is <b>{score}</b></p>
                </div>
            }
            {questionList && !Submited &&
                <div>

                    <div className={styles.header}>
                        <h2>Questions</h2>
                        <div className={styles['question-list']}>
                            {
                                questionList.map((question, index) => {
                                    return (
                                        <button style={{ backgroundColor: selectedQuestion == index ? "rgb(94, 164, 255)" : null }} onClick={() => setSelectedQuestion(index)}>{index + 1}</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.question}>
                        <h1>Question {selectedQuestion + 1}</h1>
                        <p className={styles['question-text']}>{questionList[selectedQuestion].ques_text}</p>
                        <div className={styles.options}>
                            {questionList[selectedQuestion].options.map(option => {
                                return (
                                    <div className={styles.option}>
                                        <div className={styles.radio} style={{ backgroundColor: questionList[selectedQuestion].selectedOption == option ? 'rgb(94, 164, 255)' : "white" }}
                                            onClick={() => {
                                                var tempArr = questionList.slice(0)
                                                tempArr[selectedQuestion].selectedOption = option
                                                setquestionList(tempArr)
                                            }} />
                                        <p>{option}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.remark}>
                            <h5>Remark:</h5><textarea onChange={(e) => {
                                var tempArr = questionList.slice(0)
                                tempArr[selectedQuestion].remark = e.target.value
                                setquestionList(tempArr)
                            }} value={questionList[selectedQuestion].remark ? questionList[selectedQuestion].remark : ""}></textarea></div>
                    </div>

                    <button onClick={submitResponse} className={styles.submit}>Submit</button>
                </div>
            }
        </div>

    )
}

export default Test
