import React, { useReducer } from 'react';
import formReducer from './utilities/reducers/formReducer';


const initialFormState = {
    name: "",
    email: "",
    password: "",
    hasConsented: false,
}

function Sandbox() {
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const handleTextChange = (e) => {
        dispatch({
            formType: "REGISTER",
            type: "HANDLE INPUT TEXT",
            field: e.target.name,
            payload: e.target.value,
        })
        console.log("hi")
        console.log(formState)
    }

    return (
        <form>
            <label>Name: </label>
            <input type="text" name="name" value={formState.name}  onChange={(e) => handleTextChange(e)} />
            <br></br>

            <label>Email: </label>
            <input type="text" name="email" value={formState.email} onChange={(e) => handleTextChange(e)} />
            <br></br>
            
            <label>Password: </label>
            <input type="text" name="password" value={formState.password} onChange={(e) => handleTextChange(e)} />
            <br></br>
            
            <label>Consent to terms and conditions: </label>
            <input type="checkbox" checked={formState.hasConsented} onChange={() => dispatch({ formType: "REGISTER", type: "TOGGLE CONSENT" })} />
            
        </form>
    );
}

export default Sandbox;