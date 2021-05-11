import React, { useRef } from 'react';
import { useAuth } from '../utilities/AuthContext';
import Navbar from '../components/Navbar';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import GroupForm from '../components/GroupForm'
import Modal from '../components/Modal';

function Dashboard() {
    const { userData } = useAuth();
    const modal = useRef(null);

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                {userData.name ? // Conditionally Rendering Dashboard until User Data is retrieved
                    <>
                        <div className="row">
                            <div className="col-2 p-4 pt-2">
                                <div className="row mb-3">
                                    <div className="col-10">
                                        <h2 className="mb-1 pt-1">Groups</h2>
                                    </div>
                                    <div className="col-2 text-center">
                                        <div onClick={() => modal.current.open()} style={{ fontSize: '3.25vh', cursor: 'pointer' }}>+</div>
                                    </div>
                                </div>

                                {/* Modal for Creating Groups */}
                                <Modal ref={modal}>
                                    <GroupForm />
                                </Modal>
                                <div className="row mb-3">

                                    {/* Mapping and returning all of User's Groups */}
                                    {userData.groups.map((group, index) => {
                                        return (
                                            <>
                                                <div className="form-check mb-2" key={index}>
                                                    <input className="form-check-input mt-2" type="checkbox" value="" id={`Select ${index}`} checked />
                                                    <label className="form-check-label" for={`Select ${index}`}>
                                                        <h4>{group.name}</h4>
                                                    </label>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>

                                {/* Section for preset events */}
                                <div className="row">
                                    <h2 className="p-0">Presets</h2>
                                </div>
                            </div>

                            {/* FullCalendar Component that displays all Events */}
                            <div className="col-10 p-0">
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
                            </div>
                        </div>
                    </>
                    :
                    <h1 className="text-center mt-5">Loading. Please Wait!</h1> // Temporary Loading Screen
                }
            </div>
        </>
    )
}

export default Dashboard;