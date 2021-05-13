import React, { useReducer, useEffect } from 'react';
import { useAuth } from '../utilities/AuthContext';
import formReducer from '../utilities/reducers/formReducer';

const initialFormState = { // Initial State for my Login form 
  formType: "LOGIN", // Identifier for my formReducer
  values: {
    username: "",
    password: "",
  },
  errors: {},
  canSubmit: false,
}

// One of my first attempts at form validation and useReducers. Any advice is ecouraged!
// Login Form Component that checks for simple validation before posting data to my API route
const Login = () => {

  const [formState, dispatch] = useReducer(formReducer, initialFormState); // useReducer that all my forms use 
  const { login } = useAuth(); // Custom OAuth Hook

  // Temporary way of allowing Form Submits. Need to set up more Contexts/Reducers/Actions to make this smooth.
  useEffect(() => {
    if (formState.canSubmit === true) {
      login(formState.values, failedLogin)
      dispatch({ formType: "LOGIN", type: "clearForm" }); // There has to be better way to ensure cleared form values after success
    }
  }, [formState])

  const failedLogin = (e) => { // Temporary failure method that has some errors that will display on the front end
    formState.errors = e.response.data.error
    dispatch({ formType: formState.formType, type: "loginFailed", })
  }

  const handleChange = (e) => { // Dispatches form data to my form reducer onChange
    dispatch({ formType: formState.formType, type: "onChange", field: e.target.name, payload: e.target.value, })
  }

  const handleSubmit = (e) => { // Dispatches form data to my form reducer onSubmit
    if (e) e.preventDefault();
    dispatch({ formType: formState.formType, type: "onSubmit", })
  }

  return (
    <div className="row justify-content-md-center">
      <div className="col-10 card p-4">

        {/* Form Header */}
        <h2 className="mb-2">Start Planning!</h2>

        {/* Form Body */}
        <form onSubmit={handleSubmit} >
          <div className="form-floating mb-3 col-12">

            {/* Username/Email Input and Errors */}
            <input type="text" className="form-control" name="username" onChange={(e) => handleChange(e)} id="usernameInput" placeholder="name@example.com" />
            <label for="usernameInput">Email address</label>
            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.username ? 'visible' : 'hidden' }}>{formState.errors.username}</div>
          </div>

          <div className="form-floating mb-3 col-12">

            {/* Password Input and Errors */}
            <input type="password" className="form-control" name="password" onChange={(e) => handleChange(e)} id="passwordInput" placeholder="Password" />
            <label for="passwordInput">Password</label>
            <div style={{ color: '#cc0000', height: '4vh', visibility: formState.errors.password ? 'visible' : 'hidden' }}>{formState.errors.password}</div>
          </div>

          {/* Submit Login Form */}
          <button type="submit" className="btn btn-primary col-12">Log in</button>
        </form>
      </div>
    </div>
  )
}

export default Login;