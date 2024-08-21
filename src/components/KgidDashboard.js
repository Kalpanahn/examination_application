import React, { useEffect, useState } from 'react';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Navbar";
import "../styles/Test.css"
import KgidcandidateUpdateDetails from '../pages/KgidcandidateUpdateDetails';
import SlotBooking from '../pages/SlotBooking';
import ResultPage from '../pages/ResultPage';
import Guidelines from '../pages/Guidelines';
import * as KgidDashboardAction from '../actions/KgidDashboardAction';
import * as ResultPageAction from '../actions/ResultPageAction';
import { connect } from 'react-redux';

function KgidDashboard(props) {
    const [activeTab, setActiveTab] = useState('update');
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
            email : window.localStorage.getItem("email")
        }
        props.getResult(fields);
    }, []);
 
    const ResultModel = props.ResultModel && props.ResultModel.length > 0 ? props.ResultModel[0] : null;
   
    return (
        <div>
            <div className="container-fluid mt-4">
                <Navbar />
                <div className="row">
                    <div className="col-12">&nbsp;
                        <ul className="nav nav-underline justify-content-end" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`btn btn-primary buttonstyle ${activeTab === 'update' ? 'active' : ''}`}
                                    type="button"
                                    onClick={() => handleTabChange('update')}
                                >Update Candidate Details</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className={`btn btn-primary buttonstyle ${activeTab === 'booking' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('booking')}
                                    type="button"
                                >Booking Slots</button>
                            </li>

                            {/* Conditionally render the "Test" tab */}
                            {KgidCandidateAttendanceStatusModel?.attendence === 'present' && (
                                <li className="nav-item" role="presentation">
                                    <button className={`btn btn-primary buttonstyle ${activeTab === 'test' ? 'active' : ''}`}
                                        onClick={() => handleTabChange('test')}
                                        type="button" >Test</button>
                                </li>
                            )}

                            {ResultModel?.displayResult === 'display' && (
                                <li className="nav-item" role="presentation">
                                    <button className={`btn btn-primary buttonstyle ${activeTab === 'result' ? 'active' : ''}`}
                                        onClick={() => handleTabChange('result')}
                                        type="button" >Result</button>
                                </li>)}
                        </ul>&nbsp;

                        <div className="tab-content" id="myTabContent">
                            <div className={`tab-pane fade ${activeTab === 'update' ? 'show active' : ''}`} id="update" role="tabpanel">
                                <KgidcandidateUpdateDetails />
                            </div>

                            <div className={`tab-pane fade ${activeTab === 'booking' ? 'show active' : ''}`} id="booking" role="tabpanel">
                                <SlotBooking />
                            </div>

                            {/* Conditionally render the "Test" tab content */}
                            {KgidCandidateAttendanceStatusModel?.attendence === 'present' && (
                                <div className={`tab-pane fade ${activeTab === 'test' ? 'show active' : ''}`} id="test" role="tabpanel">
                                    <Guidelines />
                                </div>
                            )}
                             {ResultModel?.displayResult === 'display' && (
                                <div className={`tab-pane fade ${activeTab === 'result' ? 'show active' : ''}`} id="result" role="tabpanel">
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
});

const mapDispatchToProps = (dispatch) => ({
    //getting Kgid Candidate Attendance Status 
    getKgidCandidateAttendanceStatus: (fields) => dispatch(KgidDashboardAction.getKgidCandidateAttendanceStatus(fields)),
    setKgidCandidateAttendanceStatusSuccess: () => dispatch(KgidDashboardAction.setKgidCandidateAttendanceStatusSuccess()),
    setKgidCandidateAttendanceStatusError: () => dispatch(KgidDashboardAction.setKgidCandidateAttendanceStatusError()),

    //getting Result
    getResult: (fields) => dispatch(ResultPageAction.getResult(fields)),
    setResultSuccess: () => dispatch(ResultPageAction.setResultSuccess()),
});

export default connect(mapToProps, mapDispatchToProps)(KgidDashboard);



