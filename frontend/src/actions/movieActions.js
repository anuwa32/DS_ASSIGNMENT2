import axios from 'axios'
import {
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_INFO_REQUEST,
  MOVIE_INFO_SUCCESS,
  MOVIE_INFO_FAIL,
  MOVIE_DELETE_SUCCESS,
  MOVIE_DELETE_FAIL,
  MOVIE_DELETE_REQUEST,
  MOVIE_CREATE_SUCCESS,
  MOVIE_ADD_SUCCESS,
  MOVIE_ADD_FAIL
} from '../constants/movieConstants'

export const AddMovie = (m_name,m_image, m_description, m_director, m_category, t_price, m_rating, countInStock) => async (dispatch) => {
  try {
    dispatch ({
      type: MOVIE_CREATE_SUCCESS,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/movies/add',
      { m_name,m_image, m_description, m_director, m_category, t_price, m_rating, countInStock},
      config
    )

    dispatch({
      type: MOVIE_ADD_SUCCESS,
      payload: data,
    })

    localStorage.setItem('movieDetails', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: MOVIE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMovies = () => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_LIST_REQUEST })

    const { data } = await axios.get('/api/movies')

    dispatch({
      type: MOVIE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MOVIE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMovieInfo = (id) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_INFO_REQUEST })
   
    const { data } = await axios.get(`/api/movies/${id}`)
    
    dispatch({
      type: MOVIE_INFO_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MOVIE_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const deleteMovie = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOVIE_DELETE_REQUEST,
    })

    const {
      userSignin: { userDetails },
    } = getState()

    const config = {
      headers: {
        
        Authorization: `Bearer ${userDetails.token}`,
      },
    }

    await axios.delete(`/api/movies/${id}`,config)
    

    dispatch({
      type: MOVIE_DELETE_SUCCESS,
      
    })

  } catch (error) {
    dispatch({
      type: MOVIE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
