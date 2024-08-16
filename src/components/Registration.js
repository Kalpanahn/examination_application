import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as LoginAction from '../actions/LoginAction'
import { connect } from 'react-redux';
import swal from 'sweetalert';
import logo from '../Images/loadingdots2.gif'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

function Registration(props) {
  const navigate = useNavigate();
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
  const [otpSent, setOtpSent] = useState("");
  

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
      props.sendOTP(fields);
    }
  };

  useEffect(() => {
    if (props.isSendotpSuccess) {
      setOtpSent(props.SendotpModel.otp)
      if (props.SendotpModel) {
        swal({
          title: `OTP Sent Successfully:${props.SendotpModel.otp}`,
          icon: "success",
          button: "OK",
          closeOnClickOutside: false
        }).then(okay => {
          if (okay) {
            props.setsendOTPSuccess();
          }
        });
      } else {
        swal({
          title: "Please enter correct email",
          icon: "error",
          button: "OK",
          closeOnClickOutside: false
        }).then(okay => {
          if (okay) {
            props.setsendOTPSuccess();
          }
        });
      }
    }
  }, [props.isSendotpSuccess, props.SendotpModel]);

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
    else if (otp === "") {
      swal({
        title: "Please Enter OTP",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    }
    else if (otpSent !== otp) {
      swal({
        title: "OTP Does Not Match",
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
        title: "Password Does Not Match",
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
        phone: phoneNumber,
        dob: dob,
        password: password,
        confirmPassword: confirmPassword,
      }
      props.userRegistration(fields)
    }
  }

  useEffect(() => {
    if (props.isRegistrationSuccess && props.RegistrationStatus === 200) {
      props.setRegistrationSuccess();
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
    } else if (props.RegistrationError) {
      swal({
        title: props.RegistrationError,
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      }).then(okay => {
        if (okay) {
          handleClear();
        }
      });
      props.setRegistrationError();
    }
  }, [props.isRegistrationSuccess, props.RegistrationStatus, props.RegistrationError]);

  const handleClear = () => {
    setName("")
    setEmail("")
    setDob("")
    setOtp("")
    setPassword("")
    setPhoneNumber("")
    setConfirmPassword("")
  }

  return (
    <>
    <div >
      <div className="d-flex justify-content-center align-items-center vh-100">
      {/* <Navbar /> */}
        <div className="container">
          <div className="card card_align">
            <div className="card-header header_align text-center">
              <h4>Registration</h4>
            </div>
            <div className="card-body">
              <div className="row rowalign" >
                <div className="col-12">
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="form" role="tabpanel" aria-labelledby="form-tab">
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


                        </div>
                        <div className="row rowalign">
                          <div className="col-12 form-group">
                            <div className="material-textfield">
                              <input placeholder="Please Enter Phone Number" type="text" className="form-control login_input"
                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} maxLength={10} pattern="\d*"
                                inputMode="numeric" onInput={(e) => {
                                  e.target.value = e.target.value.replace(/\D/g, '');
                                  setPhoneNumber(e.target.value)
                                }} />
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
    </>
  )
}

const mapToProps = function (state) {
  return {
    RegistrationModel: state.login.RegistrationModel,
    isRegistrationIn: state.login.isRegistrationIn,
    isRegistrationSuccess: state.login.isRegistrationSuccess,
    RegistrationError: state.login.RegistrationError,
    RegistrationStatus: state.login.RegistrationStatus,

    SendotpModel: state.login.SendotpModel,
    isSendotpIn: state.login.isSendotpIn,
    isSendotpSuccess: state.login.isSendotpSuccess,
    SendotpError: state.login.SendotpError,
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
  }
}

export default connect(mapToProps, mapDispatchToProps)(Registration);