import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { login } from '../reducers/LoginReducer';
import{candidateUpdateDetails} from '../reducers/CandidateUpdateDetailsReducer';
import{slotBooking}from'../reducers/SlotBookingReducer';
import { addQuestion } from '../reducers/AddQuestionsReducer';
import {testPage} from '../reducers/TestPageReducer';
import { adminLogin } from '../reducers/AdminLoginReducer';
import {adminResultPage} from '../reducers/AdminResultPageReducer';
import {resultPage} from '../reducers/ResulPageReducer';
const rootReducer = combineReducers({
    login: login,
    adminLogin:adminLogin,
    candidateUpdateDetails:candidateUpdateDetails,
    slotBooking:slotBooking,
    addQuestion:addQuestion,
    testPage:testPage,
    adminResultPage:adminResultPage,
    resultPage:resultPage
});

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store