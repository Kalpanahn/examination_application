const candidateUpdateDetailsState = {
    UserprofileModel: [],
    isUserprofileIn: false,
    isUserprofileSuccess: false,
    UserprofileError: '',
    UserprofileStatus: [],
}

export const candidateUpdateDetails = (state = candidateUpdateDetailsState, action) => {
    switch (action.type) {
        case 'UPDATEUSERPROFILE_START':
            return { isUserprofileIn: true, isUserprofileSuccess: false };
        case 'UPDATEUSERPROFILE_SUCCESS':
            return { UserprofileModel: action.payload, isUserprofileIn: false, isUserprofileSuccess: true, UserprofileStatus: action.UserprofileStatus };
        case 'UPDATEUSERPROFILE_FAILURE':
            return { UserprofileError: action.payload, isUserprofileIn: false, isUserprofileSuccess: false, UserprofileStatus: action.UserprofileStatus };
        case 'SET_IS_UPDATEUSERPROFILE_SUCCESS':
            return { isUserprofileSuccess: false };
        case 'SET_IS_UPDATEUSERPROFILE_ERROR':
            return { UserprofileError: '' };

        default:
            return state;
    }
};