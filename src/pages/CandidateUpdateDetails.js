import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as CandidateUpdateDetailsAction from '../actions/CandidateUpdateDetailsAction'
import { connect } from 'react-redux';
import swal from 'sweetalert';
import logo from '../Images/loadingdots2.gif'

function CandidateUpdateDetails(props) {
    const [preview, setPreview] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [otp, setOtp] = useState("");
    const [company, setCompany] = useState("");
    const [designation, setDesignation] = useState("");
    const [adress, setAdress] = useState("");
    const [experience, setExperience] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const imageURL = logo;
    const [resumeFile, setResumeFile] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [signatureFile, setSignatureFile] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            setImageFile(file);
        } else {
            swal({
                title: "Invalid file type. Only PNG and JPG files are allowed for the image.",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
            e.target.value = null;
        }
    };

    const handleSignatureChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            setSignatureFile(file);
        } else {
            swal({
                title: "Invalid file type. Only PNG and JPG files are allowed for the signature.",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
            e.target.value = null;
        }
    };

    const handleUserUpdateProfile = (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (password === '') {
            swal({
                title: "Please Enter Password",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        }
        else if (confirmPassword === '') {
            swal({
                title: "Please Enter Confirm Password",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        }
        else if (password !== confirmPassword) {
            swal({
                title: "Password Do Not Match",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (!passwordRegex.test(password)) {
            swal({
                title: "Password should be at least 6 characters long and should contain at least one number, one lowercase, and one uppercase letter",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        }
        else if (phone === '') {
            swal({
                title: "Please Enter PhoneNumber!",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (dob === '') {
            swal({
                title: "Please Select Date Of Birth",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (company === '') {
            swal({
                title: "Please Enter Company Name",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (designation === '') {
            swal({
                title: "Please Enter Designation",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        }
        else if (adress === '') {
            swal({
                title: "Please Enter Address",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (experience === '') {
            swal({
                title: "Please Select Experience",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (gender === '') {
            swal({
                title: "Please Select Gender",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        }
        else if (!imageFile) {
            swal({
                title: "Please Upload Image",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        }
        else if (!signatureFile) {
            swal({
                title: "Please Upload Signature",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (!resumeFile) {
            swal({
                title: "Please Upload Resume",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else {
            const formData = new FormData();
            // Append text fields
            formData.append("phone", phone);
            formData.append("dob", dob);
            formData.append("name", window.localStorage.getItem("name"));
            formData.append("email", window.localStorage.getItem("email"));
            formData.append("password", password);
            formData.append("confirmPassword", confirmPassword);
            formData.append("address", adress);
            formData.append("role", designation);
            formData.append("currentCompany", company);
            formData.append("experience", experience);
            formData.append("gender", gender);
            // Append files
            if (imageFile) {
                formData.append("profilepic", imageFile);
            }
            if (signatureFile) {
                formData.append("signaturepic", signatureFile);
            }
            if (resumeFile) {
                formData.append("resume", resumeFile);
            }
            props.updateUserProfile(formData)
        }
    }
    const candidatename = window.localStorage.getItem("name");
    const candidateemail = window.localStorage.getItem("email");

    const handleClear = () => {
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setPhone("")
        setDob("")
        setDate("")
        setCompany("")
        setDesignation("")
        setAdress("")
        setExperience("")
        setGender("")
        setImageFile("")
        setSignatureFile("")
        setResumeFile("")
    }

    useEffect(() => {
        if (props.isUserprofileSuccess) {
            props.setupdateUserProfileSuccess();
            console.log("status", props.UserprofileStatus)
            if (props.UserprofileStatus === 200) {
                swal({
                    title: "Candidate Details Updated Successfully.",
                    icon: "success",
                    button: "OK",
                    closeOnClickOutside: false
                }).then(okay => {
                    if (okay) {
                        window.location.href = "/";
                    }
                });
            } else if (props.UserprofileStatus === 404) {
                swal({
                    title: "Candidate not found",
                    icon: "error",
                    button: "OK",
                    closeOnClickOutside: false
                }).then(okay => {
                    if (okay) {
                        window.location.reload();
                    }
                });
            }
            else if (props.UserprofileStatus === 500) {
                swal({
                    title: "Error updating candidate:",
                    icon: "error",
                    button: "OK",
                    closeOnClickOutside: false
                }).then(okay => {
                    if (okay) {
                        window.location.reload();
                    }
                });
            }
        }
    }, [props.isUserprofileSuccess, props.UserprofileStatus]);

    useEffect(() => {
        if (props.UserprofileError) {
            swal({
                title: props.UserprofileError,
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    window.location.reload();
                }
            });
            props.setupdateUserProfileError();
        }
    }, [props.UserprofileError]);

    const resumeUpload = (e) => {
        let id = e.target.id;
        let file = e.target.files[0];
        let files = e.target.files;
        if (!file) {
            return false;
        }
        if (file) {
            var ext = file.name.split('.').pop();
        }
        if (!(file.type.match("application/pdf")) || !(ext === "pdf")) {
            swal({
                title: "Please upload files in pdf format.",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
            e.target.value = null;
            return false;
        }
        else if (file.size >= 2 * 1024 * 1024) {
            swal({
                title: "File size must be less than 2MB",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
            e.target.value = null;
            return false;
        }
        else {
            setResumeFile(file);
        }
    }

    return (
        <div className="card cardmain_align">
            <div className="row mt-3">
                <div className="col-12">
                    <h5>Candidate Update Details</h5>
                </div>
            </div>
            <form className="form-align">
                <div className="row rowalign">
                    <div className="col-3 form-group">
                        <label className="label_style">Name</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input placeholder="Please Enter Name" type="text" className="form-control login_input"
                                value={candidatename} disabled />
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Email</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input placeholder="Please Enter Email" type="email" className="form-control login_input"
                                value={candidateemail} disabled />
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Password</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input placeholder="Please Enter Password" className="form-control login_input"
                                type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Confirm Password</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input type="password" placeholder="Please Enter Confirm Password" className="form-control login_input"
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="row rowalign">
                    <div className="col-3 form-group">
                        <label className="label_style">Phone Number</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input placeholder="Please Enter Phone Number" type="text" className="form-control login_input"
                                value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} pattern="\d*"
                                inputMode="numeric" onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, '');
                                    setPhone(e.target.value)}}/>
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Date of Birth</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input type="date" placeholder="Please Select Date Of Birth" className="form-control login_input"
                                value={dob} onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Current Company</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input placeholder="Please Enter Current Company Name" type="text" minLength={6} className="form-control login_input"
                                value={company} onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Current Designation/Role</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input placeholder="Please Enter Current Designation/Role" type="text" className="form-control login_input"
                                value={designation} onChange={(e) => setDesignation(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="row rowalign">
                    <div className="col-3 form-group">
                        <label className="label_style">Address Line</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input placeholder="Please Enter Address" type="text" className="form-control login_input"
                                value={adress} onChange={(e) => setAdress(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Experience</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <select class="form-select" aria-label="Default select example"
                                value={experience} onChange={(e) => setExperience(e.target.value)}>
                                <option selected>Select</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Gender</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox1" value="Male"
                                onChange={e => setGender(e.target.value)} checked={gender === "Male"} />
                            <label class="form-check-label" for="inlineCheckbox1">Male</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox2" value="Female"
                                onChange={e => setGender(e.target.value)} checked={gender === "Female"} />
                            <label class="form-check-label" for="inlineCheckbox2">Female</label>
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Upload Image</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input type="file" className="form-control login_input" accept=".png, .jpg"
                                onChange={e => handleImageChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-3 form-group">
                        <label className="label_style">Upload Signature</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input type="file" className="form-control login_input" accept=".png, .jpg"
                                onChange={e => handleSignatureChange(e)} />
                        </div>
                    </div>
                    <div className="col-3 form-group">
                        <label className="label_style">Upload Resume</label> :&nbsp;
                        <div className="material-textfield">
                            <input type="file" id="file" onChange={e => resumeUpload(e)} required accept='.pdf'
                                className="form-control login_input" />
                        </div>
                    </div>
                    {preview && (
                        <div className="col-3 form-group">
                            <div className="material-textfield">
                                <img src={preview} alt="Preview" className="img-thumbnail" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="row rowalign">
                    <div className="nav nav-underline justify-content-center">
                        <button type="button" className="btn btn-primary buttonstyle btn_width submitUser"
                            onClick={handleUserUpdateProfile}>
                            Submit
                        </button>&nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary buttonstyle btn_width submitUser"
                            onClick={handleClear}>
                            Cancel
                        </button>&nbsp;&nbsp;
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapToProps = function (state) {
    return {
        UserprofileModel: state.candidateUpdateDetails.UserprofileModel,
        isUserprofileIn: state.candidateUpdateDetails.isUserprofileIn,
        isUserprofileSuccess: state.candidateUpdateDetails.isUserprofileSuccess,
        UserprofileError: state.candidateUpdateDetails.UserprofileError,
        UserprofileStatus: state.candidateUpdateDetails.UserprofileStatus,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        updateUserProfile: (fields) => dispatch(CandidateUpdateDetailsAction.updateUserProfile(fields)),
        setupdateUserProfileSuccess: () => dispatch(CandidateUpdateDetailsAction.setupdateUserProfileSuccess()),
        setupdateUserProfileError: () => dispatch(CandidateUpdateDetailsAction.setupdateUserProfileError()),
    }
}

export default connect(mapToProps, mapDispatchToProps)(CandidateUpdateDetails);
