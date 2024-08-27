
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, CardHeader } from 'reactstrap';
import MUIDataTable from "mui-datatables";
import { Button } from 'react-bootstrap';
import * as CandidateAttendanceAction from '../actions/CandidateAttendanceAction'
import { connect } from 'react-redux';
import moment from 'moment';
import swal from 'sweetalert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function CandidateAttendance(props) {

    const [selectedAction, setSelectedAction] = useState("");
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [attendenceApproved, setAttendenceApproved] = useState(() => {
        const savedIndexes = localStorage.getItem('attendenceApproved');
        return savedIndexes ? JSON.parse(savedIndexes) : [];
    });
    const [attendenceRejectd, setAttendenceRejectd] = useState(() => {
        const savedEmails = localStorage.getItem('rejectedEmails');
        return savedEmails ? JSON.parse(savedEmails) : [];
    });

    const handleApproveClick = (email) => {
        setSelectedIndex(email);
        setSelectedAction("present");
        setShowConfirmDialog(true);
    };

    const handleRejectClick = (email) => {
        setSelectedIndex(email);
        setSelectedAction("absent");
        setShowConfirmDialog(true);
    };

    const theme = createTheme({
        components: {
            MuiDataTableBodyRow: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#FF0000"
                    }
                }
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderColor: "#d3d3d3",
                    },
                    head: {
                        background: "#7FFFD4",
                        pointerEvents: 'none'
                    }
                }
            },
            MuiTableSortLabel: {
                styleOverrides: {
                    root: {
                        alignItems: "flex-start"
                    }
                }
            },
            MuiTableBody: {
                styleOverrides: {
                    root: {
                        alignItems: "start",
                    }
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
        { label: <strong className='MUI-dataTable-header'>District</strong>, name: "CandidateEmail" },
        { label: <strong className='MUI-dataTable-header'>Date</strong>, name: "TestAttendedDate" },
        { label: <strong className='MUI-dataTable-header'>Slots Timing</strong>, name: "Score" },
        {
            label: <strong className='MUI-dataTable-header'>Present</strong>, name: "present",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const email = tableMeta.rowData[1];
                    const isPresent = attendenceApproved.includes(email);
                    const isAbsent = attendenceRejectd.includes(email);
                    return (
                        <Button
                            className="btn btn-success"
                            onClick={() => handleApproveClick(email)}
                            disabled={isPresent || isAbsent}
                        >
                            {isPresent ? "presented" : "present"}
                        </Button>
                    );
                }
            }

        },
        {
            label: <strong className='MUI-dataTable-header'>Absent</strong>, name: "absent",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const email = tableMeta.rowData[1];
                    const isAbsent = attendenceRejectd.includes(email);
                    const isPresent = attendenceApproved.includes(email);

                    return (
                        <Button
                            className="btn btn-danger"
                            onClick={() => handleRejectClick(email)}
                            disabled={isAbsent || isPresent}
                        >
                            {isAbsent ? "Absent" : "Absent"}
                        </Button>
                    );
                }
            }
        },
    ];

    useEffect(() => {
        props.getCandidateAttendence();
        props.getKgidCandidateAttendence();
    }, []);

    const resultActionSubmit = () => {
        const fields = {
            email: selectedIndex,
            attendence: selectedAction,
        };
        props.CandidatAttendenceStatus(fields);

        if (selectedAction === "present") {
            setAttendenceApproved(prev => {
                const updatedEmails = [...prev, selectedIndex];
                localStorage.setItem('attendenceApproved', JSON.stringify(updatedEmails));
                return updatedEmails;
            });
        } else if (selectedAction === "absent") {
            setAttendenceRejectd(prev => {
                const updatedEmails = [...prev, selectedIndex];
                localStorage.setItem('attendenceRejectd', JSON.stringify(updatedEmails));
                return updatedEmails;
            });
        }
        setShowConfirmDialog(false);
    };

    useEffect(() => {
        if (props.isCandidateAttendnceStatusSuccess && props.CandidateAttendnceStatus === 200) {
            swal({
                title: "Candidate Attendance Updated Successfully.",
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
                setShowConfirmDialog(false);
            });
            props.setCandidatAttendenceStatusError();
        }
    }, [props.isCandidateAttendnceStatusSuccess, props.CandidateAttendnceStatus, props.CandidateAttendnceStatusError]);

    const combinedModel = [...props.CandidateAttendnceModel, ...props.KgidCandidateAttendnceModel];
    const approvedCandidates = combinedModel.filter(candidate => candidate.adminApproval === "approve");

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
                    data={approvedCandidates.map((Candidate, index) => {
                        const email = Candidate.email;
                        const bookingId = Candidate.booking_id || {};

                        return [
                            index + 1,
                            Candidate.email,
                            bookingId.district || 'N/A',
                            bookingId.date ? moment(bookingId.date).format('DD-MM-yyyy') : 'N/A',
                            bookingId.time || 'N/A',
                          
                        ];
                    })}
                />
            </ThemeProvider>
            <Dialog
                open={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText>
                        <h5>Do you want to mark the attendance?</h5>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        className="btn btn-success"
                        onClick={() => {
                            resultActionSubmit();
                            setShowConfirmDialog(false);
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        className="btn btn-danger"
                        onClick={() => setShowConfirmDialog(false)}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
const mapToProps = function (state) {
    return {

        //get attendence candidate list
        CandidateAttendnceModel: state.candidateAttendence.CandidateAttendnceModel,
        isCandidateAttendnceIn: state.candidateAttendence.isCandidateAttendnceIn,
        isCandidateAttendnceSuccess: state.candidateAttendence.isCandidateAttendnceSuccess,
        CandidateAttendnceError: state.candidateAttendence.CandidateAttendnceError,

        //get attendence kgid candidate list
        KgidCandidateAttendnceModel: state.candidateAttendence.KgidCandidateAttendnceModel,
        isKgidCandidateAttendnceIn: state.candidateAttendence.isKgidCandidateAttendnceIn,
        isKgidCandidateAttendnceSuccess: state.candidateAttendence.isKgidCandidateAttendnceSuccess,
        KgidCandidateAttendnceError: state.candidateAttendence.KgidCandidateAttendnceError,

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

        //get attendence candidate list
        getCandidateAttendence: () => dispatch(CandidateAttendanceAction.getCandidateAttendence()),
        setgetCandidateAttendenceSuccess: () => dispatch(CandidateAttendanceAction.setgetCandidateAttendenceSuccess()),
        setgetCandidateAttendenceError: () => dispatch(CandidateAttendanceAction.setgetCandidateAttendenceError()),

        //get attendence kgid candidate list
        getKgidCandidateAttendence: () => dispatch(CandidateAttendanceAction.getKgidCandidateAttendence()),
        setgetKgidCandidateAttendenceSuccess: () => dispatch(CandidateAttendanceAction.setgetKgidCandidateAttendenceSuccess()),
        setgetKgidCandidateAttendenceError: () => dispatch(CandidateAttendanceAction.setgetKgidCandidateAttendenceError()),


        // candidate attendence status
        CandidatAttendenceStatus: (fields) => dispatch(CandidateAttendanceAction.CandidatAttendenceStatus(fields)),
        setCandidatAttendenceStatusSuccess: () => dispatch(CandidateAttendanceAction.setCandidatAttendenceStatusSuccess()),
        setCandidatAttendenceStatusError: () => dispatch(CandidateAttendanceAction.setCandidatAttendenceStatusError()),
    }
}

export default connect(mapToProps, mapDispatchToProps)(CandidateAttendance);
