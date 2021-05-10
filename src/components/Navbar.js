import React from 'react';
import { useAuth } from '../utilities/AuthContext';
// import GroupForm from './GroupForm';

function Navbar() {

    const { logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Create Group
                            </button>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h3 class="modal-title" id="exampleModalLabel">Create Group</h3>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            {/* <GroupForm /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </li>
                        <li className="nav-item">
                            <button className="btn btn-primary ms-2" onClick={logout}>Log Out</button>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default Navbar;