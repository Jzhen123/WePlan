import React, { useEffect, useReducer, useRef } from 'react';
import Modal from '../components/Modal';
import GroupInviteForm from './GroupInviteForm';


function Group({ user, group }) {
    const modal = useRef(null);

    return (
        <>
            <div className="row d-flex justify-content-center text-center">
                <h1 className="mt-2">{group.name}</h1>
                <h3 className="mt-5">Group members:</h3>
                {group.members.map((member, index) => {
                    return (
                        <h5 key={index}>{member}</h5>
                    )
                })}
                <h3 className="mt-5">Group's Events:</h3>

            </div>
            <div className="row d-flex justify-content-center">
                <button className="btn btn-primary mt-5 col-6" onClick={() => modal.current.open()} type="button">Add more members</button>
            </div>

            <Modal ref={modal}>
                <GroupInviteForm user={user} group={group} />
            </Modal>
        </>

    )
}
export default Group;