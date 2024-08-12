const loginState = {
  //User Registartion
  RegistrationModel: [],
  isRegistrationIn: false,
  isRegistrationSuccess: false,
  RegistrationError: '',
  RegistrationStatus: [],

  //send otp
  SendotpModel: [],
  isSendotpIn: false,
  isSendotpSuccess: false,
  SendotpError: '',

  //login For Non-KGID
  LoginModel: [],
  isLoginIn: false,
  isLoginSuccess: false,
  LoginError: '',
  Loginstatus: [],

  //login For KGID
  KgidLoginModel: [],
  isKgidLoginIn: false,
  isKgidLoginSuccess: false,
  KgidLoginError: '',
  KgidLoginstatus: [],

}

export const login = function (state = loginState, action) {
  switch (action.type) {
    //User Registartion
    case 'REGISTRATION_START':
      return Object.assign({}, state, { isRegistrationIn: true, isRegistrationSuccess: false })
    case 'REGISTRATION_SUCCESS':
      return Object.assign({}, state, { RegistrationModel: action.payload, isRegistrationIn: false, isRegistrationSuccess: true, RegistrationStatus: action.RegistrationStatus })
    case 'REGISTRATION_FAILURE':
      return Object.assign({}, state, { RegistrationError: action.payload, isRegistrationIn: false, isRegistrationSuccess: false, RegistrationStatus: action.RegistrationStatus })
    case 'SET_IS_REGISTRATION_SUCCESS':
      return Object.assign({}, state, { isRegistrationSuccess: false })
    case 'SET_IS_REGISTRATION_ERROR':
      return Object.assign({}, state, { RegistrationError: '' })

    //send otp
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

    //login For Non-KGID
    case 'LOGIN_START':
      return Object.assign({}, state, { isLoginIn: true, isLoginSuccess: false })
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, { LoginModel: action.payload, isLoginIn: false, isLoginSuccess: true, Loginstatus: action.Loginstatus })
    case 'LOGIN_FAILURE':
      return Object.assign({}, state, { LoginError: action.payload, isLoginIn: false, isLoginSuccess: false, Loginstatus: action.Loginstatus })
    case 'SET_IS_LOGIN_SUCCESS':
      return Object.assign({}, state, { isLoginSuccess: false })
    case 'SET_IS_LOGIN_ERROR':
      return Object.assign({}, state, { LoginError: '' })


    //login For KGID
    case 'KGID_LOGIN_START':
      return Object.assign({}, state, { isKgidLoginIn: true, isKgidLoginSuccess: false })
    case 'KGID_LOGIN_SUCCESS':
      return Object.assign({}, state, { KgidLoginModel: action.payload, isKgidLoginIn: false, isKgidLoginSuccess: true, KgidLoginstatus: action.KgidLoginstatus })
    case 'KGID_LOGIN_FAILURE':
      return Object.assign({}, state, { KgidLoginError: action.payload, isKgidLoginIn: false, isKgidLoginSuccess: false, KgidLoginstatus: action.KgidLoginstatus })
    case 'SET_IS_KGID_LOGIN_SUCCESS':
      return Object.assign({}, state, { isKgidLoginSuccess: false })
    case 'SET_IS_KGID_LOGIN_ERROR':
      return Object.assign({}, state, { KgidLoginError: '' })

    default:
      return state;
  }
};

