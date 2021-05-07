export default function validate(values) {
    let errors = {};

    // Rules and their error outputs for form inputs
    if (!values.name) {
        errors.name = 'Name is required';
    }

    if (!values.privacy) {
        errors.privacy = 'Privacy is required';
    } 

    if (!values.type) {
        errors.type = 'Type is required';
    } 

    return errors;
};