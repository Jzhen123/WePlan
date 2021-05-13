import React, { useEffect, useReducer } from 'react';
import { useAuth } from './utilities/AuthContext';
import formReducer from './utilities/reducers/formReducer';

const initialFormState = {
    formType: "REGISTER",
    values: {
        name: "",
        email: "",
        password: "",
        canSubmit: false,
    },
    errors: {},
}

// Used to test any new features/concepts. Was very useful for learning useReducer
function Sandbox() {

    const [formState, dispatch] = useReducer(formReducer, initialFormState);
    const { register } = useAuth();

    useEffect(() => {
        // console.log(formState)
    }, [formState])

    const handleChange = (e) => {
        dispatch({
            formType: formState.formType,
            type: "onChange",
            field: e.target.name,
            payload: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        dispatch({
            formType: formState.formType,
            type: "onSubmit",
        })
        // console.log
        if (formState.canSubmit) register(formState.values)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name: </label>
            <input type="text" name="name" onChange={(e) => handleChange(e)} />
            {formState.errors.name && (
                <div>{formState.errors.name}</div>
            )}
            <br></br>

            <label>Email: </label>
            <input type="text" name="email" onChange={(e) => handleChange(e)} />
            {formState.errors.email && (
                <div>{formState.errors.email}</div>
            )}
            <br></br>


            <label>Password: </label>
            <input type="text" name="password" onChange={(e) => handleChange(e)} />
            {formState.errors.password && (
                <div>{formState.errors.password}</div>
            )}
            <br></br>
            <button type="submit" className="button is-block is-info is-fullwidth">Sign Up</button>
        </form>
    );
}

export default Sandbox;