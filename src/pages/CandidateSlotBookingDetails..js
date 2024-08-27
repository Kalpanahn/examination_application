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

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedAction, setSelectedAction] = useState("");
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [approvedEmails, setApprovedEmails] = useState(() => {
        const savedEmails = localStorage.getItem('approvedEmails');
        return savedEmails ? JSON.parse(savedEmails) : [];
    });
    const [rejectedEmails, setRejectedEmails] = useState(() => {
        const savedEmails = localStorage.getItem('rejectedEmails');
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

        {
            label: <strong className='MUI-dataTable-header'>Approve</strong>,
            name: "Approve",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const email = tableMeta.rowData[1];
                    const isApproved = approvedEmails.includes(email);
                    const isRejected = rejectedEmails.includes(email);
                    return (
                        <Button
                            className="btn btn-success"
                            onClick={() => handleApproveClick(email)}
                            disabled={isApproved || isRejected}
                        >
                            {isApproved ? "Approved" : "Approve"}
                        </Button>
                    );
                }
            }
        },
        {
            label: <strong className='MUI-dataTable-header'>Reject</strong>,
            name: "Reject",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const email = tableMeta.rowData[1];
                    const isRejected = rejectedEmails.includes(email);
                    const isApproved = approvedEmails.includes(email);
                    return (
                        <Button
                            className="btn btn-danger"
                            onClick={() => handleRejectClick(email)}
                            disabled={isRejected || isApproved}
                        >
                            {isRejected ? "Rejected" : "Reject"}
                        </Button>
                    );
                }
            }
        }
    ];




    useEffect(() => {
        props.getBookedCandidateList();
    }, []);



    const handleApproveClick = (email) => {
        setSelectedIndex(email)
        setSelectedAction("approve");
        setShowConfirmDialog(true);
    };

    const handleRejectClick = (email) => {
        setSelectedIndex(email)
        setSelectedAction("reject");
        setShowConfirmDialog(true);
    };

    const resultActionSubmit = () => {
        const fields = {
            email: selectedIndex,
            action: selectedAction,
        };
        props.AdminApprovals(fields);
        if (selectedAction === "approve") {
            setApprovedEmails(prev => {
                const updatedEmails = [...prev, selectedIndex];
                localStorage.setItem('approvedEmails', JSON.stringify(updatedEmails));
                return updatedEmails;
            });
        } else if (selectedAction === "reject") {
            setRejectedEmails(prev => {
                const updatedEmails = [...prev, selectedIndex];
                localStorage.setItem('rejectedEmails', JSON.stringify(updatedEmails));
                return updatedEmails;
            });
        }
        setShowConfirmDialog(false)
    };


    useEffect(() => {
        if (props.isAdminApprovalSuccess && props.AdminApprovalStatus === 200) {
            props.setAdminApprovalsSuccess();
            swal({
                title: "Candidate Slot Book is Approved Successfully.",
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
                        return [
                            index + 1,
                            Candidate.email,
                            Candidate.district,
                            moment(Candidate.date).format('DD-MM-yyyy'),
                            Candidate.time,

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