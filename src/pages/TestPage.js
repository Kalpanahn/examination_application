import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import * as TestPageAction from '../actions/TestPageAction';
import { connect } from 'react-redux';
import swal from "sweetalert";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function TestPage(props) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [questionData, setQuestionData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [time, setTime] = useState(20 * 60);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [isTimerStopped, setIsTimerStopped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.QuestionsModel) {
      const mappedQuestions = Object.keys(props.QuestionsModel).map(key => {
        const question = props.QuestionsModel[key];
        return {
          id: question._id,
          text: question.question,
          options: [question.option1, question.option2, question.option3, question.option4],
          correctOption: question.answer,
        };
      });
      setQuestions(mappedQuestions);
      if (mappedQuestions.length > 0) {
        setQuestionData(mappedQuestions[0]);
      }
    }
  }, [props.QuestionsModel]);

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
    setQuestionData(questions[number - 1] || null);
    setCurrentQuestionIndex(number - 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedNumber(currentQuestionIndex);
      setQuestionData(questions[currentQuestionIndex - 1] || null);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedNumber(currentQuestionIndex + 2);
      setQuestionData(questions[currentQuestionIndex + 1] || null);
    }
  };

  const handleOptionClick = (questionId, option) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [questionId]: option,
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (time === 0) {
      swal({
        title: "Time's up!",
        text: "You will be redirected to the login page.",
        icon: "warning",
        button: "OK",
        closeOnClickOutside: false
      }).then(() => {
        navigate('/');
      });
    }
  }, [time, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  const handleSubmit = () => {
    setIsTestCompleted(true);
    setIsTimerStopped(true);
    setTotalTimeTaken(20 * 60 - time);

    const responses = questions.map(question => ({
      question: question.text,
      answer: selectedOptions[question.id] || '',
      correctAnswer: question.correctOption || '',
    }));

    const categories = props.QuestionsModel.map(question => question.category);
    const uniqueCategories = [...new Set(categories)];
    const categoriesString = uniqueCategories.join(', ');

    // Get the current date in ISO format
    const localDateTime = new Date().toISOString();

    let fields = {
      email: window.localStorage.getItem("email"),
      name: window.localStorage.getItem("name"),
      category: categoriesString,
      date: localDateTime, // Use ISO format
      time: window.localStorage.getItem("time"),
      accuracy: window.localStorage.getItem("accuracy"),
      responses: responses,
    };

    props.SubmitTestAnswer(fields);
  };



  useEffect(() => {
    if (props.isSubmitAnswersSuccess && props.SubmitAnswersStatus === 200) {
      props.setSubmitTestAnswerSuccess();
      swal({
        title: "Test Submitted Successfully.",
        icon: "success",
        button: "OK",
        closeOnClickOutside: false
      }).then(okay => {
        if (okay) {
          navigate('/');
        }
      });
    } else if (props.SubmitAnswersError) {
      swal({
        title: props.SubmitAnswersError,
        icon: "error",
        button: "OK",
        closeOnClickOutside: false
      }).then(okay => {
        if (okay) {
          navigate('/');
        }
      });
      props.setSubmitTestAnswerError();
    }
  }, [props.isSubmitAnswersSuccess,navigate, props.SubmitAnswersStatus, props.setSubmitTestAnswerError]);

  useEffect(() => {
    props.getQuestions();
  }, []);

  useEffect(() => {
    if (props.QuestionsModel) {
      const mappedQuestions = Object.keys(props.QuestionsModel).map(key => {
        const question = props.QuestionsModel[key];
        return {
          id: question._id,
          text: question.question,
          options: [question.option1, question.option2, question.option3, question.option4],
          correctOption: question.answer,
        };
      });
      setQuestions(mappedQuestions);
      if (mappedQuestions.length > 0) {
        setQuestionData(mappedQuestions[0]);
      }
    }
  }, [props.QuestionsModel]);
  
  return (
    <div className='container-fluid mt-4'>
      <Navbar />
      <div>
        <div className="text-center mb-3 mt-3">
          {isTimerStopped ? formatTime(totalTimeTaken) : formatTime(time)}
        </div>
      </div>
      <div className="card cardmain_align1">
        <ToastContainer />
        {time <= 300 && time > 0 && (
          <h4 className="blink-txt" style={{ color: 'red', fontWeight: '600', textAlign: 'center', padding: '5px' }}>
            {time <= 60
              ? `Your test will be ended automatically in ${formatTime(time)}`
              : `Your test will be ended automatically in ${formatTime(300)} (5 minutes)`}
          </h4>
        )}
        <div className="card mb-3">
          <div className="row rowalign">
            <div className="nav nav-underline justify-content-end">
              <button type="button" className="btn btn-success finish-btn float-end" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
          <b><h5 style={{ color: 'red', fontWeight: '600', textAlign: 'start', padding: '5px' }}>Questions:</h5></b>
          <div className="card-body" style={{ display: 'flex', padding: '10px', flexWrap: 'wrap' }}>

            {questions.map((question, index) => (
              <div key={index}>
                <div
                  className="border border-primary font-weight-bold"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '40px',
                    width: '40px',
                    marginRight: '5px',
                    marginBottom: '5px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: selectedNumber === index + 1 ? 'lightblue' : 'transparent',
                  }}
                  onClick={() => handleNumberClick(index + 1)}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {questionData && (
          <div className="card">
            <div className="card-header bg-white font-weight-bold" style={{ fontSize: '18px', fontWeight: 'bold', color: '#cb2f2f', }}>
              {selectedNumber}. {questionData.text}
            </div>
            <div className="card-body">
              {questionData.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(questionData.id, option)}
                  style={{ display: 'flex', alignItems: 'center', fontSize: '18px', cursor: 'pointer' }}
                >
                  <div
                    style={{
                      height: '20px',
                      width: '20px',
                      borderRadius: '100px',
                      backgroundColor: selectedOptions[questionData.id] === option ? '#3568c3' : '#bfc5ceba',
                      cursor: 'pointer',
                      marginRight: '5px',
                    }}
                  ></div>
                  <span style={{ marginRight: '10px' }}>{String.fromCharCode(65 + index)}.</span>
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px' }}>
          <button className="btn btn-info prev-btn" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button className="btn btn-primary next-btn" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
            Next
          </button>
        </div>

        {isTestCompleted && (
          <div className='result d-flex justify-content-center align-items-center mt-3'>
            <p>Total Time Taken: {formatTime(totalTimeTaken)}</p>&nbsp;
          </div>
        )}
      </div>
    </div>
  );
}

const mapToProps = (state) => ({
  //gett questions
  QuestionsModel: state.testPage.QuestionsModel,
  isQuestionsIn: state.testPage.isQuestionsIn,
  isQuestionsSuccess: state.testPage.isQuestionsSuccess,
  QuestionsError: state.testPage.QuestionsError,

  //submit test answer
  SubmitAnswersModel: state.testPage.SubmitAnswersModel,
  isSubmitAnswersIn: state.testPage.isSubmitAnswersIn,
  isSubmitAnswersSuccess: state.testPage.isSubmitAnswersSuccess,
  SubmitAnswersError: state.testPage.SubmitAnswersError,
  SubmitAnswersStatus: state.testPage.SubmitAnswersStatus,
});

const mapDispatchToProps = (dispatch) => ({
  //get questions
  getQuestions: (fields) => dispatch(TestPageAction.getQuestions(fields)),
  setQuestionsSuccess: () => dispatch(TestPageAction.setQuestionsSuccess()),

  //submit test answers
  SubmitTestAnswer: (fields) => dispatch(TestPageAction.SubmitTestAnswer(fields)),
  setSubmitTestAnswerSuccess: () => dispatch(TestPageAction.setSubmitTestAnswerSuccess()),
  setSubmitTestAnswerError: () => dispatch(TestPageAction.setSubmitTestAnswerError()),
});

export default connect(mapToProps, mapDispatchToProps)(TestPage);
