import React from 'react';
import { useAuth } from '../utilities/AuthContext';
import Navbar from '../components/Navbar';

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

                            <h1 className="fs-1">Your Email is - {userData.email}</h1>

                            <h1 className="fs-1">Your ID is - {userData.id}</h1>






                        </>
                        :
                        <div>Loading. Please Wait!</div>
                }
            </div>
        </>
    )
}

export default Dashboard;