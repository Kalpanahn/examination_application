import React, { useState, useRef, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, CardHeader } from 'reactstrap';
import MUIDataTable from "mui-datatables";
import { Button } from 'react-bootstrap';
import * as SlotBookingAction from '../actions/SlotBookingAction'
import { connect } from 'react-redux';
import moment from 'moment';

function CandidateAttendance(props) {

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
        props.getBookedCandidateList();
    }, []);
    const handleClick = (email, actionType) => {
        const fields = {
            email: email,
            action: actionType,
        };
        props.AdminApprovals(fields);
    };

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
                  data={props.getBookedCandidateListModel.map((Candidate, index) => {
                        return [
                            index + 1,
                            Candidate.email,
                            Candidate.district,
                            moment(Candidate.date).format('DD-MM-yyyy'),
                            Candidate.time,
                            <Button className="btn btn-success" onClick={() => handleClick(Candidate.email, 'approve')}>Present </Button>,
                            <Button className="btn btn-danger" onClick={() => handleClick(Candidate.email, 'reject')}>Absent</Button>
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
        getBookedCandidateListModel: state.slotBooking.getBookedCandidateListModel,
        isGetBookedCandidateListIn: state.slotBooking.isGetBookedCandidateListIn,
        isGetBookedCandidateListSuccess: state.slotBooking.isGetBookedCandidateListSuccess,
        GetBookedCandidateListError: state.slotBooking.GetBookedCandidateListError,

    }
}

const mapDispatchToProps = function (dispatch) {
    return {

        //get bookedcandidatelist
        getBookedCandidateList: () => dispatch(SlotBookingAction.getBookedCandidateList()),
        setBookedCandidateSuccess: () => dispatch(SlotBookingAction.setBookedCandidateSuccess()),
        setBookedCandidateError: () => dispatch(SlotBookingAction.setBookedCandidateError()),
    }
}

export default connect(mapToProps, mapDispatchToProps)(CandidateAttendance);
