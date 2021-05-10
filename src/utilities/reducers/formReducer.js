export default function formReducer(state, action) {
    let tempState = { ...state }
    // console.log(action)

    switch (action.formType) {
        case 'REGISTER':
            switch (action.type) {
                case "onChange": // Checking for errors 
                    tempState.values[action.field] = action.payload

                    switch (action.field) {
                        case "name":
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
                    tempState.errors.email = "Email in use. Log in or try a different email!"
                    return tempState
            }

        case "LOGIN":
            switch (action.type) {
                case "onChange":
                    tempState.values[action.field] = action.payload
                    return tempState;
                case "onSubmit":
                    tempState.errors = {};

                    if (!tempState.values.username) {
                        tempState.errors.username = "Email address is required";
                    } else if (!/\S+@\S+\.\S+/.test(tempState.values.username)) {
                        tempState.errors.username = "Email address format is invalid";
                    }
                    if (!tempState.values.password) {
                        tempState.errors.password = "Password is required"
                    } else if (tempState.values.password.length < 8) {
                        tempState.errors.password = 'Password must be 8 or more characters'
                    }
                    if (Object.keys(tempState.errors).length === 0 && tempState.values.username.length > 4) {
                        tempState.canSubmit = true
                    }
                    return tempState
                case "loginFailed":
                    tempState = { ...state }
                    let error = tempState.errors
                    tempState.errors = {};
                    tempState.canSubmit = false
                    console.log(error)
                    if (error === "invalid_grant") {
                        tempState.errors.password = "Your email or password don't match any user. Did you mean to Sign Up?"
                    }
                    return tempState
            }

        case "CREATE GROUP":

        default:
            return state;
    }
}