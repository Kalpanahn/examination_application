const loginState = {
  RegistrationModel: [],
  isRegistrationIn: false,
  isRegistrationSuccess: false,
  RegistrationError: '',
  RegitrationStatus:[],

  SendotpModel: [],
  isSendotpIn: false,
  isSendotpSuccess: false,
  SendotpError: '',

  LoginModel: [],
  isLoginIn: false,
  isLoginSuccess: false,
  LoginError: '',
  Loginstatus: [],

  VerifyotpModel: [],
  isVerifyotpIn: false,
  isVerifyotpSuccess: false,
  VerifyotpError: '',
  VerifyStatus: []
}

export const login = function (state = loginState, action) {
  switch (action.type) {
    case 'REGISTRATION_START':
      return Object.assign({}, state, { isRegistrationIn: true, isRegistrationSuccess: false })
    case 'REGISTRATION_SUCCESS':
      return Object.assign({}, state, { RegistrationModel: action.payload, isRegistrationIn: false, isRegistrationSuccess: true ,RegitrationStatus:action.RegitrationStatus})
    case 'REGISTRATION_FAILURE':
      return Object.assign({}, state, { RegistrationError: action.payload, isRegistrationIn: false, isRegistrationSuccess: false,RegitrationStatus:action.RegitrationStatus })
    case 'SET_IS_REGISTRATION_SUCCESS':
      return Object.assign({}, state, { isRegistrationSuccess: false })
    case 'SET_IS_REGISTRATION_ERROR':
      return Object.assign({}, state, { RegistrationError: '' })

    case 'SENDOTP_START':
      return Object.assign({}, state, { isSendotpIn: true, isSendotpSuccess: false })
    case 'SENDOTP_SUCCESS':
      return Object.assign({}, state, { SendotpModel: action.payload, isSendotpIn: false, isSendotpSuccess: true })
    case 'SENDOTP_FAILURE':
      return Object.assign({}, state, { SendotpError: action.payload, isSendotpIn: false, isSendotpSuccess: false })
    case 'SET_IS_SENDOTP_SUCCESS':
      return Object.assign({}, state, { isSendotpSuccess: false })
    case 'SET_IS_SENDOTP_ERROR':
      return Object.assign({}, state, { SendotpError: '' })

    case 'LOGIN_START':
      return Object.assign({}, state, { isLoginIn: true, isLoginSuccess: false })
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, { LoginModel: action.payload, isLoginIn: false, isLoginSuccess: true, Loginstatus: action.Loginstatus })

    case 'LOGIN_FAILURE':
      console.log('Login failure:', action.payload);
      return Object.assign({}, state, { LoginError: action.payload, isLoginIn: false, isLoginSuccess: false, Loginstatus: action.Loginstatus })
    case 'SET_IS_LOGIN_SUCCESS':
      return Object.assign({}, state, { isLoginSuccess: false })
    case 'SET_IS_LOGIN_ERROR':
      return Object.assign({}, state, { LoginError: '' })

    case 'VERIFYOTP_START':
      return Object.assign({}, state, { isVerifyotpIn: true, isVerifyotpSuccess: false })
    case 'VERIFY_SUCCESS':
      return Object.assign({}, state, { VerifyotpModel: action.payload, isVerifyotpIn: false, isVerifyotpSuccess: true, VerifyStatus: action.VerifyStatus })
    case 'VERIFY_FAILURE':
      return Object.assign({}, state, { VerifyotpError: action.payload, isVerifyotpIn: false, isVerifyotpSuccess: false, VerifyStatus: action.VerifyStatus })
    case 'SET_IS_VERIFY_SUCCESS':
      return Object.assign({}, state, { isVerifyotpSuccess: false })
    case 'SET_IS_VERIFY_ERROR':
      return Object.assign({}, state, { VerifyotpError: '' })

    default:
      return state;
  }
};

