import axios from "axios";
import { APIs } from '../constants/API_Constant';

//getting All User Answer
export const getAllUserAnswer = (fields) => {
  return (dispatch, getState) => {
    dispatch({ type: 'GET_ALL_USER_ANSWER_START' })
    axios.get(APIs + '/getAllUserAnswer', fields).then(function (response) {
      dispatch({ type: 'GET_ALL_USER_ANSWER_SUCCESS', payload: response.data })
    })
      .catch(function (error) {
        dispatch({ type: 'GET_ALL_USER_ANSWER_FAILURE', payload: error })
      })
  }
}

export const setAllUserAnswerSuccess = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_IS_GET_ALL_USER_ANSWER_SUCCESS' })
  }
}

export const setAllUserAnswerError = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_IS_GET_ALL_USER_ANSWER_ERROR' })
  }
}

//view Result Approval
export const viewResultApproval = (fields) => {
    return (dispatch, getState) => {
      dispatch({ type: 'GET_VIEW_RESULT_APPROVAL_START' })
      axios.post(APIs + '/viewresultapproval', fields).then(function (response) {
        dispatch({ type: 'GET_VIEW_RESULT_APPROVAL_SUCCESS', payload: response.data })
  
      })
        .catch(function (error) {
          dispatch({ type: 'GET_VIEW_RESULT_APPROVAL_FAILURE', payload: error })
        });
    }
  }
  
  export const setViewResultApprovalSuccess = () => {
    return (dispatch, getState) => {
      dispatch({ type: 'SET_IS_VIEW_RESULT_APPROVAL_SUCCESS' })
    }
  }

  export const setViewResultApprovalError = () => {
    return (dispatch, getState) => {
      dispatch({ type: 'SET_IS_GET_VIEW_RESULT_APPROVAL_ERROR' })
    }
  }