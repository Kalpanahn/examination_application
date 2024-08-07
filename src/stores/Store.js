import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { login } from '../reducers/LoginReducer';
import{candidateUpdateDetails} from '../reducers/CandidateUpdateDetailsReducer';
import{slotBooking}from'../reducers/SlotBookingReducer';
import { addQuestion } from '../reducers/AddQuestionsReducer';
import {questionsPage} from '../reducers/QuestionsReducer';

const rootReducer = combineReducers({
    login: login,
    candidateUpdateDetails:candidateUpdateDetails,
    slotBooking:slotBooking,
    addQuestion:addQuestion,
    questionsPage:questionsPage
});

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store