import axios from "axios";
import { APIs } from '../constants/API_Constant';

//getting Kgid Candidate Attendance Status
export const getKgidCandidateAttendanceStatus = (fields) => {
  return (dispatch, getState) => {
    dispatch({ type: 'GET_KGID_CANDIDATES_ATTENDANCE_STATUS_START' })
    axios.post(APIs + '/getSingleKGIDBookedCandidate', fields).then(function (response) {
      dispatch({ type: 'GET_KGID_CANDIDATES_ATTENDANCE_STATUS_SUCCESS', payload: response.data })
      console.log("response.data",response.data)
    })
      .catch(function (error) {
        dispatch({ type: 'GET_KGID_CANDIDATES_ATTENDANCE_STATUS_FAILURE', payload: error })
      })
  }
}

export const setKgidCandidateAttendanceStatusSuccess = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_IS_GET_KGID_CANDIDATES_ATTENDANCE_STATUS_SUCCESS' })
  }
}

export const setKgidCandidateAttendanceStatusError = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_IS_GET_KGID_CANDIDATES_ATTENDANCE_STATUS_ERROR' })
  }
}