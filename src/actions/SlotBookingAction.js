import axios from "axios";
import { APIs } from '../constants/API_Constant';

export const getDistrictList = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'GET_DISTRICT_LIST_START' })
        axios.get(APIs + '/getdistrict')
            .then(function (response) {
                dispatch({ type: 'GET_DISTRICT_LIST_SUCCESS', payload: response.data })
            })
            .catch(function (error) {
                dispatch({ type: 'GET_DISTRICT_LIST_FAILURE', payload: error })
            })
    }
}

export const setDistrictListSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_GET_DISTRICT_LIST_SUCCESS' })
    }
}

export const setDistrictListError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_GET_DISTRICT_LIST_FAILURE' })
    }
}

//api book slot
export const bookSlot = (fields) => {
    return (dispatch, getState) => {
        dispatch({ type: 'BOOKSLOT_LIST_START' })
        const token = window.localStorage.getItem("token");
        console.log("token", typeof token)

        axios.post(APIs + '/insertBook', fields, {
            headers: {
                'token': token
            }
        })
            .then(function (response) {
                dispatch({ type: 'BOOKSLOT_LIST_SUCCESS', payload: response.data, BookSlotStatus: response.status })
            })

            .catch(error => {
                console.error('Error occurred:', error);
                const errorMessage = error.response ? error.response.data : error.message;
                const errorStatus = error.response ? error.response.status : 500;
                dispatch({ type: 'BOOKSLOT_LIST_FAILURE', payload: errorMessage, BookSlotStatus: errorStatus });
            });
    }
}

export const setbookSlotSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_BOOKSLOT_LIST_SUCCESS' })
    }
}

export const setbookSlotError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_BOOKSLOT_LIST_FAILURE' })
    }
}


// //api to fectch the time slots

export const getTimeSlots = (fields) => {
    return (dispatch, getState) => {
        dispatch({ type: 'GETTIMESLOTS_LIST_START' })
        axios.post(APIs + '/getTimeSlot', fields)
            .then(function (response) {
                dispatch({ type: 'GETTIMESLOTS_LIST_SUCCESS', payload: response.data })
                console.log("response", response.data)
            })
            .catch(function (error) {
                dispatch({ type: 'GETTIMESLOTS_LIST_FAILURE', payload: error })
            })
    }
}

export const setgetTimeSlotsSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_GETTIMESLOTS_LIST_SUCCESS' })
    }
}

export const setgetTimeSlotsError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_GETTIMESLOTS_LIST_FAILURE' })
    }
}
