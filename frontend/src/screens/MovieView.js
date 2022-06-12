import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormControl,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Buffer from '../components/buffer'
import Alertmsg from '../components/Alert'
import { listMovieInfo } from '../actions/movieActions'

const MovieView = ({ history, match }) => {
  const [stk_count, set_stkCount] = useState(1)

  const dispatch = useDispatch()

  const movieInfo = useSelector((state) => state.movieInfo)
  const { loading, error, movie } = movieInfo

  useEffect(() => {
    dispatch(listMovieInfo(match.params.id))
  }, [dispatch, match])

  const cartHandler = () => {
    history.push(`/cart/${match.params.id}?stkqty=${stk_count}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Back
      </Link>

      {loading ? (
        <Buffer />
      ) : error ? (
        <Alertmsg variant='danger'>{error}</Alertmsg>
      ) : (
        <Row>
          <Col md={6}>
            <Image
              src={movie.m_image}
              height='450'
              width='400'
              alt={movie.m_name}
              fluid
            />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{movie.m_name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                IMBb Ratings - {movie.m_rating}
              </ListGroup.Item>
              <ListGroup.Item>Price: $ {movie.t_price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {movie.m_description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>$ {movie.t_price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {movie.countInStock > 0 ? 'Tickets Available' : 'House Full'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/*if seats are available in the theater */}

                {movie.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                    <Col>Quantity</Col>
                      <Col>
                      
                        <FormControl
                          as='select'
                          value={stk_count}
                          onChange={(e) => set_stkCount(e.target.value)}
                        >
                          {[...Array(movie.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                   onClick={cartHandler}
                    className='btn-block'
                    type='button'
                    disabled={movie.countInStock === 0}
                  >
                    Add To cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default MovieView
