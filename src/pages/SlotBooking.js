import React, { useState, useRef, useEffect } from "react";
import swal from 'sweetalert';
import * as SlotBookingAction from '../actions/SlotBookingAction'
import { connect } from 'react-redux';
import moment from 'moment';

function SlotBooking(props) {
    const [districtId, setDistrictId] = useState("");
    const [date, setDate] = useState("")
    const [selectedSlot, setSelectedSlot] = useState("");
    const [districtName, setDistrictName] = useState("");
    const KGIDNumber = window.localStorage.getItem("KGID")
    // const adminApprovalStatus = KGIDNumber 
    // ? props.getKgidCandidateSlotStatusModel.adminApproval 
    // : props.getCandidateSlotStatusModel.adminApproval;


    const handleDistrictChange = (e) => {
        const selectedId = e.target.value;
        if (selectedId === "select") {
            setDistrictId("");
            setDistrictName("");
            return;
        }
        setDistrictId(selectedId);
        const selectedDistrict = props.getDistrictModel.find(district => district.districtcode.toString() === selectedId);
        if (selectedDistrict) {
            setDistrictName(selectedDistrict.districtname);
        } else {
        }
    };


    const handlebookslot = (e) => {
        e.preventDefault();
        if (districtId === '') {
            swal({
                title: "Please Select District Name !",
                icon: "error",
                button: "OK",
            });
        }
        else if (date === "") {
            swal({
                title: "Please Select Date !",
                icon: "error",
                button: "OK",
            });
        }
        else if (!selectedSlot) {
            swal({
                title: "Please Select Time Slot!",
                icon: "error",
                button: "OK",
            });
        }
        else {
            let fields = {
                district: districtName,
                date: date,
                time: selectedSlot.time,
                email: window.localStorage.getItem("email")
            }
            props.bookSlot(fields)
        }
    }

    useEffect(() => {
        props.getDistrictList();
    }, []);

    useEffect(() => {
        let fields = {
            user_id: window.localStorage.getItem("_id")
        }
        props.CandidateSlotStatus(fields);
    }, []);

    useEffect(() => {
        let fields = {
            KGID: window.localStorage.getItem("KGID")
        }
        props.KgidCandidateSlotStatus(fields);
    }, []);

    useEffect(() => {
        if (date !== '') {
            const formattedDate = moment(date).format('YYYY-MM-DD');
            const fields = { date: formattedDate };
            props.getTimeSlots(fields);
        }
    }, [date]);

    const handleTimeSlotClick = (slot) => {
        if (slot.bookings < 3) {
            setSelectedSlot(slot);
        }
    };

    useEffect(() => {
        if (props.isBookSlotSuccess && props.BookSlotStatus === 200) {
            props.setbookSlotSuccess();
            swal({
                title: "Slot booked successfully",
                icon: "success",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    window.location.reload();
                }
            })
        } else if (props.BookSlotError) {
            const errorMessage = typeof props.BookSlotError === 'object'
                ? (props.BookSlotError.error || "An unknown error occurred")
                : props.BookSlotError;
            swal({
                title: errorMessage,
                icon: "error",
                button: "OK",
                closeOnClickOutside: false
            }).then(okay => {
                if (okay) {
                    handlecancel();
                }
                props.setbookSlotError();
            });
        }

    }, [props.isBookSlotSuccess, props.BookSlotStatus, props.BookSlotError]);
    const handlecancel = () => {
        setDistrictId("")
        setDate("")
        setSelectedSlot("")
    }

    return (
        <div className="card cardmain_align">
            <div className="row mt-3">
                <div className="col-12">
                    <h5>Booking Slots</h5>
                </div>
            </div>
           <div className="notification" style={{ marginTop: '-56px', padding: '10px', marginLeft: "60rem" }}>
  {KGIDNumber ? 
    (props.getKgidCandidateSlotStatusModel.adminApproval !== "pending" && (
      <h5>
        Status: Your Slot has been {props.getKgidCandidateSlotStatusModel.adminApproval}
      </h5>
    )) : 
    (props.getCandidateSlotStatusModel.adminApproval !== "pending" && (
      <h5>
        Status: Your Slot has been {props.getCandidateSlotStatusModel.adminApproval}
      </h5>
    ))
  }
</div>

            <form className="form-align">
                <div className="row rowalign">
                    <div className="col-3 form-group">
                        <label className="label_style">District</label> :&nbsp;
                        <div className="material-textfield">
                            <select className="form-select" aria-label="Default select example" value={districtId} onChange={handleDistrictChange}>
                                <option value="select">Select</option>
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
                        <label className="label_style">Date</label> :&nbsp;
                        <div className="material-textfield">
                            <input type="date" className="form-control login_input" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-3 form-group">
                        <label className="label_style">Timing Slots</label> :&nbsp;
                        <div className="timing-slots">
                            {props.GetTimeSlotModel && props.GetTimeSlotModel.slots && props.GetTimeSlotModel.slots.length > 0 ? (
                                props.GetTimeSlotModel.slots.map((slot) => (
                                    <div
                                        key={slot._id}
                                        className={`slot ${selectedSlot === slot ? 'selected' : ''}`}
                                        onClick={() => handleTimeSlotClick(slot)}
                                        style={{ color: slot.bookings >= 3 ? 'gray' : 'black' }}>
                                        {slot.time} {slot.bookings >= 3 ? '(Full)' : ''}
                                    </div>
                                ))
                            ) : (
                                <div>No Slots Available</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row rowalign">
                    <div className="nav nav-underline justify-content-center">
                        <button type="button" className="btn btn-primary buttonstyle btn_width submitUser"
                            onClick={handlebookslot}>
                            Submit
                        </button>&nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary buttonstyle btn_width submitUser"
                            onClick={handlecancel}>
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
        //get Destrict
        getDistrictModel: state.slotBooking.getDistrictModel,
        isGetDistrictIn: state.slotBooking.isGetDistrictIn,
        isGetDistrictSuccess: state.slotBooking.isGetDistrictSuccess,
        GetDistrictError: state.slotBooking.GetDistrictError,

        //slot booking
        BookSlotModel: state.slotBooking.BookSlotModel,
        isBookSlotIn: state.slotBooking.isBookSlotIn,
        isBookSlotSuccess: state.slotBooking.isBookSlotSuccess,
        BookSlotError: state.slotBooking.BookSlotError,
        BookSlotStatus: state.slotBooking.BookSlotStatus,

        //get time slot
        GetTimeSlotModel: state.slotBooking.GetTimeSlotModel,
        isGetTimeSlotIn: state.slotBooking.isGetTimeSlotIn,
        isGetTimeSlotSuccess: state.slotBooking.isGetTimeSlotSuccess,
        GetTimeSlotError: state.slotBooking.GetTimeSlotError,

        //get candidate slot status
        getCandidateSlotStatusModel: state.slotBooking.getCandidateSlotStatusModel,
        isGetCandidateSlotStatusIn: state.slotBooking.isGetCandidateSlotStatusIn,
        isGetCandidateSlotStatusSuccess: state.slotBooking.isGetCandidateSlotStatusSuccess,
        GetCandidateSlotStatusError: state.slotBooking.GetCandidateSlotStatusError,

        //get  kgid candidate slot status
        getKgidCandidateSlotStatusModel: state.slotBooking.getKgidCandidateSlotStatusModel,
        isGetKgidCandidateSlotStatusIn: state.slotBooking.isGetKgidCandidateSlotStatusIn,
        isGetKgidCandidateSlotStatusSuccess: state.slotBooking.isGetKgidCandidateSlotStatusSuccess,
        GetKgidCandidateSlotStatusError: state.slotBooking.GetKgidCandidateSlotStatusError,



    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        //get Destrict
        getDistrictList: () => dispatch(SlotBookingAction.getDistrictList()),
        setDistrictListSuccess: () => dispatch(SlotBookingAction.setDistrictListSuccess()),
        setDistrictListError: () => dispatch(SlotBookingAction.setDistrictListError()),

        //slot booking
        bookSlot: (fields) => dispatch(SlotBookingAction.bookSlot(fields)),
        setbookSlotSuccess: () => dispatch(SlotBookingAction.setbookSlotSuccess()),
        setbookSlotError: () => dispatch(SlotBookingAction.setbookSlotError()),

        //get time slot
        getTimeSlots: (fields) => dispatch(SlotBookingAction.getTimeSlots(fields)),
        setgetTimeSlotsSuccess: () => dispatch(SlotBookingAction.setgetTimeSlotsSuccess()),
        setgetTimeSlotsError: () => dispatch(SlotBookingAction.setgetTimeSlotsError()),

        //get candidate slot status
        CandidateSlotStatus: (fields) => dispatch(SlotBookingAction.CandidateSlotStatus(fields)),
        setCandidateSlotStatusSuccess: () => dispatch(SlotBookingAction.setCandidateSlotStatusSuccess()),
        setCandidateSlotStatusError: () => dispatch(SlotBookingAction.setCandidateSlotStatusError()),

        //get  kgid candidate slot status
        KgidCandidateSlotStatus: (fields) => dispatch(SlotBookingAction.KgidCandidateSlotStatus(fields)),
        setKgidCandidateSlotSuccess: () => dispatch(SlotBookingAction.setKgidCandidateSlotSuccess()),
        setKgidCandidateSlotError: () => dispatch(SlotBookingAction.setKgidCandidateSlotError()),

    }
}

export default connect(mapToProps, mapDispatchToProps)(SlotBooking);

