export default function formReducer(state, action) {
    let tempState = { ...state }
    // console.log(action)

    switch (action.formType) {
        case 'REGISTER': // Reducer cases for User registration form
            switch (action.type) {
                case "onChange": // Checking for errors and saving values for every input 
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
                            break;
                        default:
                            console.log("action.field not found");
                    }
                    return tempState;

                case "onSubmit": // Checking for submit errors and then allows user to submit
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
                case "registerFailed": // Errors/Responses coming from API call
                    tempState = { ...state }
                    tempState.errors = {};

                    tempState.canSubmit = false
                    tempState.errors.email = "Email in use. Log in or try a different email!"
                    return tempState
                default:
                    console.log("action.type not found");
            }
            break;
        case "LOGIN": // Reducer cases for User login form
            switch (action.type) {
                case "onChange": // Checking for errors and saving values for every input
                    tempState.values[action.field] = action.payload
                    return tempState;
                case "onSubmit": // Checking for submit errors and then allows user to submit
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
                case "loginFailed": // Errors/Responses coming from API call
                    tempState = { ...state }
                    let error = tempState.errors
                    tempState.errors = {};
                    tempState.canSubmit = false
                    console.log(error)
                    if (error === "invalid_grant") {
                        tempState.errors.password = "Your email or password don't match any user. Did you mean to Sign Up?"
                    }
                    return tempState
                case "clearForm":
                    tempState.values.username = "";
                    tempState.values.password = "";
                    tempState.canSubmit = false;
                    return tempState;
                default:
                    console.log("action.type not found");
            }
            break;
        case "CREATE GROUP": // Reducer cases for User create a group form
            switch (action.type) {
                case "onChange": // Checking for errors and saving values for every input
                    switch (action.field) {
                        case "privacy":
                            if (tempState.values.privacy === "Public") {
                                tempState.values.privacy = "Private"
                            } else if (tempState.values.privacy === "Private") {
                                tempState.values.privacy = "Public"
                            }
                            return tempState
                        case "name":
                            tempState.values[action.field] = action.payload
                            break;
                        case "type_id":
                            tempState.values[action.field] = parseInt(action.payload)
                            break;
                        default:
                            console.log("action.field not found");
                            break;
                    }
                    return tempState;

                case "onSubmit": // Checking for submit errors and then allows user to submit
                    tempState.errors = {};
                    if (!tempState.values.name) {
                        tempState.errors.name = 'Name is required';
                    }

                    if (Object.keys(tempState.errors).length === 0 && tempState.values.name.length > 1) {
                        tempState.canSubmit = true
                    }

                    return tempState
                default:
                    console.log("action.type not found");
            }
            break;
        case "INVITE MEMBERS": // Reducer cases for Group invitation form
            switch (action.type) {
                case "onChange": // Checking for errors and saving values for every input 
                    tempState.values[action.field] = action.payload
                    return tempState;

                case "onSubmit":
                    tempState.errors = {};

                    if (!tempState.values.email) {
                        tempState.errors.email = "Email address is required";
                    } else if (!/\S+@\S+\.\S+/.test(tempState.values.email)) {
                        tempState.errors.email = "Email address format is invalid";
                    }
                    if (Object.keys(tempState.errors).length === 0 && tempState.values.email.length > 4) {
                        tempState.canSubmit = true
                    }
                    return tempState
                case "inviteFailed":
                    tempState.errors = {};
                    tempState.canSubmit = false

                    tempState.errors.email = "Invite was unsuccessful."
                    return tempState;
            }
        case "CREATE EVENT": // Reducer cases for Create Event form
            switch (action.type) {
                case "onChange":
                    tempState.values[action.field] = action.payload
                    return tempState;
                case "onSubmit": // Checking for submit errors and then allows user to submit
                    tempState.errors = {};

                    if (!tempState.values.name) { tempState.errors.name = 'Name is required'; }
                    if (!tempState.values.groupName) { tempState.errors.groupName = "Group is required"; }
                    if (!tempState.values.dayNumber) { tempState.errors.dayNumber = "Day required" }
                    else if (!(Number.isInteger(parseInt(tempState.values.dayNumber)))) { tempState.errors.dayNumber = "Must be in number format" }
                    if (!tempState.values.hour) { tempState.errors.hour = "Must have a Start Time!" }
                    else if (!/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/.test(tempState.values.hour)) { tempState.errors.hour = "Time must follow HH:MM:SS format" }
                    if (!tempState.values.endTime) { tempState.errors.endTime = "Must have a End Time!" }
                    else if (!/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/.test(tempState.values.endTime)) { tempState.errors.endTime = "Time must follow HH:MM:SS format" }
                    if (!tempState.values.year) { tempState.errors.endTime = "Must have a Year" }

                    if (Object.keys(tempState.errors).length === 0 && tempState.values.name.length > 0) {
                        tempState.canSubmit = true
                    }
                    return tempState
            }
        default: // Default if no formType match
            return state;
    }
}