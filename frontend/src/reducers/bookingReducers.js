import {
  BOOKING_ADDED_REQUEST,
  BOOKING_ADDED_SUCCESS,
  BOOKING_ADDED_FAIL,
  BOOKING_INFO_REQUEST,
  BOOKING_INFO_SUCCESS,
  BOOKING_INFO_FAIL,
  BOOKING_PAYMENT_FAIL,
  BOOKING_PAYMENT_SUCCESS,
  BOOKING_PAYMENT_REQUEST,
  BOOKING_PAYMENT_CLEAN,
} from '../constants/bookingConstants'

export const bookingADDReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_ADDED_REQUEST:
      return {
        loading: true,
      }
    case BOOKING_ADDED_SUCCESS:
      return {
        loading: false,
        success: true,
        booking: action.payload,
      }
    case BOOKING_ADDED_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const bookingInfoReducer = (
  state = { loading: true, bookingItems: [], movieTheater: {} }, // aye balanna wenas karanna
  
  action
) => {
  switch (action.type) {
    case BOOKING_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case BOOKING_INFO_SUCCESS:
      return {
        loading: false,
        booking: action.payload,
      }
    case BOOKING_INFO_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const bookingPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_PAYMENT_REQUEST:
      return {
        loading: true,
      }
    case BOOKING_PAYMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case BOOKING_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
      case BOOKING_PAYMENT_CLEAN:
        return {}
          
    default:
      return state
  }
}
