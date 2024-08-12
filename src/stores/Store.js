import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { login } from '../reducers/LoginReducer';
import{candidateUpdateDetails} from '../reducers/CandidateUpdateDetailsReducer';
import{slotBooking}from'../reducers/SlotBookingReducer';
import { addQuestion } from '../reducers/AddQuestionsReducer';
import {testPage} from '../reducers/TestPageReducer';
import { adminLogin } from '../reducers/AdminLoginReducer';

const rootReducer = combineReducers({
    login: login,
    adminLogin:adminLogin,
    candidateUpdateDetails:candidateUpdateDetails,
    slotBooking:slotBooking,
    addQuestion:addQuestion,
    testPage:testPage
});

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store