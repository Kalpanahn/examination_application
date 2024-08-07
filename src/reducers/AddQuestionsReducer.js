const addQuestionState = {
    AddQuestionModel: [],
    isAddQuestionIn: false,
    isAddQuestionSuccess: false,
    AddQuestionError: '',
    AddQuestionStatus: [],
}

export const addQuestion = (state = addQuestionState, action) => {
    switch (action.type) {
        // case 'ADD_QUESTION_START':
        //     return { isAddQuestionIn: true, isAddQuestionSuccess: false };
        // case 'ADD_QUESTION_SUCCESS':
        //     return { AddQuestionModel: action.payload, isAddQuestionIn: false, isAddQuestionSuccess: true, AddQuestionStatus: action.AddQuestionStatus };
        // case 'ADD_QUESTION_FAILURE':
        //     return { AddQuestionError: action.payload, isAddQuestionIn: false, isAddQuestionSuccess: false, AddQuestionStatus: action.AddQuestionStatus };
        // case 'SET_IS_ADD_QUESTION_SUCCESS':
        //     return { isAddQuestionSuccess: false };
        // case 'SET_IS_ADD_QUESTION_ERROR':
        //     return { AddQuestionError: '' };

        case 'ADD_QUESTION_START':
            return Object.assign({}, state, { isAddQuestionIn: true, isAddQuestionSuccess: false })
        case 'ADD_QUESTION_SUCCESS':
            return Object.assign({}, state, { AddQuestionModel: action.payload, isAddQuestionIn: false, isAddQuestionSuccess: true })
        case 'ADD_QUESTION_FAILURE':
            return Object.assign({}, state, { AddQuestionError: action.payload, isAddQuestionIn: false, isAddQuestionSuccess: false })
        case 'SET_IS_ADD_QUESTION_SUCCESS':
            return Object.assign({}, state, { isAddQuestionSuccess: false })
        case 'SET_IS_ADD_QUESTION_ERROR':
            return Object.assign({}, state, { AddQuestionError: '' })

        default:
            return state;
    }
};