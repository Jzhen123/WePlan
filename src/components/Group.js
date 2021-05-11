import React from 'react';

function Group({ data }) {

    return (
        <div className="row d-flex justify-content-end text-center">
            <h1>{data.name}</h1>
            <h3>Group members</h3>
            {data.members.map((member, index) => {
                    return (
                        <h5 key={index}>{member}</h5>
                    )
                })}
        </div>
    )
}
export default Group;