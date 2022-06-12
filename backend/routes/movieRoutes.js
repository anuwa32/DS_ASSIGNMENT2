import express from 'express'
import { getMovieById, getMovies, deleteMovieById, InsertMovie } from '../controllers/movieController.js'
import {shield, admin} from '../middleware/validateTokenMiddleware.js'

const router = express.Router()

router.route('/').get(getMovies)

router.route('/add').post(InsertMovie)

router.route('/:id').get(getMovieById).delete(shield, admin, deleteMovieById).put(shield, admin, )

export default router
