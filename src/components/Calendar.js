import React, { useReducer } from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import calendarReducer from '../utilities/reducers/calendarReducer';
import { useCalendar } from '../utilities/CalendarContext';

const initialCalendarState = {
    idk: 'idk'
}

function Calendar() {

    const [calendarState, dispatch] = useReducer(calendarReducer, initialCalendarState);
    const { createEvent } = useCalendar();

    return (
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
                alert('selected ' + info.startStr + ' to ' + info.endStr);
            }}
            dateClick={function (info) {
                alert('Clicked on: ' + info.dateStr);
                alert('Current view: ' + info.view.type);
            }}
            events={[
                {
                    id: '1',
                    title: 'my event',
                    start: '2021-05-14T11:00:00-04:00',
                    end: '2021-05-14T12:00:00-04:00'
                }
            ]}
        />
    )
}

export default Calendar;