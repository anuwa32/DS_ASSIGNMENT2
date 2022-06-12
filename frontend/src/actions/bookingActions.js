import {
       BOOKING_ADDED_REQUEST,
       BOOKING_ADDED_SUCCESS, 
       BOOKING_ADDED_FAIL,
       BOOKING_INFO_REQUEST,
       BOOKING_INFO_SUCCESS,
       BOOKING_INFO_FAIL, 
       BOOKING_PAYMENT_SUCCESS, 
       BOOKING_PAYMENT_REQUEST, 
       BOOKING_PAYMENT_FAIL} from '../constants/bookingConstants'
import axios from 'axios'



export const AddBooking = (booking) => async (dispatch, getState) => {
    

  try {
      dispatch({
        type: BOOKING_ADDED_REQUEST,
      })
  
      const {
        userSignin: { userDetails },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userDetails.token}`,
        },
      }
  
      const { data } = await axios.post(`/api/bookings/`, booking, config)
  
      dispatch({
        type: BOOKING_ADDED_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: BOOKING_ADDED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  export const getBookingInfo = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOKING_INFO_REQUEST,
      })
  
      const {
        userSignin: { userDetails },
      } = getState()
  
      const config = {
        headers: {
          
          Authorization: `Bearer ${userDetails.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/bookings/${id}`,config)
      
  
      dispatch({
        type: BOOKING_INFO_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: BOOKING_INFO_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const BookingPayment = (bookingID, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOKING_PAYMENT_REQUEST,
      })
  
      const {
        userSignin: { userDetails },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userDetails.token}`,
        },
      }
  
      const { data } = await axios.put(`/api/bookings/${bookingID}/pay`,paymentResult,config)
  
      dispatch({
        type: BOOKING_PAYMENT_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: BOOKING_PAYMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }