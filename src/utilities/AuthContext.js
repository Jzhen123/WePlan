import React, { createContext, useEffect, useState, useContext } from "react"
import { axiosHelper } from "./axiosHelper";
import { useHistory } from "react-router-dom";

const AuthContext = createContext({});

// Helper function that exports just the needed/wanted data for the Auth provider
export const AuthHelper = () => {

    const history = useHistory();
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({});

    // Retaining General and OAuth Data for User
    useEffect(() => {
        let lsToken = window.localStorage.getItem('token');

        if(lsToken) {
            console.log("Component Mount/Update")
            setToken(lsToken); // Set token token to LS token
            index(); // Retrieves User Data with LS token
        } else {
            history.push("/login"); // If there is not a token, send user to login view
        }
    }, [token, history]) // Dependency for token and history changes

    // Saving token in local storage and context
    function saveToken(res) {
        console.log(res) // Check response
        let APItoken;
        // Sets API token to different values depending on data key(s) and url from result
        if (res.config.url === "https://we-plan-jiayuzheng01421007.codeanyapp.com/api/auth/register") {
            APItoken = res.data.data.token // Token when Registering
        } else if (res.config.url === "https://we-plan-jiayuzheng01421007.codeanyapp.com/oauth/token") {
            APItoken = res.data.access_token // Token when Logging in
        }
        setToken(APItoken);
        window.localStorage.setItem('token', APItoken)
        history.push('/')
    }

    // Sets Context token to empty string and deletes LS token
    function destroyToken() {
        setToken('');
        setUserData({});
        window.localStorage.removeItem('token');
    }

    // Saving changes made to UserData to Context variable
    function saveUserData(res) {
        console.log("Retrieved User Data: " + res.data)
        setUserData(res.data);
    }

    // Hits backend route for registering users with user's input. Stores user and returns token
    function register(registrationData, customFailureMethod) {
        axiosHelper({
            data: registrationData.values,
            method:'post', 
            url:'/api/auth/register',
            successMethod: saveToken,
            failureMethod: customFailureMethod
        })
    }

    // Hits backend route for logging in users with user's input. Returns token
    function login(loginData, customFailureMethod) {
        Object.assign(loginData, {
                grant_type: "password",
                client_id: "2",
                client_secret: "tK4LYRDN0FbT7svAb3yZXgRjp9ajbas1GWecxkUI",
                scope: "",
            })
            console.log(loginData)
        axiosHelper({
            data: loginData,
            method:'post', 
            url:'/oauth/token', 
            successMethod: saveToken,
            failureMethod: customFailureMethod
        })
    }

    // Hits backend route route for logout with user's token.
    function logout() {
        axiosHelper({
            url:'/api/auth/logout', 
            successMethod: destroyToken,
            token
        })
        .then(history.push("/login"));
    }

    function checkEmail(formData) {
        axiosHelper({
            data: formData,
            url: '/api/auth/checkEmail',
            method: 'post',
        })
    }

    // Retrieve User Data
    function index() {
        console.log("Indexing User Data")
        axiosHelper({
            url:'/api/auth/user',
            successMethod: saveUserData,
            token
        })
    }

    return { token, register, login, logout, userData, checkEmail }
}

// custom Provider component
export const AuthProvider = (props) => {
    const initialContext = AuthHelper()
    return (
    <AuthContext.Provider value={initialContext}>
        {props.children}
    </AuthContext.Provider>
    )
}

// creating custom hook
export const useAuth = () => useContext(AuthContext);

// actual context
export default AuthContext;