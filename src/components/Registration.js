import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as LoginAction from '../actions/LoginAction'
import { connect } from 'react-redux';
import swal from 'sweetalert';
import logo from '../Images/loadingdots2.gif'

function Registration(props) {
  const navigate = useNavigate();
  const [kgidNumber, setKgidNumber] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const imageURL = logo;
  const [otpVerified, setOtpVerified] = useState(false);

  const validateEmail = (mailId) => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regex.test(mailId)) {
      return true
    }
    else {
      setEmail('')
      return false
    }
  }

  const getOTP = () => {
    let validEmail = validateEmail(email);
    if (!validEmail) {
      swal({
        title: "Please Enter Valid Email-Id",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    } else {
      let fields = {
        email: email.toString()
      };
      console.log("email", fields);
      props.sendOTP(fields);
    }
  };

  useEffect(() => {
    if (props.isSendotpSuccess) {
      if (props.SendotpModel) {
        swal({
          title: "OTP Sent Successfully.",
          icon: "success",
          button: "OK",
          closeOnClickOutside: false
        }).then(okay => {
          if (okay) {
            props.setsendOTPSuccess()
          }
        });
      }
      else {
        swal({
          title: "Please enter correct email",
          icon: "error",
          button: "OK",
          closeOnClickOutside: false
        }).then(okay => {
          if (okay) {
            props.setsendOTPSuccess()
          }
        });
      }
    }
  }, [props.isSendotpSuccess, props.SendotpModel])


  const handleNonKGIDRegistration = (e) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    e.preventDefault();
    if (name === '') {
      swal({
        title: "Please Enter Name !",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    } else if (email === "") {
      swal({
        title: "Please Enter Email !",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    }
    else if (!otpVerified) {
      swal({
        title: "Please verify OTP before registering!",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    }
    else if (phoneNumber === '') {
      swal({
        title: "Please Enter Phonenumber",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    }
    else if (dob === '') {
      swal({
        title: "Please Enter Dateofbirth",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    }
    else if (password === '') {
      swal({
        title: "Please Enter password",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    }
    else if (password !== confirmPassword) {
      swal({
        title: "Passwords do not match.",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    }
    else if (!passwordRegex.test(password)) {
      swal({
          title: "Password should be at least 6 characters long and should contain at least one number, one lowercase, and one uppercase letter",
          icon: "error",
          button: "OK",
          closeOnClickOutside: false
      });
  }
    else {
      let fields = {
        name: name,
        email: email,
        otp: otpVerified,
        dob: dob,
        password: password,
        confirmPassword: confirmPassword,
      }
      console.log("fields",fields)
      props.userRegistration(fields)
    }
  }

  useEffect(() => {
    if (props.RegistrationError) {
      swal({
        title: props.RegistrationError,
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
      props.setRegistrationError();
    }
  }, [props.RegistrationError]);

  useEffect(() => {
    console.log("Registration status:", props.RegitrationStatus);
    console.log("Registration success:", props.isRegistrationSuccess);

    if (props.isRegistrationSuccess) {
        props.setRegistrationSuccess(); 

        if (props.RegitrationStatus === 200) {
            swal({
                title: "Candidate Registered Successfully.",
                icon: "success",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    window.location.href = "/";
                }
            });
        } else if (props.RegitrationStatus === 400) {
            swal({
                title: "Email Already Exists",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } 
      //   else if (props.RegitrationStatus === 401) {
      //     swal({
      //         title: "Name,Email,Phone and Dob fields cannot be empty",
      //         icon: "error",
      //         button: "OK",
      //         closeOnClickOutside: false
      //     });
      // } 
      
        else {
            swal({
                title: "Error adding candidate",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    props.setLoginError();
                }
            });
        }
    }
}, [props.isRegistrationSuccess, props.RegitrationStatus]);

  const verifyOTP = (event) => {
    event.preventDefault();
    if (!otp) {
      swal({
        title: "Please Enter Valid OTP",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    } else {
      let fields = {
        otp: otp.toString()
      };
      props.verifyOTP(fields);
    }
  };

  useEffect(() => {
    if (props.isVerifyotpSuccess) {
      props.verifyOTPSuccess();
      if (props.VerifyStatus === 200) {
        setOtpVerified(true);
        swal({
          title: "OTP Verified Successfully.",
          icon: "success",
          button: "OK",
          closeOnClickOutside: false
        }).then(okay => {
          if (okay) {
            props.verifyOTPSuccess();
          }
        });
      } else if (props.VerifyStatus === 401) {
        setOtpVerified(false);
        swal({
          title: "Incorrect OTP",
          icon: "error",
          button: "OK",
          closeOnClickOutside: false
        });
      }
      else if (props.VerifyStatus === 500) {
        swal({
          title: "Error verifying OTP",
          icon: "error",
          button: "OK",
          closeOnClickOutside: false
        });
      }
    }
  }, [props.isVerifyotpSuccess, props.VerifyStatus]);

  useEffect(() => {
    if (props.VerifyotpError) {
      swal({
        title: props.VerifyotpError,
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
      props.verifyOTPError();
    }
  }, [props.VerifyotpError]);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container">
          <div className="card card_align">
            <div className="card-header header_align text-center">
              <h4>Registration</h4>
            </div>
            <div className="card-body">
              <div className="row rowalign" >
                <div className="col-12">
                  <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="btn btn-primary buttonstyle sendButton" id="form-tab" data-bs-toggle="tab" data-bs-target="#form"
                        type="button" role="tab" aria-controls="form" aria-selected="true">KGID
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="btn btn-primary buttonstyle sendButton" id="card-tab" data-bs-toggle="tab" data-bs-target="#card"
                        type="button" role="tab" aria-controls="card" aria-selected="false">NON-KGID
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="form" role="tabpanel" aria-labelledby="form-tab">
                      <form>
                        <div className="row rowalign">
                          <div className="col-12 form-group">
                            <div className="material-textfield">
                              <input type="text" className="form-control login_input" placeholder="" value={kgidNumber}
                                onChange={(e) => setKgidNumber(e.target.value)} />
                              <label>KGID Number</label>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="material-textfield">
                              <input type="date" className="form-control login_input" placeholder="" value={dob}
                                onChange={(e) => setDob(e.target.value)} />
                              <label>Date of Birth</label>
                            </div>
                          </div>
                        </div>
                        <div className="row rowalign">
                          <div className="col-12">
                            <button className="btn btn-primary buttonstyle submitUser w-100" placeholder="">
                              Submit
                            </button>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-12 text-center">
                            Already have an account?
                            <span>
                              <NavLink to="/">Login</NavLink>
                            </span>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="tab-pane fade" id="card" role="tabpanel" aria-labelledby="card-tab">
                      <form onSubmit={handleNonKGIDRegistration}>
                        <div className="row rowalign">
                          <div className="col-12 form-group">
                            <div className="material-textfield">
                              <input type="text" className="form-control login_input" placeholder="" value={name}
                                onChange={(e) => setName(e.target.value)} />
                              <label>Name<span style={{ "color": "red" }}>*</span></label>
                            </div>
                          </div>
                        </div>
                        <div className="row rowalign">
                          <div className="col-8 form-group">
                            <div className="material-textfield">
                              <input type="email" className="form-control login_input" placeholder="" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                              <label>Email<span style={{ "color": "red" }}>*</span></label>
                            </div>
                          </div>
                          <div className="col-4 text-center">
                            <button type="button" className="btn btn-primary buttonstyle sendButton"
                              onClick={getOTP} style={{ marginTop: '-28px' }}>
                              Send OTP
                            </button>
                          </div>
                        </div>

                        <div className="row rowalign">
                          <div className="col-8 form-group">
                            <div className="material-textfield">
                              <input type="text" className="form-control login_input" placeholder="" value={otp}
                                onChange={(e) => setOtp(e.target.value)} />
                              <label>OTP<span style={{ "color": "red" }}>*</span></label>
                            </div>
                          </div>
                          <div className="col-4 text-center">
                            <button type="button" className="btn btn-primary buttonstyle sendButton"
                              onClick={verifyOTP} style={{ marginTop: '-28px' }}>
                              Verify OTP
                            </button>
                          </div>

                        </div>
                        <div className="row rowalign">
                          <div className="col-12 form-group">
                            <div className="material-textfield">
                              <input type="tel" className="form-control login_input" placeholder="" value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)} />
                              <label>Phone Number<span style={{ "color": "red" }}>*</span></label>
                            </div>
                          </div>
                        </div>
                        <div className="row rowalign">
                          <div className="col-12 form-group">
                            <div className="material-textfield">
                              <input type="date" className="form-control login_input" placeholder=""
                                value={dob} onChange={(e) => setDob(e.target.value)} />
                              <label>Date of Birth<span style={{ "color": "red" }}>*</span></label>
                            </div>
                          </div>
                        </div>
                        <div className="row rowalign">
                          <div className="col-12 form-group">
                            <div className="material-textfield">
                              <input type="password" className="form-control login_input" placeholder=""
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                              <label>Create Password<span style={{ "color": "red" }}>*</span></label>
                            </div>
                          </div>
                        </div>
                        <div className="row rowalign">
                          <div className="col-12 form-group">
                            <div className="material-textfield">
                              <input type="password" className="form-control login_input" placeholder=""
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                              <label>Confirm Password<span style={{ "color": "red" }}>*</span></label>
                            </div>
                          </div>
                        </div>
                        <div className="row rowalign">
                          <div className="col-12 form-group">
                            <button type="submit" className="btn btn-primary buttonstyle submitUser w-100"  >
                              Submit
                            </button>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-12 text-center">
                            Already have an account?
                            <span>
                              <NavLink to="/">Login</NavLink>
                            </span>
                          </div>
                        </div>
                      </form>
                      {error && (
                        <p className="text-danger text-center">{error}</p>
                      )}
                      {success && (
                        <p className="text-success text-center">{success}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapToProps = function (state) {
  return {
    RegistrationModel: state.login.RegistrationModel,
    isRegistrationIn: state.login.isRegistrationIn,
    isRegistrationSuccess: state.login.isRegistrationSuccess,
    RegistrationError: state.login.RegistrationError,
    RegitrationStatus:state.login.RegitrationStatus,

    SendotpModel: state.login.SendotpModel,
    isSendotpIn: state.login.isSendotpIn,
    isSendotpSuccess: state.login.isSendotpSuccess,
    SendotpError: state.login.SendotpError,

    VerifyotpModel: state.login.VerifyotpModel,
    isVerifyotpIn: state.login.isVerifyotpIn,
    isVerifyotpSuccess: state.login.isVerifyotpSuccess,
    VerifyotpError: state.login.VerifyotpError,
    VerifyStatus: state.login.VerifyStatus,
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    userRegistration: (fields) => dispatch(LoginAction.userRegistration(fields)),
    setRegistrationSuccess: () => dispatch(LoginAction.setRegistrationSuccess()),
    setRegistrationError: () => dispatch(LoginAction.setRegistrationError()),

    sendOTP: (fields) => dispatch(LoginAction.sendOTP(fields)),
    setsendOTPSuccess: () => dispatch(LoginAction.setsendOTPSuccess()),
    setsendOTPError: () => dispatch(LoginAction.setsendOTPError()),

    verifyOTP: (fields) => dispatch(LoginAction.verifyOTP(fields)),
    verifyOTPSuccess: () => dispatch(LoginAction.verifyOTPSuccess()),
    verifyOTPError: () => dispatch(LoginAction.verifyOTPError()),

  }
}

export default connect(mapToProps, mapDispatchToProps)(Registration);