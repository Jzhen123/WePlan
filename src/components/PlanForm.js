import React, { useReducer, useEffect, useRef } from 'react';
import { useAuth } from '../utilities/AuthContext';
import { useGroup } from "../utilities/GroupContext"
import formReducer from '../utilities/reducers/formReducer';

const PlanForm = ({ data }) => {

    const initialFormState = {
        formType: "CREATE EVENT",
        values: {
            dayName: data.newEvent.DayName,
            dayNumber: data.newEvent.DayNumber,
            hour: data.newEvent.Hour,
            month: data.newEvent.Month,
            year: data.newEvent.Year,
            timeZone: data.newEvent.TimeZone
        },
        errors: {},
        canSubmit: false,
    }
    const { userData } = useAuth();
    const { createGroup } = useGroup();
    const [formState, dispatch] = useReducer(formReducer, initialFormState);


    useEffect(() => {
       console.log(formState)
    }, [formState])

    const failedGroupCreate = (e) => {
        console.log(e.response.data)
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
                <h1 className="mb-2">Event Details</h1>
                <h1>{formState.values.dayName}</h1>
                <h1>{formState.values.dayNumber}</h1>
                <h1>{formState.values.hour}</h1>
                <h1>{formState.values.month}</h1>
                <h1>{formState.values.year}</h1>
                <h1>{formState.values.timeZone}</h1>


                {/* <form onSubmit={handleSubmit} >
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
                            <input type="password" class="form-control" name="password" onChange={(e) => handleChange(e)} id="passwordInput" placeholder="Password" />
                            <label for="passwordInput">Password</label>
                            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.password ? 'visible' : 'hidden' }}>{formState.errors.password}</div>
                        </div>
                        <button type="submit" className="btn btn-primary col-12">Sign Up</button>
                    </form> */}
            </div>
        </div>
    )
}

export default PlanForm;