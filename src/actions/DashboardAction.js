import axios from "axios";
import { APIs } from '../constants/API_Constant';

 //getting Candidate Attendance Status
export const getAttendanceStatus = (fields) => {
  return (dispatch, getState) => {
    dispatch({ type: 'GET_ATTENDANCE_STATUS_START' })
    axios.post(APIs + '/getSingleCandidate', fields).then(function (response) {
      dispatch({ type: 'GET_ATTENDANCE_STATUS_SUCCESS', payload: response.data })
    })
      .catch(function (error) {
        dispatch({ type: 'GET_ATTENDANCE_STATUS_FAILURE', payload: error })
      })
  }
}

export const setAttendanceStatusSuccess = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_IS_GET_ATTENDANCE_STATUS_SUCCESS' })
  }
}

export const setAttendanceStatusError = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_IS_GET_ATTENDANCE_STATUS_ERROR' })
  }
}