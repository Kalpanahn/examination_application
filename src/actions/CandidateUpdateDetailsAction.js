import axios from "axios";
import { APIs } from '../constants/API_Constant';

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
