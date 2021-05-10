import React, { useRef } from 'react';
import { useAuth } from '../utilities/AuthContext';
import GroupForm from './GroupForm';
import Modal from '../components/Modal';
function Navbar() {

    const { logout } = useAuth();
    const modal = useRef(null)

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <button type="button" class="btn btn-primary" onClick={() => modal.current.open()}>
                                    Create Group
                                </button>
                            </li>

                            <li className="nav-item">
                                <button className="btn btn-primary ms-2" onClick={logout}>Log Out</button>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <Modal ref={modal}>
                <GroupForm />
            </Modal>
        </>


    )
}

export default Navbar;