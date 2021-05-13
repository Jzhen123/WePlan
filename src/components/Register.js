import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';
import formReducer from '../utilities/reducers/formReducer';

const initialFormState = { // Initial State for my Register form 
    formType: "REGISTER", // Identifier for my formReducer
    values: {
        name: "",
        email: "",
        password: "",
    },
    errors: {},
    canSubmit: false,
}

// Register Form Component that checks for simple validation before posting data to my API route
function Register({ toggleView }) {

    const [formState, dispatch] = useReducer(formReducer, initialFormState); // useReducer that all my forms use
    const { register } = useAuth(); // Custom OAuth hook

    // Temporary way of allowing Form Submits. Need to set up more Contexts/Reducers/Actions to make this smooth.
    useEffect(() => {
        if (formState.canSubmit === true) {
            register(formState, failedRegister)
        }
    }, [formState])

    const failedRegister = (e) => {
        if (e.response.status === 422) {
            dispatch({ formType: formState.formType, type: "registerFailed", })
        }
    }

    const handleChange = (e) => {
        dispatch({ formType: formState.formType, type: "onChange", field: e.target.name, payload: e.target.value, })
    }

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        dispatch({ formType: formState.formType, type: "onSubmit", })
    }

    return (
        <div className="row justify-content-md-center">

            {/* Button to go back to Login Form */}
            <h5 className="pt-2 pb-3" onClick={toggleView}><Link>&lt;- Back to Log in</Link></h5>
            <div className="col-10 card p-5">

                {/* Form Header */}
                <h1 className="mb-2">Create your account</h1>

                {/* Form Body */}
                <form onSubmit={handleSubmit} >

                        {/* User's Name Input */}
                    <div class="form-floating mb-3 col-12">
                        <input type="text" class="form-control" name="name" onChange={(e) => handleChange(e)} id="nameInput" placeholder="name@example.com" />
                        <label for="nameInput">Name</label>
                        <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.name ? 'visible' : 'hidden' }}>{formState.errors.name}</div>
                    </div>

                    {/* User's Email Input */}
                    <div class="form-floating mb-3 col-12">
                        <input type="text" class="form-control" name="email" onChange={(e) => handleChange(e)} id="emailInput" placeholder="name@example.com" />
                        <label for="emailInput">Email address</label>
                        <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.email ? 'visible' : 'hidden' }}>{formState.errors.email}</div>
                    </div>

                    {/* User's Password Input */}
                    <div class="form-floating mb-3 col-12">
                        <input type="password" class="form-control" name="password" onChange={(e) => handleChange(e)} id="passwordInput" placeholder="Password" />
                        <label for="passwordInput">Password</label>
                        <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.password ? 'visible' : 'hidden' }}>{formState.errors.password}</div>
                    </div>

                    {/* Submit Register Form */}
                    <button type="submit" className="btn btn-primary col-12">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Register;