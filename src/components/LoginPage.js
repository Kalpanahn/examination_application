
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Login.css"
import * as LoginAction from '../actions/LoginAction'
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/loadingdots2.gif'

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const imageURL = logo;
  const navigate = useNavigate();

  const candidatelogin = (event) => {
    event.preventDefault();
    if (email === "") {
      swal({
        title: "Please Enter Email Id !",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    } else if (password === "") {
      swal({
        title: "Please Enter Password !",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    }
    else {
      let fields = {
        email: email,
        password: password,
      }
      props.userLogin(fields)
    }
  }
console.log("user",props.LoginModel)
  useEffect(() => {
    if (props.isLoginSuccess) {
      props.setLoginSuccess();
      if (props.Loginstatus === 200) {
        // const { email, name,token } = props.LoginModel.candidate; 
        const { candidate, token } = props.LoginModel;
        const { email, name } = candidate;
    
        window.sessionStorage.setItem("email", email)
        window.localStorage.setItem("email", email)
        window.sessionStorage.setItem("name",name)
        window.localStorage.setItem("name", name)
        window.sessionStorage.setItem("token",token)
        window.localStorage.setItem("token", token)
        swal({
          title: "Login Successfully.",
          icon: "success",
          button: "OK",
          closeOnClickOutside: false
        }).then(okay => {
          if (okay) {
           window.location.href = "/dashboard";
          }
        });
      } else if (props.Loginstatus === 400) {
        swal({
          title: "Email Doesn't Exits",
          icon: "error",
          button: "OK",
          closeOnClickOutside: false
        });
      } else if (props.Loginstatus === 401) {
        swal({
          title: "Password Doesn't Exits",
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
  }, [props.isLoginSuccess, props.Loginstatus]);

  useEffect(() => {
    if (props.LoginError) {
      swal({
        title: props.LoginError,
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
      props.setLoginError();
    }
  }, [props.LoginError]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-backgroundimg">
        <div className="container">
          <div className="card card_align1">
            <div className="card-header header_align text-center">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={candidatelogin}>
                <div className="row">
                  <div className="col-12 form-group">
                    <div className="material-textfield">
                      <input className="form-control login_input" placeholder=" " type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                      <label>Email<span style={{ "color": "red" }}>*</span></label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 form-group">
                    <div className="material-textfield">
                      <input className="form-control login_input" placeholder=" " type="password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                      <label>Password<span style={{ "color": "red" }}>*</span></label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <a href="#!">Forgot password?</a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary buttonstyle w-100 mt-3">
                      Login
                    </button>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 text-center">
                    Don't have an account?{" "}
                    <span>
                      <NavLink to="/Registration">Register</NavLink>
                    </span>
                  </div>
                </div>
              </form>
              {error && <p className="text-danger text-center">{error}</p>}
              {success && <p className="text-success text-center">{success}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapToProps = function (state) {
  return {
    LoginModel: state.login.LoginModel,
    isLoginIn: state.login.isLoginIn,
    isLoginSuccess: state.login.isLoginSuccess,
    LoginError: state.login.LoginError,
    Loginstatus: state.login.Loginstatus,
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    userLogin: (fields) => dispatch(LoginAction.userLogin(fields)),
    setLoginSuccess: () => dispatch(LoginAction.setLoginSuccess()),
    setLoginError: () => dispatch(LoginAction.setLoginError()),
  }
}

export default connect(mapToProps, mapDispatchToProps)(LoginPage);