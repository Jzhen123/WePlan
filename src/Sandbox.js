import React, { useEffect, useReducer } from 'react';
import formReducer from './utilities/reducers/formReducer';


const initialFormState = {
    formType: "Register",
    values: {
        name: "",
        email: "",
        password: "",
    },
    errors: {},
    isSubmitting: false
    
}

function Sandbox() {

    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    useEffect(() => {
        console.log(formState)
    })

    const handleTextChange = (e) => {
        dispatch({
            formType: "REGISTER",
            type: "onChange",
            field: e.target.name,
            payload: e.target.value,
        })
    }

    return (
        <form>
            <label>Name: </label>
            <input type="text" name="name" onChange={(e) => handleTextChange(e)} />
            <br></br>

            <label>Email: </label>
            <input type="text" name="email" onChange={(e) => handleTextChange(e)} />
            <br></br>
            
            <label>Password: </label>
            <input type="text" name="password" onChange={(e) => handleTextChange(e)} />
            <br></br>
            
        </form>
    );
}

export default Sandbox;