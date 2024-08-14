import axios from "axios";
import { APIs } from '../constants/API_Constant';

//getting Result
export const getResult = (fields) => {
  return (dispatch, getState) => {
    dispatch({ type: 'GET_RESULT_START' })
    axios.get(APIs + '/getAnswerByEmail', fields).then(function (response) {
      dispatch({ type: 'GET_RESULT_SUCCESS', payload: response.data })
      console.log("response.data",response.data)
    })
      .catch(function (error) {
        dispatch({ type: 'GET_RESULT_FAILURE', payload: error })
      })
  }
}

export const setResultSuccess = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_IS_GET_RESULT_SUCCESS' })
  }
}

export const setResultError = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_IS_GET_RESULT_ERROR' })
  }
}
