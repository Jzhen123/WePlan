import React, { useEffect, useReducer } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../utilities/AuthContext';
import formReducer from '../utilities/reducers/formReducer';

const initialFormState = {
    formType: "REGISTER",
    values: {
        name: "",
        email: "",
        password: "",
    },
    errors: {},
    canSubmit: false,
}

function Register() {

    const [formState, dispatch] = useReducer(formReducer, initialFormState);
    const { register } = useAuth();

    useEffect(() => {
        if (formState.canSubmit === true) {
            register(formState, failedRegister)
        }
    }, [formState])

    const failedRegister = (e) => {
        if (e.response.status === 422) {
            dispatch({
                formType: formState.formType,
                type: "registerFailed",
            })
        }
    }

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
    }

    return (
        <div className="container-fluid">

            <div className="row justify-content-md-center">
                <div className="col-4 card p-5">
                    <h1 className="mb-2">Create your account</h1>
                    <form onSubmit={handleSubmit} >
                        <div class="form-floating mb-3 col-12">
                            <input type="text" class="form-control" name="name" onChange={(e) => handleChange(e)} id="nameInput" placeholder="name@example.com" />
                            <label for="nameInput">Name</label>
                            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.name ? 'visible' : 'hidden' }}>{formState.errors.name}</div>
                        </div>


                        <div class="form-floating mb-3 col-12">
                            <input type="text" class="form-control" name="email" onChange={(e) => handleChange(e)} id="emailInput" placeholder="name@example.com" />
                            <label for="emailInput">Email address</label>
                            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.email ? 'visible' : 'hidden' }}>{formState.errors.email}</div>
                        </div>

                        <div class="form-floating mb-3 col-12">
                            <input type="text" class="form-control" name="password" onChange={(e) => handleChange(e)} id="passwordInput" placeholder="Password" />
                            <label for="passwordInput">Password</label>
                            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.password ? 'visible' : 'hidden' }}>{formState.errors.password}</div>
                        </div>
                        <button type="submit" className="btn btn-primary col-12">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;