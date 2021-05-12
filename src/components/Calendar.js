import React, { useReducer, useRef } from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useCalendar } from '../utilities/CalendarContext';
import PlanForm from './PlanForm';
import Modal from './Modal';

function Calendar() {

    const { createEvent, calendarState, dispatch } = useCalendar();
    const modal = useRef(null);

    return (
        <>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                initialView="timeGridWeek"
                nowIndicator={true}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth, timeGridWeek, timeGridDay'
                }}
                selectable='true'
                select={function (info) {
                    // Prompt a modal for more information
                    // alert('selected ' + info.startStr + ' to ' + info.endStr);
                }}
                dateClick={function (info) {
                    // Prompt a modal for more information
                    dispatch({ type: 'dateClick', payload: info})
                    console.log(calendarState.newEvent)
                    modal.current.open()
                    calendarState.newEvent = {};
                    // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                    // alert('Clicked on: ' + info.dateStr);
                    // alert('Current view: ' + info.view.type);
                }}
                events={calendarState.events}
            />
            <Modal ref={modal}>
                <PlanForm data={calendarState}/>
            </Modal>
        </>
    )
}

export default Calendar;