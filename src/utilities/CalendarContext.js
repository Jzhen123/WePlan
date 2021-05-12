import React, { createContext, useContext, useEffect, useReducer } from "react"
import { useHistory } from "react-router-dom";
import { axiosHelper } from "./axiosHelper";
import { useAuth } from "./AuthContext";
import calendarReducer from '../utilities/reducers/calendarReducer';

const CalendarContext = createContext({});

// Helper function that exports just the needed/wanted data for the Group provider
export const CalendarHelper = () => {
    const initialCalendarState = {
        newEvent: {},
        events: [
            {
                id: '1',
                title: 'Demo Day!',
                start: '2021-05-13T13:00:00-04:00',
                end: '2021-05-13T14:30:00-04:00'
            },
            {
                id: '2',
                title: 'Working on Final Project!',
                start: '2021-05-11T08:00:00-04:00',
                end: '2021-05-11T23:30:00-04:00'
            }
        ],
    }

    const history = useHistory();
    const { index } = useAuth();
    const [calendarState, dispatch] = useReducer(calendarReducer, initialCalendarState);

    useEffect(() => {
        let lsEvents = window.localStorage.getItem('events');

        if (lsEvents) {
            history.push('/')
        } else {
            window.localStorage.setItem('events', calendarState.events);
        }

    }, [calendarState, history])

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