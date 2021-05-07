import React from 'react';
import { useAuth } from '../utilities/AuthContext';
import Navbar from '../components/Navbar';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function Dashboard() {

    const { userData } = useAuth();


    return (
        <>
            <Navbar />
            <div className="container-fluid text-center">
                {
                    userData.name ?
                        <>
                            <h1 className="fs-1">Welcome {userData.name}!</h1>



                            <FullCalendar
                                plugins={[dayGridPlugin]}
                                initialView="dayGridMonth"
                            />



                        </>
                        :
                        <div>Loading. Please Wait!</div>
                }
            </div>
        </>
    )
}

export default Dashboard;