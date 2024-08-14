import React, { useState, useEffect } from 'react';
import * as ResultPageAction from '../actions/ResultPageAction';
import { connect } from 'react-redux';

function ResultPage(props) {
    useEffect(() => {
        props.getResult();
    }, []);
    console.log("ResultModel",props.ResultModel)
    return (
        <div className="card cardmain_align">
            <div className="row mt-3">
                <div className="col-12">
                    <h5>Result</h5>
                </div>
            </div>
            <form className="form-align">
                <div className="col-3 form-group">
                    <label className="label_style">Status</label> :
                </div>
                <div className="row rowalign">
                    <div className="col-3 form-group">
                        <label className="label_style">Total Number Of Questions</label> :
                    </div>
                    <div className="col-3 form-group">
                        <label className="label_style">Number Of Question Attended </label> :
                    </div>
                    <div className="col-3 form-group">
                        <label className="label_style">Number Of Correct Answered</label> :
                    </div>
                    <div className="col-3 form-group">
                        <label className="label_style">Number Of Wrong Answered</label> :
                    </div>

                </div>
            </form>
        </div>
    )
}
const mapToProps = (state) => ({
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