import React from 'react';
import './UserLanding.css'
import Login from '../components/Login';
import { Link } from "react-router-dom";

function UserLanding() {

    return (
        <div className="container-fluid">
            <div className="row">

                {/* Image/Left Side */}
                <div className="col-7">
                    <img src="/images/MainView.png" style={{ height: "100vh", width: '57vw' }} alt="Example View of App" />
                </div>

                {/* Login/Right Side */}
                <div className="col-5 position-relative">
                    {/* Card Styling and centering */}
                    <div className="card position-absolute top-50 start-50 translate-middle p-3" style={{ height: '80vh', width: '30vw' }}>
                        <div className="row justify-content-md-center">

                            {/* Header */}
                            <div className="row text-center name">
                                <p className="name">WePlan</p>
                            </div>

                            {/* Subheader */}
                            <div className="row text-center login mb-2">
                                <p className="brand text-center mt-1">Make Planning Events Fun<br></br>Not Stressful</p>
                            </div>

                            {/* Login Form */}
                            <Login />
                        </div>

                        {/* Register and Retrieve Password Actions */}
                        <div className="row justify-content-md-center pt-3">
                            <div className="col-6">
                                <p className="actions">Don't have an account? <Link to="/register">Sign Up</Link></p>
                            </div>

                            <div className="col-3 ms-4">
                                {/* <p className="actions"><Link>Forgot Password?</Link></p> */}
                            </div>


                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserLanding;