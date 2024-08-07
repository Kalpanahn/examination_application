import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import * as QuestionsAction from '../actions/QuestionsAction';
import { connect } from 'react-redux';

function QuestionsPage(props) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [questionData, setQuestionData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [time, setTime] = useState(20 * 60); // 20 minutes in seconds
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [isTimerStopped, setIsTimerStopped] = useState(false);

  useEffect(() => {
    props.getQuestions();
  }, []);
  console.log("props.QuestionsModel", props.QuestionsModel)

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
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // const calculateAccuracy = () => {
  //   const correctAnswers = questions.filter(q => selectedOptions[q.id] === q.correctOption).length;
  //   return (correctAnswers / questions.length) * 100;
  // };

  const handleSubmit = () => {
    setIsTestCompleted(true);
    setIsTimerStopped(true);
    setTotalTimeTaken(20 * 60 - time); // Total time taken
  };

  return (
    <div className='container-fluid mt-4'>
      <Navbar />
      <div>
        <div className="text-center mb-3 mt-3">
          {isTimerStopped ? formatTime(totalTimeTaken) : formatTime(time)}
        </div>
      </div>
      <div className="card cardmain_align">
        <ToastContainer />
        {time <= 300 && time > 0 && (
          <h4 className="blink-txt" style={{ color: 'red', fontWeight: '600', textAlign: 'center', padding: '5px' }}>
            Your test will be ended automatically in {time <= 60 ? formatTime(time) : '5 minutes'}
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
            <div className="card-header bg-white font-weight-bold" style={{ fontSize: '20px', fontWeight: 'bold' }}>
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
  QuestionsModel: state.questionsPage.QuestionsModel,
  isQuestionsIn: state.questionsPage.isQuestionsIn,
  isQuestionsSuccess: state.questionsPage.isQuestionsSuccess,
  QuestionsError: state.questionsPage.QuestionsError,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (fields) => dispatch(QuestionsAction.getQuestions(fields)),
  setQuestionsSuccess: () => dispatch(QuestionsAction.setQuestionsSuccess()),
});

export default connect(mapToProps, mapDispatchToProps)(QuestionsPage);
