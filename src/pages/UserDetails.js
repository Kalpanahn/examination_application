import React from 'react'

function UserDetails() {
    return (
        <div>
            <div className="container-fluid mt-4">
      
        <div className="card cardmain_align">
          
            <div className="row mt-3">
                <div className="col-12">
                    <h5>User Details</h5>
                </div>
            </div>
            <form className="form-align">
                <div className="row rowalign">
                    <div className="col-3 form-group">
                        <label className="label_style">UserName</label> :&nbsp;
                    </div>
                    <div className="col-3 form-group">
                        <label className="label_style">Destrict</label> :&nbsp;
                    </div>
                    <div className="col-3 form-group">
                        <label className="label_style">Date</label> :&nbsp;
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Timing Slots</label> :&nbsp;

                    </div>
                </div>

                <div className="row rowalign">
                    <div className="nav nav-underline justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-primary buttonstyle btn_width submitUser"
                        >
                            Approve
                        </button>&nbsp;&nbsp;
                        <button
                            type="submit"
                            className="btn btn-primary buttonstyle btn_width submitUser"
                        >
                            Reject
                        </button>&nbsp;&nbsp;
                    </div>
                </div>
            </form>
        </div>
      </div>
      </div>
    )
}

export default UserDetails