const dashboardState = {
    //getting Candidate Attendance Status
    isAttendanceStatusIn: false,
    isAttendanceStatusSuccess: false,
    AttendanceStatusModel: [],
    AttendanceStatusError: '',
}

export const dashboard = (state = dashboardState, action) => {
    switch (action.type) {
        //getting Candidate Attendance Status
        case 'GET_ATTENDANCE_STATUS_START':
            return Object.assign({}, state, { isAttendanceStatusIn: true, isAttendanceStatusSuccess: false, })
        case 'GET_ATTENDANCE_STATUS_SUCCESS':
            return Object.assign({}, state, { AttendanceStatusModel: action.payload, isAttendanceStatusIn: false, isAttendanceStatusSuccess: true })
        case 'GET_ATTENDANCE_STATUS_FAILURE':
            return Object.assign({}, state, { AttendanceStatusError: action.payload, isAttendanceStatusIn: false, isAttendanceStatusSuccess: false })
        case 'SET_IS_GET_ATTENDANCE_STATUS_SUCCESS':
            return Object.assign({}, state, { isAttendanceStatusSuccess: false })
        case 'SET_IS_GET_ATTENDANCE_STATUS_ERROR':
            return Object.assign({}, state, { AttendanceStatusError: '' })

        default:
            return state;
    }
};