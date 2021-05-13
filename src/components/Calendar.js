import React, { useReducer, useRef } from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useCalendar } from '../utilities/CalendarContext';
import PlanForm from './PlanForm';
import Modal from './Modal';

// Calendar Component to store my FullCalendar and all of its many properties. The main Dashboard view.
function Calendar() { 

    const { calendarState, dispatch } = useCalendar(); // Custom Calendar Hook
    const modal = useRef(null); // Initialize Modal Ref

    return (
        <>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]} // Some built in plugins from Full Calendar
                initialView="timeGridWeek"
                nowIndicator={true}
                headerToolbar={{ // Controls for the Calendar. Found a clever way to just reference their onClicks with my own buttons for styling
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth, timeGridWeek, timeGridDay'
                }}
                selectable='true'
                select={function (info) { // Whenever a User selects parts of the Calendar Component, run this function
                    // Need to add Multi-Day event capabailities
                }}
                dateClick={function (info) { // Whenever a User clickes on the Calendar Component, run this function
                    dispatch({ type: 'dateClick', payload: info})
                    modal.current.open()
                    calendarState.newEvent = {};
                }}
                events={calendarState.events}
            />

            {/* Modal that shows PlanForm component with user selected date data. Appears when dateClick is ran */}
            <Modal ref={modal}>
                <PlanForm data={calendarState}/>
            </Modal>
        </>
    )
}

export default Calendar;