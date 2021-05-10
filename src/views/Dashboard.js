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
                {userData.name ? // Conditionally Rendering Dashboard until User Data is retrieved
                    <>
                        <div className="row">
                            <div className="col-2 mt-1">
                                <div className="card" style={{ height: '93vh' }}>
                                    <h3>Welcome {userData.name}!</h3>
                                    <h3><br></br> Your Groups:</h3><br></br>
                                    {userData.groups.map((group, index) => { {/* Mapping and returning all of User's Groups */ }
                                        return <h5 key={index}>{group.name}</h5>
                                    })}
                                </div>
                            </div>

                            <div className="col-10"> {/* FullCalendar Component that displays all Events */}
                                <FullCalendar
                                    plugins={[timeGridPlugin]}
                                    initialView="timeGridWeek" 
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