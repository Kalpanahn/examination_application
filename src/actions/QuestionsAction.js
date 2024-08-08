import axios from "axios";
import { APIs } from '../constants/API_Constant';

export const getQuestions = (fields) => {
  return (dispatch, getState) => {
    dispatch({ type: 'GET_QUESTIONS_START' })
    axios.get(APIs + '/getquestion', fields).then(function (response) {
      dispatch({ type: 'GET_QUESTIONS_SUCCESS', payload: response.data })
    })
      .catch(function (error) {
        dispatch({ type: 'GET_QUESTIONS_FAILURE', payload: error })
      })
  }
}

export const setQuestionsSuccess = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_IS_GET_QUESTIONS_SUCCESS' })
  }
}

export const setQuestionsError = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_IS_GET_QUESTIONS_ERROR' })
  }
}
