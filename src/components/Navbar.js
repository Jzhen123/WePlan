import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../utilities/AuthContext';
import Modal from './Modal'
import PlanForm from './PlanForm';

function Navbar() {
    const { logout, userData } = useAuth();
    const [header, setHeader] = useState("");
    const modal = useRef(null);

    useEffect(() => {
        if (userData.name) {
            setHeader(`What will we plan today ${userData.name}?`)
        }
    }, [userData.name])

    useEffect(() => {
        let title = (document.getElementsByClassName("fc-toolbar-title"))[0];
        if (title) { setHeader(title.innerHTML); }
    }, [header])

    // Mimicing fullCalendars toolbar functionality but will any styling I want.
    const toggleFullCalendarView = (event) => {
        let viewSelect = document.getElementById("viewSelect");
        let currentView = viewSelect.options[viewSelect.selectedIndex].value;

        if (currentView === "Day") {
            (document.getElementsByClassName("fc-timeGridDay-button"))[0].click();
        } else if (currentView === "Week") {
            (document.getElementsByClassName("fc-timeGridWeek-button"))[0].click();
        } else if (currentView === "Month") {
            (document.getElementsByClassName("fc-dayGridMonth-button"))[0].click();
        }
        if (event === "Today") {
            (document.getElementsByClassName("fc-today-button"))[0].click();
            document.getElementById("todayButton").disabled = true;
        } else if (event === "Previous") {
            (document.getElementsByClassName("fc-prev-button"))[0].click();
            document.getElementById("todayButton").disabled = false;
        } else if (event === "Next") {
            (document.getElementsByClassName("fc-next-button"))[0].click();
            document.getElementById("todayButton").disabled = false;
        }
        setHeader("")
    }

    return (<> {
        userData.name ? // Wait for userData before loading
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom border-2 p-2 mb-0">
                <div className="container-fluid">
                    <button className="btn btn-light border bg-white me-3" type="button">Menu</button>
                    <a className="navbar-brand">We Plan</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Today and Previous/Next buttons */}
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
                            <button className="btn btn-light border bg-white me-3" onClick={() => modal.current.open()} type="button">Make a Plan</button>
                            <button value="Today" id="todayButton" className="btn btn-light border bg-white me-3" onClick={(e) => toggleFullCalendarView(e.target.value)} type="button">Today</button>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button value="Previous" className="btn btn-light border-none bg-white" onClick={(e) => toggleFullCalendarView(e.target.value)} type="button">&#60;</button>
                                <button value="Next" className="btn btn-light border-none bg-white" onClick={(e) => toggleFullCalendarView(e.target.value)} type="button">&#62;</button>
                            </div>
                        </ul>

                        {/* Modal for Creating Plans */}
                        <Modal ref={modal}>
                            <PlanForm />
                        </Modal>

                        {/* Header/Center Text */}
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <h3 className="mb-0" id="calendarHeader">{header}</h3>
                        </ul>

                        {/* Dropdown for chooseing view based on timeframe */}
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                            <li className="nav-item dropdown">
                                <select id="viewSelect" className="form-select" onChange={toggleFullCalendarView}>
                                    <option value="Day">Day</option>
                                    <option selected value="Week">Week</option>
                                    <option value="Month">Month</option>
                                </select>
                            </li>
                        </ul>

                        {/* Dropdown for settings */}
                        <ul className="navbar-nav mb-2 mb-lg-0 ">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Settings</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li className="dropdown-item">User Settings</li>
                                    <li className="dropdown-item">Group Preferences</li>
                                    <li className="dropdown-item" onClick={logout}>Logout</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            : null
    } </>)
}

export default Navbar;