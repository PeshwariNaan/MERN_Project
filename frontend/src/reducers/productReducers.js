import * as actionTypes from '../constants/productConstants';


const initialState = {
    products: [],
    loading: true,
    error: null,

    product: {
        reviews: []
    }
}

export const productListReducer = (state = initialState, action) => {
 
        switch (action.type) {
            case actionTypes.PRODUCT_LIST_REQUEST:
                return {    
                    ...state,               
                    loading: true,
                    products: []
                };

            case actionTypes.PRODUCT_LIST_SUCCESS:
                return {
                    ...state,
                    loading: false,
                     products: action.payload
                };

            case actionTypes.PRODUCT_LIST_FAIL:
                return { 
                    ...state,
                    loading: false, 
                    error: action.payload
                };

            default: 
                return {state};
        }
}

export const productDetailsReducer = (state = initialState, action) => {
 
    switch (action.type) {
        case actionTypes.PRODUCT_DETAILS_REQUEST:
            return {    
                ...state,               
                loading: true,                
            };

        case actionTypes.PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                 product: action.payload
            };

        case actionTypes.PRODUCT_DETAILS_FAIL:
            return { 
                ...state,
                loading: false, 
                error: action.payload
            };

        default: 
            return {state};
    }
}