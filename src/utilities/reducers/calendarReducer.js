export default function calendarReducer(state, action) {
    let tempState = { ...state }
    // console.log(action)

    switch (action.formType) {
        case '': // Reducer cases for User registration form
            switch (action.type) {
                case "": // Checking for errors and saving values for every input 


                    switch (action.field) {
                        case "":

                            break;
                        case "":

                            break;
                        default:
                            console.log("action.field not found");
                    }
                    return tempState;

            }
            break;


        default:
            return state;
    }
}