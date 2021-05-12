import React from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

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
        />
    )
}

export default Calendar;