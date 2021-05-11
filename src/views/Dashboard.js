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
                            <div className="col-2 p-0 ms-2 me-4 mt-3" style={{ height: '91.5vh' }}>
                                <div className="row mb-3">
                                    <div className="col-9">
                                        <h2 className="mb-1 pt-1">Groups</h2>
                                    </div>
                                    <div className="col-3 text-center">
                                       <div onClick={() => modal.current.open()} style={{fontSize:'30px', cursor: 'pointer'}}>+</div>
                                    </div>
                                </div>
                                {/* Modal for Creating Groups */}
                                <Modal ref={modal}>
                                    <GroupForm />
                                </Modal>

                                {userData.groups.map((group, index) => {
                                    {/* Mapping and returning all of User's Groups */ }
                                    return (
                                        <>
                                        <h4 className="mb-3" key={index}>{group.name}</h4>
                                        </>
                                    )
                                })}
                            </div>

                            <div className="col-9 p-0"> {/* FullCalendar Component that displays all Events */}
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
                    <div>Loading. Please Wait!</div> // Temporary Loading Screen
                }
            </div>
        </>
    )
}

export default Dashboard;