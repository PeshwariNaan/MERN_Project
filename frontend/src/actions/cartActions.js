import * as cartActionTypes from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id, qty) => async(dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
        type: cartActionTypes.CART_ADD_ITEM,
        payload: {
            image: data.image,
            product: data._id,
            name: data.name,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: cartActionTypes.CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};
