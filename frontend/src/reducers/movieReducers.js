import {
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_INFO_REQUEST,
  MOVIE_INFO_SUCCESS,
  MOVIE_INFO_FAIL,
  MOVIE_DELETE_REQUEST,
  MOVIE_DELETE_SUCCESS,
  MOVIE_DELETE_FAIL,
} from '../constants/movieConstants'

export const movieListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return { loading: true, movies: [] }
    case MOVIE_LIST_SUCCESS:
      return { loading: false, movies: action.payload }
    case MOVIE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const movieInfoReducer = (
  state = { movie: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case MOVIE_INFO_REQUEST:
      return { loading: true, ...state }
    case MOVIE_INFO_SUCCESS:
      return { loading: false, movie: action.payload }
    case MOVIE_INFO_FAIL:
     return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const movieDeleteReducer = (
  state = {} ,action
) => {
  switch (action.type) {
    case MOVIE_DELETE_REQUEST:
      return { loading: true,  }
    case MOVIE_DELETE_SUCCESS:
      return { loading: false, success:true }
    case MOVIE_DELETE_FAIL:
     return { loading: false, error: action.payload }
    default:
      return state
  }
}

