import React from 'react';

const Modal = (props) => {

    return (
        <div class="modal fade" id="exampleModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="exampleModalLabel">Create Group</h3>
                        <button type="button" onClick={props.closeModal}></button>
                    </div>
                    <div class="modal-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;