import React, { useEffect, useState } from "react";
import styles from "./test.module.css";

const Test = (props) => {
    const [questionList, setquestionList] = useState();
    const [Submited, setSubmited] = useState(false);
    const [score, setScore] = useState(0);
    const [selectedQuestion, setSelectedQuestion] = useState(0);
    useEffect(() => {
        console.log(props.location.state);

        setquestionList(props.location.state.response)
    }, []);

    const submitResponse = () => {
        setSubmited(true);
        var totalScore = 0;
        for (var i = 0; i < questionList.length; i++) {
            questionList[i].selected_option = "C";
            console.log(questionList[i]);
        }

        setScore(totalScore);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            email: localStorage.getItem("user"),
            responses: questionList,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "manual",
        };

        fetch(
            "https://vit-vellore.herokuapp.com/student/storeResponses",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    };

    return (
        <div className={styles.container}>
            {Submited && (
                <div>
                    <h2>Submitted Successfully</h2>
                </div>
            )}
            {questionList && !Submited && (
                <div>
                    <div className={styles.header}>
                        <h2>Questions</h2>
                        <div className={styles["question-list"]}>
                            {questionList.map((question, index) => {
                                return (
                                    <button
                                        style={{
                                            backgroundColor:
                                                selectedQuestion == index ? "rgb(94, 164, 255)" : null,
                                        }}
                                        onClick={() => setSelectedQuestion(index)}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.question}>
                        <h1>Question {selectedQuestion + 1}</h1>
                        <p className={styles["question-text"]}>
                            {questionList[selectedQuestion].ques_text}
                        </p>
                        <div className={styles.options}>
                            {questionList[selectedQuestion].options.map((option) => {
                                return (
                                    <div className={styles.option}>
                                        <p>{option}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <h4>Correct Option: {questionList[selectedQuestion].correct_option}</h4>
                        <h4>Selected Option: {questionList[selectedQuestion].selected_option}</h4>
                        <div className={styles.remark}>
                            <h5>Remark:</h5>
                            <textarea
                                onChange={(e) => {
                                    var tempArr = questionList.slice(0);
                                    tempArr[selectedQuestion].remark = e.target.value;
                                    setquestionList(tempArr);
                                }}
                                value={
                                    questionList[selectedQuestion].remark
                                        ? questionList[selectedQuestion].remark
                                        : ""
                                }
                            ></textarea>
                        </div>
                    </div>


                </div>
            )}
        </div>
    );
};

export default Test;
