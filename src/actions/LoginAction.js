import axios from "axios";
import { APIs } from '../constants/API_Constant';

//userRegistration
export const userRegistration = (fields) => {
    return (dispatch, getState) => {
        dispatch({ type: 'REGISTRATION_START' })
        axios.post(APIs + '/registerCandidate', fields)
            .then(function (response) {
                dispatch({ type: 'REGISTRATION_SUCCESS', payload: response.data, RegistrationStatus: response.status })
            })
            .catch(function (error) {
                const errorMessage = error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : error.message;
                dispatch({
                    type: 'REGISTRATION_FAILURE',
                    payload: errorMessage,
                    RegitrationStatus: error.response ? error.response.status : 500
                });
            });
    }
}

export const setRegistrationSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_REGISTRATION_SUCCESS' })
    }
}

export const setRegistrationError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_REGISTRATION_ERROR' })
    }
}

//send Otp
export const sendOTP = (fields) => {
    return (dispatch, getState) => {
        dispatch({ type: 'SENDOTP_START' })
        axios.post(APIs + '/sendOTP', fields)
            .then(function (response) {
                dispatch({ type: 'SENDOTP_SUCCESS', payload: response.data })
            })
            .catch(function (error) {
                dispatch({ type: 'SENDOTP_FAILURE', payload: error })
            })
    }
}

export const setsendOTPSuccess = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_SENDOTP_SUCCESS' })
    }
}

export const setsendOTPError = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_IS_SENDOTP_ERROR' })
    }
}

//Login for NON_KGID 
export const userLogin = (fields) => {
    return (dispatch) => {
        dispatch({ type: 'LOGIN_START' });
        axios.post(`${APIs}/loginCandidate`, fields)
            .then(response => {
                dispatch({ type: 'LOGIN_SUCCESS', payload: response.data, Loginstatus: response.status });
            })
            .catch(function (error) {
                const errorMessage = error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : error.message;
                dispatch({
                    type: 'LOGIN_FAILURE',
                    payload: errorMessage,
                    Loginstatus: error.response ? error.response.status : 500
                });
            });
    };
};

export const setLoginSuccess = () => {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_LOGIN_SUCCESS' });
    };
};

export const setLoginError = () => {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_LOGIN_ERROR' });
    };
};

//KGID login
export const kgidLogin = (fields) => {
    return (dispatch) => {
        dispatch({ type: 'KGID_LOGIN_START' });
        axios.post(APIs + '/loginKGIDCandidate', fields)
            .then(response => {
                dispatch({ type: 'KGID_LOGIN_SUCCESS', payload: response.data, KgidLoginstatus: response.status });
            })
            .catch(function (error) {
                const errorMessage = error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : error.message;
                dispatch({
                    type: 'KGID_LOGIN_FAILURE',
                    payload: errorMessage,
                    KgidLoginstatus: error.response ? error.response.status : 500
                });
            });
    };
};

export const setKgidLoginSuccess = () => {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_KGID_LOGIN_SUCCESS' });
    };
};

export const setKgidLoginError = () => {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_KGID_LOGIN_ERROR' });
    };
};

