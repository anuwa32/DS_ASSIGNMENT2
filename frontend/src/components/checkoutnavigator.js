import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Checkoutnavigator = ({ s1, s2, s3, s4 }) => {
  return (

    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {s1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>SignIn</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>SignIn</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {s2 ? (
          <LinkContainer to='/theaterprocess'>
            <Nav.Link>Movie Theater</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Movie Theater</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {s3 ? (
          <LinkContainer to='/paymentprocess'>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {s4 ? (
          <LinkContainer to='/confirmBooking'>
            <Nav.Link>Confirm Ticket</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Confirm Ticket</Nav.Link>
        )}
      </Nav.Item>

    
    </Nav>
  )
}

export default Checkoutnavigator
