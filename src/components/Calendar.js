import React from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import calendarReducer from '../utilities/reducers/calendarReducer';

function Calendar() {

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
            dateClick={function (info) {
                alert('clicked ' + info.dateStr);
            }}
            select={function (info) {
                alert('selected ' + info.startStr + ' to ' + info.endStr);
            }}
            dateClick={function (info) {
                alert('Clicked on: ' + info.dateStr);
                alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                alert('Current view: ' + info.view.type);
                // change the day's background color just for fun
                info.dayEl.style.backgroundColor = 'red';
            }}
            />
    )
    }

export default Calendar;