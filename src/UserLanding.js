import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserLanding() {
    const [formData, setformData] = useState({});

    // For all input fields
    const handleChange = e => setformData(previousState => ({ ...previousState, [e.target.name]: e.target.value }));

    // Watch Ian's video. Don't keep this
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length > 8) {
            console.log('not good enough')
        } else {
            const apiURL = 'https://we-plan-jiayuzheng01421007.codeanyapp.com/api/auth/register';
            axios.post(apiURL, formData)
                .then(response => {
                    console.log(response)
                    // save token
                    // redirect to dashboard. useHistory push to Dashboard
                    // window.localStorage.setItem('WePlanToken', JSON.stringify(response.data.data.token));
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    // Set up form validation BS 5 with react
    // Set up error handling from api
    const validate = (formData) => {
        let errors = {};
        if (!formData.name) {
            errors.name = 'Name is required';
        } else if (!formData.email){
            errors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid';
        } 
        return errors;
    }

    return (
        <>
            <input name="field1" value={formData.name || ''} onChange={handleChange} />
            <input name="field2" value={formData.email || ''} onChange={handleChange} />
            <input name="field2" value={formData.password || ''} onChange={handleChange} />
            {/* <form onSubmit={e => {
          registerHandler(e.target);
          e.preventDefault();
        }}>
  
          <div className="form-group">
            <label htmlFor="registerName">Your Name</label>
            <input type="text" className="form-control" id="registerName" placeholder="e.g. Jimmy Zheng" />
          </div>
  
          <br></br>
          <div className="form-group">
            <label htmlFor="registerEmail">Your Email</label>
            <input type="text" className="form-control" id="registerEmail" placeholder="e.g. jimmyzheng@noneyabusiness.com" />
          </div>
  
          <br></br>
          <div className="form-group">
            <label htmlFor="registerPassword">Your Password</label>
            <input type="text" className="form-control" id="registerPassword" placeholder="Your password here" />
          </div>
 

  
          <button type="submit" className="btn btn-primary">Submit</button>
        </form> */}

        </>
    )
}

export default UserLanding;