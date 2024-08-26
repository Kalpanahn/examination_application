import React, { useState, useRef, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, CardHeader } from 'reactstrap';
import MUIDataTable from "mui-datatables";
import { Button } from 'react-bootstrap';
import * as SlotBookingAction from '../actions/SlotBookingAction'
import { connect } from 'react-redux';
import moment from 'moment';
import swal from 'sweetalert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


function CandidateSlotBookingDetails(props) {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [selectedAction, setSelectedAction] = useState("");
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [approvedEmails, setApprovedEmails] = useState(() => {
        const savedEmails = localStorage.getItem('approvedEmails');
        return savedEmails ? JSON.parse(savedEmails) : [];
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
        { label: <strong className='MUI-dataTable-header'>District</strong>, name: "CandidateEmail" },
        { label: <strong className='MUI-dataTable-header'>Date</strong>, name: "TestAttendedDate" },
        { label: <strong className='MUI-dataTable-header'>Slots Timing</strong>, name: "Score" },
        { label: <strong className='MUI-dataTable-header'>Approve</strong>, name: "Approve" }, // Changed name to "Action"
        { label: <strong className='MUI-dataTable-header'>Reject</strong>, name: "Reject" },
    ];

    useEffect(() => {
        props.getBookedCandidateList();
    }, []);

    const handleClick = (email, actionType) => {
        setSelectedEmail(email);
        setSelectedAction(actionType);
        setShowConfirmDialog(true);
    };
    

    const resultActionSubmit = () => {
        const fields = {
            email: selectedEmail,
            action: selectedAction,
        };
        props.AdminApprovals(fields);
        setApprovedEmails(prevStatus => {
            const updatedEmails = { ...prevStatus, [selectedEmail]: selectedAction };
          
            localStorage.setItem('approvedEmails', JSON.stringify(updatedEmails));
            return updatedEmails;
        });
    }

    useEffect(() => {
        if (props.isAdminApprovalSuccess && props.AdminApprovalStatus === 200) {
            props.setAdminApprovalsSuccess();
            swal({
                title: "Approval updated successfully in Candidate",
                icon: "success",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                }
                setShowConfirmDialog(false);
            });
        } else if (props.AdminApprovalError) {
            swal({
                title: props.AdminApprovalError,
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                }
            });
            setShowConfirmDialog(false);
            props.setAdminApprovalsError();
        }
    }, [props.isAdminApprovalSuccess, props.AdminApprovalStatus, props.AdminApprovalError]);

    return (

        <Card className='employee-master-card'>
            <CardHeader>
                <h2 className="Candidate Results-cardHeader">Candidate Slot Booking Details</h2>
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
                    data={props.getBookedCandidateListModel.map((Candidate, index) => {
                        const email = Candidate.email; // Ensure this is the correct field
                        const status = approvedEmails[email];
                        console.log(`Candidate: ${email}, Status: ${status}`);

                        return [
                            index + 1,
                            Candidate.email,
                            Candidate.district,
                            moment(Candidate.date).format('DD-MM-yyyy'),
                            Candidate.time,
                            status === 'approve' ? (
                                <Button className="btn btn-success" >Approved</Button>
                            ) : (
                                <Button
                                    className="btn btn-success"
                                    onClick={() => handleClick(Candidate.email, 'approve')}
                                    disabled={status === 'reject'}
                                >  Approve
                                </Button>
                            ),
                            status === 'reject' ? (
                                <Button className="btn btn-danger" >Rejected</Button>
                            ) : (
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => handleClick(Candidate.email, 'reject')}
                                    disabled={status === 'approve'}
                                > Reject
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
                        <h5>Do you want to {selectedAction === 'approve' ? 'Approve' : 'Reject'} this candidate?</h5>
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

        //get bookedcandidatelist
        getBookedCandidateListModel: state.slotBooking.getBookedCandidateListModel,
        isGetBookedCandidateListIn: state.slotBooking.isGetBookedCandidateListIn,
        isGetBookedCandidateListSuccess: state.slotBooking.isGetBookedCandidateListSuccess,
        GetBookedCandidateListError: state.slotBooking.GetBookedCandidateListError,

        //admin approvals
        AdminApprovalModel: state.slotBooking.AdminApprovalModel,
        isAdminApprovalIn: state.slotBooking.isAdminApprovalIn,
        isAdminApprovalSuccess: state.slotBooking.isAdminApprovalSuccess,
        AdminApprovalError: state.slotBooking.AdminApprovalError,
        AdminApprovalStatus: state.slotBooking.AdminApprovalStatus,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {

        //get bookedcandidatelist
        getBookedCandidateList: () => dispatch(SlotBookingAction.getBookedCandidateList()),
        setBookedCandidateSuccess: () => dispatch(SlotBookingAction.setBookedCandidateSuccess()),
        setBookedCandidateError: () => dispatch(SlotBookingAction.setBookedCandidateError()),

        //admin approvals
        AdminApprovals: (fields) => dispatch(SlotBookingAction.AdminApprovals(fields)),
        setAdminApprovalsSuccess: () => dispatch(SlotBookingAction.setAdminApprovalsSuccess()),
        setAdminApprovalsError: () => dispatch(SlotBookingAction.setAdminApprovalsError()),


    }
}

export default connect(mapToProps, mapDispatchToProps)(CandidateSlotBookingDetails);