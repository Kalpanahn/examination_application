const questionsState = {
    isQuestionsIn: false,
    isQuestionsSuccess: false,
    QuestionsModel: [],
    QuestionsError: '',
}

export const questionsPage = (state = questionsState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};