import axios from "axios";
import { APIs } from '../constants/API_Constant';

export const AddQuestion = (fields) => {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_QUESTION_START' })
    axios.post(APIs + '/postquestion', fields, {
    }).then(function (response) {
      dispatch({ type: 'ADD_QUESTION_SUCCESS', payload: response.data })
    })
      .catch(function (error) {
        dispatch({ type: 'ADD_QUESTION_FAILURE', payload: error })
      });
  }
}

export const setAddQuestionSuccess = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_IS_ADD_QUESTION_SUCCESS' })
  }
}

export const setAddQuestionError = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_IS_ADD_QUESTION_ERROR' })
  }
}
