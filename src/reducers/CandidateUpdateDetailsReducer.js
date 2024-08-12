const candidateUpdateDetailsState = {
    //NON_KGID user profile update
    UserprofileModel: [],
    isUserprofileIn: false,
    isUserprofileSuccess: false,
    UserprofileError: '',
    UserprofileStatus: [],

    //KGID user profile update
    KgidUserprofileModel: [],
    isKgidUserprofileIn: false,
    isKgidUserprofileSuccess: false,
    KgidUserprofileError: '',
    KgidUserprofileStatus: [],
}

export const candidateUpdateDetails = (state = candidateUpdateDetailsState, action) => {
    switch (action.type) {
        //NON_KGID user profile update
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


        //KGID user profile update
        case 'KGID_UPDATEUSERPROFILE_START':
            return { isKgidUserprofileIn: true, isKgidUserprofileSuccess: false };
        case 'KGID_UPDATEUSERPROFILE_SUCCESS':
            return { KgidUserprofileModel: action.payload, isKgidUserprofileIn: false, isKgidUserprofileSuccess: true, KgidUserprofileStatus: action.KgidUserprofileStatus };
        case 'KGID_UPDATEUSERPROFILE_FAILURE':
            return { KgidUserprofileError: action.payload, isKgidUserprofileIn: false, isKgidUserprofileSuccess: false, KgidUserprofileStatus: action.KgidUserprofileStatus };
        case 'SET_IS_KGID_UPDATEUSERPROFILE_SUCCESS':
            return { isKgidUserprofileSuccess: false };
        case 'SET_IS_KGID_UPDATEUSERPROFILE_ERROR':
            return { KgidUserprofileError: '' };

        default:
            return state;
    }
};