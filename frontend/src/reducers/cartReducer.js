import * as cartActionTypes from '../constants/cartConstants';

const initialState = {
    cartItems: []
}


//Changed .product to productId
export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case cartActionTypes.CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            if(existItem) {
               return{
                ...state,
                cartItems: state.cartItems.map(x => x.product === existItem.product? item: x)
               } 
            }else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case cartActionTypes.CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }


        default:
            return state
    }
}