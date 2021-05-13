import React, { useEffect, useReducer } from 'react';
import formReducer from '../utilities/reducers/formReducer';
import { useGroup } from "../utilities/GroupContext"

const initialFormState = { // Initial State for my Group Invitation form 
    formType: "INVITE MEMBERS", // Identifier for my formReducer
    values: {
        user_id: "",
        group_id: "",
        email: "",
    },
    errors: {},
    canSubmit: false,
}

// Group Invite Form Component that checks for simple validation before posting data to my API route
function GroupInviteForm({ user, group }) {

    const [formState, dispatch] = useReducer(formReducer, initialFormState); // useReducer that all my forms use 
    const { invite } = useGroup(); // Custom Group Hook

    useEffect(() => { // Temporary way of allowing Form Submits. Need to set up more Contexts/Reducers/Actions to make this smooth.
        formState.values.user_id = user.id
        formState.values.group_id = group.id
        if (formState.canSubmit === true) {
            invite(formState.values, failedGroupInvite);
        }

    }, [formState])

    const failedGroupInvite = (e) => { // Temporary failure method
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
                <h3 className="mb-5 text-center">More members means more Awesome Plans!</h3>

                {/* Form Body */}
                <form onSubmit={handleSubmit} >
                    <div className="form-floating mb-3">

                        {/* Email Input and Errors*/}
                        <input type="text" className="form-control" name="email" onChange={(e) => handleChange(e)} id="emailInput" placeholder="name@example.com" />
                        <label for="emailInput">Email address</label>
                        <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.email ? 'visible' : 'hidden' }}>{formState.errors.email}</div>
                    </div>

                    {/* Submit Group Invite Form */}
                    <button type="submit" className="btn btn-primary col-12 mt-5">Invite!</button>
                </form>
            </div>
        </div>
    )
}
export default GroupInviteForm;