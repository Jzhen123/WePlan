import React from 'react';
import { useAuth } from '../utilities/AuthContext';

function Dashboard() {

    const { userData, logout } = useAuth();

    return (
        <>
            {
                userData.name ?
                    <div>Welcome {userData.name}!</div>
                    : <div>Loading. Please Wait!</div>
            }
            <button type="button" onClick={logout} class="btn btn-outline-primary">Primary</button>
        </>
    )
}

export default Dashboard;