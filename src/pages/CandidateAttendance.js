import React, { useState, useRef, useEffect } from "react";
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
    const [selectedEmail, setSelectedEmail] = useState("");
    const [selectedAction, setSelectedAction] = useState("");
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [attendenceStatus, setAttendenceStatus] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [displayedIndexes, setDisplayedIndexes] = useState(() => {
        const savedIndexes = localStorage.getItem('displayedIndexes');
        return savedIndexes ? JSON.parse(savedIndexes) : [];
    });


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
        { label: <strong className='MUI-dataTable-header'>Present</strong>, name: "present" },
        { label: <strong className='MUI-dataTable-header'>Absent</strong>, name: "absent" },
    ];

    useEffect(() => {
        props.getCandidateAttendence();
        props.getKgidCandidateAttendence()
    }, []);
  
   
    const handleClick = (email, actionType) => {
        setSelectedEmail(email);
        setSelectedAction(actionType);
        setShowConfirmDialog(true);
    };

    const resultActionSubmit = () => {
        const fields = {
            email: selectedEmail,
            attendence: selectedAction,
        };
        props.CandidatAttendenceStatus(fields);
        setAttendenceStatus(prevStatus => {
            const updatedStatus = { ...prevStatus, [selectedEmail]: selectedAction };
            localStorage.setItem('attendenceStatus', JSON.stringify(updatedStatus));
            return updatedStatus;
        });
    };
    useEffect(() => {
        const savedStatus = localStorage.getItem('attendenceStatus');
        if (savedStatus) {
            setAttendenceStatus(JSON.parse(savedStatus));
        }
    }, []);
    useEffect(() => {
        console.log(props.CandidateAttendnceStatus)
        if (props.isCandidateAttendnceStatusSuccess && props.CandidateAttendnceStatus === 200) {
            swal({
                title: "Attendance updated successfully in Candidate",
                icon: "success",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    if (okay) {
                        const updatedIndexes = [...displayedIndexes, selectedIndex];
                        setDisplayedIndexes(updatedIndexes);
                        localStorage.setItem('displayedIndexes', JSON.stringify(updatedIndexes));
                    }
                    setShowConfirmDialog(false);
                    props.setCandidatAttendenceStatusSuccess(false);
                    props.setCandidatAttendenceStatusError(null);
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
    
    console.log("hhhhhhhh",props.CandidateAttendnceModel)
   console.log("ssssssssss",props.KgidCandidateAttendnceModel)
   const combinedModel = [...props.CandidateAttendnceModel, ...props.KgidCandidateAttendnceModel];
   console.log("kkkkkk",combinedModel)

   
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
                    
                    data={combinedModel.map((Candidate, index) => {
                        const status = attendenceStatus[Candidate.email];

                        return [
                            index + 1,
                            Candidate.email,
                            Candidate.booking_id.district,
                            moment(Candidate.booking_id.date).format('DD-MM-yyyy'),
                            Candidate.booking_id.time,
                           status === 'present' ? (
                                <Button className="btn btn-success" >Present</Button>
                            ) : (
                                <Button
                                    className="btn btn-success"
                                    onClick={() => handleClick(Candidate.email, 'present')}
                                    disabled={status === 'absent'}
                                >  Present
                                </Button>
                            ),
                            status === 'absent' ? (
                                <Button className="btn btn-danger" >absent</Button>
                            ) : (
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => handleClick(Candidate.email, 'absent')}
                                    disabled={status === 'present'}
                                > absent
                                </Button>
                            )
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
                        <h5>Do you want to  mark the attendence?</h5>
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
    )
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
