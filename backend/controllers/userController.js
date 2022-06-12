import genToken from '../utilities/tokenGenerate.js'
import asyncHandler from 'express-async-handler' //Rather to using TryCatch, import Async handler to handle errors in routes.
import User from '../models/userModel.js'


//Fetch validate the user credentials and then send a token




const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.verifyCredentials(password))) {
    res.json({

      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),

    })
  } else {

    res.status(401)
    throw new Error('Entered details are not correct')

  }
})

// Get the user profile



const getUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({

      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,

    })
  } else {

    res.status(404)
    throw new Error('User cannot be found')

  }
})

// Add a new user



const addUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body

  const chk_user_existence = await User.findOne({ email: email })

  if (chk_user_existence) {

    res.status(400)
    throw new Error(`There's a member already registered with that mail`)

  }

  const user = await User.create({

    name,
    email,
    password,

  })
  if (user) {

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),

    })
  } else {

    res.status(400)
    throw new Error('This user account cannot be created. Try again')
  }
})

//To Update user profile



const updateUserAccount = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id)

  if (user) {

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {

      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({

      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id),

    })


  } else {

    res.status(404)
    throw new Error('User cannot be found')

  }
})



//Get request to all users



const getUsers = asyncHandler(async (req, res) => {
  
  const users = await User.find({})
  res.json(users)

  
})

export { authUser, getUserAccount, addUser, updateUserAccount, getUsers }
