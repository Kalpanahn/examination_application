import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as TestPageAction from '../actions/TestPageAction';

function Guidelines(props) {
    const [isChecked, setIsChecked] = useState(false);
    const [questionCount, setQuestionCount] = useState(0);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        props.getQuestions();
      }, []);

      useEffect(() => {
        if (props.QuestionsModel && props.QuestionsModel.length > 0) {
          setQuestionCount(props.QuestionsModel.length);
        }
      }, [props.QuestionsModel]);

    return (
        <div className='container-fluid mt-4'>
            {/* <Navbar /> */}
            <section class="guidelines-section">
                <div class="container-fluid">
                    <div class="row">
                        <div class="guidelines-helpsec col-md-12 col-lg-12">
                            <div class="guidelines-border"><div class="guidelines-heading"><h4>Guidelines for the Online Test</h4></div></div>
                            <div class="guidelines-list">
                                <ol>
                                   <li>There are {questionCount} multiple choice questions with 20 minutes time</li>
                                    <li>No use of mobile phones </li>
                                    <li style={{ color: 'red' }}>If you try to switch or reload  the tab, test will be ended automatically</li>
                                    {/* <li>First 10 questions  are aptitude followed by 10 technical questions </li> */}
                                    <li>Test will be automatically submitted if you fail to submit the Test</li>
                                </ol>
                                <input id="inputVacationPercentage" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />&nbsp;
                                <label for="inputVacationPercentage" class="switch switch-default">I agree with the above guidelines and hereby I give my consent to follow the guidelines.</label>
                            </div>

                            <div className="row rowalign">
                                <div className="nav nav-underline justify-content-center">
                                    {isChecked && (
                                        <a href='/TypingTest'>
                                            <button type="submit" className="btn btn-info">
                                                Start Typing
                                            </button>
                                        </a>)}
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
const mapToProps = (state) => ({
    //gett questions
    QuestionsModel: state.testPage.QuestionsModel,
    isQuestionsIn: state.testPage.isQuestionsIn,
    isQuestionsSuccess: state.testPage.isQuestionsSuccess,
    QuestionsError: state.testPage.QuestionsError,
  
  });
  
  const mapDispatchToProps = (dispatch) => ({
    //get questions
    getQuestions: (fields) => dispatch(TestPageAction.getQuestions(fields)),
    setQuestionsSuccess: () => dispatch(TestPageAction.setQuestionsSuccess()),
  
  });
  
  export default connect(mapToProps, mapDispatchToProps)(Guidelines);
  