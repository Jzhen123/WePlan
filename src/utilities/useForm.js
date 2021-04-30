import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const useForm = (callback, validate) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
        }
    }, [errors]);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
        register(values);
    };

    const handleChange = (event) => {
        event.persist();
        setErrors(validate(values));
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    const handleBlur = (event) => {
        event.persist();
        setErrors(validate(values));
    }

    return {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
    }
};

export default useForm;