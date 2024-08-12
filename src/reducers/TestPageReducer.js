const questionsState = {
    //getQuestions
    isQuestionsIn: false,
    isQuestionsSuccess: false,
    QuestionsModel: [],
    QuestionsError: '',

    //submit test answers
    SubmitAnswersModel: [],
    isSubmitAnswersIn: false,
    isSubmitAnswersSuccess: false,
    SubmitAnswersError: '',
    SubmitAnswersStatus: [],
}

export const testPage = (state = questionsState, action) => {
    switch (action.type) {
        //get questions
        case 'GET_QUESTIONS_START':
            return Object.assign({}, state, { isQuestionsIn: true, isQuestionsSuccess: false, })
        case 'GET_QUESTIONS_SUCCESS':
            return Object.assign({}, state, { QuestionsModel: action.payload, isQuestionsIn: false, isQuestionsSuccess: true })
        case 'GET_QUESTIONS_FAILURE':
            return Object.assign({}, state, { QuestionsError: action.payload, isQuestionsIn: false, isQuestionsSuccess: false })
        case 'SET_IS_GET_QUESTIONS_SUCCESS':
            return Object.assign({}, state, { isQuestionsSuccess: false })
        case 'SET_IS_GET_QUESTIONS_ERROR':
            return Object.assign({}, state, { QuestionsError: '' })

            //submit test Answers
        case 'SUBMIT_ANSWER_START':
            return Object.assign({}, state, { isSubmitAnswersIn: true, isSubmitAnswersSuccess: false })
        case 'SUBMIT_ANSWER_SUCCESS':
            return Object.assign({}, state, { SubmitAnswersModel: action.payload, isSubmitAnswersIn: false, isSubmitAnswersSuccess: true })
        case 'SUBMIT_ANSWER_FAILURE':
            return Object.assign({}, state, { SubmitAnswersError: action.payload, isSubmitAnswersIn: false, isSubmitAnswersSuccess: false })
        case 'SET_IS_SUBMIT_ANSWER_SUCCESS':
            return Object.assign({}, state, { isSubmitAnswersSuccess: false })
        case 'SET_IS_SUBMIT_ANSWER_ERROR':
            return Object.assign({}, state, { SubmitAnswersError: '' })
        default:
            return state;
    }
};