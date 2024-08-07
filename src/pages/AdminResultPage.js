import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, CardHeader } from 'reactstrap';
import MUIDataTable from "mui-datatables";
import { Button } from 'react-bootstrap';

export default function AdminResultPage() {
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
        { label: <strong className='MUI-dataTable-header'>Action</strong>, name: "Action" }, // Changed name to "Action"
    ];

    const data = [
        [1, "Suma", "suma@gmail.com", "05-08-2024", "20", <Button>Display</Button>],
        [2, "Kalpana", "kalpana@gmail.com", "05-08-2024", "20", <Button>Display</Button>],
    ];

    return (
        <div className='employee-details-section mt-5'>
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
                        data={data}
                    />
                </ThemeProvider>
            </Card>
        </div>
    );
}
