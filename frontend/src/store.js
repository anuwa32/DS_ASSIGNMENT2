import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  movieListReducer,
  movieInfoReducer,
  movieDeleteReducer,
} from './reducers/movieReducers'
import { cartReducer } from './reducers/cartReducers'
import { userSignInReducer, userCreateReducer, userInfoReducer, userUpdateReducer, userListReducer } from './reducers/userReducers'
import {bookingADDReducer, bookingInfoReducer, bookingPaymentReducer} from './reducers/bookingReducers'

const reducer = combineReducers({
  movieList: movieListReducer,
  movieInfo: movieInfoReducer,
  cart: cartReducer,
  userSignin: userSignInReducer,
  userCreate: userCreateReducer,
  userInfo: userInfoReducer,
  userUpdateAcc: userUpdateReducer,
  bookingAdd: bookingADDReducer,
  bookinginfo: bookingInfoReducer,
  bookingPayment:bookingPaymentReducer,
  userListb: userListReducer,
  movieDelete: movieDeleteReducer,
})

const cartAddeditemsfromLocalStrg = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

  const userInfoPassedfromLocalStrg = localStorage.getItem('userDetails')
  ? JSON.parse(localStorage.getItem('userDetails'))
  : null

  const movieTheaterfromLocalStrg = localStorage.getItem('theaterDetails')
  ? JSON.parse(localStorage.getItem('theaterDetails'))
  : {}

const initialState = {
  cart: { cartItems: cartAddeditemsfromLocalStrg, theaterDetails: movieTheaterfromLocalStrg },
  userSignin: {userDetails: userInfoPassedfromLocalStrg},

}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
