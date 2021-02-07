import * as actionTypes from '../constants/productConstants';


const initialState = {
    products: [],
    loading: false,
    error: null
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