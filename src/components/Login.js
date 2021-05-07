import React from 'react';
import validate from '../utilities/LoginFormValidationRules';
import useForm from '../utilities/useForm';
import { useAuth } from '../utilities/AuthContext';
import { useHistory } from "react-router-dom";

const Login = () => {

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(submitForm, validate);
  const history = useHistory();
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
    history.push("/");
  }

  return (
    <form className="row g-0" onSubmit={handleSubmit} novalidate>

      <label for="validationLoginEmail" className="form-label ">Your Email</label>
      <div className="input-group mb-3">
        <span class="input-group-text" id="inputGroupPrepend1">@</span>
        <div className="col-10">
          <input autoComplete="off" className="form-control" onChange={handleChange} value={values.email || ''} type="email" name="email" placeholder="e.g. jimmy@noneyabuisness.com" required />
        </div>
        {errors.email && (
          <p className="help mt-1 mb-0" style={{ color: 'red' }}>{errors.email}</p>
        )}
      </div>

      <label for="validationLoginPassword" className="form-label">Your Password</label>
      <div className="input-group mb-3 has-validation">
        <span class="input-group-text" id="inputGroupPrepend2">@</span>
        <div className="col-10">
          <input className="form-control" type="password" name="password" onChange={handleChange} value={values.password || ''} placeholder="Enter password" required />
        </div>
        {errors.password && (
          <p className="help mt-1 mb-0" style={{ color: 'red' }}>{errors.password}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary mt-2">Log In</button>
    </form>
  )
}

export default Login;