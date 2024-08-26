import React, { useEffect, useState } from 'react';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Navbar";
import "../styles/Test.css"
import CandidateUpdateDetails from '../pages/CandidateUpdateDetails';
import SlotBooking from '../pages/SlotBooking';
import ResultPage from '../pages/ResultPage';
import Guidelines from '../pages/Guidelines';
import * as DashboardAction from '../actions/DashboardAction';
import * as ResultPageAction from '../actions/ResultPageAction';
import * as SlotBookingAction from '../actions/SlotBookingAction'
import { connect } from 'react-redux';


function Dashboard(props) {
    const [activeTab, setActiveTab] = useState('form');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

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

    useEffect(() => {
        const userId = window.localStorage.getItem("_id");
        if (userId) {
            props.getAttendanceStatus({ user_id: userId });
        }
    }, [props.getAttendanceStatus]);
    const { AttendanceStatusModel } = props;

    useEffect(() => {
        const email = window.localStorage.getItem("email");
        if (email) {
            props.getResult({ email });
        }
    }, [props.getResult]);
    const ResultModel = props.ResultModel && props.ResultModel.length > 0 ? props.ResultModel[0] : null;

    useEffect(() => {
        let fields = {
            user_id: window.localStorage.getItem("_id")
        }
        props.CandidateSlotStatus(fields);
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
                                    onClick={() => handleTabClick('form')}
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
                                    onClick={() => handleTabClick('booking')}
                                >
                                    Booking Slots
                                </button>
                            </li>
                            {AttendanceStatusModel?.attendence === 'present' && props.getCandidateSlotStatusModel?.adminApproval === 'approve' && props.ResultModel.length === 0 && (
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
                                        onClick={() => handleTabClick('test')}
                                    >
                                        Test
                                    </button>
                                </li>)}

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
                                        onClick={() => handleTabClick('result')}
                                    >
                                        Result
                                    </button>
                                </li>)}
                        </ul>&nbsp;

                        <div className="tab-content" id="myTabContent">
                            <div className={`tab-pane fade ${activeTab === 'form' ? 'show active' : ''}`} id="form" role="tabpanel" aria-labelledby="form-tab">
                                <CandidateUpdateDetails />
                            </div>

                            <div className={`tab-pane fade ${activeTab === 'booking' ? 'show active' : ''}`} id="booking" role="tabpanel" aria-labelledby="booking-tab">
                                <SlotBooking />
                            </div>
                            {AttendanceStatusModel?.attendence === 'present' && props.getCandidateSlotStatusModel?.adminApproval === 'approve' && props.ResultModel.length === 0 &&(
                                <div className={`tab-pane fade ${activeTab === 'test' ? 'show active' : ''}`} id="test" role="tabpanel" aria-labelledby="test-tab">
                                    <Guidelines />
                                </div>)}
                            {ResultModel?.displayResult === 'display' && (
                                <div className={`tab-pane fade ${activeTab === 'result' ? 'show active' : ''}`} id="result" role="tabpanel" aria-labelledby="result-tab">
                                    <ResultPage />
                                </div>)}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapToProps = (state) => ({
    //getting Candidate Attendance Status
    AttendanceStatusModel: state.dashboard.AttendanceStatusModel,
    isAttendanceStatusIn: state.dashboard.isAttendanceStatusIn,
    isAttendanceStatusSuccess: state.dashboard.isAttendanceStatusSuccess,
    AttendanceStatusError: state.dashboard.AttendanceStatusError,

    //getting Result
    ResultModel: state.resultPage.ResultModel,
    isResultIn: state.resultPage.isResultIn,
    isResultSuccess: state.resultPage.isResultSuccess,
    ResultError: state.resultPage.ResultError,

    //get candidate slot status
    getCandidateSlotStatusModel: state.slotBooking.getCandidateSlotStatusModel,
    isGetCandidateSlotStatusIn: state.slotBooking.isGetCandidateSlotStatusIn,
    isGetCandidateSlotStatusSuccess: state.slotBooking.isGetCandidateSlotStatusSuccess,
    GetCandidateSlotStatusError: state.slotBooking.GetCandidateSlotStatusError,
});

const mapDispatchToProps = (dispatch) => ({
    //getting Candidate Attendance Status
    getAttendanceStatus: (fields) => dispatch(DashboardAction.getAttendanceStatus(fields)),
    setAttendanceStatusSuccess: () => dispatch(DashboardAction.setAttendanceStatusSuccess()),
    setAttendanceStatusError: () => dispatch(DashboardAction.setAttendanceStatusError()),

    //getting Result
    getResult: (fields) => dispatch(ResultPageAction.getResult(fields)),
    setResultSuccess: () => dispatch(ResultPageAction.setResultSuccess()),

    //get candidate slot status
    CandidateSlotStatus: (fields) => dispatch(SlotBookingAction.CandidateSlotStatus(fields)),
    setCandidateSlotStatusSuccess: () => dispatch(SlotBookingAction.setCandidateSlotStatusSuccess()),
    setCandidateSlotStatusError: () => dispatch(SlotBookingAction.setCandidateSlotStatusError()),
});

export default connect(mapToProps, mapDispatchToProps)(Dashboard);