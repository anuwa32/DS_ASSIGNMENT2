import axios from 'axios'
import { 
         CART_ADD_MOVIE, 
         CART_REMOVE_MOVIE, 
         CART_RECORD_MOVIE_THEATER, 
         CART_RECORD_PAYMENT_METHOD } from '../constants/cartConstants'

export const addToCart = (id, oqty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/movies/${id}`)

  dispatch({
    type: CART_ADD_MOVIE,
    payload: {
      movie: data._id,
      name: data.m_name,
      image: data.m_image,
      price: data.t_price,
      countInStock: data.countInStock,
      oqty,  
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) =>  (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_MOVIE,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const recordTheaterinfo = (data) =>  (dispatch) => {  
  dispatch({
    type: CART_RECORD_MOVIE_THEATER,  
    payload: data,
  })

  localStorage.setItem('theaterDetails', JSON.stringify(data))
}

export const recordPaymentmethod = (data) =>  (dispatch) => {
  dispatch({
    type: CART_RECORD_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentDetails', JSON.stringify(data))
}

