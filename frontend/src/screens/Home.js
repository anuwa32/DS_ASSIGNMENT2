import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Movie from '../components/Movie'
import Buffer from '../components/buffer'
import Alertmsg from '../components/Alert'
import { listMovies } from '../actions/movieActions'

const Home = () => {
  const dispatch = useDispatch()

  const movieList = useSelector((state) => state.movieList)
  const { loading, error, movies } = movieList

  useEffect(() => {
    dispatch(listMovies())
  }, [dispatch])

  return (
    <>
      <h1> Latest Movies </h1>
      {loading ? (
        <Buffer />
      ) : error ? (
        <Alertmsg variant='danger'>{error}</Alertmsg>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col key={movie._id} sm={12} md={6} lg={4} xl={3}>
              <Movie movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Home
