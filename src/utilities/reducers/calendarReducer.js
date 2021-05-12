export default function calendarReducer(state, action) {
    let tempState = { ...state }
    // console.log(action)

    switch (action.type) {
        case "dateClick":

            let newEvent = action.payload.date.toString();
            newEvent = newEvent.split(" ")
            // tempState.newEvent['DayName'] = newEvent[0];
            tempState.newEvent['Month'] = newEvent[1];
            tempState.newEvent['DayNumber'] = newEvent[2];
            tempState.newEvent['Year'] = newEvent[3];
            tempState.newEvent['StartHour'] = newEvent[4];
            tempState.newEvent['TimeZone'] = newEvent[5];

            return tempState;

        default:
            return state;

    }
}