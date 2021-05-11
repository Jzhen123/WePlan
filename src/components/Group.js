import React, { useEffect, useReducer, useRef } from 'react';
import Modal from '../components/Modal';
import GroupInviteForm from './GroupInviteForm';


function Group({ user, group }) {
    const modal = useRef(null);

    return (
        <div className="row d-flex justify-content-end text-center">
            <h1>{group.name}</h1>
            <h3>Group members:</h3>
            {group.members.map((member, index) => {
                return (
                    <h5 key={index}>{member}</h5>
                )
            })}
            <button className="btn btn-light border bg-white me-3" onClick={() => modal.current.open()} type="button">Add more members</button>

            <Modal ref={modal}>
                <GroupInviteForm user={user} group={group}/>
            </Modal>


        </div>
    )
}
export default Group;