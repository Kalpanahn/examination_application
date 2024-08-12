import axios from "axios";
import { APIs } from '../constants/API_Constant';

//updateNon-kgid User Profile
export const updateUserProfile = (fields) => {
    return (dispatch, getState) => {
        dispatch({ type: 'UPDATEUSERPROFILE_START' })
        axios.post(APIs + '/update-candidate', fields, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function (response) {
                dispatch({ type: 'UPDATEUSERPROFILE_SUCCESS', payload: response.data, UserprofileStatus: response.status })
            })
            .catch(error => {
                const errorMessage = error.response ? error.response.data : error.message;
                const errorStatus = error.response ? error.response.status : 500;
                dispatch({ type: 'UPDATEUSERPROFILE_FAILURE', payload: errorMessage, UserprofileStatus: errorStatus });
            });
    }
}

export const setupdateUserProfileSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_UPDATEUSERPROFILE_SUCCESS' })
    }
}

export const setupdateUserProfileError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_UPDATEUSERPROFILE_ERROR' })
    }
}

//api for kgid update candidate
export const kgidUpdateUserProfile = (fields) => {
    return (dispatch, getState) => {
        dispatch({ type: 'KGID_UPDATEUSERPROFILE_START' })
        axios.put(APIs + '/updateKGIDCandidate', fields, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function (response) {
                dispatch({ type: 'KGID_UPDATEUSERPROFILE_SUCCESS', payload: response.data, KgidUserprofileStatus: response.status })
            })
            .catch(error => {
                const errorMessage = error.response ? error.response.data : error.message;
                const errorStatus = error.response ? error.response.status : 500;
                dispatch({ type: 'KGID_UPDATEUSERPROFILE_FAILURE', payload: errorMessage, KgidUserprofileStatus: errorStatus });
            });
    }
}

export const setKgidUpdateUserProfileSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_KGID_UPDATEUSERPROFILE_SUCCESS' })
    }
}

export const setKgidUpdateUserProfileError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_KGID_UPDATEUSERPROFILE_ERROR' })
    }
}
