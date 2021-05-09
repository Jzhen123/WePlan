// import React from 'react';
// import validate from '../utilities/RegisterFormValidationRules';
// import useForm from '../utilities/useForm';
// import { useAuth } from '../utilities/AuthContext';
// import { useHistory } from "react-router-dom";

// const Register = () => {
//   const {
//     values,
//     errors,
//     handleChange,
//     handleSubmit,
//   } = useForm(submitForm, validate);
//   const { register } = useAuth();
//   const history = useHistory();

//   function submitForm() {
//     register(values);
//     history.push("/");
//   }

//   return (
//     <div className="section is-fullheight">
//       <div className="container">
//         <div className="column is-4 is-offset-4">
//           <div className="box">
//             <form onSubmit={handleSubmit} noValidate>

//               <div className="field">
//                 <label className="label">Name</label>
//                 <div className="control">
//                   <input autoComplete="off" className={`input ${errors.name && 'is-danger'}`} type="name" name="name" onChange={handleChange} value={values.name || ''} required />
//                   {errors.name && (
//                     <p className="help is-danger">{errors.name}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="field">
//                 <label className="label">Email Address</label>
//                 <div className="control">
//                   <input autoComplete="off" className={`input ${errors.email && 'is-danger'}`} type="email" name="email" onChange={handleChange} value={values.email || ''} required />
//                   {errors.email && (
//                     <p className="help is-danger">{errors.email}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="field">
//                 <label className="label">Password</label>
//                 <div className="control">
//                   <input className={`input ${errors.password && 'is-danger'}`} type="password" name="password" onChange={handleChange} value={values.password || ''} required />
//                 </div>
//                 {errors.password && (
//                   <p className="help is-danger">{errors.password}</p>
//                 )}
//               </div>

//               <button type="submit" className="button is-block is-info is-fullwidth">Sign Up</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Register;

// import { refineProps } from '@fullcalendar/common';
import { hide } from '@popperjs/core';
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
    const history = useHistory();

    useEffect(() => {
        console.log(formState)
        if (formState.canSubmit === true) {
          register(formState.values)
          history.push('/')
        }
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

export default Register;