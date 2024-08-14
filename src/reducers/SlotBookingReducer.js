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

    //get BookedCandidateList
    getBookedCandidateListModel: [],
    isGetBookedCandidateListIn: false,
    isGetBookedCandidateListSuccess: false,
    GetBookedCandidateListError: '',

    //admin approvals
    AdminApprovalModel: [],
    isAdminApprovalIn: false,
    isAdminApprovalSuccess: false,
    AdminApprovalError: '',
    AdminApprovalStatus: [],

    // candidate slot booked status
    getCandidateSlotStatusModel: [],
    isGetCandidateSlotStatusIn: false,
    isGetCandidateSlotStatusSuccess: false,
    GetCandidateSlotStatusError: '',

 // kgid candidate slot booked status
    getKgidCandidateSlotStatusModel: [],
    isGetKgidCandidateSlotStatusIn: false,
    isGetKgidCandidateSlotStatusSuccess: false,
    GetKgidCandidateSlotStatusError: '',

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

        // get BookedCandidateList
        case 'GET_BOOKEDCANDIDATE_LIST_START':
            return Object.assign({}, state, { isGetBookedCandidateListIn: true, isGetBookedCandidateListSuccess: false, })
        case 'GET_BOOKEDCANDIDATE_LIST_SUCCESS':
            return Object.assign({}, state, { getBookedCandidateListModel: action.payload, isGetBookedCandidateListIn: false, isGetBookedCandidateListSuccess: true })
        case 'GET_BOOKEDCANDIDATE_LIST_FAILURE':
            return Object.assign({}, state, { GetBookedCandidateListError: action.payload, isGetBookedCandidateListIn: false, isGetBookedCandidateListSuccess: false })
        case 'SET_IS_GET_BOOKEDCANDIDATE_LIST_SUCCESS':
            return Object.assign({}, state, { isGetBookedCandidateListSuccess: false })
        case 'SET_GET_BOOKEDCANDIDATE_LIST_FAILURE':
            return Object.assign({}, state, { GetBookedCandidateListError: '' })


        //admin approvals
        case 'ADMIN_APPROVALS_START':
            return Object.assign({}, state, { isAdminApprovalIn: true, isAdminApprovalSuccess: false, })
        case 'ADMIN_APPROVALS_SUCCESS':
            return Object.assign({}, state, { AdminApprovalModel: action.payload, isAdminApprovalIn: false, isAdminApprovalSuccess: true, AdminApprovalStatus: action.AdminApprovalStatus })
        case 'ADMIN_APPROVALS_FAILURE':
            return Object.assign({}, state, { AdminApprovalError: action.payload, isAdminApprovalIn: false, isAdminApprovalSuccess: false, AdminApprovalStatus: action.AdminApprovalStatus })
        case 'SET_IS_ADMIN_APPROVALS_SUCCESS':
            return Object.assign({}, state, { isAdminApprovalSuccess: false })
        case 'SET_IS_ADMIN_APPROVALS_ERROR':
            return Object.assign({}, state, { AdminApprovalError: '' })

        // candidate slot booked status
        case 'CANDIDATE_SLOTSTATUS_START':
            return Object.assign({}, state, { isGetCandidateSlotStatusIn: true, isGetCandidateSlotStatusSuccess: false, })
        case 'CANDIDATE_SLOTSTATUS_SUCCESS':
            return Object.assign({}, state, { getCandidateSlotStatusModel: action.payload, isGetCandidateSlotStatusIn: false, isGetCandidateSlotStatusSuccess: true, })
        case 'CANDIDATE_SLOTSTATUS_FAILURE':
            return Object.assign({}, state, { GetCandidateSlotStatusError: action.payload, isGetCandidateSlotStatusIn: false, isGetCandidateSlotStatusSuccess: false })
        case 'SET_IS_CANDIDATE_SLOTSTATUS_SUCCESS':
            return Object.assign({}, state, { isGetCandidateSlotStatusSuccess: false })
        case 'SET_IS_CANDIDATE_SLOTSTATUS_ERROR':
            return Object.assign({}, state, { GetCandidateSlotStatusError: '' })

        // candidate slot booked status
        case 'KGID_CANDIDATE_SLOTSTATUS_START':
            return Object.assign({}, state, { isGetKgidCandidateSlotStatusIn: true, isGetKgidCandidateSlotStatusSuccess: false, })
        case 'KGID_CANDIDATE_SLOTSTATUS_SUCCESS':
            return Object.assign({}, state, { getKgidCandidateSlotStatusModel: action.payload, isGetKgidCandidateSlotStatusIn: false, isGetKgidCandidateSlotStatusSuccess: true, })
        case 'KGID_CANDIDATE_SLOTSTATUS_FAILURE':
            return Object.assign({}, state, { GetKgidCandidateSlotStatusError: action.payload, isGetKgidCandidateSlotStatusIn: false, isGetKgidCandidateSlotStatusSuccess: false })
        case 'SET_IS_KGID_CANDIDATE_SLOTSTATUS_SUCCESS':
            return Object.assign({}, state, { isGetKgidCandidateSlotStatusSuccess: false })
        case 'SET_IS_KGID_CANDIDATE_SLOTSTATUS_ERROR':
            return Object.assign({}, state, { GetKgidCandidateSlotStatusError: '' })

        default:
            return state;
    }
}