import React from 'react';
import './UserLanding.css'
import Login from './Login';

function UserLanding() {

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-7">
                    <img src="/images/MainView.png" style={{ height: "100vh" }} alt="Example View of App" />
                </div>
                <div className="col-5 position-relative">
                    <div className="card position-absolute top-50 start-50 translate-middle p-3" style={{ height: '75vh', width: '30vw' }}>
                        <div className="card-body">
                            <p className="name text-center">WePlan</p>
                            <p className="brand text-center mt-1">Make Planning Events Fun<br></br>Not Stressful</p>
                            <div className="login mt-5">
                                <Login />
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserLanding;