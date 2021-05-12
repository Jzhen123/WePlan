import React, { createContext, useContext, useReducer } from "react"
import { useHistory } from "react-router-dom";
import { axiosHelper } from "./axiosHelper";
import { useAuth } from "./AuthContext";
import calendarReducer from '../utilities/reducers/calendarReducer';

const CalendarContext = createContext({});

// Helper function that exports just the needed/wanted data for the Group provider
export const CalendarHelper = () => {
    const initialCalendarState = {
        newEvent: {}
    }

    const history = useHistory();
    const { index } = useAuth();
    const [calendarState, dispatch] = useReducer(calendarReducer, initialCalendarState);

    function createEvent(groupData, customFailureMethod) {
        axiosHelper({
            data: groupData,
            method: 'post',
            url: '/api/group/create',
            successMethod: index,
            failureMethod: customFailureMethod,
        })
    }

    // function delete() {

    // }

    // function read() {

    // }



    return { createEvent, calendarState, dispatch }
}

export const CalendarProvider = (props) => {
    const initialContext = CalendarHelper();
    return (
        <CalendarContext.Provider value={initialContext}>
            {props.children}
        </CalendarContext.Provider>
    )
}

export const useCalendar = () => useContext(CalendarContext);

export default CalendarContext;