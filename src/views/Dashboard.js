import React, { useEffect, useRef } from 'react';
import { useAuth } from '../utilities/AuthContext';
import Navbar from '../components/Navbar';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import GroupForm from '../components/GroupForm'
import Modal from '../components/Modal';
import Group from '../components/Group';

function Dashboard() {
    const { userData, view, setView } = useAuth();
    const modal = useRef(null);

    useEffect(() => {
        console.log(view)
    }, [view])

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

                                {/* Mapping and returning all of User's Groups */}
                                {userData.groups.map((group, index) => {
                                    return (
                                        <div className="form-check mb-2" key={index} style={{ position: 'relative' }}>
                                            <input className="form-check-input mt-2" type="checkbox" value="" id={`Select ${index}`} checked />
                                            <label className="form-check-label" for={`Select ${index}`}>
                                            </label>
                                                <h4 onClick={() => setView(group.name)} style={{ position: 'absolute', top:'.18vh', left: '1.5vw' }}>{group.name}</h4>
                                            <svg onClick={() => setView(group.name)} style={{ position: 'absolute', right: '0px', top: '1vh' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16"> <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /> <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                                                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                            </svg>
                                        </div>
                                    )
                                })}

                                {/* Section for preset events */}
                                <div className="row">
                                    <h2 className="p-0">Presets</h2>
                                </div>
                            </div>

                            {/* FullCalendar Component that displays all Events if view state is calendar*/}
                            <div className="col-10 p-0">
                                {view === "calendar" && (
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
                                )}

                                {/* Conditionally render group info based on view state */}
                                {userData.groups.map((group, index) => {
                                    return (
                                        view === group.name && (
                                            <Group key={index} user={userData} group={group} />
                                        )
                                    )
                                })}

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