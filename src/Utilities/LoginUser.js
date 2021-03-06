import axios from "axios"

export const initiateLogin = async (email, password) => {


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "email": email, "password": password });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'manual'
    };

    const response = await fetch("https://vit-vellore.herokuapp.com/student/checkauth/check", requestOptions)
    const result = await response.json()

    return result


    // const response = await axios.get(url, { email, password })
    // if (response.status_code === 200) {
    //     localStorage.setItem("user", email)
    //     return (email)
    // } else {
    //     console.log(response)
    //     return "Login unsuccessful!"
    // }
}

export const initiateProfessorLogin = async (registration) => {


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "registration": registration });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'manual'
    };

    const response = await fetch("https://vit-vellore.herokuapp.com/student/professor", requestOptions)
    const result = await response.json()
    console.log(result)
    return result

}