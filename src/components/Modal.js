import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => props.visible ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={props.toggleModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p>
            Hello, I'm a modal.
          </p>
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;
    // return (
    //     <>
    //     {console.log(props.visible)}
    //         {
    //             props.visible ?
    //                 <div className="modal fade" id="exampleModal" tabIndex="-1">
    //                     <div className="modal-dialog">
    //                         <div className="modal-content">
    //                             <div className="modal-header">
    //                                 <h3 className="modal-title">Create Group</h3>
    //                                 <button type="button" className="btn-close" onClick={props.toggleModal}></button>
    //                             </div>
    //                             <div className="modal-body">
    //                                 {props.children}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 : null
    //         }
    //     </>
    // )
// }

export default Modal;