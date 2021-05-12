export default function calendarReducer(state, action) {
    let tempState = { ...state }
    // console.log(action)

    switch (action.type) {
        case "dateClick":

            console.log(action.payload)
            let newEvent = action.payload.date.toString();
            console.log(newEvent)
            newEvent = newEvent.split(" ")
            tempState.newEvent['DayName'] = newEvent[0];
            tempState.newEvent['Month'] = newEvent[1];
            tempState.newEvent['DayNumber'] = newEvent[2];
            tempState.newEvent['Year'] = newEvent[3];
            tempState.newEvent['Hour'] = newEvent[4];
            tempState.newEvent['TimeZone'] = newEvent[5];
        return tempState;
        
        default:
            return state;

    }
}