import React from 'react';
import validate from '../utilities/GroupFormValidation';
import useForm from '../utilities/useForm';
import { useAuth } from '../utilities/AuthContext';
import { useHistory } from "react-router-dom";

const GroupForm = (props) => {

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(submitForm, validate);
    const history = useHistory();
    const { create, userData} = useAuth();

    function submitForm() {
        const postData = {
            created_by_user_id: userData.id,
            name: values.name,
            privacy: values.privacy,
            type_id: values.type,
            active: '1'
        }
        console.log(postData)
        create(postData)
        // console.log("Pushing")
        // history.push("/")
    }

    return (
        <form className="row g-0" onSubmit={handleSubmit} noValidate>

            <label for="validationLoginEmail" className="form-label">Group Name</label>
            <div className="input-group mb-2">
                <span class="input-group-text" id="inputGroupPrepend1">@</span>
                <input autoComplete="off" className="form-control" onChange={handleChange} value={values.name || ''} type="name" name="name" placeholder="e.g. Awesome Inc" required />
                {errors.name && (
                    <p className="mt-1 mb-0 col-12" style={{ color: 'red' }}>{errors.name}</p>
                )}
            </div>

            <label for="validationLoginPassword" className="form-label">Group Privacy</label>
            <div className="input-group mb-2 has-validation">
                <span class="input-group-text" id="inputGroupPrepend2">@</span>
                <input className="form-control" type="privacy" name="privacy" onChange={handleChange} value={values.privacy || ''} placeholder="Public/Private" required />
            </div>
            {errors.privacy && (
                <p className="help mt-1 mb-0 col-12" style={{ color: 'red' }}>{errors.privacy}</p>
            )}

            <label for="validationLoginPassword" className="form-label">Group Type</label>
            <div className="input-group mb-2 has-validation">
                <span class="input-group-text" id="inputGroupPrepend2">@</span>
                <input className="form-control" type="type" name="type" onChange={handleChange} value={values.type || ''} placeholder="Enter Type" required />
            </div>
            {errors.type && (
                <p className="help mt-1 mb-0 col-12" style={{ color: 'red' }}>{errors.type}</p>
            )}

            <button type="submit" className="btn btn-primary mt-2">Create</button>
        </form>
    )
}

export default GroupForm;