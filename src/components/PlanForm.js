import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../utilities/AuthContext';
import { useCalendar } from '../utilities/CalendarContext';
import formReducer from '../utilities/reducers/formReducer';

// Plan Form Component that checks for simple validation before posting data to my API route
const PlanForm = ({ data }) => {
    var months = { // Lazy way to get number values based on month abbreviation
        'Jan': '01',
        'Feb': '02',
        'Mar': '03',
        'Apr': '04',
        'May': '05',
        'Jun': '06',
        'Jul': '07',
        'Aug': '08',
        'Sep': '09',
        'Oct': '10',
        'Nov': '11',
        'Dec': '12'
    }

    const initialFormState = { // Initial State for my Plan/Event form 
        formType: "CREATE EVENT", // Identifier for my formReducer
        values: {
            groupName: "",
            dayNumber: data.newEvent.DayNumber,
            hour: data.newEvent.StartHour,
            month: data.newEvent.Month,
            year: data.newEvent.Year,
            timeZone: data.newEvent.TimeZone
        },
        errors: {},
        canSubmit: false,
    }

    const [formState, dispatch] = useReducer(formReducer, initialFormState); // useReducer that all my forms use
    const { userData } = useAuth(); // Custom OAuth hook
    const { calendarState } = useCalendar(); // Custom Calendar hook
    const history = useHistory();

    // Temporary way of allowing Form Submits. Need to set up more Contexts/Reducers/Actions to make this smooth.
    // This is adding a very specifc data format needed to render events on Calendar component
    useEffect(() => {
        if (formState.canSubmit === true) {
            let timeZone = formState.values.timeZone.split('GMT-').join('');
            calendarState.events.push({
                id: "temp",
                title: formState.values.name,
                start: `${formState.values.year}-${months[formState.values.month]}-${formState.values.dayNumber}T${formState.values.hour}-${timeZone}`,
                end: `${formState.values.year}-${months[formState.values.month]}-${formState.values.dayNumber}T${formState.values.endTime}-${timeZone}`,
            })
            if (document.getElementById("click")) {
                document.getElementById("click").click()
            }
            history.push('/')
        }
    }, [formState])

    const handleChange = (e) => { // Dispatches form data to my form reducer onChange
        dispatch({ formType: formState.formType, type: "onChange", field: e.target.name, payload: e.target.value, })
    }

    const handleSubmit = (e) => { // Dispatches form data to my form reducer onSubmit
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
                            <label className="ps-4" for="nameInput">Event Name</label>
                            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.name ? 'visible' : 'hidden' }}>{formState.errors.name}</div>
                        </div>
                        <div class="form-floating mb-3 col-6">
                            <select className="form-select p-0 ps-3 pt-1" name="groupName" onChange={(e) => handleChange(e)}>
                                <option selected value="Choose Group">Choose Group</option>
                                {userData.groups.map((group, index) => {
                                    return (
                                        <option key={index} value={group.name}>{group.name}</option>
                                    )
                                })}
                            </select>
                            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.groupName ? 'visible' : 'hidden' }}>{formState.errors.groupName}</div>
                        </div>
                    </div>

                    {/* Day/Start time and End time of Event */}
                    <div className="row mb-3">
                        <div class="form-floating mb-3 col-6">
                            <input type="text" class="form-control" onChange={(e) => handleChange(e)} id="dayInput" name="dayNumber" defaultValue={formState.values.dayNumber} />
                            <label className="ps-4" for="dayInput">Day</label>
                            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.dayNumber ? 'visible' : 'hidden' }}>{formState.errors.dayNumber}</div>
                        </div>
                        <div class="form-floating mb-3 col-3">
                            <input type="text" class="form-control" onChange={(e) => handleChange(e)} id="startTimeInput" name="startTime" defaultValue={formState.values.hour} />
                            <label className="ps-4" for="startTimeInput">Start Time (Military Time)</label>
                            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.hour ? 'visible' : 'hidden' }}>{formState.errors.hour}</div>
                        </div>
                        <div class="form-floating mb-3 col-3">
                            <input type="text" class="form-control" onChange={(e) => handleChange(e)} id="endTimeInput" name="endTime" />
                            <label className="ps-4" for="endTimeInput">End ({formState.values.timeZone})</label>
                            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.endTime ? 'visible' : 'hidden' }}>{formState.errors.endTime}</div>
                        </div>
                    </div>

                    {/* Month/Year of Event */}
                    <div className="row mb-3 ">
                        <div class="form-floating mb-3 col-6">
                            <input type="text" class="form-control" onChange={(e) => handleChange(e)} id="monthInput" name="month" defaultValue={formState.values.month} />
                            <label className="ps-4" for="monthInput">Month</label>
                            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.month ? 'visible' : 'hidden' }}>{formState.errors.month}</div>
                        </div>
                        <div class="form-floating mb-3 col-6">
                            <input type="text" class="form-control" onChange={(e) => handleChange(e)} id="yearInput" name="year" defaultValue={formState.values.year} />
                            <label className="ps-4" for="yearInput">Year</label>
                            <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.year ? 'visible' : 'hidden' }}>{formState.errors.year}</div>
                        </div>
                    </div>

                    {/* Submit Plan Form */}
                    <button type="submit" className="btn btn-primary col-12">Plan!</button>
                </form>
            </div>
        </div>
    )
}

export default PlanForm;