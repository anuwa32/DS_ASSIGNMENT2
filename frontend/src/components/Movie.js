import React from 'react'

//instead of 'a' tag
import { Link } from 'react-router-dom'

import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Movie = (props) => {
  return (
    <Card className='my-3 py-3 rounded'>
      <Link to={`/movie/${props.movie._id}`}>
        <Card.Img src={props.movie.m_image} variant='top' fluid='true' />
      </Link>

      <Card.Body>
        <Link to={`/movie/${props.movie._id}`}>
          <Card.Title as='div'>
            <strong>{props.movie.m_name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'></Card.Text>
        <Card.Text as='h5'>$ {props.movie.t_price}</Card.Text>
        <Card.Text as='h5'>IMDb Ratings - {props.movie.m_rating}/10</Card.Text>
        
      </Card.Body>
    </Card>
  )
}

export default Movie
