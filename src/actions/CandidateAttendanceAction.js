import axios from "axios";
import { APIs } from '../constants/API_Constant';
// api to get  candidate attendence 
export const getCandidateAttendence = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'GETCANDIDATE_ATTENDENCE_START' })
        axios.get(APIs + '/getCandidates')
            .then(function (response) {
                dispatch({ type: 'GETCANDIDATE_ATTENDENCE_SUCCESS', payload: response.data })
            })
            .catch(function (error) {
                dispatch({ type: 'GETCANDIDATE_ATTENDENCE_FAILURE', payload: error })
            })
    }
}

export const setgetCandidateAttendenceSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_GETCANDIDATE_ATTENDENCE_SUCCESS' })
    }
}

export const setgetCandidateAttendenceError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_GETCANDIDATE_ATTENDENCE_FAILURE' })
    }
}
//get candidate attendence status
export const CandidatAttendenceStatus = (fields) => {
    return (dispatch, getState) => {
        dispatch({ type: 'CANDIDATE_ATTENDENCE_STATUS_START' })
        axios.post(APIs + '/candidateAttendence', fields)
            .then(function (response) {
                dispatch({ type: 'CANDIDATE_ATTENDENCE_STATUS_SUCCESS', payload: response.data, CandidateAttendnceStatus: response.status })

            })
            .catch(function (error) {

                const errorMessage = error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : error.message;
                dispatch({
                    type: 'CANDIDATE_ATTENDENCE_STATUS_FAILURE',
                    payload: errorMessage,
                    CandidateAttendnceStatus: error.response ? error.response.status : 500
                });
            });


    }
}


export const setCandidatAttendenceStatusSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_CANDIDATE_ATTENDENCE_STATUS_SUCCESS' })
    }
}

export const setCandidatAttendenceStatusError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_CANDIDATE_ATTENDENCE_STATUS_ERROR' })
    }
}

// api to get  kgid candidate attendence 
export const getKgidCandidateAttendence = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'GET_KGID_CANDIDATE_ATTENDENCE_START' })
        axios.post(APIs + '/singleKGIDCandidateView')
            .then(function (response) {
                dispatch({ type: 'GET_KGID_CANDIDATE_ATTENDENCE_SUCCESS', payload: response.data })
            })
            .catch(function (error) {
                dispatch({ type: 'GET_KGID_CANDIDATE_ATTENDENCE_FAILURE', payload: error })
            })
    }
}

export const setgetKgidCandidateAttendenceSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_GET_KGID_CANDIDATE_ATTENDENCE_SUCCESS' })
    }
}

export const setgetKgidCandidateAttendenceError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_GET_KGID_CANDIDATE_ATTENDENCE_FAILURE' })
    }
}