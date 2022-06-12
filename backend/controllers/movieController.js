import asyncHandler from 'express-async-handler' //Rather to using TryCatch, import Async handler to handle errors in routes.
import Movie from '../models/movieModel.js'


// Fetch  movies
 

const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({})

  res.json(movies)
})


// Fetch a single movie 


const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id)

  if (movie) {
    res.json(movie)
  } else {
    res.status(404)
    throw new Error('Movie not found')
  }
})


// DELETE a movie 


const deleteMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id)

  if (movie) {
    await movie.remove()
    res.json({ message: 'Successfully removed' })
  } else {
    res.status(404)
    throw new Error('Movie not found')
  }
})


 //Insert  a new movie


const InsertMovie = asyncHandler(async (req, res) => {
  const {
    m_name, 
    m_image,
    m_director,
    t_price,
    //user: req.user._id,
    m_category,
    m_description,
    countInStock,
    m_rating
  } = req.body;
  
  const movie = new Movie({
    m_name,
    m_image,
    m_director,
    t_price,
    //user: req.user._id,
    m_category,
    m_description,
    countInStock,
    m_rating
  })

  const addedMovie = await movie.save()
  res.status(201).json(addedMovie)
})


//Update  a new movie 



const updateMovie = asyncHandler(async (req, res) => {
  const {
    m_name,
    m_image,
    m_director,
    t_price,
    //user,
    m_category,
    m_description,
    countInStock,
    m_rating
  } = req.body

  const movie = await Movie.findById(req.params.id)

  if(movie){
    movie.m_name = m_name
    movie.m_image = m_image
    movie.m_director = m_director
    movie.t_price = t_price
    //movie.user = user
    movie.m_category = m_category
    movie.m_description = m_description
    movie.countInStock = countInStock
    movie.m_rating = m_rating
 

  const updatedMovie = await movie.save()
  res.json( updatedMovie) 
}else{
  res.status(404)
  throw new Error('Movie not found ') }
})

export { getMovieById, getMovies, deleteMovieById, InsertMovie,updateMovie  }
