const ResultState = {
    //getResult
    isResultIn: false,
    isResultSuccess: false,
    ResultModel: [],
    ResultError: '',
}

export const resultPage = (state = ResultState, action) => {
    switch (action.type) {
        //get Result
        case 'GET_RESULT_START':
            return Object.assign({}, state, { isResultIn: true, isResultSuccess: false, })
        case 'GET_RESULT_SUCCESS':
            return Object.assign({}, state, { ResultModel: action.payload, isResultIn: false, isResultSuccess: true })
        case 'GET_RESULT_FAILURE':
            return Object.assign({}, state, { ResultError: action.payload, isResultIn: false, isResultSuccess: false })
        case 'SET_IS_GET_RESULT_SUCCESS':
            return Object.assign({}, state, { isResultSuccess: false })
        case 'SET_IS_GET_RESULT_ERROR':
            return Object.assign({}, state, { ResultError: '' })

          
        default:
            return state;
    }
};