// import { axiosHelper } from "./axiosHelper";


export default function formReducer(state, action) {
    // function init({initialFormType, }) {
    //     return {
    //         type: initialFormType,
    //         values: {},
    //         errors: {},
    //         isSubmitting: false
    //     }
    // }

    switch (action.formType) {
        case 'REGISTER':
            switch (action.type) {
                case "onChange":
                    let tempState = { ...state }
                    tempState.errors = {};
                    tempState.values[action.field] = action.payload

                    switch (action.field) {
                        case "email":
                            if (!/\S+@\S+\.\S+/.test(action.payload)) {
                                tempState.errors[action.field] = 'Email address format is invalid';
                            }
                        case "password":
                            if (action.payload.length < 8) {
                                tempState.errors[action.field] = 'Password must be 8 or more characters';
                            }
                    }

                    return tempState;
                // case "TOGGLE CONSENT":
                //     return {
                //         ...state,
                //         hasConsented: !state.hasConsented,
                //     };
                default:
                    return state;
            }
    }




    // switch (action.function) {
    //     case 'init': // Initializing Register specific object keys/values for formData 
    //         return init(action.payload)

    //     case 'onChange': // Storing current form values and then "frontend" error checking for simple rules/validation
    //         if (!state.values.name) {
    //             errors.name = 'Name is required';
    //         }
    //         if (!state.values.email) {
    //             errors.email = "Email is required";
    //         } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    //             errors.email = "Email address format is invalid"
    //         }
    //         if (!state.values.password) {
    //             errors.password = 'Password is required';
    //         } else if (state.values.password < 8) {
    //             errors.password = "Password must be 8 or more characters"
    //         }

    //         return { errors };
    //     case 'onSubmit':
    //         if (Object.keys(formData.errors).length === 0 && formData.isSubmitting) {
    //             axiosHelper({
    //                 // Check for unique emails
    //                 data: formData.value.email,
    //                 method: 'post',
    //                 url: '///////////////', // Put URL in
    //                 successMethod: {} // Return some success message
    //             })
    //         }

    // }
    // case 'LOGIN':
    // case 'CREATEGROUP':
}
// }