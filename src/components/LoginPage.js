import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Login.css";
import * as LoginAction from "../actions/LoginAction";
import { connect } from "react-redux";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import logo from "../Images/loadingdots2.gif";
import Navbar from "./Navbar";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const imageURL = logo;
  const navigate = useNavigate();
  const [kgidNumber, setkgidNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // State to track active tab
  const [activeTab, setActiveTab] = useState("KGID"); // Default active tab

  // Function to handle tab change
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const tabs = document.querySelectorAll('button[data-bs-toggle="tab"]');
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        const tabId = tab.getAttribute("data-bs-target");
        document.querySelectorAll(".tab-pane").forEach((pane) => {
          pane.classList.remove("show", "active");
        });
        document.querySelector(tabId).classList.add("show", "active");
      });
    });
    return () => {
      tabs.forEach((tab) => tab.removeEventListener("click", () => { }));
    };
  }, []);

  const candidatelogin = (event) => {
    event.preventDefault();
    if (email === "") {
      swal({
        title: "Please Enter Email Id !",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false,
      });
    } else if (password === "") {
      swal({
        title: "Please Enter Password !",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false,
      });
    } else {
      let fields = {
        email: email,
        password: password,
      };
      window.localStorage.removeItem("KGID");
      window.sessionStorage.removeItem("KGID");
      props.userLogin(fields);
    }
  };

  useEffect(() => {
    if (props.isLoginSuccess && props.Loginstatus === 200) {
      props.setLoginSuccess();

      const { candidate, token } = props.LoginModel;
      const { _id, email, name } = candidate;
     window.sessionStorage.setItem("email", email)
      window.localStorage.setItem("email", email)
      window.sessionStorage.setItem("name", name)
      window.localStorage.setItem("name", name)
      window.sessionStorage.setItem("token", token)
      window.localStorage.setItem("token", token)
      window.sessionStorage.setItem("_id", _id);
      window.localStorage.setItem("_id", _id);
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
    } else if (props.LoginError) {
      swal({
        title: props.LoginError,
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      }).then(okay => {
        if (okay) {
          handleClearData();
        }
      });
      props.setLoginError();
    }
  }, [props.isLoginSuccess, props.Loginstatus, props.LoginError]);

  const handleClearData = () => {
    setEmail("")
    setPassword("")
  }

  const kgidcanidateLogin = (event) => {
    event.preventDefault();
    if (kgidNumber === "") {
      swal({
        title: "Please Enter KGID  Number !",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    } else if (phoneNumber === "") {
      swal({
        title: "Please Enter Phone Number !",
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      });
    }
    else {
      let fields = {
        KGID: Number(kgidNumber),
        phone: Number(phoneNumber)
      }
      props.kgidLogin(fields)
    }
  }

  useEffect(() => {
    if (props.isKgidLoginSuccess && props.KgidLoginstatus === 200) {
      props.setKgidLoginSuccess();

      const { candidate, token } = props.KgidLoginModel;
      const { _id, email, name, KGID, } = candidate;
     window.sessionStorage.setItem("email", email)
      window.localStorage.setItem("email", email)
      window.sessionStorage.setItem("name", name)
      window.localStorage.setItem("name", name)
      window.sessionStorage.setItem("token", token)
      window.localStorage.setItem("token", token)
      window.sessionStorage.setItem("KGID", KGID)
      window.localStorage.setItem("KGID", KGID)
      window.sessionStorage.setItem("_id", _id);
      window.localStorage.setItem("_id", _id);
      swal({
        title: "Login Successfully.",
        icon: "success",
        button: "OK",
        closeOnClickOutside: false
      }).then(okay => {
        if (okay) {
          window.location.href = "/KgidDashboard";
        }
      });
    } else if (props.KgidLoginError) {
      swal({
        title: props.KgidLoginError,
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      }).then(okay => {
        if (okay) {
          handleClear();
        }
      });
      props.setKgidLoginError();
    }
  }, [props.isKgidLoginSuccess, props.KgidLoginstatus, props.KgidLoginError]);

  const handleClear = () => {
    setkgidNumber("")
    setPhoneNumber("")
  }


  // Function to clear local storage for a specific email
  // const clearLocalStorageForEmail = (email) => {
  //   const savedEmails = localStorage.getItem('approvedEmails');
  //   if (savedEmails) {
  //     const emailData = JSON.parse(savedEmails);
  //     if (email in emailData) {
  //       delete emailData[email];
  //       localStorage.setItem('approvedEmails', JSON.stringify(emailData));
  //     }
  //   }
  // };

  const clearAttendanceStatusForEmail = (email) => {
    const savedAttendanceStatus = localStorage.getItem('attendenceStatus');
    if (savedAttendanceStatus) {
      const attendanceData = JSON.parse(savedAttendanceStatus);
      if (email in attendanceData) {
        delete attendanceData[email];
        localStorage.setItem('attendenceStatus', JSON.stringify(attendanceData));
      }
    }
  };


  return (
    <>
      <div className="container-fluid mt-4">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="login-backgroundimg">

            <div className="container">
              <div className="tab-content" id="myTabContent">
                {/* KGID Login Card */}
                <div
                  className="tab-pane fade show active"
                  id="form"
                  role="tabpanel"
                  aria-labelledby="form-tab"
                >
                  <div className="card card_align1 mb-3">
                    <div className="card-header header_align text-center">
                      <h4>Login</h4>
                    </div>&nbsp;
                    <ul className="nav nav-pills nav-fill mb-3" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className={`btn buttonstyle sendButton ${activeTab === "KGID" ? "btn-primary" : "btn-outline-primary"
                            }`}
                          id="form-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#form"
                          type="button"
                          role="tab"
                          aria-controls="form"
                          aria-selected={activeTab === "KGID"}
                          onClick={() => handleTabChange("KGID")} // Update active tab
                        >
                          KGID
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`btn buttonstyle sendButton ${activeTab === "NON-KGID"
                            ? ""
                            : ""
                            }`}
                          id="card-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#card"
                          type="button"
                          role="tab"
                          aria-controls="card"
                          aria-selected={activeTab === "NON-KGID"}
                          onClick={() => handleTabChange("NON-KGID")} // Update active tab
                        >
                          NON-KGID
                        </button>
                      </li>
                    </ul>

                    <div className="card-body">
                      <div className="kgid-formdata">
                        <form onSubmit={kgidcanidateLogin}>
                          <div className="row">
                            <div className="col-12 form-group">
                              <div className="material-textfield">
                                <input
                                  className="form-control login_input"
                                  placeholder=" " value={kgidNumber}
                                  type="text" onChange={(e) => setkgidNumber(e.target.value)}
                                />
                                <label>
                                  KGID Number
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 form-group">
                              <div className="material-textfield">
                                <input
                                  className="form-control login_input"
                                  placeholder=" "
                                  type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <label>
                                  Phone Number
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="rememberMe"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="rememberMe"
                                >
                                  Remember Me
                                </label>
                              </div>
                            </div>
                            <div className="col-6 text-end">
                              <a href="#!">Forgot password?</a>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 text-center">
                              <button
                                type="submit"
                                className="btn btn-primary buttonstyle w-100 mt-3"
                              >
                                Login
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      {error && (
                        <p className="text-danger text-center">{error}</p>
                      )}
                      {success && (
                        <p className="text-success text-center">{success}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* NON-KGID Login Card */}
                <div
                  className="tab-pane fade"
                  id="card"
                  role="tabpanel"
                  aria-labelledby="card-tab"
                >
                  <div className="card card_align1">
                    <div className="card-header header_align text-center">
                      <h4>Login</h4>
                    </div>&nbsp;

                    <ul className="nav nav-pills nav-fill mb-3" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className={`btn buttonstyle sendButton ${activeTab === "KGID" ? "" : ""
                            }`}
                          id="form-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#form"
                          type="button"
                          role="tab"
                          aria-controls="form"
                          aria-selected={activeTab === "KGID"}
                          onClick={() => handleTabChange("KGID")} // Update active tab
                        >
                          KGID
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`btn buttonstyle sendButton ${activeTab === "NON-KGID"
                            ? "btn-primary"
                            : "btn-outline-primary"
                            }`}
                          id="card-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#card"
                          type="button"
                          role="tab"
                          aria-controls="card"
                          aria-selected={activeTab === "NON-KGID"}
                          onClick={() => handleTabChange("NON-KGID")} // Update active tab
                        >
                          NON-KGID
                        </button>
                      </li>
                    </ul>
                    <div className="card-body">
                      <form onSubmit={candidatelogin}>
                        <div className="row">
                          <div className="col-12 form-group">
                            <div className="material-textfield">
                              <input
                                className="form-control login_input"
                                placeholder=" "
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <label>
                                Email
                                <span style={{ color: "red" }}>*</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 form-group">
                            <div className="material-textfield">
                              <input
                                className="form-control login_input"
                                placeholder=" "
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <label>
                                Password
                                <span style={{ color: "red" }}>*</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="rememberMe"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rememberMe"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <div className="col-6 text-end">
                            <a href="#!">Forgot password?</a>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 text-center">
                            <button
                              type="submit"
                              className="btn btn-primary buttonstyle w-100 mt-3"
                            >
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
    </>
  );
}

const mapToProps = function (state) {
  return {
    LoginModel: state.login.LoginModel,
    isLoginIn: state.login.isLoginIn,
    isLoginSuccess: state.login.isLoginSuccess,
    LoginError: state.login.LoginError,
    Loginstatus: state.login.Loginstatus,

    KgidLoginModel: state.login.KgidLoginModel,
    isKgidLoginIn: state.login.isKgidLoginIn,
    isKgidLoginSuccess: state.login.isKgidLoginSuccess,
    KgidLoginError: state.login.KgidLoginError,
    KgidLoginstatus: state.login.KgidLoginstatus,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    userLogin: (fields) => dispatch(LoginAction.userLogin(fields)),
    setLoginSuccess: () => dispatch(LoginAction.setLoginSuccess()),
    setLoginError: () => dispatch(LoginAction.setLoginError()),

    kgidLogin: (fields) => dispatch(LoginAction.kgidLogin(fields)),
    setKgidLoginSuccess: () => dispatch(LoginAction.setKgidLoginSuccess()),
    setKgidLoginError: () => dispatch(LoginAction.setKgidLoginError()),
  }
};

export default connect(mapToProps, mapDispatchToProps)(LoginPage);
