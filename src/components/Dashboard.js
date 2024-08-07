import React from 'react'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Navbar";
import "../styles/Test.css"
import CandidateUpdateDetails from '../pages/CandidateUpdateDetails';
import SlotBooking from '../pages/SlotBooking';
import Result from '../pages/Result';
import Guidelines from '../pages/Guidelines';

function Dashboard() {
    return (
        <div>
            <div className="container-fluid mt-4">
                <Navbar />
                <div className="row">
                    <div className="col-12">&nbsp;
                        <ul className="nav nav-underline justify-content-end" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="btn btn-primary buttonstyle" id="form-tab" data-bs-toggle="tab" data-bs-target="#form"
                                    type="button" role="tab" aria-controls="form" aria-selected="true">Update Candidate Details</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="btn btn-primary buttonstyle" id="booking-tab" data-bs-toggle="tab" data-bs-target="#booking"
                                    type="button" role="tab" aria-controls="booking" aria-selected="false">Booking Slots</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="btn btn-primary buttonstyle" id="test-tab" data-bs-toggle="tab" data-bs-target="#test"
                                    type="button" role="tab" aria-controls="test" aria-selected="false">Test</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="btn btn-primary buttonstyle" id="result-tab" data-bs-toggle="tab" data-bs-target="#result"
                                    type="button" role="tab" aria-controls="result" aria-selected="false">Result</button>
                            </li>
                        </ul>&nbsp;

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="form" role="tabpanel" aria-labelledby="form-tab">
                                <CandidateUpdateDetails />
                            </div>

                            <div className="tab-pane fade" id="booking" role="tabpanel" aria-labelledby="booking-tab">
                                <SlotBooking />
                            </div>

                            <div className="tab-pane fade" id="test" role="tabpanel" aria-labelledby="test-tab">
                                <Guidelines />
                            </div>

                            <div className="tab-pane fade" id="result" role="tabpanel" aria-labelledby="result-tab">
                                <Result />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard