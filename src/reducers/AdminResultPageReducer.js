const allUserAnswersState = {
    //get All User Answers
    isAllUserAnswersIn: false,
    isAllUserAnswersSuccess: false,
    AllUserAnswersModel: [],
    AllUserAnswersError: '',

    //view Result Approval
    ViewResultApprovalModel: [],
    isViewResultApprovalIn: false,
    isViewResultApprovalSuccess: false,
    ViewResultApprovalError: '',
    ViewResultApprovalStatus: [],
}

export const adminResultPage = (state = allUserAnswersState, action) => {
    switch (action.type) {
        //get All User Answers
        case 'GET_ALL_USER_ANSWER_START':
            return Object.assign({}, state, { isAllUserAnswersIn: true, isAllUserAnswersSuccess: false, })
        case 'GET_ALL_USER_ANSWER_SUCCESS':
            return Object.assign({}, state, { AllUserAnswersModel: action.payload, isAllUserAnswersIn: false, isAllUserAnswersSuccess: true })
        case 'GET_ALL_USER_ANSWER_FAILURE':
            return Object.assign({}, state, { AllUserAnswersError: action.payload, isAllUserAnswersIn: false, isAllUserAnswersSuccess: false })
        case 'SET_IS_GET_ALL_USER_ANSWER_SUCCESS':
            return Object.assign({}, state, { isAllUserAnswersSuccess: false })
        case 'SET_IS_GET_ALL_USER_ANSWER_ERROR':
            return Object.assign({}, state, { AllUserAnswersError: '' })

        //view Result Approval
        case 'GET_VIEW_RESULT_APPROVAL_START':
            return Object.assign({}, state, { isViewResultApprovalIn: true, isViewResultApprovalSuccess: false })
        case 'GET_VIEW_RESULT_APPROVAL_SUCCESS':
            return Object.assign({}, state, { ViewResultApprovalModel: action.payload, isViewResultApprovalIn: false, isViewResultApprovalSuccess: true })
        case 'GET_VIEW_RESULT_APPROVAL_FAILURE':
            return Object.assign({}, state, { ViewResultApprovalError: action.payload, isViewResultApprovalIn: false, isViewResultApprovalSuccess: false })
        case 'SET_IS_VIEW_RESULT_APPROVAL_SUCCESS':
            return Object.assign({}, state, { isViewResultApprovalSuccess: false })
        case 'SET_IS_GET_VIEW_RESULT_APPROVAL_ERROR':
            return Object.assign({}, state, { ViewResultApprovalError: '' })


        default:
            return state;
    }
};