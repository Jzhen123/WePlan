import React, { useReducer, useEffect } from 'react';
import { useAuth } from '../utilities/AuthContext';
import { useGroup } from "../utilities/GroupContext"
import formReducer from '../utilities/reducers/formReducer';

const initialFormState = { // Initial State for the Group creation form
    formType: "CREATE GROUP", // Identifier for my formReducer
    values: {
        created_by_user_id: "",
        name: "",
        privacy: "Public",
        type_id: 1,
        active: 1,
    },
    errors: {},
    canSubmit: false,
}

// Group Form Component that checks for simple validation before posting data to my API route
const GroupForm = () => {

    const [formState, dispatch] = useReducer(formReducer, initialFormState); // useReducer that all my forms use 
    const { userData } = useAuth(); // Stores the current User's Data for API post for submitting the form
    const { createGroup } = useGroup(); // Custom Group Hook

    useEffect(() => { // Temporary way of allowing Form Submits. Need to set up more Contexts/Reducers/Actions to make this smooth.
        formState.values.created_by_user_id = userData.id
        if (formState.canSubmit === true) {
            createGroup(formState.values, failedGroupCreate) // Function from custom Group Hook
        }
    }, [formState])

    const failedGroupCreate = (e) => { // Temporary failure method
        console.log(e.response.data)
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
            <div className="col-5 card p-5">

                {/* Form Header */}
                <h1 className="mb-5 text-center">What is Your Group for?</h1>

                {/* Form Body*/}
                <form onSubmit={handleSubmit} >

                    {/* Name Input and Errors*/}
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name="name" onChange={(e) => handleChange(e)} id="nameInput" placeholder="name@example.com" />
                        <label for="nameInput">Name</label>
                        <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.name ? 'visible' : 'hidden' }}>{formState.errors.name}</div>
                    </div>

                    <div className="row">
                        <div className="form-floating col-10">

                            {/* Select Group Type Input */}
                            <select className="form-select" id="floatingSelect" name="type_id" onChange={(e) => handleChange(e)} aria-label="Floating label select example">
                                <option value="1" selected>Friends</option>
                                <option value="2">Work</option>
                                <option value="3">Family</option>
                                <option value="4">Roommates</option>
                            </select>
                            <label for="floatingSelect">&nbsp;&nbsp;&nbsp;&nbsp;Choose Group Type</label>
                        </div>

                        {/* Toggle Public/Private Input */}
                        <div className="form-check form-switch col-2 pt-3">
                            <input className="form-check-input" type="checkbox" name="privacy" onChange={(e) => handleChange(e)} id="flexSwitchCheckDefault" />
                            <label className="form-check-label" for="flexSwitchCheckDefault">Private?</label>
                        </div>
                    </div>

                    {/* Submit Group Form */}
                    <button type="submit" className="btn btn-primary col-12 mt-5">Create Group</button>
                </form>
            </div>
        </div>
    )
}

export default GroupForm;