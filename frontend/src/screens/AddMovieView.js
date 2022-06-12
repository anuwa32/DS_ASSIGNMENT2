import React, {useState,  } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormC from '../components/Form_layout'
import { useDispatch } from 'react-redux'
import { AddMovie } from '../actions/movieActions'

const AddMovieView = ({}) => {
  
    const [m_name, setm_name] = useState('')
    const [m_image, setm_image] = useState('')
    const [m_description, setm_description] = useState('')
    const [m_director, setm_director] = useState('')
    const [m_category, setm_category] = useState('')
    const [t_price, sett_price] = useState('')
    const [m_rating, setm_rating] = useState('')
    const [countInStock, setcountInStock] = useState('')
  
    const dispatch = useDispatch()
    // const movieCreate = useSelector(state => state.movieCreate)
    // const {movieDetails} = movieCreate
  
    // //const redirect = location.search ? location.search.split('=')[1] : '/'
  
    // useEffect(() => {
    //   if (movieDetails) {
    //     history.push(redirect)
    //   }
    // }, [movieDetails, redirect, history])
  
    const submitHandler = (e) => {
      dispatch(AddMovie(m_name,m_image, m_description, m_director, m_category, t_price, m_rating, countInStock))
      }
      
    return(

        <FormC>
      <h1>Add New Movie</h1>

      <Form onSubmit={submitHandler}>

      <Form.Group controlId='m_name'>
          <Form.Label>Movie Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter movie name'
            value={m_name}
            onChange={(e) => setm_name(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='m_image'>
          <Form.Label>Image Path</Form.Label>
          <Form.Control
            type='text'
            placeholder='Add Image Path'
            value={m_image}
            onChange={(e) => setm_image(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='m_description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Add a movie description'
            value={m_description}
            onChange={(e) => setm_description(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='m_director'>
          <Form.Label>Director</Form.Label>
          <Form.Control
            type='text'
            placeholder='Name of the director'
            value={m_director}
            onChange={(e) => setm_director(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='m_category'>
          <Form.Label>Director</Form.Label>
          <Form.Control
            type='text'
            placeholder='Category of the movie'
            value={m_category}
            onChange={(e) => setm_category(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='t_price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ticket price'
            value={t_price}
            onChange={(e) => sett_price(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='m_rating'>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type='text'
            placeholder='Rating'
            value={m_rating}
            onChange={(e) => setm_rating(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='countInStock'>
          <Form.Label>Ticket Count</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ticket count'
            value={countInStock}
            onChange={(e) => setcountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>
        

        <Button type='submit' variant='primary'>
          Add Movie
        </Button>
      </Form>
    </FormC>
    );
};

export default AddMovieView;