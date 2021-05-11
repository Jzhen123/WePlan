import React, { useRef } from 'react';
import { useAuth } from '../utilities/AuthContext';
import GroupForm from './GroupForm';
import Modal from '../components/Modal';
function Navbar() {
    const { logout } = useAuth();
    const modal = useRef(null)

    const toggleCalendarView = (event) => {
        let viewSelect = document.getElementById("viewSelect");
        let currentView = viewSelect.options[viewSelect.selectedIndex].value

        if (currentView === "Day") {
            (document.getElementsByClassName("fc-timeGridDay-button"))[0].click();
        } else if (currentView === "Week") {
            (document.getElementsByClassName("fc-timeGridWeek-button"))[0].click();
        } else if (currentView === "Month") {
            (document.getElementsByClassName("fc-dayGridMonth-button"))[0].click();
        }

        console.log((document.getElementsByClassName("fc-today-button")))
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
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom border-2 p-2 mb-2">
            <div className="container-fluid">
                <a class="navbar-brand" href="/">We Plan</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">

                    {/* <li className="nav-item">
                            <button type="button" class="btn btn-primary" onClick={() => modal.current.open()}>Create Group</button>
                        </li> */}
                    <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
                        <button id="todayButton" class="btn btn-light" onClick={(e) => toggleCalendarView(e.target.value)} value="Today" type="button">Today</button>
                        <button class="btn btn-light" onClick={(e) => toggleCalendarView(e.target.value)} value="Previous" type="button">Left</button>
                        <button class="btn btn-light" onClick={(e) => toggleCalendarView(e.target.value)} value="Next" type="button">Right</button>
                    </ul>

                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                        <li className="nav-item dropdown">
                            <select id="viewSelect" class="form-select" onChange={toggleCalendarView}>
                                <option value="Day">Day</option>
                                <option selected value="Week">Week</option>
                                <option value="Month">Month</option>
                            </select>
                        </li>

                        <li className="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Settings
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li class="dropdown-item">User Settings</li>
                                <li class="dropdown-item">Group Preferences</li>
                                <li class="dropdown-item" onClick={logout}>Logout</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Modal for Creating Groups */}
            <Modal ref={modal}>
                <GroupForm />
            </Modal>
        </nav>
    )
}

export default Navbar;