import React, { useRef } from 'react';
import Modal from '../components/Modal';
import GroupInviteForm from './GroupInviteForm';

// Group Component for when users select one of their groups. A view that replaces the Calendar component.
function Group({ user, group }) {

    const modal = useRef(null); // Initialize Modal Ref

    return (
        <>
            <div className="row d-flex justify-content-center text-center">

                {/* Group Name */}
                <h1 className="mt-2">{group.name}</h1>

                {/* All of the Group's members */}
                <h3 className="mt-5">Group members:</h3>
                {group.members.map((member, index) => {
                    return (
                        <h5 key={index}>{member}</h5>
                    )
                })}

                {/* All of the Group's events */}
                <h3 className="mt-5">Group's Events:</h3>

            </div>

            {/* Button to invite more members to your group */}
            <div className="row d-flex justify-content-center">
                <button className="btn btn-primary mt-5 col-6" onClick={() => modal.current.open()} type="button">Add more members</button>
            </div>

            {/* Modal with the GroupInvite Form that shows when the button above is clicked */}
            <Modal ref={modal}>
                <GroupInviteForm user={user} group={group} />
            </Modal>
        </>
    )
}
export default Group;