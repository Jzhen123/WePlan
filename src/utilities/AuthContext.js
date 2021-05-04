import React, { createContext, useEffect, useState, useContext } from "react"
import { axiosHelper } from "./axiosHelper";

const AuthContext = createContext({});

// helper function that exports just the needed/wanted data for the provider
export const AuthHelper = () => {

    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({});

    // retaining user login information
    useEffect(() => {
        let lsToken = window.localStorage.getItem('token');

        if(lsToken) {
            setToken(lsToken);
            index(lsToken);
        }
    }, [])

    // Saving token in local storage and context
    function saveToken(res) {
        console.log(res) // Check response
        let APItoken;
        // Sets API token to different values depending on data key(s) and url from result
        if (res.config.url === "https://we-plan-jiayuzheng01421007.codeanyapp.com/api/auth/register") {
            APItoken = res.data.data.token
        } else if (res.config.url === "https://we-plan-jiayuzheng01421007.codeanyapp.com/oauth/token") {
            APItoken = res.data.access_token
        }
        setToken(APItoken);
        window.localStorage.setItem('token', APItoken)
    }

    // Sets Context token to empty string and deletes LS token
    function destroyToken() {
        setToken('')
        window.localStorage.removeItem('token')
    }

    function saveUserData(res) {
        
        setUserData(res.data);
    }

    // Hits backend route for registering users with user's input. Stores user and returns token
    function register(registrationData) {
        axiosHelper({
            data: registrationData,
            method:'post', 
            url:'/api/auth/register', 
            successMethod: saveToken,
        })
    }

    // Hits backend route for logging in users with user's input. Returns token
    function login(loginData) {
        axiosHelper({
            data: loginData,
            method:'post', 
            url:'/oauth/token', 
            successMethod: saveToken,
        })
    }

    // Hits backend route route for logout with user's token.
    function logout() {
        axiosHelper({
            url:'/api/auth/logout', 
            successMethod: destroyToken,
            token
        })
    }

    function index(token) {
        axiosHelper({
            method:'get',
            url:'/api/auth/user',
            successMethod: saveUserData,
            token
        })
    }

    return { token, register, login, logout, userData }
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