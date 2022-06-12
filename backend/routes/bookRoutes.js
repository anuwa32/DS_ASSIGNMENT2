import express from 'express'
import { createbook, getbookByID, updatebooktoPaid } from '../controllers/bookingController.js'
const router = express.Router()
import {shield} from '../middleware/validateTokenMiddleware.js'

router.route('/').post(shield, createbook)
router.route('/:id').get(shield, getbookByID)
router.route('/:id/pay').put(shield, updatebooktoPaid)

export default router