import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const shield = asyncHandler(async(req,res, next) => {
   

    let receivedToken


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))

    {
       try{
         
         receivedToken = req.headers.authorization.split(' ')[1]
         const decodedToken = jwt.verify(receivedToken, process.env.JWT_SCRT_KEY)
         
         req.user = await User.findById(decodedToken.id).select('-password')

        
         next()
       }
       catch(error){

        console.error(error)
        res.status(401)
        throw new Error('token is broken cannot be access granted') //Token is broken

       }
    }

    if(!receivedToken)

    {
        res.status(404)
        throw new Error('a token is not availabe cannot be access granted') //Token not available
    }

   

})


const admin = (req,res,next) => {

  if(req.user && req.user.isAdmin)
  {
    next()
  }else{

    res.status(401)
    throw new Error('Not an admin detail') //Not a valid admin details

  }
}


export { shield, admin }