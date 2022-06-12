import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import movieRoutes from './routes/movieRoutes.js'
import userRoutes from './routes/userRoutes.js'
import bookRoutes from './routes/bookRoutes.js'

dotenv.config()

connectDB()

const app = express()

//a middleware that accepts json request bodies via the server
app.use(express.json())

app.get('/', (req, res) => {
  res.send('This API is working')
})

//Routing to relavent Roters

app.use('/api/movies', movieRoutes)
app.use('/api/users', userRoutes)
app.use('/api/bookings', bookRoutes)

app.use('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_SANDBOX_CLIENT_ID))

app.use(notFound)
app.use(errorHandler)


//call the dotenv file

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
)
