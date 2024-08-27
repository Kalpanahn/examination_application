import React, { useEffect, useState } from 'react';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Navbar";
import "../styles/Test.css"
import KgidcandidateUpdateDetails from '../pages/KgidcandidateUpdateDetails';
import SlotBooking from '../pages/SlotBooking';
import ResultPage from '../pages/ResultPage';
import Guidelines from '../pages/Guidelines';
import * as KgidDashboardAction from '../actions/KgidDashboardAction';
import * as SlotBookingAction from '../actions/SlotBookingAction'
import * as ResultPageAction from '../actions/ResultPageAction';
import { connect } from 'react-redux';

function KgidDashboard(props) {
    const [activeTab, setActiveTab] = useState('form');
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    useEffect(() => {
        let fields = {
            user_id: window.localStorage.getItem("_id")
        }
        props.getKgidCandidateAttendanceStatus(fields);

    }, []);
    const { KgidCandidateAttendanceStatusModel } = props;

    useEffect(() => {
        let fields = {
            email: window.localStorage.getItem("email")
        }
        props.getResult(fields);
    }, []);
    const ResultModel = props.ResultModel && props.ResultModel.length > 0 ? props.ResultModel[0] : null;

    useEffect(() => {
        let fields = {
            KGID: window.localStorage.getItem("KGID")
        }
        props.KgidCandidateSlotStatus(fields);
    }, []);

    useEffect(() => {
        const tabs = document.querySelectorAll('button[data-bs-toggle="tab"]');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                const tabId = tab.getAttribute('data-bs-target');
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('show', 'active');
                });
                document.querySelector(tabId).classList.add('show', 'active');
            });
        });
        return () => {
            tabs.forEach(tab => tab.removeEventListener('click', () => { }));
        };
    }, []);

    return (
        <div>
            <div className="container-fluid mt-4">
                <Navbar />&nbsp;
                <div className="row">
                    <div className="col-12">&nbsp;
                        <ul className="nav nav-underline justify-content-end" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`btn buttonstyle ${activeTab === 'form' ? 'btn-primary' : 'btn btn-outline-secondary'}`}
                                    id="form-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#form"
                                    type="button"
                                    role="tab"
                                    aria-controls="form"
                                    aria-selected={activeTab === 'form'}
                                    onClick={() => handleTabChange('form')}
                                >
                                    Update Candidate Details
                                </button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button
                                    className={`btn buttonstyle ${activeTab === 'booking' ? 'btn-primary' : 'btn btn-outline-secondary'}`}
                                    id="booking-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#booking"
                                    type="button"
                                    role="tab"
                                    aria-controls="booking"
                                    aria-selected={activeTab === 'booking'}
                                    onClick={() => handleTabChange('booking')}
                                >
                                    Booking Slots
                                </button>
                            </li>

                            {KgidCandidateAttendanceStatusModel?.attendence === 'present' && props.getKgidCandidateSlotStatusModel?.adminApproval === 'approve' && props.ResultModel.length === 0 && (
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`btn buttonstyle ${activeTab === 'test' ? 'btn-primary' : 'btn btn-outline-secondary'}`}
                                        id="test-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#test"
                                        type="button"
                                        role="tab"
                                        aria-controls="test"
                                        aria-selected={activeTab === 'test'}
                                        onClick={() => handleTabChange('test')}
                                    >
                                        Test
                                    </button>
                                </li>
                            )}

                            {ResultModel?.displayResult === 'display' && (
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`btn buttonstyle ${activeTab === 'result' ? 'btn-primary' : 'btn btn-outline-secondary'}`}
                                        id="result-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#result"
                                        type="button"
                                        role="tab"
                                        aria-controls="result"
                                        aria-selected={activeTab === 'result'}
                                        onClick={() => handleTabChange('result')}
                                    >
                                        Result
                                    </button>
                                </li>)}
                        </ul>&nbsp;

                        <div className="tab-content" id="myTabContent">
                            <div className={`tab-pane fade ${activeTab === 'form' ? 'show active' : ''}`} id="form" role="tabpanel" aria-labelledby="form-tab">
                                <KgidcandidateUpdateDetails />
                            </div>

                            <div className={`tab-pane fade ${activeTab === 'booking' ? 'show active' : ''}`} id="booking" role="tabpanel" aria-labelledby="booking-tab">
                                <SlotBooking />
                            </div>

                            {/* Conditionally render the "Test" tab content */}
                            {KgidCandidateAttendanceStatusModel?.attendence === 'present' && props.getKgidCandidateSlotStatusModel?.adminApproval === 'approve' && props.ResultModel.length === 0 && (
                                <div className={`tab-pane fade ${activeTab === 'test' ? 'show active' : ''}`} id="test" role="tabpanel" aria-labelledby="test-tab">
                                    <Guidelines />
                                </div>
                            )}
                            {ResultModel?.displayResult === 'display' && (
                                <div className={`tab-pane fade ${activeTab === 'result' ? 'show active' : ''}`} id="result" role="tabpanel" aria-labelledby="result-tab">
                                    <ResultPage />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapToProps = (state) => ({
    //getting Kgid Candidate Attendance Status
    KgidCandidateAttendanceStatusModel: state.kgiddashboard.KgidCandidateAttendanceStatusModel,
    isKgidCandidateAttendanceStatusIn: state.kgiddashboard.isKgidCandidateAttendanceStatusIn,
    isKgidCandidateAttendanceStatusSuccess: state.kgiddashboard.isKgidCandidateAttendanceStatusSuccess,
    KgidCandidateAttendanceStatusError: state.kgiddashboard.KgidCandidateAttendanceStatusError,

    //getting Result
    ResultModel: state.resultPage.ResultModel,
    isResultIn: state.resultPage.isResultIn,
    isResultSuccess: state.resultPage.isResultSuccess,
    ResultError: state.resultPage.ResultError,

    //get  kgid candidate slot status
    getKgidCandidateSlotStatusModel: state.slotBooking.getKgidCandidateSlotStatusModel,
    isGetKgidCandidateSlotStatusIn: state.slotBooking.isGetKgidCandidateSlotStatusIn,
    isGetKgidCandidateSlotStatusSuccess: state.slotBooking.isGetKgidCandidateSlotStatusSuccess,
    GetKgidCandidateSlotStatusError: state.slotBooking.GetKgidCandidateSlotStatusError,
});

const mapDispatchToProps = (dispatch) => ({
    //getting Kgid Candidate Attendance Status 
    getKgidCandidateAttendanceStatus: (fields) => dispatch(KgidDashboardAction.getKgidCandidateAttendanceStatus(fields)),
    setKgidCandidateAttendanceStatusSuccess: () => dispatch(KgidDashboardAction.setKgidCandidateAttendanceStatusSuccess()),
    setKgidCandidateAttendanceStatusError: () => dispatch(KgidDashboardAction.setKgidCandidateAttendanceStatusError()),

    //getting Result
    getResult: (fields) => dispatch(ResultPageAction.getResult(fields)),
    setResultSuccess: () => dispatch(ResultPageAction.setResultSuccess()),

    //get  kgid candidate slot status
    KgidCandidateSlotStatus: (fields) => dispatch(SlotBookingAction.KgidCandidateSlotStatus(fields)),
    setKgidCandidateSlotSuccess: () => dispatch(SlotBookingAction.setKgidCandidateSlotSuccess()),
    setKgidCandidateSlotError: () => dispatch(SlotBookingAction.setKgidCandidateSlotError()),
});

export default connect(mapToProps, mapDispatchToProps)(KgidDashboard);



