import React, { useEffect , useState} from 'react'
//import QRCode from "qrcode";

import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Alertmsg from '../components/Alert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Checkoutnavigator from '../components/checkoutnavigator'
import { AddBooking } from '../actions/bookingActions'

const ConfirmBooking = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const bookingAdd = useSelector((state) => state.bookingAdd)
  const { booking, success, error } = bookingAdd
  useEffect(() => {
    if (success) {
      history.push(`/bookings/${booking._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  const confirmBookingHandler = () => {
    dispatch(
      AddBooking({
        bookingItems: cart.cartItems,
       
        movieTheater: cart.theaterDetails,  

        paymentMethod: cart.paymentDetails,
        itemsPrice: cart.itemsCost,
        
        totalPrice: cart.totalCost,
      })
    )
  }

  cart.itemsCost = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.oqty,
    0
  )
  
  cart.totalCost = Number(cart.itemsCost ) 

  return (
    <>
      <Checkoutnavigator s1 s2 s3 s4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>User Details</h2>
              <p>
                <strong>E-mail Address: </strong> 
                {cart.theaterDetails.place} <br></br>
                <strong>Contact Number: </strong> 
                {cart.theaterDetails.contactno}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment type</h2>
              <p>
                <strong>Through: </strong>
                {cart.paymentDetails}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Movies</h2>
              {cart.cartItems.length === 0 ? (
                <Alertmsg> Cart is a empty one </Alertmsg>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, id) => (
                    <ListGroup.Item key={id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width='30'
                            height='40'
                            fliud
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/movie/${item.movie}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.oqty} X $ {item.price} = ${' '}
                          {item.oqty * item.price}
						  
                        </Col>
						<Col>
              
						</Col>
					 </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Summary</h3>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Row>
                  <Col>BookingCost :</Col>
                  <Col>{cart.itemsCost}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Movie Theater Cost :</Col>
                  <Col>LKR {cart.shippingCost}</Col>
                </Row>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Row>
                  <Col>Total Cost : </Col>
                  <Col>$ {cart.totalCost}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Alertmsg variant='danger'>{error}</Alertmsg>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  disabled={cart.cartItems === 0}
                  onClick={confirmBookingHandler}
                >
                  Confirm Booking
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ConfirmBooking
