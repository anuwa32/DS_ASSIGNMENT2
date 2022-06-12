import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import { PayPalButton } from 'react-paypal-button-v2'
import Alertmsg from '../components/Alert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Buffer from '../components/buffer'
import { getBookingInfo, BookingPayment } from '../actions/bookingActions'
import { BOOKING_PAYMENT_CLEAN } from '../constants/bookingConstants'

const BookingView = ({ match }) => {
  const bookingId = match.params.id
  const [sdkPayPal, setSDKpaypal] = useState(false)
  const dispatch = useDispatch()

  const bookinginfo = useSelector((state) => state.bookinginfo)
  const { booking, loading, error } = bookinginfo

  const bookingPayment = useSelector((state) => state.bookingPayment)
  const { loading: loadingpay, success: successpay } = bookingPayment

 

  useEffect(() => {
    //PAYPAL SCRIPT CONFIGURATION
    const payPal_dev_script = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSDKpaypal(true)
      }
      document.body.appendChild(script)
    }

    if (!booking || successpay) {
      if (!booking || booking._id !== bookingId) {
        dispatch({ type: BOOKING_PAYMENT_CLEAN })
        dispatch(getBookingInfo(bookingId))
      }
    } else if (!booking.isPaid) {
      if (!window.paypal) {
        payPal_dev_script()
      } else {
        setSDKpaypal(true)
      }
    }
  }, [dispatch, booking, bookingId, successpay])

  const successPaymenthandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(BookingPayment(bookingId, paymentResult))
  }
  return loading ? (
    <Buffer />
  ) : error ? (
    <Alertmsg variant='danger'>{error}</Alertmsg>
  ) : (
    <>
      <h2>Booking {booking._id}</h2>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>User Details</h2>
              <strong>Name: </strong> {booking.user.name}<br></br>
              <strong>Email Address: </strong><a href={`mailto:${booking.user.email}`}>{booking.user.email}</a><br></br>
              <strong>Contact Number: </strong>{booking.movieTheater.contactno}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment type</h2>
              <p>
                <strong>Through: </strong>
                {booking.paymentMethod}
              </p>
              {booking.isPaid ? (
                <Alertmsg variant='success'>Paid on {booking.paidAt}</Alertmsg>
              ) : (
                <Alertmsg variant='danger'>Not paid</Alertmsg>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Movies</h2>
              {booking.bookingItems.length === 0 ? (
                <Alertmsg> Booking is a null </Alertmsg>
              ) : (
                <ListGroup variant='flush'>
                  {booking.bookingItems.map((item, id) => (
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
        
              <ListGroup.Item>
                <Row>
                  <Col>Total Cost : </Col>
                  <Col>$ {booking.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!booking.isPaid && (
                <ListGroup.Item>
                  {loadingpay && <Buffer />}
                  {sdkPayPal && booking.paymentMethod==="PayPal" ? (
                    <PayPalButton
                    amount={booking.totalPrice}
                    onSuccess={successPaymenthandler}
                  />
                  ) : (
                    <Buffer />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default BookingView
