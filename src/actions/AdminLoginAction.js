import axios from "axios";
import { APIs } from '../constants/API_Constant';

//Department Admin Login 
export const loginDeptAdmin = (fields) => {
    return (dispatch) => {
        dispatch({ type: 'DEPT_LOGIN_START' });
        axios.post(`${APIs}/deptadminlogin`, fields)
            .then(response => {
                dispatch({ type: 'DEPT_LOGIN_SUCCESS', payload: response.data, DeptAdminLoginstatus: response.status });
            })
            .catch(function (error) {
                const errorMessage = error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : error.message;
                dispatch({
                    type: 'DEPT_LOGIN_FAILURE',
                    payload: errorMessage,
                    DeptAdminLoginstatus: error.response ? error.response.status : 500
                });
            });
    };
};

export const setLoginDeptAdminSuccess = () => {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_DEPT_LOGIN_SUCCESS' });
    };
};

export const setLoginDeptAdminError = () => {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_DEPT_LOGIN_ERROR' });
    };
};

//Center Admin Login 
export const loginCenterAdmin = (fields) => {
    return (dispatch) => {
        dispatch({ type: 'CENTER_LOGIN_START' });
        axios.post(`${APIs}/centeradminlogin`, fields)
            .then(response => {
                dispatch({ type: 'CENTER_LOGIN_SUCCESS', payload: response.data, CenterAdminLoginstatus: response.status });
            })
            .catch(function (error) {
                const errorMessage = error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : error.message;
                dispatch({
                    type: 'CENTER_LOGIN_FAILURE',
                    payload: errorMessage,
                    CenterAdminLoginstatus: error.response ? error.response.status : 500
                });
            });
    };
};

export const setLoginCenterAdminSuccess = () => {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_CENTER_LOGIN_SUCCESS' });
    };
};

export const setLoginCenterAdminError = () => {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_CENTER_LOGIN_ERROR' });
    };
};