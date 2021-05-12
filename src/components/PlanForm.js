import React, { useReducer, useEffect, useRef } from 'react';
import { useAuth } from '../utilities/AuthContext';
import { useGroup } from "../utilities/GroupContext"
import formReducer from '../utilities/reducers/formReducer';

const PlanForm = ({ data }) => {

    const initialFormState = {
        formType: "CREATE EVENT",
        values: {
            // dayName: data.newEvent.DayName,
            dayNumber: data.newEvent.DayNumber,
            hour: data.newEvent.StartHour,
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
            <div className="col-8 card p-5">
                <h1 className="mb-5">Event Details</h1>
                <form onSubmit={handleSubmit}>

                    {/* Name of Event */}
                    <div className="row mb-3">
                        <div class="form-floating mb-3 col-6">
                            <input type="text" class="form-control" name="name" onChange={(e) => handleChange(e)} id="nameInput" placeholder="name@example.com" />
                            <label className="ps-4" for="nameInput">Name</label>
                            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.name ? 'visible' : 'hidden' }}>{formState.errors.name}</div>
                        </div>
                        <div class="form-floating mb-3 col-6">
                            <select className="form-select p-0 ps-3 pt-1">
                                {userData.groups.map((group, index) => {
                                    return (
                                        <option key={index} value={group.name}>{group.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    {/* Day/Start time and End time of Event */}
                    <div className="row mb-3">
                        <div class="form-floating mb-3 col-6">
                            <input type="text" class="form-control" id="dayInput" name="day" defaultValue={formState.values.dayNumber} />
                            <label className="ps-4" for="dayInput">Day</label>
                        </div>
                        <div class="form-floating mb-3 col-3">
                            <input type="text" class="form-control" id="startTimeInput" name="startTime" defaultValue={formState.values.hour} />
                            <label className="ps-4" for="startTimeInput">Start Time (Military Time)</label>
                        </div>
                        <div class="form-floating mb-3 col-3">
                            <input type="text" class="form-control" id="endTimeInput" name="endTime" value={""} />
                            <label className="ps-4" for="endTimeInput">End Time ({formState.values.timeZone})</label>
                        </div>
                    </div>

                    {/* Month/Year of Event */}
                    <div className="row  mb-3 ">
                        <div class="form-floating mb-3 col-6">
                            <input type="text" class="form-control" id="monthInput" name="month" defaultValue={formState.values.month} />
                            <label className="ps-4" for="monthInput">Month</label>
                        </div>
                        <div class="form-floating mb-3 col-6">
                            <input type="text" class="form-control" id="yearInput" name="year" defaultValue={formState.values.year} />
                            <label className="ps-4" for="yearInput">Year</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary col-12">Plan!</button>
                </form>
            </div>
        </div>
    )
}

export default PlanForm;