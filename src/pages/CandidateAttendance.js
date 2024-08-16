import React, { useState, useRef, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, CardHeader } from 'reactstrap';
import MUIDataTable from "mui-datatables";
import { Button } from 'react-bootstrap';
import * as CandidateAttendanceAction from '../actions/CandidateAttendanceAction'
import { connect } from 'react-redux';
import moment from 'moment';
import swal from 'sweetalert';

function CandidateAttendance(props) {
    const [disabledButtons, setDisabledButtons] = useState({});

    const theme = createTheme({
        overrides: {
            MuiDataTableBodyRow: {
                root: {
                    backgroundColor: "#FF0000"
                }
            },
            MuiTableCell: {
                root: {
                    borderColor: "#d3d3d3",
                },
                head: {
                    background: "#7FFFD4",
                    pointerEvents: 'none'
                }
            },
            MuiTableSortLabel: {
                root: {
                    alignItems: "flex-start"
                }
            },
            MuiTableBody: {
                root: {
                    alignItems: "start",
                }
            },
        }
    });

    const columns = [
        {
            label: <strong className='MUI-dataTable-header'>Sl No.</strong>,
            name: "sl.no",
            options: {
                customBodyRender: (value) => (
                    <div style={{ position: 'relative', left: '18px' }}>{value}</div>
                ),
            },
        },
        { label: <strong className='MUI-dataTable-header'>Candidate Email</strong>, name: "CandidateName" },
        { label: <strong className='MUI-dataTable-header'>Destrict</strong>, name: "CandidateEmail" },
        { label: <strong className='MUI-dataTable-header'>Date</strong>, name: "TestAttendedDate" },
        { label: <strong className='MUI-dataTable-header'>Slots Timing</strong>, name: "Score" },
        { label: <strong className='MUI-dataTable-header'>Present</strong>, name: "Action" }, // Changed name to "Action"
        { label: <strong className='MUI-dataTable-header'>Absent</strong>, name: "Action" },
    ];

    useEffect(() => {
        props.getCandidateAttendence();
    }, []);

    const handleClick = (email, actionType) => {
        const fields = {
            email: email,
            attendence: actionType,
        };
        props.CandidatAttendenceStatus(fields);
    };
    // useEffect(() => {
    //     const storedState = JSON.parse(localStorage.getItem('disabledButtons'));
    //     if (storedState) {
    //         setDisabledButtons(storedState);
    //     }
    // }, []);
    // const handleClick = (email, actionType) => {
    //     const fields = {
    //         email: email,
    //         attendence: actionType,
    //     };
    //     props.CandidatAttendenceStatus(fields);
    //     const updatedState = {
    //         ...disabledButtons,
    //         [email]: true
    //     };
    //     setDisabledButtons(updatedState);
    //     localStorage.setItem('disabledButtons', JSON.stringify(updatedState));
    // };



    useEffect(() => {
        console.log(props.CandidateAttendnceStatus)
        if (props.isCandidateAttendnceStatusSuccess && props.CandidateAttendnceStatus === 200) {
            props.setCandidatAttendenceStatusSuccess();
            swal({
                title: "Attendance updated successfully in Candidate",
                icon: "success",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                   }
            });
        } else if (props.CandidateAttendnceStatusError) {
            swal({
                title: props.CandidateAttendnceStatusError,
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                }
            });
            props.setCandidatAttendenceStatusError();
        }
    }, [props.isCandidateAttendnceStatusSuccess, props.CandidateAttendnceStatus, props.CandidateAttendnceStatusError]);

    return (
        <Card className='employee-master-card'>
            <CardHeader>
                <h2 className="Candidate Results-cardHeader">Candidate Attendance Details</h2>
            </CardHeader>
            <ThemeProvider theme={theme}>
                <MUIDataTable
                    columns={columns}
                    options={{
                        responsive: "standard",
                        fixedHeader: false,
                        filterType: "textField",
                        selectableRows: "none",
                        elevation: 0,
                        print: false,
                        sort: false,
                        viewColumns: false,
                        rowsPerPageOptions: [10, 20, 30, 50],
                        download: false,
                        search: true
                    }}
                    data={props.CandidateAttendnceModel.map((Candidate, index) => {
                        return [
                            index + 1,
                            Candidate.email,
                            Candidate.booking_id.district,
                            moment(Candidate.booking_id.date).format('DD-MM-yyyy'),
                            Candidate.booking_id.time,
                            <Button className="btn btn-success" onClick={() => handleClick(Candidate.email, 'present')}  disabled={disabledButtons[Candidate.email]}>Present </Button>,
                            <Button className="btn btn-danger" onClick={() => handleClick(Candidate.email, 'absent')}   disabled={disabledButtons[Candidate.email]}>Absent</Button>
                        ]
                    }
                    )
                    }
                />
            </ThemeProvider>
        </Card>
    )
}

const mapToProps = function (state) {
    return {

        //get bookedcandidatelist
        CandidateAttendnceModel: state.candidateAttendence.CandidateAttendnceModel,
        isCandidateAttendnceIn: state.candidateAttendence.isCandidateAttendnceIn,
        isCandidateAttendnceSuccess: state.candidateAttendence.isCandidateAttendnceSuccess,
        CandidateAttendnceError: state.candidateAttendence.CandidateAttendnceError,

        // candidate attendence status
        CandidateAttendnceStatusModel: state.candidateAttendence.CandidateAttendnceStatusModel,
        isCandidateAttendnceStatusIn: state.candidateAttendence.isCandidateAttendnceStatusIn,
        isCandidateAttendnceStatusSuccess: state.candidateAttendence.isCandidateAttendnceStatusSuccess,
        CandidateAttendnceStatusError: state.candidateAttendence.CandidateAttendnceStatusError,
        CandidateAttendnceStatus: state.candidateAttendence.CandidateAttendnceStatus,

    }
}

const mapDispatchToProps = function (dispatch) {
    return {

        //get bookedcandidatelist
        getCandidateAttendence: () => dispatch(CandidateAttendanceAction.getCandidateAttendence()),
        setgetCandidateAttendenceSuccess: () => dispatch(CandidateAttendanceAction.setgetCandidateAttendenceSuccess()),
        setgetCandidateAttendenceError: () => dispatch(CandidateAttendanceAction.setgetCandidateAttendenceError()),


        // candidate attendence status
        CandidatAttendenceStatus: (fields) => dispatch(CandidateAttendanceAction.CandidatAttendenceStatus(fields)),
        setCandidatAttendenceStatusSuccess: () => dispatch(CandidateAttendanceAction.setCandidatAttendenceStatusSuccess()),
        setCandidatAttendenceStatusError: () => dispatch(CandidateAttendanceAction.setCandidatAttendenceStatusError()),
    }
}

export default connect(mapToProps, mapDispatchToProps)(CandidateAttendance);
