import {
  CART_ADD_MOVIE,
  CART_REMOVE_MOVIE,
  CART_RECORD_MOVIE_THEATER,
  CART_RECORD_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], theaterDetails: {} }, 
  action
) => {
  switch (action.type) {
    case CART_ADD_MOVIE:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.movie === item.movie)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.movie === existItem.movie ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case CART_REMOVE_MOVIE:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.movie !== action.payload),
      }

    case CART_RECORD_MOVIE_THEATER: 
      return {
        ...state,
        theaterDetails: action.payload,
      }

    case CART_RECORD_PAYMENT_METHOD:
       return {
          ...state,
          paymentDetails: action.payload,
        }
    

    default:
      return state
  }
}
