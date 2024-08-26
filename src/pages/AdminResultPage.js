import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, CardHeader } from 'reactstrap';
import MUIDataTable from "mui-datatables";
import { Button } from 'react-bootstrap';
import * as AdminResultPageAction from '../actions/AdminResultPageAction';
import { connect } from 'react-redux';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import swal from 'sweetalert';
import logo from '../Images/loadingdots2.gif';

function AdminResultPage(props) {
    const imageURL = logo;
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [displayedEmails, setDisplayedEmails] = useState(() => {
        const savedEmails = localStorage.getItem('displayedEmails');
        return savedEmails ? JSON.parse(savedEmails) : [];
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        { label: <strong className='MUI-dataTable-header'>Candidate Name</strong>, name: "CandidateName" },
        { label: <strong className='MUI-dataTable-header'>Candidate Email</strong>, name: "CandidateEmail" },
        { label: <strong className='MUI-dataTable-header'>Test Attended Date</strong>, name: "TestAttendedDate" },
        { label: <strong className='MUI-dataTable-header'>Score</strong>, name: "Score" },
        { label: <strong className='MUI-dataTable-header'>Action</strong>, name: "Action" },
    ];

    useEffect(() => {
        props.getAllUserAnswer();
    }, []);
    console.log("AllUserAnswersModel", props.AllUserAnswersModel)

    const handleDisplayResult = (email) => {
        setSelectedIndex(email);
        setShowModal(true);
    };

    const resultDisplaySubmit = () => {
        setIsSubmitting(true);
        const fields = {
            email: selectedIndex,
            displayResult: 'display'
        };
        props.viewResultApproval(fields);

        // Update displayedEmails state and save to localStorage
        setDisplayedEmails(prev => {
            const updatedEmails = [...prev, selectedIndex];
            localStorage.setItem('displayedEmails', JSON.stringify(updatedEmails));
            return updatedEmails;
        });

        setShowModal(false);
    };

    useEffect(() => {
        if (props.isViewResultApprovalIn) {
            swal({
                icon: props.imageURL,
                className: "swal-size-sm",
                button: false
            });
        }
        if (props.ViewResultApprovalStatus === 400) {
            swal({
                title: "Candidate not found",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (props.ViewResultApprovalStatus === 401) {
            swal({
                title: "Invalid attendance value",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (props.ViewResultApprovalStatus === 500) {
            swal({
                title: "Internal server error",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (props.isViewResultApprovalSuccess) {
            swal({
                title: "View Result Updated Successfully To Candidate.",
                icon: "success",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    setIsSubmitting(false);
                }
            });
        }
    }, [props.isViewResultApprovalIn, props.ViewResultApprovalStatus, props.isViewResultApprovalSuccess]);

    return (
        <Card className='employee-master-card'>
            <CardHeader>
                <h2 className="Candidate Results-cardHeader">View Candidate Results</h2>
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
                    data={props.AllUserAnswersModel.map((userAnswer, index) => {
                        const isDisplayed = displayedEmails.includes(userAnswer.email);
                        return [
                            index + 1,
                            userAnswer.name,
                            userAnswer.email,
                            moment(userAnswer.date).format("DD-MM-YYYY"),
                            userAnswer.score,
                            <Button
                                className={`btn ${isDisplayed ? 'btn-secondary' : 'btn-primary'}`}
                                onClick={isDisplayed ? null : () => handleDisplayResult(userAnswer.email)}
                                disabled={isDisplayed}
                            >
                                {isDisplayed ? 'Displayed' : 'Display'}
                            </Button>
                        ];
                    })}
                />
            </ThemeProvider>

            <Dialog className='Modal-DialogBox'
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogContent className='Dialog-content-box'>
                    <DialogContentText id="alert-dialog-description">
                        <h5>Do you want to Display Result?</h5>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className='btn-delete'>
                        <Button
                            className="btn btn-success"
                            onClick={resultDisplaySubmit}
                            disabled={isSubmitting}
                        >
                            Yes
                        </Button>
                    </div>
                    <div className='btn-delete'>
                        <Button className="btn btn-danger" onClick={() => setShowModal(false)}>No</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

const mapToProps = (state) => ({
    //getting All User Answer
    AllUserAnswersModel: state.adminResultPage.AllUserAnswersModel,
    isAllUserAnswersIn: state.adminResultPage.isAllUserAnswersIn,
    isAllUserAnswersSuccess: state.adminResultPage.isAllUserAnswersSuccess,
    AllUserAnswersError: state.adminResultPage.AllUserAnswersError,

    //view Result Approval
    ViewResultApprovalModel: state.adminResultPage.ViewResultApprovalModel,
    isViewResultApprovalIn: state.adminResultPage.isViewResultApprovalIn,
    isViewResultApprovalSuccess: state.adminResultPage.isViewResultApprovalSuccess,
    ViewResultApprovalError: state.adminResultPage.ViewResultApprovalError,
    ViewResultApprovalStatus: state.adminResultPage.ViewResultApprovalStatus,
});

const mapDispatchToProps = (dispatch) => ({
    //getting All User Answer
    getAllUserAnswer: (fields) => dispatch(AdminResultPageAction.getAllUserAnswer(fields)),
    setAllUserAnswerSuccess: () => dispatch(AdminResultPageAction.setAllUserAnswerSuccess()),

    //view Result Approval
    viewResultApproval: (fields) => dispatch(AdminResultPageAction.viewResultApproval(fields)),
    setViewResultApprovalSuccess: (status) => dispatch(AdminResultPageAction.setViewResultApprovalSuccess(status)),
    setViewResultApprovalError: (error) => dispatch(AdminResultPageAction.setViewResultApprovalError(error)),
});

export default connect(mapToProps, mapDispatchToProps)(AdminResultPage);
