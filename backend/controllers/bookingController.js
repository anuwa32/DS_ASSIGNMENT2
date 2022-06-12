import asyncHandler from 'express-async-handler' //importing Async handler to do error handling in routes rather than using TryCatch
import Booking from '../models/bookingModel.js'

//insert new booking

const createbook = asyncHandler(async (req, res) => {
  const {
    bookingItems,
    paymentMethod,
    itemsPrice,
    movieTheater,
    totalPrice,
  } = req.body

  

  if (bookingItems && bookingItems.length === 0) {
    res.status(400)
    throw new Error('Empty movie list')
    return
  } else {
    const booking = new Booking({
      user: req.user._id,
      bookingItems,
      paymentMethod,
      itemsPrice,
      movieTheater,
      totalPrice,
    })

    //console.log(booking)

    const finalizebook = await booking.save()
    res.status(201).json(finalizebook)
  }
})

//fetch booking  by a id

const getbookByID = asyncHandler(async (req, res) => {

  let id = req.params.id
  console.log(id)

 const booking = await Booking.findById(id).populate('user', 'name email')

console.log(booking)

 if(booking) {
   res.json(booking)
 }else{
   res.status(404)
   throw new Error('Invalid booking')
 }

})

//Update booking to paid


const updatebooktoPaid = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
 
  if(booking) {
    booking.isPaid =true
    booking.paidAt = Date.now()
    booking.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedbooking = await booking.save()
    res.json(updatedbooking)

  }else{
    res.status(404)
    throw new Error('Invalid booking')
  }
 
 })


export { createbook, getbookByID, updatebooktoPaid }
