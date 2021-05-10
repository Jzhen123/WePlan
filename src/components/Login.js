import React, { useReducer, useEffect } from 'react';
import validate from '../utilities/LoginFormValidationRules';
import useForm from '../utilities/useForm';
import { useAuth } from '../utilities/AuthContext';
import formReducer from '../utilities/reducers/formReducer';

const initialFormState = {
  formType: "LOGIN",
  values: {
    username: "",
    password: "",
  },
  errors: {},
  canSubmit: false,
}

const Login = () => {

  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { login } = useAuth();

  useEffect(() => {
    if (formState.canSubmit === true) {
      login(formState.values, failedLogin)
    }
  }, [formState])

  const failedLogin = (e) => {
      formState.errors = e.response.data.error
      dispatch({ formType: formState.formType, type: "loginFailed", })
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
        <div className="col-10 card p-5">
          <h2 className="mb-2">Start Planning!</h2>
          <form onSubmit={handleSubmit} >

            <div class="form-floating mb-3 col-12">
              <input type="text" class="form-control" name="username" onChange={(e) => handleChange(e)} id="usernameInput" placeholder="name@example.com" />
              <label for="usernameInput">Email address</label>
              <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.username ? 'visible' : 'hidden' }}>{formState.errors.username}</div>
            </div>

            <div class="form-floating mb-3 col-12">
              <input type="text" class="form-control" name="password" onChange={(e) => handleChange(e)} id="passwordInput" placeholder="Password" />
              <label for="passwordInput">Password</label>
              <div style={{ color: '#cc0000', height: '4vh', visibility: formState.errors.password ? 'visible' : 'hidden' }}>{formState.errors.password}</div>
            </div>
            <button type="submit" className="btn btn-primary col-12">Log in</button>
          </form>
        </div>
      </div>
  )
}

export default Login;