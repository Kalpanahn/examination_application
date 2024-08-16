import React, { useState, useEffect } from 'react';
import * as ResultPageAction from '../actions/ResultPageAction';
import { connect } from 'react-redux';

function ResultPage(props) {

    useEffect(() => {
        const email = window.localStorage.getItem("email");
        let fields = { email };
        props.getResult(fields);
    }, []);

    const result = props.ResultModel && props.ResultModel.length > 0 ? props.ResultModel[0] : null;

    return (
        <div className="card cardmain_align">
            <div className="row mt-3">
                <div className="col-12">
                    <h5>Result</h5>
                </div>
            </div>
            <form className="form-align">

                <div className="row rowalign">
                    {result ? (
                        <div className="row rowalign">
                            <div className="col-3 form-group">
                                <label className="label_style">Total Number Of Questions</label> : <b>{result.totalQuestions}</b>
                            </div>
                            <div className="col-3 form-group">
                                <label className="label_style">Number Of Questions Attended</label> : <b>{result.attendedQuestions}</b>
                            </div>
                            <div className="col-3 form-group">
                                <label className="label_style">Number Of Correctly Answered</label> : <b>{result.score}</b>
                            </div>
                            <div className="col-3 form-group">
                                <label className="label_style">Number Of Wrongly Answered</label> : <b>{result.wrongAnswers}</b>
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </form>
        </div>
    )
}
const mapToProps = (state) => ({
    //getting Result
    ResultModel: state.resultPage.ResultModel,
    isResultIn: state.resultPage.isResultIn,
    isResultSuccess: state.resultPage.isResultSuccess,
    ResultError: state.resultPage.ResultError,
});

const mapDispatchToProps = (dispatch) => ({
    //getting Result
    getResult: (fields) => dispatch(ResultPageAction.getResult(fields)),
    setResultSuccess: () => dispatch(ResultPageAction.setResultSuccess()),
});

export default connect(mapToProps, mapDispatchToProps)(ResultPage);