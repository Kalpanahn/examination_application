const kgidDashboardState = {
    //getting Kgid Candidate Attendance Status
    isKgidCandidateAttendanceStatusIn: false,
    isKgidCandidateAttendanceStatusSuccess: false,
    KgidCandidateAttendanceStatusModel: [],
    KgidCandidateAttendanceStatusError: '',
}

export const kgiddashboard = (state = kgidDashboardState, action) => {
    switch (action.type) {
        //getting Kgid Candidate Attendance Status
        case 'GET_KGID_CANDIDATES_ATTENDANCE_STATUS_START':
            return Object.assign({}, state, { isKgidCandidateAttendanceStatusIn: true, isKgidCandidateAttendanceStatusSuccess: false, })
        case 'GET_KGID_CANDIDATES_ATTENDANCE_STATUS_SUCCESS':
            return Object.assign({}, state, { KgidCandidateAttendanceStatusModel: action.payload, isKgidCandidateAttendanceStatusIn: false, isKgidCandidateAttendanceStatusSuccess: true })
        case 'GET_KGID_CANDIDATES_ATTENDANCE_STATUS_FAILURE':
            return Object.assign({}, state, { KgidCandidateAttendanceStatusError: action.payload, isKgidCandidateAttendanceStatusIn: false, isKgidCandidateAttendanceStatusSuccess: false })
        case 'SET_IS_GET_KGID_CANDIDATES_ATTENDANCE_STATUS_SUCCESS':
            return Object.assign({}, state, { isKgidCandidateAttendanceStatusSuccess: false })
        case 'SET_IS_GET_KGID_CANDIDATES_ATTENDANCE_STATUS_ERROR':
            return Object.assign({}, state, { KgidCandidateAttendanceStatusError: '' })

        default:
            return state;
    }
};