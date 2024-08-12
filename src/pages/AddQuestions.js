import React, { useState, useRef, useEffect } from "react";
import swal from 'sweetalert';
import logo from '../Images/loadingdots2.gif'
import { connect } from 'react-redux';
import * as AddQuestionsAction from '../actions/AddQuestionsAction'

function AddQuestions(props) {
    const imageURL = logo;
    const [category, setCategory] = useState("");
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [crctAns, setCrctAns] = useState("");

    const handleImageChange = (e) => { }

    const AddQuestion = (e) => {
        e.preventDefault();
        if (category === "") {
            swal({
                title: "Please Select Category!",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (question === "") {
            swal({
                title: "Please Enter Question!",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (option1 === "") {
            swal({
                title: "Please Enter Option1!",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (option2 === "") {
            swal({
                title: "Please Enter Option2!",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (option3 === "") {
            swal({
                title: "Please Enter Option3!",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else if (option4 === "") {
            swal({
                title: "Please Enter Option4!",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        }
        else if (crctAns === "") {
            swal({
                title: "Please Select Correct Ans!",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            });
        } else {
            let fields = {
                category: category,
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                answer: crctAns
            }
            props.AddQuestion(fields)
        }
    }
    const ClearData = () => {
        setCategory("")
        setQuestion("")
        setOption1("")
        setOption2("")
        setOption3("")
        setOption4("")
        setCrctAns("")
    }

    useEffect(() => {
        {
            props.isAddQuestionIn &&
                swal({
                    icon: imageURL,
                    className: "swal-size-sm",
                    button: false
                })
        }
        if (props.isAddQuestionSuccess) {
            if (props.AddQuestionModel == false) {
                swal({
                    title: "Failed to Save",
                    icon: "error",
                    button: "OK",
                    closeOnClickOutside: false
                });
            }
            else {
                swal({
                    title: "Question Added Successfully.",
                    icon: "success",
                    button: "OK",
                    closeOnClickOutside: false
                }).then(okay => {
                    if (okay) {
                        ClearData()
                    }
                });
            }
        }
    }, [props.isAddQuestionSuccess, props.isAddQuestionIn])


    return (
        <>
            <div className="card cardmain_align">
                <div class="col-md-6 col-lg-6"><h3>Add Questions</h3><hr /></div>
                <form className="form-align">

                    <div className="row rowalign">

                        <div className="col-3 form-group">
                            <label className="label_style">Category</label> :<span style={{ "color": "red" }}>*</span>&nbsp;
                            <div className="material-textfield">
                                <select class="form-select" aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option selected>Select</option>
                                    <option value="1">ms word</option>
                                    <option value="2">ms excel</option>
                                    <option value="3">powerpoint</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-3 form-group">
                            <label className="label_style">Upload Question</label> :&nbsp;
                            <div className="material-textfield">
                                <input type="file" className="form-control login_input" onChange={handleImageChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row rowalign">
                        <label for="exampleSelect" className="label_style">Question</label>
                        <div className='mb-3'>
                            <textarea id="questions" name="questions" placeholder="Enter the Question" class="form-control"
                                value={question} onChange={(e) => setQuestion(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div class="option-area">
                        <div class="row">
                            <div class="col-md-4 col-lg-4">
                                <div class="mt-5 row">
                                    <div class="col-md-3 col-lg-3">
                                        <div class="mb-3">
                                            <label for="exampleSelect" className="label_style" >option 1</label>
                                        </div>
                                    </div>

                                    <div class="option-textarea col-md-9 col-lg-9">
                                        <div class="mb-3">
                                            <textarea id="option1" name="option1" placeholder="Enter the Option1" class="form-control"
                                                value={option1} onChange={(e) => setOption1(e.target.value)}>
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-lg-4">
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <div class="mt-5 row">
                                    <div class="col-md-3 col-lg-3">
                                        <div class="mb-3">
                                            <label for="exampleSelect" className="label_style"
                                            >option 2</label>
                                        </div>
                                    </div>
                                    <div class="option-textarea col-md-9 col-lg-9">
                                        <div class="mb-3">
                                            <textarea id="option2" name="option2" placeholder="Enter the Option2" class="form-control"
                                                value={option2} onChange={(e) => setOption2(e.target.value)}>
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="option-area"><div class="row">
                        <div class="col-md-4 col-lg-4">
                            <div class="mt-5 row">
                                <div class="col-md-3 col-lg-3">
                                    <div class="mb-3">
                                        <label for="exampleSelect" className="label_style">option 3</label>
                                    </div>
                                </div>
                                <div class="option-textarea col-md-9 col-lg-9">
                                    <div class="mb-3">
                                        <textarea id="option3" name="option3" placeholder="Enter the Option3" class="form-control"
                                            value={option3} onChange={(e) => setOption3(e.target.value)}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-lg-4">
                        </div>
                        <div class="col-md-4 col-lg-4">
                            <div class="mt-5 row">
                                <div class="col-md-3 col-lg-3">
                                    <div class="mb-3">
                                        <label for="exampleSelect" className="label_style">option 4</label>
                                    </div>
                                </div>
                                <div class="option-textarea col-md-9 col-lg-9">
                                    <div class="mb-3">
                                        <textarea id="option4" name="option4" placeholder="Enter the Option4" class="form-control"
                                            value={option4} onChange={(e) => setOption4(e.target.value)}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="row"><div class="col-md-4 col-lg-4">
                    </div><div class="col-md-4 col-lg-4">
                            <div class="mt-5 row">
                                <div class="col-md-5 col-lg-5">
                                    <div class="mb-3"><label for="exampleSelect" class="tech-label form-label">Choose Correct Answer</label>
                                    </div>
                                </div>
                                <div class="tech-options col-md-7 col-lg-7">
                                    <div class="mb-3">
                                        <select value={crctAns} onChange={(e) => setCrctAns(e.target.value)}>
                                            <option value=""> Select Correct Answer </option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-lg-4">
                        </div>
                    </div>
                    <hr />
                    <div className="row rowalign">
                        <div className="nav nav-underline justify-content-center">
                            <button type="submit" className="btn btn-primary buttonstyle btn_width submitUser"
                                onClick={AddQuestion}>
                                Submit
                            </button>&nbsp;&nbsp;
                            <button type="submit" className="btn btn-primary buttonstyle btn_width submitUser"
                                onClick={ClearData}>
                                Cancel
                            </button>&nbsp;&nbsp;
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

const mapToProps = function (state) {
    return {
        //add Questions
        AddQuestionModel: state.addQuestion.AddQuestionModel,
        isAddQuestionIn: state.addQuestion.isAddQuestionIn,
        isAddQuestionSuccess: state.addQuestion.isAddQuestionSuccess,
        AddQuestionError: state.addQuestion.AddQuestionError,
        AddQuestionStatus: state.addQuestion.AddQuestionStatus,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        //add Questions
        AddQuestion: (fields) => dispatch(AddQuestionsAction.AddQuestion(fields)),
        setAddQuestionSuccess: () => dispatch(AddQuestionsAction.setAddQuestionSuccess()),
        setAddQuestionError: () => dispatch(AddQuestionsAction.setAddQuestionError()),
    }
}

export default connect(mapToProps, mapDispatchToProps)(AddQuestions);
