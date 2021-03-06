import axios from 'axios';

export function axiosHelper(props) {
    // Setting default key/values to any props passed when funcion is called
    const {
        method = 'get',
        url = '/',
        data = {},
        token = '',
        successMethod = r => console.log("Axios Sucess: " + r),
        failureMethod = e => console.log("Axios Failed: " + e)
    } = props;

    // Main URL for routes
    const API_URL = 'https://we-plan-jiayuzheng01421007.codeanyapp.com'

    // Hits API route with all the necessary inputs
    return axios({
        method,
        url: API_URL + url,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data
    })
        .then(successMethod)
        .catch(failureMethod)
}