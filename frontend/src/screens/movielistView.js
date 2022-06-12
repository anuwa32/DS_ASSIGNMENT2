import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Link} from "react-router-dom";
import { Table, Button, Row ,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alertmsg from '../components/Alert'
import Buffer from '../components/buffer'
import  {listMovies, deleteMovie}  from '../actions/movieActions'


const MovielistView = ({history, match}) => {

    const dispatch = useDispatch()

    const movieList = useSelector(state => state.movieList)
    const {loading , error , movies} = movieList

    const movieDelete = useSelector(state => state.movieDelete)
    const {loading:loadingDel , error:errorDel , success:successDel} = movieDelete

    const userSignin = useSelector(state => state.userSignin)
    const {userDetails} = userSignin

    useEffect(() => {
        if(userDetails && userDetails.isAdmin){
        dispatch(listMovies())}
        else {
            history.push('/login')
        }
    }, [dispatch, history,userDetails, successDel] )

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure ?')){
          dispatch(deleteMovie(id))
        }
    }

    return (
       <>
        <Row className='align-items-center'>
       
       <Col> <h1> Movies </h1></Col>

        <Col className='text-right'>
            <Link to={"/movie/add"}>
                <Button className='my-3'><i className='fas fa-plus'></i>Add Movie</Button>
            </Link>
        </Col>
        </Row>
        {loadingDel && <Buffer />}
        {errorDel && <Alertmsg variant='danger'>{errorDel}</Alertmsg>}
        {loading ? ( <Buffer />) : error ? (<Alertmsg variant='danger'>{error}</Alertmsg>): (
            <Table striped bordered hover responsive className='table-sm'>

                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>m_category</th>
                        <th>Author</th>
                       
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie._id}>
                            <td>{movie._id}</td>
                        <td>{movie.m_name}</td>
                        <td>{movie.t_price}</td>
                        <td>{movie.m_category}</td>
                        <td>{movie.m_director}</td>

                        <td><LinkContainer to={`/movie/edit/${movie._id}`}><Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button></LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(movie._id)}><i className='fas fa-trash'></i>
                            </Button>
                        </td>

                        </tr>
                    ))}
                    
                    
                </tbody>
            </Table>
                
        )}
            
        </>
    )
}

export default MovielistView
