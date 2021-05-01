import React from 'react';
function UserLanding() {

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-7">
                    <img src="/images/MainView.png" style={{ height: "100vh" }} alt="Example View of App" />
                </div>
                <div className="col-5 position-relative">
                    <div className="card position-absolute top-50 start-50 translate-middle" style={{ height: '75vh', width: '30vw' }}>
                        <div className="card-body">
                            <h5 className="card-title">Make Planning Events Fun, Not Stressful</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="card-link">Card link</a>
                            <a href="#" className="card-link">Another link</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserLanding;