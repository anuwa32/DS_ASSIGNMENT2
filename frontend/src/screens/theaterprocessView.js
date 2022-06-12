import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormC from '../components/Form_layout'
import { useDispatch, useSelector } from 'react-redux'
import {recordTheaterinfo} from '../actions/cartActions'
import Checkoutnavigator from '../components/checkoutnavigator'

const TheaterprocessView = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { theaterDetails } = cart

  const [place, setPlace] = useState(theaterDetails.place)
  const [contactno, setContactNo] = useState(theaterDetails.contactno)
  
  const dispatch = useDispatch()

  const submithandler = (e) => {
    e.preventDefault()
    dispatch(recordTheaterinfo({place, contactno }))
    history.push('/paymentprocess')
  }

  return (
    <FormC>
      <Checkoutnavigator s1 s2 />
      <h2> Your Details</h2>
      
      <Form onSubmit={submithandler}>
        <Form.Group controlId='place'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your place'
            value={place}
            required
            onChange={(e) => setPlace(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='contactno'>
          <Form.Label>Contact No</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter your contact number'
            value={contactno}
            required
            onChange={(e) => setContactNo(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          {' '}
          Next{' '}
        </Button>
      </Form>
    </FormC>
  )
}

export default TheaterprocessView
