import axios from "axios";
import { APIs } from '../constants/API_Constant';


// export const AddQuestion = (fields) => {
//   return (dispatch, getState) => {
//       dispatch({ type: 'ADD_QUESTION_START' });
//       axios.post(APIs + '/postquestion', fields)
//           .then(response => {
//               dispatch({ type: 'ADD_QUESTION_SUCCESS', payload: response.data, isAddQuestionSuccess: response.status });
//           })
//           .catch(error => {
//               const errorMessage = error.response ? error.response.data : error.message;
//               const errorStatus = error.response ? error.response.status : 500;
//               dispatch({ type: 'ADD_QUESTION_FAILURE', payload: errorMessage, AddQuestionStatus: errorStatus });
//           });
//   }
// }

// export const setAddQuestionSuccess = () => {
//   return (dispatch, getState) => {
//       dispatch({ type: 'SET_IS_ADD_QUESTION_SUCCESS' })
//   }
// }

// export const setAddQuestionError = () => {
//   return (dispatch, getState) => {
//       dispatch({ type: 'SET_IS_ADD_QUESTION_ERROR' })
//   }
// }

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
