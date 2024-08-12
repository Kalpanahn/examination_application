import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import * as AdminLoginAction from "../actions/AdminLoginAction";
import { connect } from "react-redux";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import logo from "../Images/loadingdots2.gif";
import Navbar from "./Navbar";

function Adminloginpage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const imageURL = logo;
    const navigate = useNavigate();


    // State to track active tab
    const [activeTab, setActiveTab] = useState("DepartmentAdmin"); // Default active tab

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

    const handleClearData = () => {
        setEmail("")
        setPassword("")
    }

    const DeptAdminLogin = (event) => {
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
            props.loginDeptAdmin(fields);
        }
    };

    useEffect(() => {
        if (props.isDeptAdminLoginSuccess && props.DeptAdminLoginstatus === 200) {
            props.setLoginDeptAdminSuccess();
            const { admin, token } = props.DeptAdminLoginModel;
            const { email } = admin;
            window.sessionStorage.setItem("email", email)
            window.localStorage.setItem("email", email)
            window.sessionStorage.setItem("token", token)
            window.localStorage.setItem("token", token)
            swal({
                title: "Login Successfully.",
                icon: "success",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    window.location.href = "/DepartmentAdmin";
                }
            });
        } else if (props.DeptAdminLoginError) {
            swal({
                title: props.DeptAdminLoginError,
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    handleClearData();
                }
            });
            props.setLoginDeptAdminError();
        }
    }, [props.isDeptAdminLoginSuccess, props.DeptAdminLoginstatus, props.DeptAdminLoginError]);


    const CenterAdminLogin = (event) => {
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
            props.loginCenterAdmin(fields);
        }
    };

    useEffect(() => {
        if (props.isCenterAdminLoginSuccess && props.CenterAdminLoginstatus === 200) {
            props.setLoginCenterAdminSuccess();
            const { admin, token } = props.CenterAdminLoginModel;
            const { email } = admin;
            window.sessionStorage.setItem("email", email)
            window.localStorage.setItem("email", email)
            window.sessionStorage.setItem("token", token)
            window.localStorage.setItem("token", token)
            swal({
                title: "Login Successfully.",
                icon: "success",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    window.location.href = "/CenterAdmin";
                }
            });
        } else if (props.CenterAdminLoginError) {
            swal({
                title: props.CenterAdminLoginError,
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    handleClearData();
                }
            });
            props.setLoginCenterAdminError();
        }
    }, [props.isCenterAdminLoginSuccess, props.CenterAdminLoginstatus, props.CenterAdminLoginError]);


    return (
        <>
            <div className="container-fluid mt-4">
                <Navbar />
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="login-backgroundimg">

                        <div className="container">
                            <div className="tab-content" id="myTabContent">
                                {/* Department Admin Login Card */}
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
                                                    className={`btn buttonstyle sendButton ${activeTab === "DepartmentAdmin" ? "btn-primary" : "btn-outline-primary"
                                                        }`}
                                                    id="form-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#form"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="form"
                                                    aria-selected={activeTab === "DepartmentAdmin"}
                                                    onClick={() => handleTabChange("DepartmentAdmin")} // Update active tab
                                                >
                                                    Department Admin
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`btn buttonstyle sendButton ${activeTab === "CenterAdmin"
                                                        ? ""
                                                        : ""
                                                        }`}
                                                    id="card-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#card"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="card"
                                                    aria-selected={activeTab === "CenterAdmin"}
                                                    onClick={() => handleTabChange("CenterAdmin")} // Update active tab
                                                >
                                                    Center Admin
                                                </button>
                                            </li>
                                        </ul>

                                        <div className="card-body">
                                            <div className="kgid-formdata">
                                                <form onSubmit={DeptAdminLogin}>
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

                                {/* Center Admin Login Card */}
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
                                                    className={`btn buttonstyle sendButton ${activeTab === "DepartmentAdmin" ? "" : ""
                                                        }`}
                                                    id="form-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#form"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="form"
                                                    aria-selected={activeTab === "DepartmentAdmin"}
                                                    onClick={() => handleTabChange("DepartmentAdmin")} // Update active tab
                                                >
                                                    Department Admin
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`btn buttonstyle sendButton ${activeTab === "CenterAdmin"
                                                        ? "btn-primary"
                                                        : "btn-outline-primary"
                                                        }`}
                                                    id="card-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#card"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="card"
                                                    aria-selected={activeTab === "CenterAdmin"}
                                                    onClick={() => handleTabChange("CenterAdmin")} // Update active tab
                                                >
                                                    Center Admin
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="card-body">
                                            <form onSubmit={CenterAdminLogin}>
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
    )
};
const mapToProps = function (state) {
    return {
        //Department Admin Login
        DeptAdminLoginModel: state.adminLogin.DeptAdminLoginModel,
        isDeptAdminLoginIn: state.adminLogin.isDeptAdminLoginIn,
        isDeptAdminLoginSuccess: state.adminLogin.isDeptAdminLoginSuccess,
        DeptAdminLoginError: state.adminLogin.DeptAdminLoginError,
        DeptAdminLoginstatus: state.adminLogin.DeptAdminLoginstatus,

        //Center Admin Login
        CenterAdminLoginModel: state.adminLogin.CenterAdminLoginModel,
        isCenterAdminLoginIn: state.adminLogin.isCenterAdminLoginIn,
        isCenterAdminLoginSuccess: state.adminLogin.isCenterAdminLoginSuccess,
        CenterAdminLoginError: state.adminLogin.CenterAdminLoginError,
        CenterAdminLoginstatus: state.adminLogin.CenterAdminLoginstatus,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        //Department Admin Login
        loginDeptAdmin: (fields) => dispatch(AdminLoginAction.loginDeptAdmin(fields)),
        setLoginDeptAdminSuccess: () => dispatch(AdminLoginAction.setLoginDeptAdminSuccess()),
        setLoginDeptAdminError: () => dispatch(AdminLoginAction.setLoginDeptAdminError()),

        //Center Admin Login
        loginCenterAdmin: (fields) => dispatch(AdminLoginAction.loginCenterAdmin(fields)),
        setLoginCenterAdminSuccess: () => dispatch(AdminLoginAction.setLoginCenterAdminSuccess()),
        setLoginCenterAdminError: () => dispatch(AdminLoginAction.setLoginCenterAdminError()),
    }
};

export default connect(mapToProps, mapDispatchToProps)(Adminloginpage);
