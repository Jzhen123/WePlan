import React from 'react';
import validate from '../utilities/LoginFormValidationRules';
import useForm from '../utilities/useForm';
import { useAuth } from '../utilities/AuthContext';



const Login = () => {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(submitForm, validate);
    const { login } = useAuth();

    function submitForm() {
      const postData = {
        grant_type: "password",
        client_id: "2",
        client_secret: "tK4LYRDN0FbT7svAb3yZXgRjp9ajbas1GWecxkUI",
        scope: "",
        username: values.email,
        password: values.password,
      }
      console.log(postData)
      login(postData)
    }

    return (
              <form onSubmit={handleSubmit} noValidate>

                <div className="field">
                  <label className="label">Email Address</label>
                  <div className="control">
                    <input autoComplete="off" className={`input ${errors.email && 'is-danger'}`} type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                    {errors.email && (
                      <p className="help is-danger">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input className={`input ${errors.password && 'is-danger'}`} type="password" name="password" onChange={handleChange} value={values.password || ''} required />
                  </div>
                  {errors.password && (
                    <p className="help is-danger">{errors.password}</p>
                  )}
                </div>

                <button type="submit" className="button is-block is-info is-fullwidth mt-4">Log In</button>
              </form>
    )
}

export default Login;