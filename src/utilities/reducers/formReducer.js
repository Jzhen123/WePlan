import { axiosHelper } from "../axiosHelper";

export default function formReducer(state, action) {
    let tempState = { ...state }

    switch (action.formType) {
        case 'REGISTER':
            switch (action.type) {

                case "onChange": // Checking for errors 
                    tempState.values[action.field] = action.payload

                    switch (action.field) {
                        case "name" :
                            if (action.payload.length > 0) {
                                tempState.errors[action.field] = null
                            }
                            break;
                        case "password":
                            if (action.payload.length < 8 && action.payload.length > 0) {
                                tempState.errors[action.field] = 'Password must be 8 or more characters';
                            } else if (action.payload.length >= 8) {
                                tempState.errors[action.field] = null
                            } else if (action.payload.length === 0) {
                                tempState.errors[action.field] = null
                            }
                    }
                    return tempState;
    
                case "onSubmit": // 
                    tempState = { ...state }
                    tempState.errors = {};

                    if (!tempState.values.name) {
                        tempState.errors.name = 'Name is required';
                    }
                    if (!tempState.values.email) {
                        tempState.errors.email = "Email address is required";
                    } else if (!/\S+@\S+\.\S+/.test(tempState.values.email)) {
                        tempState.errors.email = "Email address format is invalid";
                    }
                    if (!tempState.values.password) {
                        tempState.errors.password = "Password is required"
                    } else if (tempState.values.password.length < 8) {
                        tempState.errors.password = 'Password must be 8 or more characters'
                    }
                    if (Object.keys(tempState.errors).length === 0 && tempState.values.email.length > 4) {
                        tempState.canSubmit = true
                    }
                    return tempState
                case "registerFailed":
                    tempState = { ...state }
                    tempState.errors = {};

                    tempState.canSubmit = false
                    tempState.errors.email = "Email already in use. Log in or try a different email!"
                    return tempState
            }

        case "LOGIN":
        case "CREATE GROUP":

        default:
            return state;
    }
}