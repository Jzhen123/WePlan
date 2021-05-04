import React from 'react';
import { useAuth } from '../utilities/AuthContext';

function Dashboard() {

    const { userData } = useAuth();

    return (
        <>
            {
                userData.name ?

                    <div>Welcome {userData.name}!</div>

                    : <div>Loading. Please Wait!</div>
            }
        </>
    )
}

export default Dashboard;