import React from 'react';
import validate from './utilities/LoginFormValidationRules';
import useForm from './utilities/useForm';
import { useAuth } from './utilities/AuthContext';
import { useHistory } from "react-router-dom";

const Register = () => {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(submitForm, validate);
    const { register } = useAuth();
    const history = useHistory();

    function submitForm() {
        console.log('No errors, submit callback called!');
        register(values);
        history.push("/");
    }

    return (
        <div className="section is-fullheight">
        <div className="container">
          <div className="column is-4 is-offset-4">
            <div className="box">
              <form onSubmit={handleSubmit} noValidate>

              <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input autoComplete="off" className={`input ${errors.name && 'is-danger'}`} type="name" name="name" onChange={handleChange} value={values.name || ''} required />
                    {errors.name && (
                      <p className="help is-danger">{errors.name}</p>
                    )}
                  </div>
                </div>

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

                <button type="submit" className="button is-block is-info is-fullwidth">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Register;