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
    const [displayResult, setDisplayResult] = useState(false);
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
        { label: <strong className='MUI-dataTable-header'>Candidate Name</strong>, name: "CandidateName" },
        { label: <strong className='MUI-dataTable-header'>Candidate Email</strong>, name: "CandidateEmail" },
        { label: <strong className='MUI-dataTable-header'>Test Attended Date</strong>, name: "TestAttendedDate" },
        { label: <strong className='MUI-dataTable-header'>Score</strong>, name: "Score" },
        { label: <strong className='MUI-dataTable-header'>Action</strong>, name: "Action" },
    ];

    useEffect(() => {
        props.getAllUserAnswer();
    }, []);

    const handleDisplayResult = (index) => {
        setSelectedIndex(index);
        setDisplayResult(true); 
    }

    const resultDisplaySubmit = () => {
        const fields = {
            email: props.AllUserAnswersModel[selectedIndex].email,
            displayResult: 'display'
        };
        console.log('Fields before submission:', fields);
        props.viewResultApproval(fields);
    }

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
                    const updatedIndexes = [...displayedIndexes, selectedIndex];
                    setDisplayedIndexes(updatedIndexes);
                    localStorage.setItem('displayedIndexes', JSON.stringify(updatedIndexes));
                    setDisplayResult(false);
                    // Reset the approval status flags
                    props.setViewResultApprovalSuccess(false);
                    props.setViewResultApprovalError(null);
                }
            });
        }
    }, [props.isViewResultApprovalIn, props.ViewResultApprovalStatus, props.isViewResultApprovalSuccess, selectedIndex, displayedIndexes]);

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
                        const isDisplayed = displayedIndexes.includes(index);
                        return [
                            index + 1,
                            userAnswer.name,
                            userAnswer.email,
                            moment(userAnswer.date).format("DD-MM-YYYY"),
                            userAnswer.score,
                            isDisplayed ? (
                                <Button className="btn btn-secondary" disabled>Displayed</Button>
                            ) : (
                                <Button className="btn btn-primary" onClick={() => handleDisplayResult(index)}>Display</Button>
                            ),
                        ]
                    })}
                />
            </ThemeProvider>

            <Dialog className='Modal-DialogBox'
                open={displayResult} 
                onClose={() => setDisplayResult(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogContent className='Dialog-content-box'>
                    <DialogContentText id="alert-dialog-description">
                        <h5>Do you want to Display Result?</h5>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className='btn-delete'>
                        <Button className="btn btn-success" onClick={resultDisplaySubmit}>Yes</Button>
                    </div>
                    <div className='btn-delete'>
                        <Button className="btn btn-danger" onClick={() => setDisplayResult(false)}>No</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

const mapToProps = (state) => ({
    AllUserAnswersModel: state.adminResultPage.AllUserAnswersModel,
    isAllUserAnswersIn: state.adminResultPage.isAllUserAnswersIn,
    isAllUserAnswersSuccess: state.adminResultPage.isAllUserAnswersSuccess,
    AllUserAnswersError: state.adminResultPage.AllUserAnswersError,

    ViewResultApprovalModel: state.adminResultPage.ViewResultApprovalModel,
    isViewResultApprovalIn: state.adminResultPage.isViewResultApprovalIn,
    isViewResultApprovalSuccess: state.adminResultPage.isViewResultApprovalSuccess,
    ViewResultApprovalError: state.adminResultPage.ViewResultApprovalError,
    ViewResultApprovalStatus: state.adminResultPage.ViewResultApprovalStatus,
});

const mapDispatchToProps = (dispatch) => ({
    getAllUserAnswer: (fields) => dispatch(AdminResultPageAction.getAllUserAnswer(fields)),
    setAllUserAnswerSuccess: () => dispatch(AdminResultPageAction.setAllUserAnswerSuccess()),

    viewResultApproval: (fields) => dispatch(AdminResultPageAction.viewResultApproval(fields)),
    setViewResultApprovalSuccess: (status) => dispatch(AdminResultPageAction.setViewResultApprovalSuccess(status)),
    setViewResultApprovalError: (error) => dispatch(AdminResultPageAction.setViewResultApprovalError(error)),
});

export default connect(mapToProps, mapDispatchToProps)(AdminResultPage);
