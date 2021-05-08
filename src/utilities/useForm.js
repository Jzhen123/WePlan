import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {

    const [values, setValues] = useState({}); // State Object for all of a form's values
    const [errors, setErrors] = useState({}); // State Object for all errors created based on a specfic "XXXRules.js"
    const [isSubmitting, setIsSubmitting] = useState(false); // Used for extra form validation

    // Whenever errors or isSubmitting is updated, use callback function for submitting form
    useEffect(() => {
        setErrors(validate(values));
        if (Object.keys(errors).length === 0 && isSubmitting) { // No errors and User is submitting
            callback();
        }
    }, [values, isSubmitting]);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors(validate(values)); // Setting errors to whatever returns from validate function from "XXXRules.js"
        setIsSubmitting(true); // The other "key" required to submit
    };

    // Setting values and checking for errors onChange
    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
    }
};

export default useForm;