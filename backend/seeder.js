import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import movies from './data/movies.js'
import User from './models/userModel.js'
import Movie from './models/movieModel.js'
import Booking from './models/bookingModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {

  try {

    await Booking.deleteMany()
    await Movie.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleMovies = movies.map((movie) => {

      return { ...movie, user: adminUser }

    })

    await Movie.insertMany(sampleMovies)

    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (error) {

    console.error(`${error}`.red.inverse)
    process.exit(1)

  }
}

const destroyData = async () => {
    try {
      await Booking.deleteMany()
      await Movie.deleteMany()
      await User.deleteMany()
  
      
      console.log('Data Crashed'.red)  
      process.exit()
      
    } catch (error) {
      console.error(`${error}`.red.inverse)
      process.exit(1)
    }
  }

  if (process.argv[2] === '-d'){
      destroyData()
  }else{
      importData()
  }
