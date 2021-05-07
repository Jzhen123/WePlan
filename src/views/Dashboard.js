import React from 'react';
import { useAuth } from '../utilities/AuthContext';
import Navbar from '../components/Navbar';

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

function Dashboard() {

    const { userData } = useAuth();


    return (
        <>
            <Navbar />
            <div className="container-fluid text-center">
                {
                    userData.name ?
                        <>

                            <div className="row">
                                <div className="col-2 mt-1">
                                    <div className="card" style={{ height: '93vh' }}>
                                        <h3>Welcome {userData.name}!</h3>
                                        <h3><br></br> Your Groups:</h3><br></br>
                                        {
                                            userData.groups.map((group, index) => {
                                                return <h5 key={index}>{group.name}</h5>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="col-10">
                                    <FullCalendar
                                        plugins={[timeGridPlugin]}
                                        initialView="timeGridWeek"
                                    />
                                </div>
                            </div>



                        </>
                        :
                        <div>Loading. Please Wait!</div>
                }
            </div>
        </>
    )
}

export default Dashboard;