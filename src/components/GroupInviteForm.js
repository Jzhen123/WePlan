import React, { useEffect, useReducer } from 'react';
import formReducer from '../utilities/reducers/formReducer';
import { useGroup } from "../utilities/GroupContext"

const initialFormState = {
    formType: "INVITE MEMBERS",
    values: {
        user_id: "",
        group_id: "",
        email: "",
    },
    errors: {},
    canSubmit: false,
}

function GroupInviteForm({ user, group }) {
    const [formState, dispatch] = useReducer(formReducer, initialFormState);
    const { invite } = useGroup();

    useEffect(() => {
        formState.values.user_id = user.id
        formState.values.group_id = group.id
        if (formState.canSubmit === true) {
            invite(formState.values, failedGroupInvite)
        }

    }, [formState])

    const failedGroupInvite = (e) => {
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
            <div className="col-5 card p-5">
                <h3 className="mb-5 text-center">More members means more Awesome Plans!</h3>
                <form onSubmit={handleSubmit} >
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name="email" onChange={(e) => handleChange(e)} id="emailInput" placeholder="name@example.com" />
                        <label for="emailInput">Email address</label>
                        <div style={{ color: '#cc0000', height: '2vh', visibility: formState.errors.email ? 'visible' : 'hidden' }}>{formState.errors.email}</div>
                    </div>

                    <button type="submit" className="btn btn-primary col-12 mt-5">Invite!</button>
                </form>
            </div>
        </div>
    )
}
export default GroupInviteForm;