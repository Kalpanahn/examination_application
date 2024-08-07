import React from 'react'

function Result() {
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

export default Result