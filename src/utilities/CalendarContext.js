import React, { createContext, useContext } from "react"
import { useHistory } from "react-router-dom";
import { axiosHelper } from "./axiosHelper";
import { useAuth } from "./AuthContext";

const CalendarContext = createContext({});

// Helper function that exports just the needed/wanted data for the Group provider
export const CalendarHelper = () => {

    const history = useHistory();
    const { index } = useAuth();

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



    return { createEvent }
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