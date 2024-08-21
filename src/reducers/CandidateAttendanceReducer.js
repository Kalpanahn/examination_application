const candidateAttendenceState = {
    // candidate attendence 
    CandidateAttendnceModel: [],
    isCandidateAttendnceIn: false,
    isCandidateAttendnceSuccess: false,
    CandidateAttendnceError: '',

       // kgid candidate attendence 
       KgidCandidateAttendnceModel: [],
       isKgidCandidateAttendnceIn: false,
       isKgidCandidateAttendnceSuccess: false,
       KgidCandidateAttendnceError: '',

    // candidate attendence status
    CandidateAttendnceStatusModel: [],
    isCandidateAttendnceStatusIn: false,
    isCandidateAttendnceStatusSuccess: false,
    CandidateAttendnceStatusError: '',
    CandidateAttendnceStatus: [],


}

export const candidateAttendence = (state = candidateAttendenceState, action) => {
    switch (action.type) {
        //candidate attendence 
        case 'GETCANDIDATE_ATTENDENCE_START':
            return Object.assign({}, state, { isCandidateAttendnceIn: true, isCandidateAttendnceSuccess: false })
        case 'GETCANDIDATE_ATTENDENCE_SUCCESS':
            return Object.assign({}, state, { CandidateAttendnceModel: action.payload, isCandidateAttendnceIn: false, isCandidateAttendnceSuccess: true })
        case 'GETCANDIDATE_ATTENDENCE_FAILURE':
            return Object.assign({}, state, { CandidateAttendnceError: action.payload, isCandidateAttendnceIn: false, isCandidateAttendnceSuccess: false })
        case 'SET_IS_GETCANDIDATE_ATTENDENCE_SUCCESS':
            return Object.assign({}, state, { isCandidateAttendnceSuccess: false })
        case 'SET_IS_GETCANDIDATE_ATTENDENCE_FAILURE':
            return Object.assign({}, state, { CandidateAttendnceError: '' })

             //kgid candidate attendence 
        case 'GET_KGID_CANDIDATE_ATTENDENCE_START':
            return Object.assign({}, state, { isKgidCandidateAttendnceIn: true, isKgidCandidateAttendnceSuccess: false })
        case 'GET_KGID_CANDIDATE_ATTENDENCE_SUCCESS':
            return Object.assign({}, state, { KgidCandidateAttendnceModel: action.payload, isKgidCandidateAttendnceIn: false, isKgidCandidateAttendnceSuccess: true })
        case 'GET_KGID_CANDIDATE_ATTENDENCE_FAILURE':
            return Object.assign({}, state, { KgidCandidateAttendnceError: action.payload, isKgidCandidateAttendnceIn: false, isKgidCandidateAttendnceSuccess: false })
        case 'SET_IS_GET_KGID_CANDIDATE_ATTENDENCE_SUCCESS':
            return Object.assign({}, state, { isKgidCandidateAttendnceSuccess: false })
        case 'SET_IS_GET_KGID_CANDIDATE_ATTENDENCE_FAILURE':
            return Object.assign({}, state, { KgidCandidateAttendnceError: '' })


        // candidate attendence status
        case 'CANDIDATE_ATTENDENCE_STATUS_START':
            return Object.assign({}, state, { isCandidateAttendnceStatusIn: true, isCandidateAttendnceStatusSuccess: false })
        case 'CANDIDATE_ATTENDENCE_STATUS_SUCCESS':
            return Object.assign({}, state, { CandidateAttendnceStatusModel: action.payload, isCandidateAttendnceStatusIn: false, isCandidateAttendnceStatusSuccess: true, CandidateAttendnceStatus: action.CandidateAttendnceStatus })
        case 'CANDIDATE_ATTENDENCE_STATUS_FAILURE':
            return Object.assign({}, state, { CandidateAttendnceStatusError: action.payload, isCandidateAttendnceStatusIn: false, isCandidateAttendnceStatusSuccess: false, CandidateAttendnceStatus: action.CandidateAttendnceStatus })
        case 'SET_IS_CANDIDATE_ATTENDENCE_STATUS_SUCCESS':
            return Object.assign({}, state, { isCandidateAttendnceSuccess: false })
        case 'SET_IS_CANDIDATE_ATTENDENCE_STATUS_ERROR':
            return Object.assign({}, state, { CandidateAttendnceStatusError: '' })

        default:
            return state;
    }
};