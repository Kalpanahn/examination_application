const slotBookingState = {
    //get Destrict
    getDistrictModel: [],
    isGetDistrictIn: false,
    isGetDistrictSuccess: false,
    GetDistrictError: '',

    //slot booking
    BookSlotModel: [],
    isBookSlotIn: false,
    isBookSlotSuccess: false,
    BookSlotError: '',
    BookSlotStatus: [],

    //get time slot
    GetTimeSlotModel: [],
    isGetTimeSlotIn: false,
    isGetTimeSlotSuccess: false,
    GetTimeSlotError: '',
}

export const slotBooking = (state = slotBookingState, action) => {
    switch (action.type) {
        //get Destrict
        case 'GET_DISTRICT_LIST_START':
            return Object.assign({}, state, { isGetDistrictIn: true, isGetDistrictSuccess: false, })
        case 'GET_DISTRICT_LIST_SUCCESS':
            return Object.assign({}, state, { getDistrictModel: action.payload, isGetDistrictIn: false, isGetDistrictSuccess: true })
        case 'GET_DISTRICT_LIST_FAILURE':
            return Object.assign({}, state, { GetDistrictError: action.payload, isGetDistrictIn: false, isGetDistrictSuccess: false })
        case 'SET_IS_GET_DISTRICT_LIST_SUCCESS':
            return Object.assign({}, state, { isGetDistrictSuccess: false })
        case 'SET_GET_DISTRICT_LIST_FAILURE':
            return Object.assign({}, state, { GetDistrictError: '' })

        //slot booking
        case 'BOOKSLOT_LIST_START':
            return Object.assign({}, state, { isBookSlotIn: true, isBookSlotSuccess: false, })
        case 'BOOKSLOT_LIST_SUCCESS':
            return Object.assign({}, state, { BookSlotModel: action.payload, isBookSlotIn: false, isBookSlotSuccess: true, BookSlotStatus: action.BookSlotStatus })
        case 'BOOKSLOT_LIST_FAILURE':
            return Object.assign({}, state, { BookSlotError: action.payload, isBookSlotIn: false, isBookSlotSuccess: false, BookSlotStatus: action.BookSlotStatus })
        case 'SET_IS_BOOKSLOT_LIST_SUCCESS':
            return Object.assign({}, state, { isBookSlotSuccess: false })
        case 'SET_BOOKSLOT_LIST_FAILURE':
            return Object.assign({}, state, { BookSlotError: '' })

        //get time slot
        case 'GETTIMESLOTS_LIST_START':
            return Object.assign({}, state, { isGetTimeSlotIn: true, isGetTimeSlotSuccess: false, })
        case 'GETTIMESLOTS_LIST_SUCCESS':
            return Object.assign({}, state, { GetTimeSlotModel: action.payload, isGetTimeSlotIn: false, isGetTimeSlotSuccess: true, })
        case 'GETTIMESLOTS_LIST_FAILURE':
            return Object.assign({}, state, { GetTimeSlotError: action.payload, isGetTimeSlotIn: false, isGetTimeSlotSuccess: false })
        case 'SET_IS_GETTIMESLOTS_LIST_SUCCESS':
            return Object.assign({}, state, { isGetTimeSlotSuccess: false })
        case 'SET_GETTIMESLOTS_LIST_FAILURE':
            return Object.assign({}, state, { GetTimeSlotError: '' })

        default:
            return state;
    }
}