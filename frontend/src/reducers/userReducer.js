import * as userActionTypes from '../constants/userConstants';

const initialState = {
    loading: true,
    userInfo: null,
    error: null
}


export const userLoginReducer = (state = initialState, action) => {
 
    switch (action.type) {
        case userActionTypes.USER_LOGIN_REQUEST:
            return {    
                ...state,               
                loading: true,
                
            };
        case userActionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            };
        case userActionTypes.USER_LOGIN_FAIL:
            return { 
                ...state,
                loading: false, 
                error: action.payload
            };
        case userActionTypes.USER_LOGOUT:
                return {};                              

        default: 
            return {state};
    }
}