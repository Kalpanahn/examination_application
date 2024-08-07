import React, { useState, useRef, useEffect } from "react";
import swal from 'sweetalert';
import * as SlotBookingAction from '../actions/SlotBookingAction'
import { connect } from 'react-redux';

import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';


function SlotBooking(props) {
    const [districtId, setDistrictId] = useState("");
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [selectedSlot, setSelectedSlot] = useState("");


    const handlebookslot = (e) => {
        e.preventDefault();
        if (districtId === '') {
            swal({
                title: "Please Enter Districtname !",
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
                title: "Please Select a Time Slot! !",
                icon: "error",
                button: "OK",
            });
        }
        else {
            let fields = {
                district: districtId,
                date: date,
                time: selectedSlot.time,
                user_id: selectedSlot._id

            }
            console.log("user bookslot", fields)
            props.bookSlot(fields)
        }
    }

    useEffect(() => {
        props.getDistrictList();
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
console.log("BookSlotModel",props.BookSlotModel)


    useEffect(() => {
        if (props.isBookSlotSuccess) {
            props.setbookSlotSuccess();
            if (props.BookSlotStatus === 200) {
                swal({
                    title: "Slot booked successfully",
                    icon: "success",
                    button: "OK",
                    closeOnClickOutside: false
                }).then(okay => {
                    if (okay) {
                        window.location.href = "dasboard";
                    }
                });
            } else if (props.BookSlotStatus === 404) {
                swal({
                    title: "Time slot not found or user can book only one slot",
                    icon: "error",
                    button: "OK",
                    closeOnClickOutside: false
                }).then(okay => {
                    if (okay) {
                        window.location.reload();
                    }
                });
            } else if (props.BookSlotStatus === 400) {
                swal({
                    title: "Slot is full",
                    icon: "error",
                    button: "OK",
                    closeOnClickOutside: false
                }).then(okay => {
                    if (okay) {
                        window.location.reload();
                    }
                });
            } else if (props.BookSlotStatus === 500) {
                swal({
                    title: "Failed to book slot",
                    icon: "error",
                    button: "OK",
                    closeOnClickOutside: false
                }).then(okay => {
                    if (okay) {
                        window.location.reload();
                    }
                });
            }
        }
    }, [props.isBookSlotSuccess, props.BookSlotStatus]);

    useEffect(() => {
        if (props.BookSlotError) {
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
                    props.setbookSlotError();
                }
            });
        }
    }, [props.BookSlotError]);

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
            <form className="form-align">
                <div className="row rowalign">
                    <div className="col-3 form-group">
                        <label className="label_style">District</label> :&nbsp;
                        <div className="material-textfield">
                            <select className="form-select" aria-label="Default select example" value={districtId} onChange={(e) => setDistrictId(e.target.value)}>
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
                                        className="slot"
                                        onClick={() => slot.bookings < 3 && handleTimeSlotClick(slot)}
                                    >
                                        {slot.time} {slot.bookings >= 3 ? '(Full)' : ''}
                                    </div>
                                ))
                            ) : (
                                <div>No slots available</div>
                            )}
                        </div>



                    </div>
                </div>

                <div className="row rowalign">
                    <div className="col-12 form-group">
                        <button type="button" className="btn btn-primary buttonstyle btn_width submitUser"
                            onClick={handlebookslot}>Submit</button>&nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary buttonstyle btn_width submitUser" onClick={handlecancel}> Cancel</button>&nbsp;&nbsp;
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapToProps = function (state) {
    return {
        getDistrictModel: state.slotBooking.getDistrictModel,
        isGetDistrictIn: state.slotBooking.isGetDistrictIn,
        isGetDistrictSuccess: state.slotBooking.isGetDistrictSuccess,
        GetDistrictError: state.slotBooking.GetDistrictError,
        //
        BookSlotModel: state.slotBooking.BookSlotModel,
        isBookSlotIn: state.slotBooking.isBookSlotIn,
        isBookSlotSuccess: state.slotBooking.isBookSlotSuccess,
        BookSlotError: state.slotBooking.BookSlotError,
        BookSlotStatus: state.slotBooking.BookSlotStatus,


        GetTimeSlotModel: state.slotBooking.GetTimeSlotModel,
        isGetTimeSlotIn: state.slotBooking.isGetTimeSlotIn,
        isGetTimeSlotSuccess: state.slotBooking.isGetTimeSlotSuccess,
        GetTimeSlotError: state.slotBooking.GetTimeSlotError,


    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        getDistrictList: () => dispatch(SlotBookingAction.getDistrictList()),
        setDistrictListSuccess: () => dispatch(SlotBookingAction.setDistrictListSuccess()),
        setDistrictListError: () => dispatch(SlotBookingAction.setDistrictListError()),

        bookSlot: (fields) => dispatch(SlotBookingAction.bookSlot(fields)),
        setbookSlotSuccess: () => dispatch(SlotBookingAction.setbookSlotSuccess()),
        setbookSlotError: () => dispatch(SlotBookingAction.setbookSlotError()),


        getTimeSlots: (fields) => dispatch(SlotBookingAction.getTimeSlots(fields)),
        setgetTimeSlotsSuccess: () => dispatch(SlotBookingAction.setgetTimeSlotsSuccess()),
        setgetTimeSlotsError: () => dispatch(SlotBookingAction.setgetTimeSlotsError()),
    }
}

export default connect(mapToProps, mapDispatchToProps)(SlotBooking);

