import axios from "axios";
import { APIs } from '../constants/API_Constant';

//get District
export const getDistrictList = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'GET_DISTRICT_LIST_START' })
        axios.get(APIs + '/getdistrict')
            .then(function (response) {
                dispatch({ type: 'GET_DISTRICT_LIST_SUCCESS', payload: response.data })
            })
            .catch(function (error) {
                dispatch({ type: 'GET_DISTRICT_LIST_FAILURE', payload: error })
            })
    }
}

export const setDistrictListSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_GET_DISTRICT_LIST_SUCCESS' })
    }
}

export const setDistrictListError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_GET_DISTRICT_LIST_FAILURE' })
    }
}

//api book slot
export const bookSlot = (fields) => {
    return (dispatch, getState) => {
        dispatch({ type: 'BOOKSLOT_LIST_START' })
        const token = window.localStorage.getItem("token");
        axios.post(APIs + '/insertBook', fields, {
            headers: {
                'token': token
            }
        }).then(function (response) {
            dispatch({ type: 'BOOKSLOT_LIST_SUCCESS', payload: response.data, BookSlotStatus: response.status })
        }).catch(error => {
            const errorMessage = error.response ? error.response.data : error.message;
            const errorStatus = error.response ? error.response.status : 500;
            dispatch({ type: 'BOOKSLOT_LIST_FAILURE', payload: errorMessage, BookSlotStatus: errorStatus });
        });
    }
}

export const setbookSlotSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_BOOKSLOT_LIST_SUCCESS' })
    }
}

export const setbookSlotError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_BOOKSLOT_LIST_FAILURE' })
    }
}


//api to fectch the time slots
export const getTimeSlots = (fields) => {
    return (dispatch, getState) => {
        dispatch({ type: 'GETTIMESLOTS_LIST_START' })
        axios.post(APIs + '/getTimeSlot', fields)
            .then(function (response) {
                dispatch({ type: 'GETTIMESLOTS_LIST_SUCCESS', payload: response.data })
            })
            .catch(function (error) {
                dispatch({ type: 'GETTIMESLOTS_LIST_FAILURE', payload: error })
            })
    }
}

export const setgetTimeSlotsSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_GETTIMESLOTS_LIST_SUCCESS' })
    }
}

export const setgetTimeSlotsError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_GETTIMESLOTS_LIST_FAILURE' })
    }
}


//api to get all the candidate list who has booked

export const getBookedCandidateList = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'GET_BOOKEDCANDIDATE_LIST_START' })
        axios.get(APIs + '/getbookedCandidateList')
            .then(function (response) {
                dispatch({ type: 'GET_BOOKEDCANDIDATE_LIST_SUCCESS', payload: response.data })
            })
            .catch(function (error) {
                dispatch({ type: 'GET_BOOKEDCANDIDATE_LIST_FAILURE', payload: error })
            })
    }
}

export const setBookedCandidateSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_GET_BOOKEDCANDIDATE_LIST_SUCCESS' })
    }
}

export const setBookedCandidateError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_GET_BOOKEDCANDIDATE_LIST_FAILURE' })
    }
}

//api to fetch admin approvals
export const AdminApprovals = (fields) => {
    return (dispatch, getState) => {
        dispatch({ type: 'ADMIN_APPROVALS_START' })
        axios.post(APIs + '/adminapproval', fields, {
        }).then(function (response) {
            dispatch({ type: 'ADMIN_APPROVALS_SUCCESS', payload: response.data, AdminApprovalStatus: response.status })
        })
            .catch(function (error) {

                const errorMessage = error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : error.message;
                dispatch({
                    type: 'ADMIN_APPROVALS_FAILURE',
                    payload: errorMessage,
                    AdminApprovalStatus: error.response ? error.response.status : 500
                });
            });
    }
}


export const setAdminApprovalsSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_ADMIN_APPROVALS_SUCCESS' })
    }
}

export const setAdminApprovalsError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_ADMIN_APPROVALS_ERROR' })
    }
}


//api to fetch candidate slot booked status 

export const CandidateSlotStatus = (fields) => {
    return (dispatch, getState) => {
        dispatch({ type: 'CANDIDATE_SLOTSTATUS_START' })
        axios.post(APIs + '/getSingleCandidate', fields)
            .then(function (response) {
                dispatch({ type: 'CANDIDATE_SLOTSTATUS_SUCCESS', payload: response.data })

            })
            .catch(function (error) {
                dispatch({ type: 'CANDIDATE_SLOTSTATUS_FAILURE', payload: error })

            })
    }
}


export const setCandidateSlotStatusSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_CANDIDATE_SLOTSTATUS_SUCCESS' })
    }
}

export const setCandidateSlotStatusError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_CANDIDATE_SLOTSTATUS_ERROR' })
    }
}

//api for kgid candidate slot book status

export const KgidCandidateSlotStatus = (fields) => {
    return (dispatch, getState) => {
        dispatch({ type: 'KGID_CANDIDATE_SLOTSTATUS_START' })
        axios.post(APIs + '/singleKGIDCandidateView', fields)
            .then(function (response) {
                dispatch({ type: 'KGID_CANDIDATE_SLOTSTATUS_SUCCESS', payload: response.data })

            })
            .catch(function (error) {
                dispatch({ type: 'KGID_CANDIDATE_SLOTSTATUS_FAILURE', payload: error })

            })
    }
}


export const setKgidCandidateSlotSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_KGID_CANDIDATE_SLOTSTATUS_SUCCESS' })
    }
}

export const setKgidCandidateSlotError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_KGID_CANDIDATE_SLOTSTATUS_ERROR' })
    }
}
