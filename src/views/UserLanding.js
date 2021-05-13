import React, { useEffect, useState } from 'react';
import './UserLanding.css'
import Login from '../components/Login';
import { Link } from "react-router-dom";
import Register from '../components/Register';

// Where Users that are not logged in or don't have a token in Local Storage will be redirected to. Need to Make an "About" View also.
function UserLanding() {

    const [view, setView] = useState({ // Switches between Login and Register Forms
        login: true,
        register: false,
    })
    useEffect(() => {
        // console.log(view)
    }, [view])

    const toggleView = () => {
        setView({ login: !view.login, register: !view.register })
    }

    return (
        <div className="container-fluid">
            <div className="row" style={{height: "100vh"}}>

                {/* Image/Left Side */}
                <div className="col-7">
                    <img src="/images/MainView.png" style={{ height: "65vh", width: '60vw', marginTop:'17.5vh', marginLeft:'1.5vw' }} alt="Example View of App" />
                </div>

                <div className="col-5 position-relative">
                
                    {/* Card Styling and centering */}
                    <div className="card position-absolute top-50 start-50 translate-middle p-3" style={{ height: '75vh', width: '30vw' }}>
                        {view.register && (
                            <Register toggleView={toggleView} />
                        )}
                        {view.login && (
                            <>
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
                                        <p className="actions">&nbsp;&nbsp;&nbsp;Don't have an account? <Link onClick={toggleView}>Sign Up!</Link></p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLanding;