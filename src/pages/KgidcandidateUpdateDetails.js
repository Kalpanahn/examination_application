import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as CandidateUpdateDetailsAction from '../actions/CandidateUpdateDetailsAction'
import { connect } from 'react-redux';
import swal from 'sweetalert';
import logo from '../Images/loadingdots2.gif'
import * as SlotBookingAction from '../actions/SlotBookingAction'

function KgidcandidateUpdateDetails(props) {
    const [preview, setPreview] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [otp, setOtp] = useState("");
    const [company, setCompany] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [experience, setExperience] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const imageURL = logo;
    const [resumeFile, setResumeFile] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [signatureFile, setSignatureFile] = useState(null);
    const [dateofjoining, setDateOfJoining] = useState("");
    const [districtId, setDistrictId] = useState("");
    const [departmentName, setDepartmentName] = useState("");

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

    const handleKgidUserUpdateProfile = (e) => {
        e.preventDefault();
        if (phone === '') {
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
        else if (address === '') {
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
        else if (districtId === '') {
            swal({
                title: "Please Select District Name",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        }
        else if (departmentName === '') {
            swal({
                title: "Please Select Department Name",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        }
        else if (dateofjoining === '') {
            swal({
                title: "Please Select Dateof Joining",
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
            formData.append("phone", phone);
            formData.append("dob", dob);
            formData.append("name", window.localStorage.getItem("name"));
            formData.append("email", window.localStorage.getItem("email"));
            formData.append("KGID", window.localStorage.getItem("KGID"));
            formData.append("address", address);
            formData.append("role", designation);
            formData.append("currentCompany", company);
            formData.append("experience", experience);
            formData.append("gender", gender);
            formData.append("doj", dateofjoining);
            formData.append("district", districtId);
            formData.append("department", departmentName);

            if (imageFile) {
                formData.append("profilepic", imageFile);
            }
            if (signatureFile) {
                formData.append("signaturepic", signatureFile);
            }
            if (resumeFile) {
                formData.append("resume", resumeFile);
            }
            props.kgidUpdateUserProfile(formData)
        }
    }

    useEffect(() => {
        if (props.isKgidUserprofileSuccess && props.KgidUserprofileStatus === 200) {
            props.setKgidUpdateUserProfileSuccess();
            swal({
                title: "Candidate updated successfully",
                icon: "success",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    window.location.href = "KgidDashboard";
                }
            });
        } else if (props.KgidUserprofileError) {
            swal({
                title: props.KgidUserprofileError,
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    handleClear();
                }
            });
            props.setKgidUpdateUserProfileError();
        }
    }, [props.KgidUserprofileStatus, props.isKgidUserprofileSuccess, props.KgidUserprofileError]);

    const handleClear = () => {
        setName("")
        setEmail("")
        setPassword("")
        setDistrictId("")
        setPhone("")
        setDob("")
        setDate("")
        setCompany("")
        setDesignation("")
        setAddress("")
        setExperience("")
        setGender("")
        setImageFile("")
        setSignatureFile("")
        setResumeFile("")
        setDateOfJoining("")
        setDepartmentName("")
    }

    useEffect(() => {
        props.getDistrictList();
    }, []);

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

    const candidatename = window.localStorage.getItem("name");
    const candidateemail = window.localStorage.getItem("email");
    const kgidNumber = window.localStorage.getItem("KGID")

    return (
        <div className="card cardmain_align">
            <div className="row mt-3">
                <div className="col-12">
                    <h5>Candidate Update Details</h5>
                </div>
            </div>
            <form className="form-align" >
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
                        <label className="label_style">KGID Number</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input className="form-control login_input"
                                type="text" value={kgidNumber} disabled />
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Phone Number</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input placeholder="Please Enter Phone Number" type="text" className="form-control login_input"
                                onChange={(e) => setPhone(e.target.value)} maxLength={10} pattern="\d*"
                                inputMode="numeric" onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '');
                                    setPhone(e.target.value)
                                }} />
                        </div>
                    </div>


                </div>

                <div className="row rowalign">
                    <div className="col-3 form-group">
                        <label className="label_style">Date of Birth</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input type="date" placeholder="Please Select Date Of Birth" className="form-control login_input"
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Current Company</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input placeholder="Please Enter Current Company Name" type="text" minLength={6} className="form-control login_input"
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Current Designation/Role</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input placeholder="Please Enter Current Designation/Role" type="text" className="form-control login_input"
                                onChange={(e) => setDesignation(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Date of Joining</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input type="date" placeholder="Please Select Date Of Birth" className="form-control login_input"
                                onChange={(e) => setDateOfJoining(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="row rowalign">
                    <div className="col-3 form-group">
                        <label className="label_style">Experience</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <select class="form-select" aria-label="Default select example"
                                onChange={(e) => setExperience(e.target.value)}>
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
                        <label className="label_style">Address Line</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input placeholder="Please Enter Address" type="text" className="form-control login_input"
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>


                    <div className="col-3 form-group">
                        <label className="label_style">District</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <select class="form-select" aria-label="Default select example" value={districtId} onChange={(e) => setDistrictId(e.target.value)}
                            >
                                <option selected>Select</option>
                                {props.getDistrictModel && Array.isArray(props.getDistrictModel) &&
                                    props.getDistrictModel.map((district) => (
                                        <option key={district.districtcode} value={district.districtcode}>
                                            {district.districtname}
                                        </option>
                                    ))}

                            </select>
                        </div>
                    </div>
                    <div className="col-3 form-group">
                        <label className="label_style">Upload Image</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input type="file" className="form-control login_input" accept=".png, .jpg" onChange={e => handleImageChange(e)}

                            />
                        </div>
                    </div>
                    <div className="col-3 form-group">
                        <label className="label_style">Upload Signature</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <input type="file" className="form-control login_input" accept=".png, .jpg" onChange={e => handleSignatureChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-3 form-group">
                        <label className="label_style">Upload Resume</label> :&nbsp;
                        <div className="material-textfield">
                            <input type="file" id="file" onChange={e => resumeUpload(e)} required accept='.pdf'
                                className="form-control login_input" />
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Department Name</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                        <div className="material-textfield">
                            <textarea placeholder="Please Enter Name" type="text" className="form-control login_input" onChange={(e) => setDepartmentName(e.target.value)}
                            />
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
                            onClick={handleKgidUserUpdateProfile}>
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
        //KGID user profile update
        KgidUserprofileModel: state.candidateUpdateDetails.KgidUserprofileModel,
        isKgidUserprofileIn: state.candidateUpdateDetails.isKgidUserprofileIn,
        isKgidUserprofileSuccess: state.candidateUpdateDetails.isKgidUserprofileSuccess,
        KgidUserprofileError: state.candidateUpdateDetails.KgidUserprofileError,
        KgidUserprofileStatus: state.candidateUpdateDetails.KgidUserprofileStatus,

        //get district
        getDistrictModel: state.slotBooking.getDistrictModel,
        isGetDistrictIn: state.slotBooking.isGetDistrictIn,
        isGetDistrictSuccess: state.slotBooking.isGetDistrictSuccess,
        GetDistrictError: state.slotBooking.GetDistrictError,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        //KGID user profile update
        kgidUpdateUserProfile: (fields) => dispatch(CandidateUpdateDetailsAction.kgidUpdateUserProfile(fields)),
        setKgidUpdateUserProfileSuccess: () => dispatch(CandidateUpdateDetailsAction.setKgidUpdateUserProfileSuccess()),
        setKgidUpdateUserProfileError: () => dispatch(CandidateUpdateDetailsAction.setKgidUpdateUserProfileError()),

        //get district
        getDistrictList: () => dispatch(SlotBookingAction.getDistrictList()),
        setDistrictListSuccess: () => dispatch(SlotBookingAction.setDistrictListSuccess()),
        setDistrictListError: () => dispatch(SlotBookingAction.setDistrictListError()),

    }
}

export default connect(mapToProps, mapDispatchToProps)(KgidcandidateUpdateDetails);