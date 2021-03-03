import * as orderActionTypes from '../constants/orderConstants';
import axios from 'axios';


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: orderActionTypes.ORDER_CREATE_REQUEST
        });
        //destructuring to get the userInfo from getState - we keep the token there
        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.post(`api/orders`, order, config)

        dispatch({
            type: orderActionTypes.ORDER_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: orderActionTypes.ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
    }
};


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: orderActionTypes.ORDER_DETAILS_REQUEST
        });
        //destructuring to get the userInfo from getState - we keep the token there
        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: orderActionTypes.ORDER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: orderActionTypes.ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
    }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: orderActionTypes.ORDER_PAY_REQUEST
        });
        //destructuring to get the userInfo from getState - we keep the token there
        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: { 
                'Content-Type': 'application/json' ,          
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: orderActionTypes.ORDER_PAY_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: orderActionTypes.ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
    }
};

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: orderActionTypes.ORDER_LIST_MY_REQUEST
        });
        //destructuring to get the userInfo from getState - we keep the token there
        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {                          
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: orderActionTypes.ORDER_LIST_MY_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: orderActionTypes.ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
    }
};