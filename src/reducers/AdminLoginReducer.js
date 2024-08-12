const loginState = {
    //Department Admin Login
    DeptAdminLoginModel: [],
    isDeptAdminLoginIn: false,
    isDeptAdminLoginSuccess: false,
    DeptAdminLoginError: '',
    DeptAdminLoginstatus: [],

    //Center Admin Login
    CenterAdminLoginModel: [],
    isCenterAdminLoginIn: false,
    isCenterAdminLoginSuccess: false,
    CenterAdminLoginError: '',
    CenterAdminLoginstatus: [],
  
  }

  export const adminLogin = function (state = loginState, action) {
    switch (action.type) {
      //Department Admin Login
      case 'DEPT_LOGIN_START':
        return Object.assign({}, state, { isDeptAdminLoginIn: true, isDeptAdminLoginSuccess: false })
      case 'DEPT_LOGIN_SUCCESS':
        return Object.assign({}, state, {DeptAdminLoginModel: action.payload, isDeptAdminLoginIn: false, isDeptAdminLoginSuccess: true, DeptAdminLoginstatus: action.DeptAdminLoginstatus })
      case 'DEPT_LOGIN_FAILURE':
        return Object.assign({}, state, { DeptAdminLoginError: action.payload, isDeptAdminLoginIn: false, isDeptAdminLoginSuccess: false, DeptAdminLoginstatus: action.DeptAdminLoginstatus })
      case 'SET_IS_DEPT_LOGIN_SUCCESS':
        return Object.assign({}, state, { isDeptAdminLoginSuccess: false })
      case 'SET_IS_DEPT_LOGIN_ERROR':
        return Object.assign({}, state, { DeptAdminLoginError: '' })

        //Center Admin Login
      case 'CENTER_LOGIN_START':
        return Object.assign({}, state, { isCenterAdminLoginIn: true, isCenterAdminLoginSuccess: false })
      case 'CENTER_LOGIN_SUCCESS':
        return Object.assign({}, state, { CenterAdminLoginModel: action.payload, isCenterAdminLoginIn: false, isCenterAdminLoginSuccess: true, CenterAdminLoginstatus: action.CenterAdminLoginstatus })
      case 'CENTER_LOGIN_FAILURE':
        return Object.assign({}, state, { CenterAdminLoginError: action.payload, isCenterAdminLoginIn: false, isCenterAdminLoginSuccess: false, CenterAdminLoginstatus: action.CenterAdminLoginstatus })
      case 'SET_IS_CENTER_LOGIN_SUCCESS':
        return Object.assign({}, state, { isCenterAdminLoginSuccess: false })
      case 'SET_IS_CENTER_LOGIN_ERROR':
        return Object.assign({}, state, { CenterAdminLoginError: '' })
  
  
      default:
        return state;
    }
  };